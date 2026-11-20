
import React from 'react';

import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';


// =====================================================
// WELCOME SCREEN
// =====================================================

export default function WelcomeScreen({ navigation }) {

  // ===================================================
  // GET STARTED
  // ===================================================

  const handleGetStarted = () => {
    navigation.navigate('HomeScreen');
  };


  // ===================================================
  // SCREEN
  // ===================================================

  return (
    <View style={styles.container}>

      {/* =================================================
          LOGO
      ================================================= */}

      <View style={styles.logoCircle}>
        <Text style={styles.logo}>
          👗
        </Text>
      </View>


      {/* =================================================
          APP NAME
      ================================================= */}

      <Text style={styles.title}>
        Outfit Planner
      </Text>


      {/* =================================================
          TAGLINE
      ================================================= */}

      <Text style={styles.tagline}>
        Style It • Plan It • Wear It
      </Text>


      {/* =================================================
          DESCRIPTION
      ================================================= */}

      <Text style={styles.description}>
        Organize your wardrobe, create outfits,
        and plan your perfect look every day.
      </Text>


      {/* =================================================
          GET STARTED BUTTON
      ================================================= */}

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={handleGetStarted}
      >

        <Text style={styles.buttonText}>
          Get Started
        </Text>

        <Text style={styles.arrow}>
          →
        </Text>

      </Pressable>


      {/* =================================================
          BOTTOM TEXT
      ================================================= */}

      <Text style={styles.bottomText}>
        Your personal style assistant
      </Text>

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

    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 25,
  },


  // ===================================================
  // LOGO CIRCLE
  // ===================================================

  logoCircle: {
    width: 135,
    height: 135,

    borderRadius: 68,

    backgroundColor: '#ead9cc',

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 25,

    elevation: 4,
  },


  // ===================================================
  // LOGO
  // ===================================================

  logo: {
    fontSize: 75,
  },


  // ===================================================
  // TITLE
  // ===================================================

  title: {
    fontSize: 38,

    fontWeight: 'bold',

    color: '#111',

    textAlign: 'center',
  },


  // ===================================================
  // TAGLINE
  // ===================================================

  tagline: {
    fontSize: 17,

    color: '#777',

    marginTop: 10,

    fontStyle: 'italic',

    textAlign: 'center',
  },


  // ===================================================
  // DESCRIPTION
  // ===================================================

  description: {
    fontSize: 14,

    color: '#777',

    textAlign: 'center',

    lineHeight: 21,

    marginTop: 25,

    marginHorizontal: 20,

    marginBottom: 45,
  },


  // ===================================================
  // GET STARTED BUTTON
  // ===================================================

  button: {
    width: 230,

    height: 56,

    backgroundColor: '#111',

    borderRadius: 28,

    flexDirection: 'row',

    justifyContent: 'center',

    alignItems: 'center',

    elevation: 4,
  },


  // ===================================================
  // BUTTON PRESSED
  // ===================================================

  buttonPressed: {
    opacity: 0.7,

    transform: [
      {
        scale: 0.97,
      },
    ],
  },


  // ===================================================
  // BUTTON TEXT
  // ===================================================

  buttonText: {
    color: '#fff',

    fontSize: 18,

    fontWeight: 'bold',
  },


  // ===================================================
  // BUTTON ARROW
  // ===================================================

  arrow: {
    color: '#fff',

    fontSize: 22,

    fontWeight: 'bold',

    marginLeft: 10,
  },


  // ===================================================
  // BOTTOM TEXT
  // ===================================================

  bottomText: {
    fontSize: 12,

    color: '#999',

    marginTop: 25,
  },

});