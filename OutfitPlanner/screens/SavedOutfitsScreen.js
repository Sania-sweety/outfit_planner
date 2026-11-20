// import React, { useState } from 'react';

// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
// } from 'react-native';


// export default function SavedOutfitsScreen({ navigation }) {

//   // =====================================================
//   // SAVED OUTFITS
//   // =====================================================

//   const [savedOutfits, setSavedOutfits] = useState([
//     {
//       id: '1',
//       name: 'Casual College Outfit',
//       top: 'T-Shirt',
//       bottom: 'Jeans',
//       shoes: 'Sneakers',
//       accessory: 'Handbag',
//     },

//     {
//       id: '2',
//       name: 'Formal Outfit',
//       top: 'Shirt',
//       bottom: 'Trousers',
//       shoes: 'Formal Shoes',
//       accessory: 'Watch',
//     },
//   ]);


//   // =====================================================
//   // DELETE OUTFIT
//   // =====================================================

//   const deleteOutfit = (id) => {

//     Alert.alert(
//       'Delete Outfit',
//       'Are you sure you want to delete this outfit?',

//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },

//         {
//           text: 'Delete',
//           style: 'destructive',

//           onPress: () => {

//             setSavedOutfits((currentOutfits) =>
//               currentOutfits.filter(
//                 (outfit) => outfit.id !== id
//               )
//             );

//           },
//         },
//       ]
//     );
//   };


//   return (

//     <View style={styles.container}>

//       {/* =================================================
//           HEADER
//       ================================================= */}

//       <View style={styles.header}>

//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//           activeOpacity={0.8}
//         >

//           <Text style={styles.backText}>
//             ←
//           </Text>

//         </TouchableOpacity>


//         <Text style={styles.headerTitle}>
//           Saved Outfits
//         </Text>


//         <View style={styles.headerSpace} />

//       </View>


//       {/* =================================================
//           CONTENT
//       ================================================= */}

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.content}
//       >

//         <Text style={styles.subtitle}>
//           Your favorite outfit combinations
//         </Text>


//         {/* =================================================
//             EMPTY STATE
//         ================================================= */}

//         {savedOutfits.length === 0 ? (

//           <View style={styles.emptyContainer}>

//             <Text style={styles.emptyTitle}>
//               No Saved Outfits
//             </Text>

//             <Text style={styles.emptyText}>
//               Create an outfit and save it here.
//             </Text>


//             <TouchableOpacity
//               style={styles.createButton}
//               onPress={() =>
//                 navigation.navigate('CreateOutfitScreen')
//               }
//               activeOpacity={0.8}
//             >

//               <Text style={styles.createButtonText}>
//                 Create Outfit
//               </Text>

//             </TouchableOpacity>

//           </View>

//         ) : (

//           savedOutfits.map((outfit) => (

//             <View
//               key={outfit.id}
//               style={styles.outfitCard}
//             >

//               {/* =================================================
//                   OUTFIT NAME
//               ================================================= */}

//               <Text style={styles.outfitName}>
//                 {outfit.name}
//               </Text>


//               {/* =================================================
//                   CLOTHES
//               ================================================= */}

//               <View style={styles.clothesContainer}>

//                 <View style={styles.clothingItem}>

//                   <Text style={styles.categoryLabel}>
//                     TOP
//                   </Text>

//                   <Text style={styles.clothingName}>
//                     {outfit.top}
//                   </Text>

//                 </View>


//                 <View style={styles.clothingItem}>

//                   <Text style={styles.categoryLabel}>
//                     BOTTOM
//                   </Text>

//                   <Text style={styles.clothingName}>
//                     {outfit.bottom}
//                   </Text>

//                 </View>


//                 <View style={styles.clothingItem}>

//                   <Text style={styles.categoryLabel}>
//                     SHOES
//                   </Text>

//                   <Text style={styles.clothingName}>
//                     {outfit.shoes}
//                   </Text>

//                 </View>


//                 <View style={styles.clothingItem}>

//                   <Text style={styles.categoryLabel}>
//                     ACCESSORY
//                   </Text>

//                   <Text style={styles.clothingName}>
//                     {outfit.accessory}
//                   </Text>

//                 </View>

//               </View>


//               {/* =================================================
//                   DELETE BUTTON
//               ================================================= */}

