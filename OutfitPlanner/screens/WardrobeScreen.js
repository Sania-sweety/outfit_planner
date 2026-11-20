
import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  Alert,
  Modal,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

export default function WardrobeScreen({
  navigation,
  wardrobeItems = [],
  setWardrobeItems,
  isLoggedIn = false,
}) {

  // =====================================================
  // SELECTED CATEGORY FOR FILTER
  // =====================================================

  const [selectedCategory, setSelectedCategory] = useState('All');


  // =====================================================
  // CATEGORY MODAL
  // =====================================================

  const [showCategoryModal, setShowCategoryModal] = useState(false);


  // =====================================================
  // TEMPORARY IMAGE
  // =====================================================

  const [selectedImage, setSelectedImage] = useState(null);


  // =====================================================
  // CATEGORIES
  // =====================================================

  const categories = [
    'All',
    'Tops',
    'Bottoms',
    'Shoes',
    'Accessories',
  ];


  // =====================================================
  // OPEN CATEGORY SELECTION
  // =====================================================

  const openCategorySelection = (imageUri) => {

    setSelectedImage(imageUri);

    setShowCategoryModal(true);
  };


  // =====================================================
  // GALLERY
  // =====================================================

  const openGallery = async () => {

    try {

      // Request gallery permission
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();


      if (!permission.granted) {

        Alert.alert(
          'Permission Required',
          'Please allow gallery permission to choose a photo.'
        );

        return;
      }


      // Open gallery
      const result =
        await ImagePicker.launchImageLibraryAsync({

          // Use images only
          mediaTypes: ['images'],

          allowsEditing: true,

          aspect: [3, 4],

          quality: 1,
        });


      // Check if image was selected
      if (
        !result.canceled &&
        result.assets &&
        result.assets.length > 0
      ) {

        const imageUri = result.assets[0].uri;

        // Show category selection
        openCategorySelection(imageUri);
      }

    } catch (error) {

      console.log('Gallery Error:', error);

      Alert.alert(
        'Gallery Error',
        'Unable to open the gallery.'
      );
    }
  };


  // =====================================================
  // CAMERA
  // =====================================================

  const openCamera = async () => {

    try {

      // Request camera permission
      const permission =
        await ImagePicker.requestCameraPermissionsAsync();


      if (!permission.granted) {

        Alert.alert(
          'Permission Required',
          'Please allow camera permission to take a photo.'
        );

        return;
      }


      // Open camera
      const result =
        await ImagePicker.launchCameraAsync({

          allowsEditing: true,

          aspect: [3, 4],

          quality: 1,
        });


      // Check if photo was taken
      if (
        !result.canceled &&
        result.assets &&
        result.assets.length > 0
      ) {

        const imageUri = result.assets[0].uri;

        // Show category selection
        openCategorySelection(imageUri);
      }

    } catch (error) {

      console.log('Camera Error:', error);

      Alert.alert(
        'Camera Error',
        'Unable to open the camera.'
      );
    }
  };


  // =====================================================
  // SAVE CLOTHING ITEM
  // =====================================================

  const saveClothingItem = (category) => {

    if (!selectedImage) {

      Alert.alert(
        'Error',
        'No image was selected.'
      );

      return;
    }


    // Make sure shared wardrobe state exists
    if (!setWardrobeItems) {

      Alert.alert(
        'Error',
        'Wardrobe storage is not available.'
      );

      return;
    }


    // Create new wardrobe item
    const newItem = {

      id: Date.now().toString(),

      image: selectedImage,

      name: category,

      category: category,
    };


    // Add item to shared wardrobe
    setWardrobeItems((previousItems) => [

      ...previousItems,

      newItem,

    ]);


    // Close modal
    setShowCategoryModal(false);

    setSelectedImage(null);


    // Success message
    Alert.alert(
      'Added to Wardrobe',
      `${category} has been added to your wardrobe.`
    );
  };


  // =====================================================
  // FILTER CLOTHES
  // =====================================================

  const filteredItems =
    selectedCategory === 'All'
      ? wardrobeItems
      : wardrobeItems.filter(
          (item) =>
            item.category === selectedCategory
        );


  // =====================================================
  // SCREEN
  // =====================================================

  return (

    <View style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >

          <Text style={styles.backText}>
            ← Back
          </Text>

        </Pressable>


        {/* =================================================
            HEADER
        ================================================= */}

        <Text style={styles.title}>
          My Wardrobe
        </Text>

        <Text style={styles.subtitle}>
          Add and manage your clothes
        </Text>


        {/* =================================================
            ADD CLOTHES
        ================================================= */}

        <View style={styles.addRow}>

          {/* =================================================
              GALLERY
          ================================================= */}

          <Pressable
            style={({ pressed }) => [
              styles.addCard,
              pressed && styles.pressed,
            ]}
            onPress={openGallery}
          >

            <View style={styles.addIconCircle}>

              <Text style={styles.addIcon}>
                🖼️
              </Text>

            </View>

            <Text style={styles.addTitle}>
              Gallery
            </Text>

            <Text style={styles.addDescription}>
              Choose a photo
            </Text>

          </Pressable>


          {/* =================================================
              CAMERA
          ================================================= */}

          <Pressable
            style={({ pressed }) => [
              styles.addCard,
              pressed && styles.pressed,
            ]}
            onPress={openCamera}
          >

            <View style={styles.addIconCircle}>

              <Text style={styles.addIcon}>
                📷
              </Text>

            </View>

            <Text style={styles.addTitle}>
              Camera
            </Text>

            <Text style={styles.addDescription}>
              Take a photo
            </Text>

          </Pressable>

        </View>


        {/* =================================================
            CATEGORY FILTER
        ================================================= */}

        <Text style={styles.sectionTitle}>
          Categories
        </Text>


        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >

          {categories.map((category) => (

            <Pressable
              key={category}
              style={[
                styles.categoryButton,

                selectedCategory === category &&
                  styles.selectedCategory,
              ]}
              onPress={() =>
                setSelectedCategory(category)
              }
            >

              <Text
                style={[
                  styles.categoryText,

                  selectedCategory === category &&
                    styles.selectedCategoryText,
                ]}
              >
                {category}
              </Text>

            </Pressable>

          ))}

        </ScrollView>


        {/* =================================================
            YOUR CLOTHES
        ================================================= */}

        <Text style={styles.sectionTitle}>
          Your Clothes
        </Text>


        {filteredItems.length === 0 ? (

          <View style={styles.emptyCard}>

            <Text style={styles.emptyIcon}>
              👗
            </Text>

            <Text style={styles.emptyTitle}>
              No clothes added yet
            </Text>

            <Text style={styles.emptyText}>
              Add clothes from your Gallery or Camera.
            </Text>

          </View>

        ) : (

          <View style={styles.clothesGrid}>

            {filteredItems.map((item) => (

              <View
                key={item.id}
                style={styles.clothingCard}
              >

                {/* IMAGE */}

                {item.image ? (

                  <Image
                    source={{
                      uri: item.image,
                    }}
                    style={styles.clothingImage}
                  />

                ) : (

                  <View style={styles.noImage}>

                    <Text style={styles.noImageText}>
                      👗
                    </Text>

                  </View>

                )}


                {/* NAME */}

                <Text
                  style={styles.clothingName}
                  numberOfLines={1}
                >
                  {item.name || 'Clothing'}
                </Text>


                {/* CATEGORY */}

                <Text style={styles.clothingCategory}>
                  {item.category || 'Clothing'}
                </Text>

              </View>

            ))}

          </View>

        )}


        {/* =================================================
            CREATE OUTFIT
        ================================================= */}

        <Pressable
          style={({ pressed }) => [
            styles.createButton,
            pressed && styles.pressed,
          ]}
          onPress={() => {

            // IMPORTANT:
            // This name MUST match App.js

            navigation.navigate('CreateOutfitScreen');

          }}
        >

          <Text style={styles.createButtonText}>
            ✨ Create Outfit
          </Text>

        </Pressable>


        {/* =================================================
            BACK TO HOME
        ================================================= */}

        <Pressable
          style={styles.homeButton}
          onPress={() =>
            navigation.navigate('HomeScreen')
          }
        >

          <Text style={styles.homeButtonText}>
            ← Back to Home
          </Text>

        </Pressable>

      </ScrollView>


      {/* ===================================================
          CATEGORY MODAL
      =================================================== */}

      <Modal
        visible={showCategoryModal}
        transparent={true}
        animationType="slide"

        onRequestClose={() => {

          setShowCategoryModal(false);

          setSelectedImage(null);

        }}
      >

        <View style={styles.modalBackground}>

          <View style={styles.modalCard}>

            {/* MODAL TITLE */}

            <Text style={styles.modalTitle}>
              Choose Category
            </Text>

            <Text style={styles.modalSubtitle}>
              What type of clothing is this?
            </Text>


            {/* IMAGE PREVIEW */}

            {selectedImage && (

              <Image
                source={{
                  uri: selectedImage,
                }}
                style={styles.modalImage}
              />

            )}


            {/* TOPS */}

            <Pressable
              style={styles.modalCategoryButton}
              onPress={() =>
                saveClothingItem('Tops')
              }
            >

              <Text style={styles.modalCategoryText}>
                👚 Tops
              </Text>

            </Pressable>


            {/* BOTTOMS */}

            <Pressable
              style={styles.modalCategoryButton}
              onPress={() =>
                saveClothingItem('Bottoms')
              }
            >

              <Text style={styles.modalCategoryText}>
                👖 Bottoms
              </Text>

            </Pressable>


            {/* SHOES */}

            <Pressable
              style={styles.modalCategoryButton}
              onPress={() =>
                saveClothingItem('Shoes')
              }
            >

              <Text style={styles.modalCategoryText}>
                👟 Shoes
              </Text>

            </Pressable>


            {/* ACCESSORIES */}

            <Pressable
              style={styles.modalCategoryButton}
              onPress={() =>
                saveClothingItem('Accessories')
              }
            >

              <Text style={styles.modalCategoryText}>
                👜 Accessories
              </Text>

            </Pressable>


            {/* CANCEL */}

            <Pressable
              style={styles.cancelButton}
              onPress={() => {

                setShowCategoryModal(false);

                setSelectedImage(null);

              }}
            >

              <Text style={styles.cancelText}>
                Cancel
              </Text>

            </Pressable>

          </View>

        </View>

      </Modal>

    </View>
  );
}


// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f8f3f0',
  },


  content: {
    padding: 20,
    paddingTop: 45,
    paddingBottom: 40,
  },


  // ===================================================
  // BACK
  // ===================================================

  backButton: {
    marginBottom: 15,
  },


  backText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0d0101',
  },


  // ===================================================
  // HEADER
  // ===================================================

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0d0101',
  },


  subtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
    marginBottom: 25,
  },


  // ===================================================
  // ADD CARDS
  // ===================================================

  addRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },


  addCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    elevation: 2,
  },


  pressed: {
    opacity: 0.7,
  },


  addIconCircle: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: '#f3e9e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },


  addIcon: {
    fontSize: 25,
  },


  addTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0d0101',
  },


  addDescription: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },


  // ===================================================
  // SECTION
  // ===================================================

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0d0101',
    marginTop: 28,
    marginBottom: 15,
  },


  // ===================================================
  // CATEGORY
  // ===================================================

  categoryScroll: {
    marginBottom: 5,
  },


  categoryButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginRight: 10,
  },


  selectedCategory: {
    backgroundColor: '#0d0101',
  },


  categoryText: {
    fontSize: 13,
    color: '#555',
    fontWeight: '600',
  },


  selectedCategoryText: {
    color: '#ffffff',
  },


  // ===================================================
  // EMPTY
  // ===================================================

  emptyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
  },


  emptyIcon: {
    fontSize: 50,
  },


  emptyTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0d0101',
  },


  emptyText: {
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
    marginTop: 8,
  },


  // ===================================================
  // CLOTHES GRID
  // ===================================================

  clothesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },


  clothingCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 10,
    marginBottom: 15,
    elevation: 2,
  },


  clothingImage: {
    width: '100%',
    height: 150,
    borderRadius: 14,
    backgroundColor: '#f3f3f3',
    resizeMode: 'cover',
  },


  noImage: {
    width: '100%',
    height: 150,
    borderRadius: 14,
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
    alignItems: 'center',
  },


  noImageText: {
    fontSize: 42,
  },


  clothingName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0d0101',
    marginTop: 8,
  },


  clothingCategory: {
    fontSize: 12,
    color: '#777',
    marginTop: 3,
  },


  // ===================================================
  // CREATE OUTFIT
  // ===================================================

  createButton: {
    backgroundColor: '#0d0101',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 15,
  },


  createButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },


  // ===================================================
  // HOME
  // ===================================================

  homeButton: {
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 10,
  },


  homeButtonText: {
    color: '#0d0101',
    fontSize: 15,
    fontWeight: 'bold',
  },


  // ===================================================
  // MODAL
  // ===================================================

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },


  modalCard: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    paddingBottom: 35,
  },


  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0d0101',
    textAlign: 'center',
  },


  modalSubtitle: {
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 15,
  },


  modalImage: {
    width: 110,
    height: 130,
    borderRadius: 15,
    alignSelf: 'center',
    marginBottom: 18,
    resizeMode: 'cover',
  },


  modalCategoryButton: {
    backgroundColor: '#f3e9e2',
    paddingVertical: 14,
    borderRadius: 15,
    marginBottom: 10,
    alignItems: 'center',
  },


  modalCategoryText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0d0101',
  },


  cancelButton: {
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 5,
  },


  cancelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#777',
  },

});