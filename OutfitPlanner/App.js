
// import React, { useState } from 'react';

// import {
//   NavigationContainer,
// } from '@react-navigation/native';

// import {
//   createNativeStackNavigator,
// } from '@react-navigation/native-stack';

// import { ThemeProvider } from './ThemeContext';


// // =====================================================
// // SCREEN IMPORTS
// // =====================================================

// import WelcomeScreen from './screens/WelcomeScreen';
// import LoginScreen from './screens/LoginScreen';
// import SignUpScreen from './screens/SignUpScreen';

// import HomeScreen from './screens/HomeScreen';
// import WardrobeScreen from './screens/WardrobeScreen';
// import CreateOutfitScreen from './screens/CreateOutfitScreen';
// import SuggestOutfitScreen from './screens/SuggestOutfitScreen';
// import SavedOutfitsScreen from './screens/SavedOutfitsScreen';
// import CalendarScreen from './screens/CalendarScreen';
// import TryOutfitScreen from './screens/TryOutfitScreen';
// import ProfileScreen from './screens/ProfileScreen';


// // =====================================================
// // STACK NAVIGATOR
// // =====================================================

// const Stack = createNativeStackNavigator();


// // =====================================================
// // APP
// // =====================================================

// export default function App() {

//   // ===================================================
//   // LOGIN STATE
//   // ===================================================

//   const [isLoggedIn, setIsLoggedIn] = useState(false);


//   // ===================================================
//   // USER INFORMATION
//   // ===================================================

//   const [user, setUser] = useState({
//     name: '',
//     email: '',
//   });


//   // ===================================================
//   // WARDROBE DATA
//   // ===================================================

//   const [wardrobeItems, setWardrobeItems] = useState([]);


//   // ===================================================
//   // SAVED OUTFITS
//   // ===================================================

//   const [savedOutfits, setSavedOutfits] = useState([]);


//   // ===================================================
//   // LOGIN FUNCTION
//   // ===================================================

//   const handleLogin = (userData = {}) => {

//     setIsLoggedIn(true);

//     setUser({
//       name: userData.name || '',
//       email: userData.email || '',
//     });

//   };


//   // ===================================================
//   // SIGN UP FUNCTION
//   // ===================================================

//   const handleSignUp = (userData = {}) => {

//     setIsLoggedIn(true);

//     setUser({
//       name: userData.name || '',
//       email: userData.email || '',
//     });

//   };


//   // ===================================================
//   // UPDATE PROFILE
//   // ===================================================

//   const handleUpdateUser = (updatedUser = {}) => {

//     setUser((previousUser) => ({

//       ...previousUser,

//       name:
//         updatedUser.name !== undefined
//           ? updatedUser.name
//           : previousUser.name,

//       email:
//         updatedUser.email !== undefined
//           ? updatedUser.email
//           : previousUser.email,

//     }));

//   };


//   // ===================================================
//   // LOGOUT FUNCTION
//   // ===================================================

//   const handleLogout = () => {

//     setIsLoggedIn(false);

//     setUser({
//       name: '',
//       email: '',
//     });

//     // If you want to clear wardrobe after logout,
//     // uncomment this:
//     //
//     // setWardrobeItems([]);

//     // If you want to clear saved outfits after logout,
//     // uncomment this:
//     //
//     // setSavedOutfits([]);

//   };


//   // ===================================================
//   // APP NAVIGATION
//   // =====================================================

//   return (

//     <ThemeProvider>

//       <NavigationContainer>

//         <Stack.Navigator

//           initialRouteName="WelcomeScreen"

//           screenOptions={{
//             headerShown: false,
//           }}

//         >


//           {/* =================================================
//               WELCOME
//           ================================================= */}

//           <Stack.Screen name="WelcomeScreen">

//             {(props) => (

//               <WelcomeScreen
//                 {...props}
//               />

//             )}

//           </Stack.Screen>


//           {/* =================================================
//               LOGIN
//           ================================================= */}

//           <Stack.Screen name="LoginScreen">

//             {(props) => (

//               <LoginScreen
//                 {...props}

//                 isLoggedIn={isLoggedIn}
//                 user={user}

//                 setIsLoggedIn={handleLogin}
//               />

//             )}

//           </Stack.Screen>


//           {/* =================================================
//               SIGN UP
//           ================================================= */}

//           <Stack.Screen name="SignUpScreen">

//             {(props) => (

//               <SignUpScreen
//                 {...props}

//                 isLoggedIn={isLoggedIn}
//                 user={user}

//                 setIsLoggedIn={handleSignUp}
//               />

//             )}

//           </Stack.Screen>


//           {/* =================================================
//               HOME
//           ================================================= */}

//           <Stack.Screen name="HomeScreen">

//             {(props) => (

//               <HomeScreen
//                 {...props}

//                 isLoggedIn={isLoggedIn}
//                 user={user}

//                 setIsLoggedIn={setIsLoggedIn}
//               />

//             )}

//           </Stack.Screen>