//               <TouchableOpacity
//                 style={styles.deleteButton}
//                 onPress={() =>
//                   deleteOutfit(outfit.id)
//                 }
//                 activeOpacity={0.8}
//               >

//                 <Text style={styles.deleteText}>
//                   Delete Outfit
//                 </Text>

//               </TouchableOpacity>

//             </View>

//           ))

//         )}

//       </ScrollView>

//     </View>
//   );
// }


// /* =====================================================
//    STYLES
// ===================================================== */

// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     backgroundColor: '#f8f3f0',
//   },


//   /* ================= HEADER ================= */

//   header: {
//     height: 90,
//     paddingTop: 35,
//     paddingHorizontal: 20,

//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',

//     backgroundColor: '#ffffff',
//   },


//   backButton: {
//     width: 40,
//     height: 40,

//     borderRadius: 20,

//     backgroundColor: '#f3e9e2',

//     justifyContent: 'center',
//     alignItems: 'center',
//   },


//   backText: {
//     fontSize: 25,
//     color: '#0d0101',
//   },


//   headerTitle: {
//     fontSize: 21,
//     fontWeight: 'bold',
//     color: '#0d0101',
//   },


//   headerSpace: {
//     width: 40,
//   },


//   /* ================= CONTENT ================= */

//   content: {
//     padding: 20,
//     paddingBottom: 40,
//   },


//   subtitle: {
//     fontSize: 14,
//     color: '#777',
//     marginBottom: 20,
//   },


//   /* ================= OUTFIT CARD ================= */

//   outfitCard: {
//     backgroundColor: '#ffffff',
//     borderRadius: 20,

//     padding: 18,

//     marginBottom: 18,

//     elevation: 2,
//   },


//   outfitName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#0d0101',

//     marginBottom: 15,
//   },


//   /* ================= CLOTHES ================= */

//   clothesContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },


//   clothingItem: {
//     width: '48%',

//     backgroundColor: '#f8f3f0',

//     borderRadius: 12,

//     padding: 12,

//     marginBottom: 10,
//   },


//   categoryLabel: {
//     fontSize: 10,
//     color: '#888',

//     fontWeight: 'bold',

//     marginBottom: 4,
//   },


//   clothingName: {
//     fontSize: 14,

//     fontWeight: '600',

//     color: '#0d0101',
//   },


//   /* ================= DELETE ================= */

//   deleteButton: {
//     marginTop: 5,

//     borderWidth: 1,

//     borderColor: '#0d0101',

//     borderRadius: 20,

//     paddingVertical: 10,

//     alignItems: 'center',
//   },


//   deleteText: {
//     color: '#0d0101',

//     fontSize: 13,

//     fontWeight: 'bold',
//   },


//   /* ================= EMPTY ================= */

//   emptyContainer: {
//     backgroundColor: '#ffffff',

//     borderRadius: 20,

//     padding: 30,

//     alignItems: 'center',

//     marginTop: 20,
//   },


//   emptyTitle: {
//     fontSize: 20,

//     fontWeight: 'bold',

//     color: '#0d0101',

//     marginBottom: 8,
//   },


//   emptyText: {
//     fontSize: 13,

//     color: '#777',

//     textAlign: 'center',

//     marginBottom: 20,
//   },


//   createButton: {
//     backgroundColor: '#0d0101',

//     paddingVertical: 13,

//     paddingHorizontal: 25,

//     borderRadius: 25,
//   },


//   createButtonText: {
//     color: '#ffffff',

//     fontSize: 14,

//     fontWeight: 'bold',
//   },

// });
import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';


// =====================================================
// SAVED OUTFITS SCREEN
// =====================================================

