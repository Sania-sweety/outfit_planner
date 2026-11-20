

import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import { GoogleGenAI } from '@google/genai';


// =====================================================
// GEMINI API KEY
// =====================================================
//
// IMPORTANT:
// Paste your NEW Gemini API key between the quotes.
//
// Example:
//
// const GEMINI_API_KEY = 'AIzaSyXXXXXXXXXXXX';
//
// DO NOT use the old/exposed key.
//

const GEMINI_API_KEY =  process.env.EXPO_PUBLIC_GEMINI_API_KEY;


// =====================================================
// GEMINI CLIENT
// =====================================================

const ai =
  GEMINI_API_KEY &&
  GEMINI_API_KEY ===  process.env.EXPO_PUBLIC_GEMINI_API_KEY
    ? new GoogleGenAI({
        apiKey: GEMINI_API_KEY,
      })
    : null;


// =====================================================
// SCREEN
// =====================================================

export default function TryOutfitScreen({
  navigation,
  wardrobeItems = [],
  isLoggedIn = false,
  route,
}) {

  // ===================================================
  // LOGIN STATE
  // ===================================================

  const loggedIn =
    isLoggedIn === true ||
    route?.params?.isLoggedIn === true;


  // ===================================================
  // STATES
  // ===================================================

  const [personImage, setPersonImage] =
    useState(null);

  const [selectedItems, setSelectedItems] =
    useState([]);

  const [generatedImage, setGeneratedImage] =
    useState(null);

  const [aiResult, setAiResult] =
    useState('');

  const [loading, setLoading] =
    useState(false);


  // ===================================================
  // LOGIN REQUIRED
  // ===================================================

  const requireLogin = (action) => {

    if (loggedIn) {
      action();
      return;
    }

    Alert.alert(
      'Login Required',
      'Please login or create an account to continue.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },

        {
          text: 'Login',
          onPress: () => {
            navigation.navigate('LoginScreen');
          },
        },

        {
          text: 'Sign Up',
          onPress: () => {
            navigation.navigate('SignUpScreen');
          },
        },
      ]
    );
  };


  // ===================================================
  // CHOOSE PERSON PHOTO
  // ===================================================

  const choosePhoto = async () => {

    try {

      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {

        Alert.alert(
          'Permission Required',
          'Please allow access to your photos.'
        );

        return;
      }


      const result =
        await ImagePicker.launchImageLibraryAsync({

          mediaTypes: ['images'],

          allowsEditing: true,

          aspect: [3, 4],

          quality: 0.8,
        });


      if (!result.canceled) {

        const uri =
          result.assets[0].uri;

        setPersonImage(uri);

        setAiResult('');

        setGeneratedImage(null);
      }

    } catch (error) {

      console.log(
        'Photo selection error:',
        error
      );

      Alert.alert(
        'Photo Error',
        'Could not select the photo.'
      );
    }
  };


  // ===================================================
  // NORMALIZE CLOTHING ITEM
  // ===================================================

  const normalizeItem = (
    item,
    index = 0
  ) => {

    const image =
      typeof item === 'string'
        ? item
        : item?.image || item?.uri;


    const id =
      typeof item === 'string'
        ? item
        : item?.id ||
          item?.image ||
          item?.uri ||
          String(index);


    const name =
      typeof item === 'string'
        ? 'Clothing'
        : item?.name || 'Clothing';


    return {
      id,
      image,
      name,
    };
  };


  // ===================================================
  // SELECT / REMOVE CLOTHING
  // ===================================================

  const toggleItem = (item) => {

    const normalizedItem =
      normalizeItem(item);


    if (!normalizedItem.image) {

      Alert.alert(
        'Image Missing',
        'This wardrobe item does not contain an image.'
      );

      return;
    }


    const alreadySelected =
      selectedItems.some(
        selected =>
          selected.id ===
          normalizedItem.id
      );


    if (alreadySelected) {

      setSelectedItems(
        selectedItems.filter(
          selected =>
            selected.id !==
            normalizedItem.id
        )
      );

    } else {

      setSelectedItems([
        ...selectedItems,
        normalizedItem,
      ]);
    }


    setAiResult('');

    setGeneratedImage(null);
  };


  // ===================================================
  // URI -> BASE64
  // ===================================================

  const imageToBase64 = async (uri) => {

    const response =
      await fetch(uri);


    const blob =
      await response.blob();


    return new Promise(
      (resolve, reject) => {

        const reader =
          new FileReader();


        reader.onloadend = () => {

          const result =
            reader.result;


          if (!result) {

            reject(
              new Error(
                'Could not convert image.'
              )
            );

            return;
          }


          const base64 =
            result.split(',')[1];


          resolve(base64);
        };


        reader.onerror =
          reject;


        reader.readAsDataURL(
          blob
        );
      }
    );
  };


  // ===================================================
  // MIME TYPE
  // ===================================================

  const getMimeType = (uri) => {

    if (!uri) {
      return 'image/jpeg';
    }


    const lower =
      uri.toLowerCase();


    if (
      lower.includes('.png')
    ) {

      return 'image/png';
    }


    if (
      lower.includes('.webp')
    ) {

      return 'image/webp';
    }


    return 'image/jpeg';
  };


  // ===================================================
  // CHECK API KEY
  // ===================================================

  const checkApiKey = () => {

    if (
      !GEMINI_API_KEY ||
      GEMINI_API_KEY.trim() === ''
    ) {

      Alert.alert(
        'Gemini API Key Missing',
        'Set EXPO_PUBLIC_GEMINI_API_KEY in your local Expo environment.'
      );

      return false;
    }


    if (!ai) {

      Alert.alert(
        'Gemini Configuration Error',
        'Gemini could not be initialized. Please check your API key.'
      );

      return false;
    }


    return true;
  };


  // ===================================================
  // GENERATE OUTFIT
  // ===================================================

  const tryOutfit = async () => {

    // -------------------------------------------------
    // PHOTO CHECK
    // -------------------------------------------------

    if (!personImage) {

      Alert.alert(
        'Add Your Photo',
        'Please select your photo first.'
      );

      return;
    }


    // -------------------------------------------------
    // CLOTHES CHECK
    // -------------------------------------------------

    if (
      selectedItems.length === 0
    ) {

      Alert.alert(
        'Select Outfit',
        'Please select at least one clothing item.'
      );

      return;
    }


    // -------------------------------------------------
    // API KEY CHECK
    // -------------------------------------------------

    if (!checkApiKey()) {
      return;
    }


    try {

      setLoading(true);

      setAiResult('');

      setGeneratedImage(null);


      // =================================================
      // PERSON IMAGE
      // =================================================

      console.log(
        'Converting person image...'
      );


      const personBase64 =
        await imageToBase64(
          personImage
        );


      const personMimeType =
        getMimeType(
          personImage
        );


      // =================================================
      // CONTENTS
      // =================================================

      const contents = [];


      // =================================================
      // PROMPT
      // =================================================

      const prompt = `

You are an advanced virtual fashion try-on assistant.

IMAGE 1:
This is the person's original photo.

FOLLOWING IMAGES:
These are clothing items selected from the person's wardrobe.

TASK:

Create a realistic full-body fashion photograph of the SAME PERSON from IMAGE 1 wearing the selected clothing items.

IMPORTANT:

1. Keep the person's face recognizable and as close as possible to the original photo.

2. Keep the person's natural facial features.

3. Keep the person's approximate body proportions.

4. Do not change the person's identity.

5. Do not create a completely different person.

6. Use the actual clothing shown in the supplied wardrobe images.

7. Combine the selected clothing items into ONE complete outfit.

8. If the selected items include a top and bottom, show the person wearing both together.

9. If there is an outerwear item, layer it appropriately.

10. Preserve the important colors, patterns, materials and design of the supplied clothes.

11. Make the clothes look naturally fitted to the person.

12. Make realistic folds, shadows and lighting.

13. Create a natural full-body standing pose.

14. Make the final image look like a realistic fashion photograph.

15. Do not add random clothing that was not selected.

16. Do not remove selected clothing unless absolutely necessary.

17. Use a clean realistic background.

18. Make the result look like an actual photograph rather than an illustration.

19. Keep the person's face and identity as consistent as possible with IMAGE 1.

20. The final image should show the complete selected outfit clearly.

The goal is:

"Show the same person wearing the complete outfit created from the selected wardrobe clothes."

Generate the final outfit image.

After generating the image, provide a SHORT styling recommendation.
`;


      // =================================================
      // ADD PROMPT
      // =================================================

      contents.push({
        text: prompt,
      });


      // =================================================
      // PERSON PHOTO
      // =================================================

      contents.push({

        inlineData: {

          mimeType:
            personMimeType,

          data:
            personBase64,
        },

      });


      // =================================================
      // CLOTHING IMAGES
      // =================================================

      for (
        const item of selectedItems
      ) {

        if (!item.image) {
          continue;
        }


        try {

          console.log(
            'Converting clothing image:',
            item.name
          );


          const clothingBase64 =
            await imageToBase64(
              item.image
            );


          const clothingMimeType =
            getMimeType(
              item.image
            );


          contents.push({

            inlineData: {

              mimeType:
                clothingMimeType,

              data:
                clothingBase64,
            },

          });

        } catch (error) {

          console.log(
            'Clothing image error:',
            error
          );
        }
      }


      // =================================================
      // CHECK CONTENTS
      // =================================================

      if (contents.length < 2) {

        throw new Error(
          'Could not prepare the images for Gemini.'
        );
      }


      console.log(
        'Sending request to Gemini...'
      );


      // =================================================
      // GEMINI IMAGE GENERATION
      // =================================================

      const response =
        await ai.models.generateContent({

          model:
            'gemini-3.1-flash-image',

          contents:

            contents,

          config: {

            responseModalities: [
              'TEXT',
              'IMAGE',
            ],

            responseFormat: {

              image: {

                aspectRatio:
                  '3:4',

                imageSize:
                  '1K',
              },

            },

          },

        });


      console.log(
        'Gemini response received'
      );


      // =================================================
      // PROCESS RESPONSE
      // =================================================

      let imageFound = false;

      let textFound = '';


      const parts =
        response
          ?.candidates?.[0]
          ?.content?.parts || [];


      console.log(
        'Gemini parts:',
        parts.length
      );


      for (
        const part of parts
      ) {

        // -----------------------------------------------
        // TEXT
        // -----------------------------------------------

        if (
          part.text
        ) {

          textFound +=
            part.text;
        }


        // -----------------------------------------------
        // GENERATED IMAGE
        // -----------------------------------------------

        if (
          part.inlineData &&
          part.inlineData.data
        ) {

          const mimeType =
            part.inlineData.mimeType ||
            'image/png';


          const imageUri =
            `data:${mimeType};base64,${part.inlineData.data}`;


          setGeneratedImage(
            imageUri
          );


          imageFound = true;
        }
      }


      // =================================================
      // AI TEXT
      // =================================================

      if (
        textFound.trim()
      ) {

        setAiResult(
          textFound.trim()
        );

      } else {

        setAiResult(
          'Your complete outfit has been generated.'
        );
      }


      // =================================================
      // IMAGE CHECK
      // =================================================

      if (!imageFound) {

        Alert.alert(
          'Image Not Generated',
          'Gemini returned a response but did not return an outfit image. Please try again.'
        );
      }

    } catch (error) {

      console.log(
        '================================'
      );

      console.log(
        'GEMINI ERROR'
      );

      console.log(
        error
      );

      console.log(
        '================================'
      );


      let message =
        error?.message ||
        'Something went wrong while generating your outfit.';


      const lowerMessage =
        message.toLowerCase();


      // -------------------------------------------------
      // API KEY ERROR
      // -------------------------------------------------

      if (
        lowerMessage.includes(
          'api key'
        ) ||
        lowerMessage.includes(
          'apikey'
        ) ||
        lowerMessage.includes(
          'unauthenticated'
        ) ||
        lowerMessage.includes(
          'invalid argument'
        ) ||
        lowerMessage.includes(
          '401'
        )
      ) {

        message =
          'Your Gemini API key is invalid, expired, revoked, or does not have access to this API. Create a NEW key in Google AI Studio and replace GEMINI_API_KEY at the top of TryOutfitScreen.js.';
      }


      // -------------------------------------------------
      // PERMISSION
      // -------------------------------------------------

      else if (
        lowerMessage.includes(
          'permission'
        ) ||
        lowerMessage.includes(
          '403'
        ) ||
        lowerMessage.includes(
          'forbidden'
        )
      ) {

        message =
          'Gemini API permission was denied. Check that your API key is valid and that the Gemini API is available for your project.';
      }


      // -------------------------------------------------
      // QUOTA
      // -------------------------------------------------

      else if (
        lowerMessage.includes(
          'quota'
        ) ||
        lowerMessage.includes(
          '429'
        ) ||
        lowerMessage.includes(
          'resource exhausted'
        )
      ) {

        message =
          'Gemini API quota has been exceeded. Check your Gemini API usage or try again later.';
      }


      // -------------------------------------------------
      // MODEL
      // -------------------------------------------------

      else if (
        lowerMessage.includes(
          'model'
        ) &&
        (
          lowerMessage.includes(
            'not found'
          ) ||
          lowerMessage.includes(
            'not supported'
          )
        )
      ) {

        message =
          'The Gemini image model is not available for this API configuration.';
      }


      // -------------------------------------------------
      // NETWORK
      // -------------------------------------------------

      else if (
        lowerMessage.includes(
          'network'
        ) ||
        lowerMessage.includes(
          'fetch'
        ) ||
        lowerMessage.includes(
          'timeout'
        )
      ) {

        message =
          'Network error. Check your internet connection and try again.';
      }


      Alert.alert(
        'AI Try-On Error',
        message
      );

    } finally {

      setLoading(false);
    }
  };


  // ===================================================
  // REMOVE SELECTED ITEM
  // ===================================================

  const removeSelectedItem =
    (id) => {

      setSelectedItems(
        selectedItems.filter(
          item =>
            item.id !== id
        )
      );


      setAiResult('');

      setGeneratedImage(null);
    };


  // ===================================================
  // UI
  // ===================================================

  return (

    <View
      style={
        styles.container
      }
    >

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }

        contentContainerStyle={
          styles.scrollContent
        }
      >

        {/* HEADER */}

        <View
          style={
            styles.header
          }
        >

          <Pressable
            style={
              styles.headerBackButton
            }

            onPress={() =>
              navigation.goBack()
            }
          >

            <Text
              style={
                styles.headerBackText
              }
            >
              ←
            </Text>

          </Pressable>


          <View
            style={
              styles.headerTextContainer
            }
          >

            <Text
              style={
                styles.title
              }
            >
              Try Outfit
            </Text>


            <Text
              style={
                styles.subtitle
              }
            >
              See your complete outfit on you
              with AI.
            </Text>

          </View>

        </View>


        {/* LOGIN INFO */}

        {!loggedIn && (

          <View
            style={
              styles.loginInfoCard
            }
          >

            <Text
              style={
                styles.loginInfoIcon
              }
            >
              🔐
            </Text>


            <View
              style={
                styles.loginInfoContent
              }
            >

              <Text
                style={
                  styles.loginInfoTitle
                }
              >
                Login required
              </Text>


              <Text
                style={
                  styles.loginInfoText
                }
              >
                Login or signup to use AI
                virtual try-on.
              </Text>

            </View>

          </View>

        )}


        {/* LOGGED IN */}

        {loggedIn && (

          <View
            style={
              styles.loggedInCard
            }
          >

            <Text
              style={
                styles.loggedInIcon
              }
            >
              ✓
            </Text>


            <View
              style={
                styles.loggedInContent
              }
            >

              <Text
                style={
                  styles.loggedInTitle
                }
              >
                You're logged in
              </Text>


              <Text
                style={
                  styles.loggedInText
                }
              >
                You can now use AI virtual
                try-on.
              </Text>

            </View>

          </View>

        )}


        {/* STEP 1 */}

        <Text
          style={
            styles.sectionTitle
          }
        >
          1. Your Photo
        </Text>


        <View
          style={
            styles.photoCard
          }
        >

          {personImage ? (

            <Image
              source={{
                uri: personImage,
              }}

              style={
                styles.personImage
              }
            />

          ) : (

            <View
              style={
                styles.emptyPhoto
              }
            >

              <Text
                style={
                  styles.cameraIcon
                }
              >
                📷
              </Text>


              <Text
                style={
                  styles.emptyTitle
                }
              >
                Add Your Photo
              </Text>


              <Text
                style={
                  styles.emptyText
                }
              >
                Upload a clear full-body photo
              </Text>

            </View>

          )}

        </View>


        {/* PHOTO BUTTON */}

        <Pressable

          style={({ pressed }) => [

            styles.photoButton,

            pressed &&
              styles.pressed,
          ]}

          onPress={() =>
            requireLogin(
              choosePhoto
            )
          }
        >

          <Text
            style={
              styles.photoButtonText
            }
          >

            {personImage
              ? '📷 Change Photo'
              : '📷 Choose Photo'}

          </Text>

        </Pressable>


        {/* STEP 2 */}

        <Text
          style={
            styles.sectionTitle
          }
        >
          2. Select Your Clothes
        </Text>


        {wardrobeItems.length === 0 ? (

          <View
            style={
              styles.noItemsCard
            }
          >

            <Text
              style={
                styles.noItemsIcon
              }
            >
              👗
            </Text>


            <Text
              style={
                styles.noItemsTitle
              }
            >
              Your wardrobe is empty
            </Text>


            <Text
              style={
                styles.noItemsText
              }
            >
              Add clothes to your wardrobe
              first.
            </Text>


            <Pressable

              style={({ pressed }) => [

                styles.wardrobeButton,

                pressed &&
                  styles.pressed,
              ]}

              onPress={() =>
                requireLogin(
                  () =>
                    navigation.navigate(
                      'WardrobeScreen'
                    )
                )
              }
            >

              <Text
                style={
                  styles.wardrobeButtonText
                }
              >
                Go to Wardrobe
              </Text>

            </Pressable>

          </View>

        ) : (

          <View
            style={
              styles.wardrobeGrid
            }
          >

            {wardrobeItems.map(
              (item, index) => {

                const normalized =
                  normalizeItem(
                    item,
                    index
                  );


                const selected =
                  selectedItems.some(
                    selectedItem =>
                      selectedItem.id ===
                      normalized.id
                  );


                return (

                  <Pressable

                    key={
                      `${normalized.id}-${index}`
                    }

                    style={({ pressed }) => [

                      styles.itemCard,

                      selected &&
                        styles.selectedItem,

                      pressed &&
                        styles.pressed,
                    ]}

                    onPress={() =>
                      requireLogin(
                        () =>
                          toggleItem(
                            normalized
                          )
                      )
                    }
                  >

                    {normalized.image ? (

                      <Image

                        source={{
                          uri:
                            normalized.image,
                        }}

                        style={
                          styles.itemImage
                        }
                      />

                    ) : (

                      <View
                        style={
                          styles.noImage
                        }
                      >

                        <Text
                          style={
                            styles.noImageText
                          }
                        >
                          👗
                        </Text>

                      </View>

                    )}


                    <Text

                      style={
                        styles.itemName
                      }

                      numberOfLines={1}
                    >
                      {normalized.name}
                    </Text>


                    {selected && (

                      <View
                        style={
                          styles.checkCircle
                        }
                      >

                        <Text
                          style={
                            styles.checkText
                          }
                        >
                          ✓
                        </Text>

                      </View>

                    )}

                  </Pressable>

                );
              }
            )}

          </View>

        )}


        {/* SELECTED OUTFIT */}

        {selectedItems.length > 0 && (

          <View
            style={
              styles.selectedCard
            }
          >

            <Text
              style={
                styles.selectedTitle
              }
            >
              Selected Outfit
            </Text>


            {selectedItems.map(
              item => (

                <View
                  key={item.id}
                  style={
                    styles.selectedRow
                  }
                >

                  <Image

                    source={{
                      uri: item.image,
                    }}

                    style={
                      styles.selectedImage
                    }
                  />


                  <Text
                    style={
                      styles.selectedName
                    }
                  >
                    {item.name}
                  </Text>


                  <Pressable

                    style={
                      styles.removeButton
                    }

                    onPress={() =>
                      removeSelectedItem(
                        item.id
                      )
                    }
                  >

                    <Text
                      style={
                        styles.removeText
                      }
                    >
                      ×
                    </Text>

                  </Pressable>

                </View>

              )
            )}

          </View>

        )}


        {/* GENERATE BUTTON */}

        <Pressable

          style={({ pressed }) => [

            styles.tryButton,

            loading &&
              styles.disabledButton,

            pressed &&
              styles.pressed,
          ]}

          onPress={() =>
            requireLogin(
              tryOutfit
            )
          }

          disabled={loading}
        >

          {loading ? (

            <View
              style={
                styles.loadingRow
              }
            >

              <ActivityIndicator
                color="#ffffff"
              />


              <Text
                style={
                  styles.loadingText
                }
              >
                Creating your outfit...
              </Text>

            </View>

          ) : (

            <Text
              style={
                styles.tryButtonText
              }
            >
              ✨ Generate Complete Outfit
            </Text>

          )}

        </Pressable>


        {/* GENERATED IMAGE */}

        {generatedImage && (

          <View
            style={
              styles.generatedCard
            }
          >

            <Text
              style={
                styles.generatedTitle
              }
            >
              ✨ Your AI Outfit
            </Text>


            <Text
              style={
                styles.generatedSubtitle
              }
            >
              Here's how the selected outfit
              looks on you.
            </Text>


            <Image

              source={{
                uri: generatedImage,
              }}

              style={
                styles.generatedImage
              }
            />


            <Text
              style={
                styles.generatedNote
              }
            >
              AI-generated preview — your original
              photo has not been permanently changed.
            </Text>

          </View>

        )}


        {/* AI RECOMMENDATION */}

        {aiResult ? (

          <View
            style={
              styles.aiCard
            }
          >

            <Text
              style={
                styles.aiTitle
              }
            >
              💡 Styling Recommendation
            </Text>


            <Text
              style={
                styles.aiText
              }
            >
              {aiResult}
            </Text>

          </View>

        ) : null}


        {/* HOW IT WORKS */}

        <View
          style={
            styles.infoCard
          }
        >

          <Text
            style={
              styles.infoTitle
            }
          >
            🤖 How AI Try-On Works
          </Text>


          <Text
            style={
              styles.infoText
            }
          >
            1. Login or create your account.
          </Text>


          <Text
            style={
              styles.infoText
            }
          >
            2. Upload a clear full-body photo.
          </Text>


          <Text
            style={
              styles.infoText
            }
          >
            3. Select clothes from your wardrobe.
          </Text>


          <Text
            style={
              styles.infoText
            }
          >
            4. AI analyzes your photo and clothes.
          </Text>


          <Text
            style={
              styles.infoText
            }
          >
            5. AI generates a complete outfit
            preview on you.
          </Text>

        </View>


        {/* LOGIN / SIGNUP */}

        {!loggedIn && (

          <>

            <Pressable

              style={({ pressed }) => [

                styles.loginButton,

                pressed &&
                  styles.pressed,
              ]}

              onPress={() =>
                navigation.navigate(
                  'LoginScreen'
                )
              }
            >

              <Text
                style={
                  styles.loginButtonText
                }
              >
                🔐 Login
              </Text>

            </Pressable>


            <Pressable

              style={({ pressed }) => [

                styles.signupButton,

                pressed &&
                  styles.pressed,
              ]}

              onPress={() =>
                navigation.navigate(
                  'SignUpScreen'
                )
              }
            >

              <Text
                style={
                  styles.signupButtonText
                }
              >
                Create Account
              </Text>

            </Pressable>

          </>

        )}


        <View
          style={
            styles.bottomSpace
          }
        />

      </ScrollView>

    </View>
  );
}


// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#488eae',
  },

  scrollContent: {
    padding: 20,
    paddingTop: 45,
    paddingBottom: 70,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  headerBackButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    marginRight: 12,
  },

  headerBackText: {
    fontSize: 25,
    color: '#0d0101',
  },

  headerTextContainer: {
    flex: 1,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0d0101',
  },

  subtitle: {
    fontSize: 13,
    color: '#333333',
    marginTop: 4,
    lineHeight: 18,
  },

  loginInfoCard: {
    backgroundColor: '#ead9cc',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },

  loginInfoIcon: {
    fontSize: 28,
    marginRight: 12,
  },

  loginInfoContent: {
    flex: 1,
  },

  loginInfoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0d0101',
  },

  loginInfoText: {
    fontSize: 11,
    color: '#555555',
    marginTop: 3,
    lineHeight: 16,
  },

  loggedInCard: {
    backgroundColor: '#dff3e5',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },

  loggedInIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#1d7a46',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 30,
    fontWeight: 'bold',
    marginRight: 12,
  },

  loggedInContent: {
    flex: 1,
  },

  loggedInTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#14552f',
  },

  loggedInText: {
    fontSize: 11,
    color: '#47705a',
    marginTop: 3,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#0d0101',
    marginBottom: 12,
  },

  photoCard: {
    width: '100%',
    height: 330,
    backgroundColor: '#d9f0f8',
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: 12,
  },

  personImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  emptyPhoto: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cameraIcon: {
    fontSize: 55,
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d0101',
  },

  emptyText: {
    fontSize: 12,
    color: '#777777',
    marginTop: 5,
  },

  photoButton: {
    backgroundColor: '#022030',
    borderRadius: 15,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 25,
  },

  photoButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },

  noItemsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
  },

  noItemsIcon: {
    fontSize: 40,
  },

  noItemsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0d0101',
    marginTop: 8,
  },

  noItemsText: {
    color: '#777777',
    fontSize: 12,
    marginTop: 5,
  },

  wardrobeButton: {
    backgroundColor: '#022030',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 11,
    marginTop: 15,
  },

  wardrobeButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

  wardrobeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  itemCard: {
    width: '48%',
    backgroundColor: '#d9f0f8',
    borderRadius: 16,
    padding: 10,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: 'transparent',
  },

  selectedItem: {
    borderColor: '#022030',
  },

  itemImage: {
    width: '100%',
    height: 130,
    borderRadius: 12,
    resizeMode: 'cover',
  },

  noImage: {
    height: 130,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  noImageText: {
    fontSize: 40,
  },

  itemName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0d0101',
    marginTop: 8,
  },

  checkCircle: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: '#022030',
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

  selectedCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 18,
    marginTop: 5,
  },

  selectedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0d0101',
    marginBottom: 10,
  },

  selectedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  selectedImage: {
    width: 48,
    height: 48,
    borderRadius: 10,
    marginRight: 10,
  },

  selectedName: {
    fontSize: 14,
    color: '#333333',
    flex: 1,
  },

  removeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#eeeeee',
    justifyContent: 'center',
    alignItems: 'center',
  },

  removeText: {
    fontSize: 20,
    color: '#333333',
    lineHeight: 22,
  },

  tryButton: {
    backgroundColor: '#022030',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },

  disabledButton: {
    opacity: 0.7,
  },

  tryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  loadingText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  generatedCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 15,
    marginTop: 20,
    elevation: 4,
  },

  generatedTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#0d0101',
  },

  generatedSubtitle: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
    marginBottom: 12,
  },

  generatedImage: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 16,
    resizeMode: 'cover',
    backgroundColor: '#eeeeee',
  },

  generatedNote: {
    fontSize: 10,
    color: '#777777',
    marginTop: 10,
    lineHeight: 15,
  },

  aiCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 18,
    marginTop: 18,
    elevation: 3,
  },

  aiTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0d0101',
    marginBottom: 10,
  },

  aiText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#333333',
  },

  infoCard: {
    backgroundColor: '#ead9cc',
    borderRadius: 18,
    padding: 18,
    marginTop: 18,
  },

  infoTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0d0101',
    marginBottom: 8,
  },

  infoText: {
    fontSize: 12,
    lineHeight: 19,
    color: '#555555',
    marginBottom: 3,
  },

  loginButton: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#022030',
  },

  loginButtonText: {
    color: '#022030',
    fontSize: 15,
    fontWeight: 'bold',
  },

  signupButton: {
    backgroundColor: '#022030',
    borderRadius: 15,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },

  signupButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },

  pressed: {
    opacity: 0.65,
  },

  bottomSpace: {
    height: 30,
  },

});