//           {/* =================================================
//               WARDROBE
//           ================================================= */}

//           <Stack.Screen name="WardrobeScreen">

//             {(props) => (

//               <WardrobeScreen
//                 {...props}

//                 wardrobeItems={wardrobeItems}
//                 setWardrobeItems={setWardrobeItems}

//                 isLoggedIn={isLoggedIn}
//               />

//             )}

//           </Stack.Screen>


//           {/* =================================================
//               CREATE OUTFIT
//           ================================================= */}

//           <Stack.Screen name="CreateOutfitScreen">

//             {(props) => (

//               <CreateOutfitScreen
//                 {...props}

//                 wardrobeItems={wardrobeItems}

//                 savedOutfits={savedOutfits}
//                 setSavedOutfits={setSavedOutfits}

//                 isLoggedIn={isLoggedIn}
//               />

//             )}

//           </Stack.Screen>


//           {/* =================================================
//               SUGGEST OUTFIT
//           ================================================= */}

//           <Stack.Screen name="SuggestOutfitScreen">

//             {(props) => (

//               <SuggestOutfitScreen
//                 {...props}

//                 wardrobeItems={wardrobeItems}

//                 savedOutfits={savedOutfits}
//                 setSavedOutfits={setSavedOutfits}

//                 isLoggedIn={isLoggedIn}

//                 user={user}
//               />

//             )}

//           </Stack.Screen>


//           {/* =================================================
//               SAVED OUTFITS
//           ================================================= */}

//           <Stack.Screen name="SavedOutfitsScreen">

//             {(props) => (

//               <SavedOutfitsScreen
//                 {...props}

//                 savedOutfits={savedOutfits}
//                 setSavedOutfits={setSavedOutfits}

//                 wardrobeItems={wardrobeItems}

//                 isLoggedIn={isLoggedIn}

//                 user={user}
//               />

//             )}

//           </Stack.Screen>


//           {/* =================================================
//               CALENDAR
//           ================================================= */}

//           <Stack.Screen name="CalendarScreen">

//             {(props) => (

//               <CalendarScreen
//                 {...props}

//                 savedOutfits={savedOutfits}

//                 isLoggedIn={isLoggedIn}

//                 user={user}
//               />

//             )}

//           </Stack.Screen>


//           {/* =================================================
//               TRY OUTFIT
//           ================================================= */}

//           <Stack.Screen name="TryOutfitScreen">

//             {(props) => (

//               <TryOutfitScreen
//                 {...props}

//                 wardrobeItems={wardrobeItems}

//                 savedOutfits={savedOutfits}

//                 isLoggedIn={isLoggedIn}

//                 user={user}
//               />

//             )}

//           </Stack.Screen>


//           {/* =================================================
//               PROFILE
//           ================================================= */}

//           <Stack.Screen name="ProfileScreen">

//             {(props) => (

//               <ProfileScreen
//                 {...props}

//                 isLoggedIn={isLoggedIn}

//                 user={user}

//                 setUser={handleUpdateUser}

//                 setIsLoggedIn={setIsLoggedIn}

//                 onLogout={handleLogout}
//               />

//             )}

//           </Stack.Screen>


//         </Stack.Navigator>

//       </NavigationContainer>

//     </ThemeProvider>

//   );
// }
import React, { useState } from 'react';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { ThemeProvider } from './ThemeContext';


// =====================================================
// SCREEN IMPORTS
// =====================================================

import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

import HomeScreen from './screens/HomeScreen';
import WardrobeScreen from './screens/WardrobeScreen';
import CreateOutfitScreen from './screens/CreateOutfitScreen';
import SuggestOutfitScreen from './screens/SuggestOutfitScreen';
import SavedOutfitsScreen from './screens/SavedOutfitsScreen';
import CalendarScreen from './screens/CalendarScreen';
import TryOutfitScreen from './screens/TryOutfitScreen';
import ProfileScreen from './screens/ProfileScreen';


// =====================================================
// STACK NAVIGATOR
// =====================================================

const Stack = createNativeStackNavigator();


// =====================================================
// APP
// =====================================================

