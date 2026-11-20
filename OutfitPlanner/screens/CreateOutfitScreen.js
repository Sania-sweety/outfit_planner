
import React, { useState } from 'react';

import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from 'react-native';


// =====================================================
// CREATE OUTFIT SCREEN
// =====================================================

export default function CreateOutfitScreen({
  navigation,
  wardrobeItems = [],
  savedOutfits = [],
  setSavedOutfits,
}) {

  const [selectedItems, setSelectedItems] = useState([]);

  // =====================================================
  // CATEGORY HELPER
  // =====================================================

  const getCategory = (item) => {
    if (!item || !item.category) {
      return '';
    }

    return String(item.category)
      .toLowerCase()
      .trim();
  };


  // =====================================================
  // CHECK CATEGORY
  // =====================================================

  const isTop = (item) => {
    const category = getCategory(item);

    return (
      category === 'top' ||
      category === 'tops' ||
      category === 'shirt' ||
      category === 'shirts' ||
      category === 't-shirt' ||
      category === 'tshirt'
    );
  };


  const isBottom = (item) => {
    const category = getCategory(item);

    return (
      category === 'bottom' ||
      category === 'bottoms' ||
      category === 'pant' ||
      category === 'pants' ||
      category === 'jeans' ||
      category === 'skirt' ||
      category === 'skirts' ||
      category === 'trouser' ||
      category === 'trousers'
    );
  };


  const isShoe = (item) => {
    const category = getCategory(item);

    return (
      category === 'shoe' ||
      category === 'shoes' ||
      category === 'footwear' ||
      category === 'sneakers'
    );
  };


  const isAccessory = (item) => {
    const category = getCategory(item);

    return (
      category === 'accessory' ||
      category === 'accessories' ||
      category === 'bag' ||
      category === 'bags' ||
      category === 'watch' ||
      category === 'jewellery' ||
      category === 'jewelry'
    );
  };


  // =====================================================
  // SELECTED ITEMS BY CATEGORY
  // =====================================================

  const tops = selectedItems.filter(isTop);

  const bottoms = selectedItems.filter(isBottom);

  const shoes = selectedItems.filter(isShoe);

  const accessories = selectedItems.filter(isAccessory);


  // =====================================================
  // TOGGLE ITEM
  // =====================================================

  const toggleItem = (item) => {

    const alreadySelected = selectedItems.some(
      selectedItem => selectedItem.id === item.id
    );


    if (alreadySelected) {

      setSelectedItems(
        selectedItems.filter(
          selectedItem => selectedItem.id !== item.id
        )
      );

      return;
    }


    // -------------------------------------------------
    // Allow only ONE TOP
    // -------------------------------------------------

    if (isTop(item)) {

      const withoutTop = selectedItems.filter(
        selectedItem => !isTop(selectedItem)
      );

      setSelectedItems([
        ...withoutTop,
        item,
      ]);

      return;
    }


    // -------------------------------------------------
    // Allow only ONE BOTTOM
    // -------------------------------------------------

    if (isBottom(item)) {

      const withoutBottom = selectedItems.filter(
        selectedItem => !isBottom(selectedItem)
      );

      setSelectedItems([
        ...withoutBottom,
        item,
      ]);

      return;
    }


    // -------------------------------------------------
    // Allow only ONE SHOE
    // -------------------------------------------------

    if (isShoe(item)) {

      const withoutShoe = selectedItems.filter(
        selectedItem => !isShoe(selectedItem)
      );

      setSelectedItems([
        ...withoutShoe,
        item,
      ]);

      return;
    }


    // -------------------------------------------------
    // ACCESSORIES CAN BE MULTIPLE
    // -------------------------------------------------

    setSelectedItems([
      ...selectedItems,
      item,
    ]);

  };


  // =====================================================
  // CREATE OUTFIT OBJECT
  // =====================================================

  const createOutfitObject = () => {

    return {

      id: Date.now().toString(),

      items: [...selectedItems],

      createdAt: new Date().toISOString(),

      mannequin: {

        top: tops.length > 0
          ? tops[0]
          : null,

        bottom: bottoms.length > 0
          ? bottoms[0]
          : null,

        shoes: shoes.length > 0
          ? shoes[0]
          : null,

        accessories: [...accessories],

      },

    };

  };


  // =====================================================
  // CREATE OUTFIT
  // =====================================================

  const handleCreateOutfit = () => {

    if (selectedItems.length === 0) {

      Alert.alert(
        'Select Clothes',
        'Please select at least one clothing item.'
      );

      return;
    }


    if (!setSavedOutfits) {

      Alert.alert(
        'Error',
        'Saved outfit storage is not available.'
      );

      return;
    }


    const newOutfit = createOutfitObject();


    setSavedOutfits(previousOutfits => [
      ...previousOutfits,
      newOutfit,
    ]);


    Alert.alert(
      '✨ Outfit Created',
      'Your outfit has been created and saved!',
      [

        {
          text: 'View Saved Outfit',

          onPress: () => {

            navigation.navigate(
              'SavedOutfitsScreen'
            );

          },

        },

        {
          text: 'Try It On',

          onPress: () => {

            navigation.navigate(
              'TryOutfitScreen',
              {
                outfit: newOutfit,
              }
            );

          },

        },

        {
          text: 'Stay Here',

          style: 'cancel',

        },

      ]
    );

  };


  // =====================================================
  // TRY OUTFIT
  // =====================================================

  const handleTryOutfit = () => {

    if (selectedItems.length === 0) {

      Alert.alert(
        'Select Clothes',
        'Please select clothes before trying the outfit.'
      );

      return;
    }


    const outfitToTry = createOutfitObject();


    navigation.navigate(
      'TryOutfitScreen',
      {
        outfit: outfitToTry,
      }
    );

  };


  // =====================================================
  // SAVE OUTFIT
  // =====================================================

  const handleSaveOutfit = () => {

    if (selectedItems.length === 0) {

      Alert.alert(
        'Select Clothes',
        'Please select clothes first.'
      );

      return;
    }


    if (!setSavedOutfits) {

      Alert.alert(
        'Error',
        'Saved outfit storage is not available.'
      );

      return;
    }


    const savedOutfit = createOutfitObject();


    setSavedOutfits(previousOutfits => [
      ...previousOutfits,
      savedOutfit,
    ]);


    Alert.alert(
      '❤️ Outfit Saved',
      'Your outfit has been saved successfully.',
      [

        {
          text: 'View Saved Outfits',

          onPress: () => {

            navigation.navigate(
              'SavedOutfitsScreen'
            );

          },

        },

        {
          text: 'OK',

          style: 'cancel',

        },

      ]
    );

  };


  // =====================================================
  // GO TO WARDROBE
  // =====================================================

  const goToWardrobe = () => {

    navigation.navigate(
      'WardrobeScreen'
    );

  };


  // =====================================================
  // CLOTHING IMAGE COMPONENT
  // =====================================================

  const ClothingImage = ({
    item,
    style,
  }) => {

    if (item && item.image) {

      return (
        <Image
          source={{ uri: item.image }}
          style={style}
          resizeMode="contain"
        />
      );

    }


    return (
      <View
        style={[
          style,
          styles.imagePlaceholder,
        ]}
      >

        <Text style={styles.placeholderEmoji}>
          👗
        </Text>

      </View>
    );

  };


  // =====================================================
  // MANNEQUIN PREVIEW
  // =====================================================

  const MannequinPreview = () => {

    return (

      <View style={styles.mannequinCard}>

        {/* TITLE */}

        <Text style={styles.mannequinTitle}>
          👗 Your Outfit Mannequin
        </Text>

        <Text style={styles.mannequinSubtitle}>
          Preview of your selected outfit
        </Text>


        {/* MANNEQUIN AREA */}

        <View style={styles.mannequinArea}>


          {/* HEAD */}

          <View style={styles.head}>

            <Text style={styles.headEmoji}>
              🙂
            </Text>

          </View>


          {/* NECK */}

          <View style={styles.neck} />


          {/* TOP */}

          <View style={styles.topArea}>

            {tops.length > 0 ? (

              <ClothingImage
                item={tops[0]}
                style={styles.topImage}
              />

            ) : (

              <View style={styles.emptyClothing}>

                <Text style={styles.emptyClothingEmoji}>
                  👕
                </Text>

                <Text style={styles.emptyClothingText}>
                  Select a top
                </Text>

              </View>

            )}

          </View>


          {/* BOTTOM */}

          <View style={styles.bottomArea}>

            {bottoms.length > 0 ? (

              <ClothingImage
                item={bottoms[0]}
                style={styles.bottomImage}
              />

            ) : (

              <View style={styles.emptyClothing}>

                <Text style={styles.emptyClothingEmoji}>
                  👖
                </Text>

                <Text style={styles.emptyClothingText}>
                  Select a bottom
                </Text>

              </View>

            )}

          </View>


          {/* SHOES */}

          <View style={styles.shoeArea}>

            {shoes.length > 0 ? (

              <ClothingImage
                item={shoes[0]}
                style={styles.shoeImage}
              />

            ) : (

              <Text style={styles.defaultShoe}>
                👟
              </Text>

            )}

          </View>


          {/* ACCESSORIES */}

          {accessories.length > 0 && (

            <View style={styles.accessoriesPreview}>

              {accessories.map(item => (

                <View
                  key={item.id}
                  style={styles.accessoryBubble}
                >

                  {item.image ? (

                    <Image
                      source={{ uri: item.image }}
                      style={styles.accessoryImage}
                      resizeMode="contain"
                    />

                  ) : (

                    <Text style={styles.accessoryEmoji}>
                      👜
                    </Text>

                  )}

                </View>

              ))}

            </View>

          )}

        </View>


        {/* =================================================
            OUTFIT DETAILS
        ================================================= */}

        <View style={styles.detailsCard}>

          <Text style={styles.detailsTitle}>
            Outfit Details
          </Text>


          <Text style={styles.detailText}>
            👕 Top:{' '}
            {tops.length > 0
              ? tops[0].name || 'Selected Top'
              : 'Not selected'}
          </Text>


          <Text style={styles.detailText}>
            👖 Bottom:{' '}
            {bottoms.length > 0
              ? bottoms[0].name || 'Selected Bottom'
              : 'Not selected'}
          </Text>


          <Text style={styles.detailText}>
            👟 Shoes:{' '}
            {shoes.length > 0
              ? shoes[0].name || 'Selected Shoes'
              : 'Not selected'}
          </Text>


          <Text style={styles.detailText}>
            👜 Accessories:{' '}
            {accessories.length}
          </Text>

        </View>


        {/* TRY BUTTON */}

        <Pressable
          style={styles.mannequinTryButton}
          onPress={handleTryOutfit}
        >

          <Text style={styles.mannequinTryText}>
            👤 Try This Outfit On Me
          </Text>

        </Pressable>

      </View>

    );

  };


  // =====================================================
  // SCREEN
  // =====================================================

  return (

    <View style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >


        {/* =================================================
            HEADER
        ================================================= */}

        <View style={styles.header}>

          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >

            <Text style={styles.backText}>
              ←
            </Text>

          </Pressable>


          <View style={styles.headerContent}>

            <Text style={styles.title}>
              Create Outfit
            </Text>

            <Text style={styles.subtitle}>
              Choose clothes from your wardrobe
            </Text>

          </View>

        </View>


        {/* =================================================
            MANNEQUIN
        ================================================= */}

        <MannequinPreview />


        {/* =================================================
            OUTFIT PREVIEW
        ================================================= */}

        <View style={styles.previewCard}>

          <Text style={styles.previewTitle}>
            Outfit Preview
          </Text>

          <Text style={styles.previewSubtitle}>
            Your selected clothing items
          </Text>


          <View style={styles.previewArea}>


            {/* TOP */}

            <View style={styles.previewSection}>

              {tops.length > 0 ? (

                <ClothingImage
                  item={tops[0]}
                  style={styles.previewImage}
                />

              ) : (

                <View style={styles.placeholderBox}>

                  <Text style={styles.placeholderIcon}>
                    👕
                  </Text>

                </View>

              )}

              <Text style={styles.previewLabel}>
                Top
              </Text>

            </View>


            {/* BOTTOM */}

            <View style={styles.previewSection}>

              {bottoms.length > 0 ? (

                <ClothingImage
                  item={bottoms[0]}
                  style={styles.previewImage}
                />

              ) : (

                <View style={styles.placeholderBox}>

                  <Text style={styles.placeholderIcon}>
                    👖
                  </Text>

                </View>

              )}

              <Text style={styles.previewLabel}>
                Bottom
              </Text>

            </View>


            {/* SHOES */}

            <View style={styles.previewSection}>

              {shoes.length > 0 ? (

                <ClothingImage
                  item={shoes[0]}
                  style={styles.previewImage}
                />

              ) : (

                <View style={styles.placeholderBox}>

                  <Text style={styles.placeholderIcon}>
                    👟
                  </Text>

                </View>

              )}

              <Text style={styles.previewLabel}>
                Shoes
              </Text>

            </View>

          </View>


          <View style={styles.previewCountBox}>

            <Text style={styles.previewCountText}>

              {selectedItems.length === 0
                ? 'No clothes selected'
                : `${selectedItems.length} item${
                    selectedItems.length > 1
                      ? 's'
                      : ''
                  } selected`
              }

            </Text>

          </View>

        </View>


        {/* =================================================
            SELECT CLOTHES
        ================================================= */}

        <Text style={styles.sectionTitle}>
          Select Your Clothes
        </Text>


        {wardrobeItems.length === 0 ? (

          <View style={styles.emptyCard}>

            <Text style={styles.emptyIcon}>
              👗
            </Text>

            <Text style={styles.emptyTitle}>
              Your wardrobe is empty
            </Text>

            <Text style={styles.emptyText}>
              Add clothes to your wardrobe first.
            </Text>


            <Pressable
              style={styles.wardrobeButton}
              onPress={goToWardrobe}
            >

              <Text style={styles.wardrobeButtonText}>
                Go to Wardrobe
              </Text>

            </Pressable>

          </View>

        ) : (

          <View style={styles.wardrobeGrid}>

            {wardrobeItems.map(item => {

              const selected =
                selectedItems.some(
                  selectedItem =>
                    selectedItem.id === item.id
                );


              return (

                <Pressable
                  key={item.id}
                  style={[
                    styles.itemCard,
                    selected &&
                      styles.selectedItem,
                  ]}
                  onPress={() =>
                    toggleItem(item)
                  }
                >


                  {item.image ? (

                    <Image
                      source={{
                        uri: item.image,
                      }}
                      style={styles.itemImage}
                      resizeMode="cover"
                    />

                  ) : (

                    <View style={styles.noImage}>

                      <Text style={styles.noImageText}>
                        👗
                      </Text>

                    </View>

                  )}


                  <Text
                    style={styles.itemName}
                    numberOfLines={1}
                  >
                    {item.name || 'Clothing'}
                  </Text>


                  <Text style={styles.itemCategory}>
                    {item.category || 'Clothing'}
                  </Text>


                  {selected && (

                    <View style={styles.checkCircle}>

                      <Text style={styles.checkText}>
                        ✓
                      </Text>

                    </View>

                  )}

                </Pressable>

              );

            })}

          </View>

        )}


        {/* =================================================
            SELECTED ITEMS
        ================================================= */}

        {selectedItems.length > 0 && (

          <View style={styles.selectedCard}>

            <Text style={styles.selectedTitle}>
              Selected Outfit
            </Text>

            <Text style={styles.selectedCount}>
              {selectedItems.length} item
              {selectedItems.length > 1
                ? 's'
                : ''}{' '}
              selected
            </Text>


            {selectedItems.map(item => (

              <View
                key={item.id}
                style={styles.selectedRow}
              >


                {item.image ? (

                  <Image
                    source={{
                      uri: item.image,
                    }}
                    style={styles.selectedSmallImage}
                    resizeMode="cover"
                  />

                ) : (

                  <View
                    style={[
                      styles.selectedSmallImage,
                      styles.selectedPlaceholder,
                    ]}
                  >

                    <Text>
                      👗
                    </Text>

                  </View>

                )}


                <View style={styles.selectedInfo}>

                  <Text
                    style={styles.selectedName}
                    numberOfLines={1}
                  >
                    {item.name || 'Clothing'}
                  </Text>

                  <Text style={styles.selectedCategory}>
                    {item.category || 'Clothing'}
                  </Text>

                </View>


                <Pressable
                  style={styles.removeButton}
                  onPress={() =>
                    toggleItem(item)
                  }
                >

                  <Text style={styles.removeText}>
                    ×
                  </Text>

                </Pressable>

              </View>

            ))}

          </View>

        )}


        {/* =================================================
            CREATE OUTFIT
        ================================================= */}

        <Pressable
          style={[
            styles.createButton,
            selectedItems.length === 0 &&
              styles.disabledButton,
          ]}
          onPress={handleCreateOutfit}
        >

          <Text style={styles.createButtonText}>
            ✨ Create Outfit
          </Text>

        </Pressable>


        {/* =================================================
            TRY ON
        ================================================= */}

        {selectedItems.length > 0 && (

          <Pressable
            style={styles.tryOnButton}
            onPress={handleTryOutfit}
          >

            <Text style={styles.tryOnButtonText}>
              👗 Try This Outfit On Me
            </Text>

          </Pressable>

        )}


        {/* =================================================
            SAVE
        ================================================= */}

        <Pressable
          style={[
            styles.saveButton,
            selectedItems.length === 0 &&
              styles.disabledSaveButton,
          ]}
          onPress={handleSaveOutfit}
        >

          <Text style={styles.saveButtonText}>
            ❤️ Save Outfit
          </Text>

        </Pressable>


        {/* =================================================
            BACK TO WARDROBE
        ================================================= */}

        <Pressable
          style={styles.bottomButton}
          onPress={() =>
            navigation.navigate(
              'WardrobeScreen'
            )
          }
        >

          <Text style={styles.bottomButtonText}>
            ← Back to Wardrobe
          </Text>

        </Pressable>


        {/* =================================================
            BACK TO HOME
        ================================================= */}

        <Pressable
          style={styles.bottomButton}
          onPress={() =>
            navigation.navigate(
              'HomeScreen'
            )
          }
        >

          <Text style={styles.bottomButtonText}>
            ← Back to Home
          </Text>

        </Pressable>


      </ScrollView>

    </View>

  );

}


// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({

  // =====================================================
  // MAIN
  // =====================================================

  container: {
    flex: 1,
    backgroundColor: '#488eae',
  },

  scrollContent: {
    padding: 20,
    paddingTop: 55,
    paddingBottom: 60,
  },


  // =====================================================
  // HEADER
  // =====================================================

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },

  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    elevation: 4,
  },

  backText: {
    fontSize: 29,
    color: '#111',
  },

  headerContent: {
    flex: 1,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#080808',
  },

  subtitle: {
    fontSize: 13,
    color: '#444',
    marginTop: 4,
  },


  // =====================================================
  // MANNEQUIN CARD
  // =====================================================

  mannequinCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 18,
    marginBottom: 22,
    elevation: 5,
  },

  mannequinTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#080808',
  },

  mannequinSubtitle: {
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 18,
  },


  // =====================================================
  // MANNEQUIN AREA
  // =====================================================

  mannequinArea: {
    backgroundColor: '#f6f6f6',
    borderRadius: 20,
    minHeight: 470,
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 20,
    overflow: 'hidden',
  },


  // =====================================================
  // HEAD
  // =====================================================

  head: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#ead9cc',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headEmoji: {
    fontSize: 45,
  },

  neck: {
    width: 25,
    height: 22,
    backgroundColor: '#ead9cc',
  },


  // =====================================================
  // TOP
  // =====================================================

  topArea: {
    width: 165,
    height: 145,
    backgroundColor: '#e8e8e8',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  topImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#eee',
  },


  // =====================================================
  // BOTTOM
  // =====================================================

  bottomArea: {
    width: 145,
    height: 160,
    backgroundColor: '#dedede',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#eee',
  },


  // =====================================================
  // SHOES
  // =====================================================

  shoeArea: {
    width: 110,
    height: 50,
    marginTop: 8,
    borderRadius: 25,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  shoeImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#222',
  },

  defaultShoe: {
    fontSize: 30,
  },


  // =====================================================
  // EMPTY CLOTHING
  // =====================================================

  emptyClothing: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyClothingEmoji: {
    fontSize: 38,
  },

  emptyClothingText: {
    fontSize: 11,
    color: '#888',
    marginTop: 5,
  },


  // =====================================================
  // ACCESSORIES
  // =====================================================

  accessoriesPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 12,
    gap: 8,
  },

  accessoryBubble: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    overflow: 'hidden',
  },

  accessoryImage: {
    width: 45,
    height: 45,
  },

  accessoryEmoji: {
    fontSize: 25,
  },


  // =====================================================
  // IMAGE PLACEHOLDER
  // =====================================================

  imagePlaceholder: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },

  placeholderEmoji: {
    fontSize: 35,
  },


  // =====================================================
  // DETAILS
  // =====================================================

  detailsCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    padding: 15,
    marginTop: 15,
  },

  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#111',
  },

  detailText: {
    fontSize: 13,
    color: '#555',
    marginBottom: 7,
  },


  // =====================================================
  // MANNEQUIN TRY
  // =====================================================

  mannequinTryButton: {
    backgroundColor: '#022030',
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 15,
  },

  mannequinTryText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },


  // =====================================================
  // PREVIEW CARD
  // =====================================================

  previewCard: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 18,
    marginBottom: 22,
    elevation: 3,
  },

  previewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },

  previewSubtitle: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
    marginBottom: 18,
  },

  previewArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  previewSection: {
    width: '31%',
    alignItems: 'center',
  },

  previewImage: {
    width: '100%',
    height: 125,
    borderRadius: 14,
    backgroundColor: '#eee',
  },

  placeholderBox: {
    width: '100%',
    height: 125,
    borderRadius: 14,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  placeholderIcon: {
    fontSize: 35,
  },

  previewLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 7,
  },

  previewCountBox: {
    backgroundColor: '#f3f3f3',
    borderRadius: 12,
    padding: 10,
    marginTop: 18,
    alignItems: 'center',
  },

  previewCountText: {
    fontSize: 12,
    color: '#555',
    fontWeight: '600',
  },


  // =====================================================
  // SECTION
  // =====================================================

  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#080808',
  },


  // =====================================================
  // EMPTY WARDROBE
  // =====================================================

  emptyCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
  },

  emptyIcon: {
    fontSize: 50,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 10,
  },

  emptyText: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },

  wardrobeButton: {
    backgroundColor: '#022030',
    borderRadius: 14,
    paddingVertical: 13,
    paddingHorizontal: 22,
    marginTop: 16,
  },

  wardrobeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },


  // =====================================================
  // WARDROBE GRID
  // =====================================================

  wardrobeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  itemCard: {
    width: '48%',
    backgroundColor: '#d9f0f8',
    borderRadius: 17,
    padding: 10,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: 'transparent',
    elevation: 2,
  },

  selectedItem: {
    borderColor: '#022030',
    borderWidth: 3,
  },

  itemImage: {
    width: '100%',
    height: 135,
    borderRadius: 12,
    backgroundColor: '#fff',
  },

  noImage: {
    width: '100%',
    height: 135,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  noImageText: {
    fontSize: 42,
  },

  itemName: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 8,
  },

  itemCategory: {
    fontSize: 11,
    color: '#666',
    marginTop: 3,
  },

  checkCircle: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#022030',
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },


  // =====================================================
  // SELECTED ITEMS
  // =====================================================

  selectedCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginTop: 5,
  },

  selectedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  selectedCount: {
    fontSize: 11,
    color: '#777',
    marginTop: 3,
    marginBottom: 12,
  },

  selectedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  selectedSmallImage: {
    width: 50,
    height: 50,
    borderRadius: 9,
    marginRight: 10,
    backgroundColor: '#eee',
  },

  selectedPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedInfo: {
    flex: 1,
  },

  selectedName: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  selectedCategory: {
    fontSize: 11,
    color: '#777',
    marginTop: 3,
  },

  removeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },

  removeText: {
    fontSize: 22,
  },


  // =====================================================
  // BUTTONS
  // =====================================================

  createButton: {
    backgroundColor: '#022030',
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: 'center',
    marginTop: 22,
  },

  disabledButton: {
    opacity: 0.5,
  },

  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  tryOnButton: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 2,
    borderColor: '#022030',
  },

  tryOnButtonText: {
    color: '#022030',
    fontSize: 15,
    fontWeight: 'bold',
  },

  saveButton: {
    backgroundColor: '#ead9cc',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
  },

  disabledSaveButton: {
    opacity: 0.5,
  },

  saveButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  bottomButton: {
    alignItems: 'center',
    paddingVertical: 15,
  },

  bottomButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111',
  },

});