

// import {
//   View,
//   Text,
//   TextInput,
//   Pressable,
//   StyleSheet,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from 'react-native';

// // =====================================================
// // SIGN UP SCREEN
// // =====================================================

// export default function SignUpScreen({
//   navigation,
//   setIsLoggedIn,
// }) {

//   // ===================================================
//   // FORM STATES
//   // ===================================================

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] =
//     useState('');

//   // ===================================================
//   // SIGN UP FUNCTION
//   // ===================================================

//   const handleSignUp = () => {

//     // =================================================
//     // CLEAN INPUT
//     // =================================================

//     const cleanName = name.trim();
//     const cleanEmail = email.trim();

//     // =================================================
//     // CHECK EMPTY FIELDS
//     // =================================================

//     if (
//       cleanName === '' ||
//       cleanEmail === '' ||
//       password === '' ||
//       confirmPassword === ''
//     ) {

//       Alert.alert(
//         'Missing Information',
//         'Please fill in all fields.'
//       );

//       return;
//     }

//     // =================================================
//     // EMAIL VALIDATION
//     // =================================================

//     if (
//       !cleanEmail.includes('@') ||
//       !cleanEmail.includes('.')
//     ) {

//       Alert.alert(
//         'Invalid Email',
//         'Please enter a valid email address.'
//       );

//       return;
//     }

//     // =================================================
//     // PASSWORD VALIDATION
//     // =================================================

//     if (password.length < 6) {

//       Alert.alert(
//         'Weak Password',
//         'Password must contain at least 6 characters.'
//       );

//       return;
//     }

//     // =================================================
//     // CONFIRM PASSWORD
//     // =================================================

//     if (password !== confirmPassword) {

//       Alert.alert(
//         'Password Error',
//         'Passwords do not match.'
//       );

//       return;
//     }

//     // =================================================
//     // CREATE USER DATA
//     // =================================================

//     const userData = {
//       name: cleanName,
//       email: cleanEmail,
//     };

//     // =================================================
//     // UPDATE LOGIN STATE IN APP.JS
//     // =================================================

//     if (setIsLoggedIn) {

//       setIsLoggedIn(userData);

//     } else {

//       console.log(
//         'ERROR: setIsLoggedIn was not passed from App.js'
//       );

//       Alert.alert(
//         'Signup Error',
//         'Could not update login status.'
//       );

//       return;
//     }

//     // =================================================
//     // SUCCESS MESSAGE
//     // =================================================

//     Alert.alert(
//       'Account Created',
//       'Your account has been created successfully.',
//       [
//         {
//           text: 'Continue',

//           onPress: () => {

//             navigation.replace('HomeScreen');

//           },
//         },
//       ]
//     );
//   };

//   // ===================================================
//   // UI
//   // ===================================================

//   return (

//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={
//         Platform.OS === 'ios'
//           ? 'padding'
//           : undefined
//       }
//     >

//       <ScrollView
//         contentContainerStyle={styles.scrollContainer}
//         keyboardShouldPersistTaps="handled"
//         showsVerticalScrollIndicator={false}
//       >

//         {/* =================================================
//             TITLE
//         ================================================= */}

//         <Text style={styles.logo}>
//           👗
//         </Text>

//         <Text style={styles.title}>
//           Create Account
//         </Text>

//         <Text style={styles.subtitle}>
//           Create your Outfit Planner account
//         </Text>


//         {/* =================================================
//             NAME
//         ================================================= */}

//         <Text style={styles.label}>
//           Full Name
//         </Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Enter your name"
//           placeholderTextColor="#999"
//           value={name}
//           onChangeText={setName}
//           autoCapitalize="words"
//           autoCorrect={false}
//         />


//         {/* =================================================
//             EMAIL
//         ================================================= */}

//         <Text style={styles.label}>
//           Email
//         </Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Enter your email"
//           placeholderTextColor="#999"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           autoCapitalize="none"
//           autoCorrect={false}
//         />


//         {/* =================================================
//             PASSWORD
//         ================================================= */}

//         <Text style={styles.label}>
//           Password
//         </Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Enter password"
//           placeholderTextColor="#999"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//         />


//         {/* =================================================
//             CONFIRM PASSWORD
//         ================================================= */}

//         <Text style={styles.label}>
//           Confirm Password
//         </Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Confirm password"
//           placeholderTextColor="#999"
//           value={confirmPassword}
//           onChangeText={setConfirmPassword}
//           secureTextEntry
//         />


//         {/* =================================================
//             SIGN UP BUTTON
//         ================================================= */}

//         <Pressable
//           style={({ pressed }) => [
//             styles.signupButton,
//             pressed && styles.buttonPressed,
//           ]}
//           onPress={handleSignUp}
//         >

//           <Text style={styles.signupButtonText}>
//             Sign Up
//           </Text>

//         </Pressable>


//         {/* =================================================
//             LOGIN LINK
//         ================================================= */}

//         <View style={styles.loginContainer}>

//           <Text style={styles.loginText}>
//             Already have an account?
//           </Text>

//           <Pressable
//             onPress={() =>
//               navigation.navigate('LoginScreen')
//             }
//           >

//             <Text style={styles.loginLink}>
//               Login
//             </Text>

//           </Pressable>

//         </View>

//       </ScrollView>

//     </KeyboardAvoidingView>
//   );
// }


// // =====================================================
// // STYLES
// // =====================================================

// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },

//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 25,
//     paddingVertical: 40,
//   },

//   // ===================================================
//   // LOGO
//   // ===================================================

//   logo: {
//     fontSize: 55,
//     textAlign: 'center',
//     marginBottom: 10,
//   },

//   // ===================================================
//   // TITLE
//   // ===================================================

