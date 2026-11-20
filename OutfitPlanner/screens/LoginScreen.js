
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';

// =====================================================
// LOGIN SCREEN
// =====================================================

export default function LoginScreen({
  navigation,
  setIsLoggedIn,
}) {

  // ===================================================
  // STATE
  // ===================================================

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ===================================================
  // LOGIN FUNCTION
  // ===================================================

  const handleLogin = () => {

    // =================================================
    // CHECK EMPTY FIELDS
    // =================================================

    if (
      email.trim() === '' ||
      password.trim() === ''
    ) {
      Alert.alert(
        'Error',
        'Please enter email and password'
      );

      return;
    }

    // =================================================
    // CLEAN EMAIL
    // =================================================

    const cleanEmail = email.trim();

    // =================================================
    // CREATE USER NAME
    // =================================================

    const userName = cleanEmail
      .split('@')[0];

    // =================================================
    // USER DATA
    // =================================================

    const loggedInUser = {
      name: userName,
      email: cleanEmail,
    };

    // =================================================
    // UPDATE LOGIN STATE IN APP.JS
    // =================================================

    if (setIsLoggedIn) {

      setIsLoggedIn(loggedInUser);

    } else {

      console.log(
        'ERROR: setIsLoggedIn was not passed from App.js'
      );

      Alert.alert(
        'Login Error',
        'Login state could not be updated.'
      );

      return;
    }

    // =================================================
    // SUCCESS
    // =================================================

    Alert.alert(
      'Success',
      'Login Successful',
      [
        {
          text: 'OK',

          onPress: () => {

            // replace prevents returning to Login
            navigation.replace('HomeScreen');

          },
        },
      ]
    );
  };

  // =====================================================
  // SCREEN
  // =====================================================

  return (

    <KeyboardAvoidingView

      style={styles.container}

      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : 'height'
      }

    >

      <ScrollView

        contentContainerStyle={styles.content}

        keyboardShouldPersistTaps="handled"

        showsVerticalScrollIndicator={false}

      >

        {/* =================================================
            LOGO
        ================================================= */}

        <Text style={styles.logo}>
          👗
        </Text>


        {/* =================================================
            HEADING
        ================================================= */}

        <Text style={styles.title}>
          Welcome Back
        </Text>


        <Text style={styles.subtitle}>
          Login to plan your perfect outfit
        </Text>


        {/* =================================================
            EMAIL
        ================================================= */}

        <View style={styles.inputContainer}>

          <Text style={styles.label}>
            Email
          </Text>


          <TextInput

            style={styles.input}

            placeholder="Enter your email"

            placeholderTextColor="#999"

            keyboardType="email-address"

            autoCapitalize="none"

            autoCorrect={false}

            value={email}

            onChangeText={setEmail}

          />

        </View>


        {/* =================================================
            PASSWORD
        ================================================= */}

        <View style={styles.inputContainer}>

          <Text style={styles.label}>
            Password
          </Text>


          <TextInput

            style={styles.input}

            placeholder="Enter your password"

            placeholderTextColor="#999"

            secureTextEntry={true}

            value={password}

            onChangeText={setPassword}

          />

        </View>


        {/* =================================================
            FORGOT PASSWORD
        ================================================= */}

        <Pressable

          style={styles.forgotButton}

          onPress={() => {

            Alert.alert(
              'Forgot Password',
              'Forgot Password screen will be added later.'
            );

          }}

        >

          <Text style={styles.forgotText}>
            Forgot Password?
          </Text>

        </Pressable>


        {/* =================================================
            LOGIN BUTTON
        ================================================= */}

        <Pressable

          style={({ pressed }) => [

            styles.loginButton,

            pressed &&
              styles.buttonPressed,

          ]}

          onPress={handleLogin}

        >

          <Text style={styles.loginButtonText}>
            Login
          </Text>

        </Pressable>


        {/* =================================================
            SIGN UP
        ================================================= */}

        <View style={styles.signupContainer}>

          <Text style={styles.accountText}>
            Don't have an account?
          </Text>


          <Pressable

            onPress={() => {

              // IMPORTANT:
              // App.js uses "SignUpScreen"
              // NOT "SignupScreen"

              navigation.navigate(
                'SignUpScreen'
              );

            }}

          >

            <Text style={styles.signupText}>
              Sign Up
            </Text>

          </Pressable>

        </View>


        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <Pressable

          style={styles.backButton}

          onPress={() =>
            navigation.goBack()
          }

        >

          <Text style={styles.backButtonText}>
            ← Back
          </Text>

        </Pressable>


      </ScrollView>

    </KeyboardAvoidingView>

  );
}


// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({

  // ===================================================
  // MAIN CONTAINER
  // ===================================================

  container: {

    flex: 1,

    backgroundColor: '#f8f3f0',

  },


  // ===================================================
  // CONTENT
  // ===================================================

  content: {

    flexGrow: 1,

    justifyContent: 'center',

    paddingHorizontal: 25,

    paddingVertical: 40,

  },


  // ===================================================
  // LOGO
  // ===================================================

  logo: {

    fontSize: 60,

    textAlign: 'center',

    marginBottom: 10,

  },


  // ===================================================
  // TITLE
  // ===================================================

  title: {

    fontSize: 30,

    fontWeight: 'bold',

    color: '#0d0101',

    textAlign: 'center',

  },


  // ===================================================
  // SUBTITLE
  // ===================================================

  subtitle: {

    fontSize: 15,

    color: '#777',

    textAlign: 'center',

    marginTop: 8,

    marginBottom: 35,

  },


  // ===================================================
  // INPUT CONTAINER
  // ===================================================

  inputContainer: {

    marginBottom: 18,

  },


  // ===================================================
  // LABEL
  // ===================================================

  label: {

    fontSize: 14,

    fontWeight: '600',

    color: '#0d0101',

    marginBottom: 7,

  },


  // ===================================================
  // INPUT
  // ===================================================

  input: {

    height: 52,

    backgroundColor: '#fff',

    borderWidth: 1,

    borderColor: '#ddd',

    borderRadius: 14,

    paddingHorizontal: 16,

    fontSize: 15,

    color: '#0d0101',

  },


  // ===================================================
  // FORGOT PASSWORD
  // ===================================================

  forgotButton: {

    alignSelf: 'flex-end',

    marginBottom: 25,

  },


  forgotText: {

    color: '#a98564',

    fontSize: 13,

    fontWeight: '600',

  },


  // ===================================================
  // LOGIN BUTTON
  // ===================================================

  loginButton: {

    height: 52,

    backgroundColor: '#0d0101',

    borderRadius: 26,

    justifyContent: 'center',

    alignItems: 'center',

  },


  loginButtonText: {

    color: '#fff',

    fontSize: 17,

    fontWeight: 'bold',

  },


  // ===================================================
  // PRESS EFFECT
  // ===================================================

  buttonPressed: {

    opacity: 0.7,

  },


  // ===================================================
  // SIGN UP
  // ===================================================

  signupContainer: {

    flexDirection: 'row',

    justifyContent: 'center',

    marginTop: 25,

  },


  accountText: {

    color: '#777',

    fontSize: 14,

  },


  signupText: {

    color: '#a98564',

    fontWeight: 'bold',

    marginLeft: 5,

    fontSize: 14,

  },


  // ===================================================
  // BACK BUTTON
  // ===================================================

  backButton: {

    marginTop: 30,

    alignSelf: 'center',

    paddingHorizontal: 30,

    paddingVertical: 12,

    borderRadius: 25,

    borderWidth: 1,

    borderColor: '#0d0101',

  },


  backButtonText: {

    fontSize: 15,

    fontWeight: 'bold',

    color: '#0d0101',

  },

});