export default function App() {

  // ===================================================
  // LOGIN STATE
  // ===================================================

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  // ===================================================
  // USER INFORMATION
  // ===================================================

  const [user, setUser] = useState({
    name: '',
    email: '',
  });


  // ===================================================
  // WARDROBE DATA
  // ===================================================

  const [wardrobeItems, setWardrobeItems] = useState([]);


  // ===================================================
  // SAVED OUTFITS
  // ===================================================

  const [savedOutfits, setSavedOutfits] = useState([]);


  // ===================================================
  // LOGIN FUNCTION
  // ===================================================

  const handleLogin = (userData = {}) => {

    setIsLoggedIn(true);

    setUser({
      name: userData.name || '',
      email: userData.email || '',
    });

  };


  // ===================================================
  // SIGN UP FUNCTION
  // ===================================================

  const handleSignUp = (userData = {}) => {

    setIsLoggedIn(true);

    setUser({
      name: userData.name || '',
      email: userData.email || '',
    });

  };


  // ===================================================
  // UPDATE PROFILE
  // ===================================================

  const handleUpdateUser = (updatedUser = {}) => {

    setUser((previousUser) => ({

      ...previousUser,

      name:
        updatedUser.name !== undefined
          ? updatedUser.name
          : previousUser.name,

      email:
        updatedUser.email !== undefined
          ? updatedUser.email
          : previousUser.email,

    }));

  };


  // ===================================================
  // LOGOUT FUNCTION
  // ===================================================

  const handleLogout = () => {

    setIsLoggedIn(false);

    setUser({
      name: '',
      email: '',
    });

  };


  // ===================================================
  // APP NAVIGATION
  // =====================================================

  return (

    <ThemeProvider>

      <NavigationContainer>

        <Stack.Navigator
          initialRouteName="WelcomeScreen"
          screenOptions={{
            headerShown: false,
          }}
        >

          {/* =================================================
              WELCOME
          ================================================= */}

          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
          />


          {/* =================================================
              LOGIN
          ================================================= */}

          <Stack.Screen name="LoginScreen">

            {(props) => (

              <LoginScreen
                {...props}

                isLoggedIn={isLoggedIn}
                user={user}

                setIsLoggedIn={handleLogin}
              />

            )}

          </Stack.Screen>


          {/* =================================================
              SIGN UP
              
              IMPORTANT:
              Route name is SignupScreen
              ================================================= */}

          <Stack.Screen name="SignUpScreen">

            {(props) => (

              <SignUpScreen
                {...props}

                isLoggedIn={isLoggedIn}
                user={user}

                setIsLoggedIn={handleSignUp}
              />

            )}

          </Stack.Screen>


          {/* =================================================
              HOME
          ================================================= */}

          <Stack.Screen name="HomeScreen">

            {(props) => (

              <HomeScreen
                {...props}

                isLoggedIn={isLoggedIn}
                user={user}

                setIsLoggedIn={setIsLoggedIn}
              />

            )}

          </Stack.Screen>


          {/* =================================================
              WARDROBE
          ================================================= */}

          <Stack.Screen name="WardrobeScreen">

            {(props) => (

              <WardrobeScreen
                {...props}

                wardrobeItems={wardrobeItems}
                setWardrobeItems={setWardrobeItems}

                isLoggedIn={isLoggedIn}
              />

            )}

          </Stack.Screen>


          {/* =================================================
              CREATE OUTFIT
          ================================================= */}

          <Stack.Screen name="CreateOutfitScreen">

            {(props) => (

              <CreateOutfitScreen
                {...props}

                wardrobeItems={wardrobeItems}

                savedOutfits={savedOutfits}
                setSavedOutfits={setSavedOutfits}

                isLoggedIn={isLoggedIn}
              />

            )}

          </Stack.Screen>


          {/* =================================================
              SUGGEST OUTFIT
          ================================================= */}

          <Stack.Screen name="SuggestOutfitScreen">

            {(props) => (

              <SuggestOutfitScreen
                {...props}

                wardrobeItems={wardrobeItems}

                savedOutfits={savedOutfits}
                setSavedOutfits={setSavedOutfits}

                isLoggedIn={isLoggedIn}

                user={user}
              />

            )}

          </Stack.Screen>


          {/* =================================================
              SAVED OUTFITS
          ================================================= */}

          <Stack.Screen name="SavedOutfitsScreen">

            {(props) => (

              <SavedOutfitsScreen
                {...props}

                savedOutfits={savedOutfits}
                setSavedOutfits={setSavedOutfits}

                wardrobeItems={wardrobeItems}

                isLoggedIn={isLoggedIn}

                user={user}
              />

            )}

          </Stack.Screen>


          {/* =================================================
              CALENDAR
          ================================================= */}

          <Stack.Screen name="CalendarScreen">

            {(props) => (

              <CalendarScreen
                {...props}

                savedOutfits={savedOutfits}

                isLoggedIn={isLoggedIn}

                user={user}
              />

            )}

          </Stack.Screen>


          {/* =================================================
              TRY OUTFIT
          ================================================= */}

          <Stack.Screen name="TryOutfitScreen">

            {(props) => (

              <TryOutfitScreen
                {...props}

                wardrobeItems={wardrobeItems}

                savedOutfits={savedOutfits}

                isLoggedIn={isLoggedIn}

                user={user}
              />

            )}

          </Stack.Screen>


          {/* =================================================
              PROFILE
          ================================================= */}

          <Stack.Screen name="ProfileScreen">

            {(props) => (

              <ProfileScreen
                {...props}

                isLoggedIn={isLoggedIn}

                user={user}

                setUser={handleUpdateUser}

                setIsLoggedIn={setIsLoggedIn}

                onLogout={handleLogout}
              />

            )}

          </Stack.Screen>


        </Stack.Navigator>

      </NavigationContainer>

    </ThemeProvider>
  );
}