//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#222',
//     textAlign: 'center',
//     marginBottom: 8,
//   },

//   // ===================================================
//   // SUBTITLE
//   // ===================================================

//   subtitle: {
//     fontSize: 15,
//     color: '#777',
//     textAlign: 'center',
//     marginBottom: 35,
//   },

//   // ===================================================
//   // LABEL
//   // ===================================================

//   label: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 7,
//     marginTop: 12,
//   },

//   // ===================================================
//   // INPUT
//   // ===================================================

//   input: {
//     height: 52,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     fontSize: 16,
//     color: '#222',
//     backgroundColor: '#fafafa',
//   },

//   // ===================================================
//   // SIGNUP BUTTON
//   // ===================================================

//   signupButton: {
//     height: 52,
//     borderRadius: 12,
//     backgroundColor: '#222',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 30,
//   },

//   buttonPressed: {
//     opacity: 0.7,
//   },

//   signupButtonText: {
//     color: '#fff',
//     fontSize: 17,
//     fontWeight: 'bold',
//   },

//   // ===================================================
//   // LOGIN LINK
//   // ===================================================

//   loginContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 25,
//   },

//   loginText: {
//     fontSize: 14,
//     color: '#666',
//   },

//   loginLink: {
//     fontSize: 14,
//     color: '#222',
//     fontWeight: 'bold',
//     marginLeft: 5,
//   },

// });
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';


// =====================================================
// SIGN UP SCREEN
// =====================================================

export default function SignUpScreen({
  navigation,
  setIsLoggedIn,
}) {

  // =====================================================
  // FORM STATES
  // =====================================================

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  // =====================================================
  // SIGN UP FUNCTION
  // =====================================================

  const handleSignUp = () => {

    const cleanName = name.trim();
    const cleanEmail = email.trim();


    // =====================================================
    // EMPTY FIELD VALIDATION
    // =====================================================

    if (
      cleanName === '' ||
      cleanEmail === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      Alert.alert(
        'Missing Information',
        'Please fill in all fields.'
      );

      return;
    }


    // =====================================================
    // EMAIL VALIDATION
    // =====================================================

    if (
      !cleanEmail.includes('@') ||
      !cleanEmail.includes('.')
    ) {
      Alert.alert(
        'Invalid Email',
        'Please enter a valid email address.'
      );

      return;
    }


    // =====================================================
    // PASSWORD VALIDATION
    // =====================================================

    if (password.length < 6) {
      Alert.alert(
        'Weak Password',
        'Password must contain at least 6 characters.'
      );

      return;
    }


    // =====================================================
    // CONFIRM PASSWORD
    // =====================================================

    if (password !== confirmPassword) {
      Alert.alert(
        'Password Error',
        'Passwords do not match.'
      );

      return;
    }


    // =====================================================
    // UPDATE LOGIN STATUS
    // =====================================================

    if (setIsLoggedIn) {

      // Login state should be TRUE
      setIsLoggedIn(true);

    } else {

      console.log(
        'ERROR: setIsLoggedIn was not passed from App.js'
      );

      Alert.alert(
        'Signup Error',
        'Could not update login status.'
      );

      return;
    }


    // =====================================================
    // SUCCESS MESSAGE
    // =====================================================

    Alert.alert(
      'Account Created',
      `Welcome, ${cleanName}! Your account has been created successfully.`,
      [
        {
          text: 'Continue',

          onPress: () => {

            navigation.replace('HomeScreen');

          },
        },
      ]
    );
  };


  // =====================================================
  // UI
  // =====================================================

  return (

    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }
    >

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        {/* LOGO */}

        <Text style={styles.logo}>
          👗
        </Text>


        {/* TITLE */}

        <Text style={styles.title}>
          Create Account
        </Text>


        <Text style={styles.subtitle}>
          Create your Outfit Planner account
        </Text>


        {/* NAME */}

        <Text style={styles.label}>
          Full Name
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          autoCorrect={false}
        />


        {/* EMAIL */}

        <Text style={styles.label}>
          Email
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />


        {/* PASSWORD */}

        <Text style={styles.label}>
          Password
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />


        {/* CONFIRM PASSWORD */}

        <Text style={styles.label}>
          Confirm Password
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          placeholderTextColor="#999"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />


        {/* SIGN UP BUTTON */}

        <Pressable
          style={({ pressed }) => [
            styles.signupButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleSignUp}
        >

          <Text style={styles.signupButtonText}>
            Sign Up
          </Text>

        </Pressable>


        {/* LOGIN LINK */}

        <View style={styles.loginContainer}>

          <Text style={styles.loginText}>
            Already have an account?
          </Text>

          <Pressable
            onPress={() => navigation.navigate('LoginScreen')}
          >

            <Text style={styles.loginLink}>
              Login
            </Text>

          </Pressable>

        </View>


        {/* BACK BUTTON */}

        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
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

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },


  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingVertical: 40,
  },


  logo: {
    fontSize: 55,
    textAlign: 'center',
    marginBottom: 10,
  },


  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 8,
  },


  subtitle: {
    fontSize: 15,
    color: '#777',
    textAlign: 'center',
    marginBottom: 35,
  },


  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 7,
    marginTop: 12,
  },


  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#222',
    backgroundColor: '#fafafa',
  },


  signupButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },


  buttonPressed: {
    opacity: 0.7,
  },


  signupButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },


  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },


  loginText: {
    fontSize: 14,
    color: '#666',
  },


  loginLink: {
    fontSize: 14,
    color: '#222',
    fontWeight: 'bold',
    marginLeft: 5,
  },


  backButton: {
    alignSelf: 'center',
    marginTop: 25,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 22,
  },


  backButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
  },

});