export default function SavedOutfitsScreen({
  navigation,
  savedOutfits = [],
  setSavedOutfits,
}) {

  // =====================================================
  // DELETE OUTFIT
  // =====================================================

  const deleteOutfit = (id) => {

    Alert.alert(
      'Delete Outfit',
      'Are you sure you want to delete this outfit?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },

        {
          text: 'Delete',
          style: 'destructive',

          onPress: () => {

            setSavedOutfits((currentOutfits) =>
              currentOutfits.filter(
                (outfit) => outfit.id !== id
              )
            );

          },
        },
      ]
    );
  };


  // =====================================================
  // EMPTY STATE
  // =====================================================

  if (savedOutfits.length === 0) {

    return (

      <View style={styles.container}>

        {/* HEADER */}

        <View style={styles.header}>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >

            <Text style={styles.backText}>
              ←
            </Text>

          </TouchableOpacity>


          <Text style={styles.headerTitle}>
            Saved Outfits
          </Text>


          <View style={styles.headerSpace} />

        </View>


        {/* EMPTY CONTENT */}

        <View style={styles.emptyContainer}>

          <Text style={styles.emptyIcon}>
            👗
          </Text>

          <Text style={styles.emptyTitle}>
            No Saved Outfits
          </Text>

          <Text style={styles.emptyText}>
            Your saved outfit combinations will appear here.
          </Text>


          <TouchableOpacity
            style={styles.createButton}
            onPress={() =>
              navigation.navigate('CreateOutfitScreen')
            }
            activeOpacity={0.8}
          >

            <Text style={styles.createButtonText}>
              Create Outfit
            </Text>

          </TouchableOpacity>

        </View>

      </View>
    );
  }


  // =====================================================
  // SAVED OUTFITS
  // =====================================================

  return (

    <View style={styles.container}>

      {/* =================================================
          HEADER
      ================================================= */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >

          <Text style={styles.backText}>
            ←
          </Text>

        </TouchableOpacity>


        <Text style={styles.headerTitle}>
          Saved Outfits
        </Text>


        <View style={styles.headerSpace} />

      </View>


      {/* =================================================
          CONTENT
      ================================================= */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        <Text style={styles.subtitle}>
          Your favorite outfit combinations
        </Text>


        {/* =================================================
            OUTFIT CARDS
        ================================================= */}

        {savedOutfits.map((outfit, index) => (

          <View
            key={outfit.id || String(index)}
            style={styles.outfitCard}
          >

            {/* =================================================
                OUTFIT NAME
            ================================================= */}

            <Text style={styles.outfitName}>
              {outfit.name || `Outfit ${index + 1}`}
            </Text>


            {/* =================================================
                CLOTHES
            ================================================= */}

            <View style={styles.clothesContainer}>


              {/* TOP */}

              <View style={styles.clothingItem}>

                <Text style={styles.categoryLabel}>
                  TOP
                </Text>

                <Text style={styles.clothingName}>
                  {outfit.top || 'Not specified'}
                </Text>

              </View>


              {/* BOTTOM */}

              <View style={styles.clothingItem}>

                <Text style={styles.categoryLabel}>
                  BOTTOM
                </Text>

                <Text style={styles.clothingName}>
                  {outfit.bottom || 'Not specified'}
                </Text>

              </View>


              {/* SHOES */}

              <View style={styles.clothingItem}>

                <Text style={styles.categoryLabel}>
                  SHOES
                </Text>

                <Text style={styles.clothingName}>
                  {outfit.shoes || 'Not specified'}
                </Text>

              </View>


              {/* OUTERWEAR */}

              <View style={styles.clothingItem}>

                <Text style={styles.categoryLabel}>
                  OUTERWEAR
                </Text>

                <Text style={styles.clothingName}>
                  {outfit.outerwear || 'Not needed'}
                </Text>

              </View>


              {/* ACCESSORIES */}

              <View style={styles.clothingItem}>

                <Text style={styles.categoryLabel}>
                  ACCESSORIES
                </Text>

                <Text style={styles.clothingName}>
                  {outfit.accessory ||
                   outfit.accessories ||
                   'Not needed'}
                </Text>

              </View>


              {/* OCCASION */}

              {outfit.occasion && (

                <View style={styles.clothingItem}>

                  <Text style={styles.categoryLabel}>
                    OCCASION
                  </Text>

                  <Text style={styles.clothingName}>
                    {outfit.occasion}
                  </Text>

                </View>

              )}

            </View>


            {/* =================================================
                WEATHER TIP
            ================================================= */}

            {outfit.weatherTip && (

              <View style={styles.weatherBox}>

                <Text style={styles.weatherTitle}>
                  🌤️ Weather Tip
                </Text>

                <Text style={styles.weatherText}>
                  {outfit.weatherTip}
                </Text>

              </View>

            )}


            {/* =================================================
                WHY
            ================================================= */}

            {outfit.why && (

              <View style={styles.whyBox}>

                <Text style={styles.whyTitle}>
                  ✨ Why this works
                </Text>

                <Text style={styles.whyText}>
                  {outfit.why}
                </Text>

              </View>

            )}


            {/* =================================================
                DELETE BUTTON
            ================================================= */}

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() =>
                deleteOutfit(outfit.id)
              }
              activeOpacity={0.8}
            >

              <Text style={styles.deleteText}>
                Delete Outfit
              </Text>

            </TouchableOpacity>

          </View>

        ))}

      </ScrollView>

    </View>
  );
}


// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({

  // ===================================================
  // CONTAINER
  // ===================================================

  container: {
    flex: 1,
    backgroundColor: '#f8f3f0',
  },


  // ===================================================
  // HEADER
  // ===================================================

  header: {
    height: 90,
    paddingTop: 35,
    paddingHorizontal: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: '#ffffff',
  },


  backButton: {
    width: 40,
    height: 40,

    borderRadius: 20,

    backgroundColor: '#f3e9e2',

    justifyContent: 'center',
    alignItems: 'center',
  },


  backText: {
    fontSize: 25,
    color: '#0d0101',
  },


  headerTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#0d0101',
  },


  headerSpace: {
    width: 40,
  },


  // ===================================================
  // CONTENT
  // ===================================================

  content: {
    padding: 20,
    paddingBottom: 40,
  },


  subtitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
  },


  // ===================================================
  // OUTFIT CARD
  // ===================================================

  outfitCard: {
    backgroundColor: '#ffffff',

    borderRadius: 20,

    padding: 18,

    marginBottom: 18,

    elevation: 2,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },


  outfitName: {
    fontSize: 18,

    fontWeight: 'bold',

    color: '#0d0101',

    marginBottom: 15,
  },


  // ===================================================
  // CLOTHING
  // ===================================================

  clothesContainer: {
    flexDirection: 'row',

    flexWrap: 'wrap',

    justifyContent: 'space-between',
  },


  clothingItem: {
    width: '48%',

    backgroundColor: '#f8f3f0',

    borderRadius: 12,

    padding: 12,

    marginBottom: 10,
  },


  categoryLabel: {
    fontSize: 10,

    color: '#888',

    fontWeight: 'bold',

    marginBottom: 4,
  },


  clothingName: {
    fontSize: 14,

    fontWeight: '600',

    color: '#0d0101',
  },


  // ===================================================
  // WEATHER
  // ===================================================

  weatherBox: {
    backgroundColor: '#faf6f3',

    borderRadius: 12,

    padding: 12,

    marginTop: 5,

    marginBottom: 10,
  },


  weatherTitle: {
    fontSize: 13,

    fontWeight: 'bold',

    color: '#0d0101',

    marginBottom: 5,
  },


  weatherText: {
    fontSize: 13,

    color: '#666',

    lineHeight: 19,
  },


  // ===================================================
  // WHY
  // ===================================================

  whyBox: {
    paddingHorizontal: 3,

    marginBottom: 10,
  },


  whyTitle: {
    fontSize: 13,

    fontWeight: 'bold',

    color: '#0d0101',

    marginBottom: 4,
  },


  whyText: {
    fontSize: 13,

    color: '#666',

    lineHeight: 19,
  },


  // ===================================================
  // DELETE
  // ===================================================

  deleteButton: {
    marginTop: 8,

    borderWidth: 1,

    borderColor: '#0d0101',

    borderRadius: 20,

    paddingVertical: 10,

    alignItems: 'center',
  },


  deleteText: {
    color: '#0d0101',

    fontSize: 13,

    fontWeight: 'bold',
  },


  // ===================================================
  // EMPTY STATE
  // ===================================================

  emptyContainer: {
    flex: 1,

    backgroundColor: '#ffffff',

    margin: 20,

    borderRadius: 20,

    padding: 30,

    alignItems: 'center',

    justifyContent: 'center',
  },


  emptyIcon: {
    fontSize: 55,

    marginBottom: 15,
  },


  emptyTitle: {
    fontSize: 20,

    fontWeight: 'bold',

    color: '#0d0101',

    marginBottom: 8,
  },


  emptyText: {
    fontSize: 13,

    color: '#777',

    textAlign: 'center',

    marginBottom: 20,

    lineHeight: 20,
  },


  createButton: {
    backgroundColor: '#0d0101',

    paddingVertical: 13,

    paddingHorizontal: 25,

    borderRadius: 25,
  },


  createButtonText: {
    color: '#ffffff',

    fontSize: 14,

    fontWeight: 'bold',
  },

});