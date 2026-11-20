// import React, { useEffect, useState } from 'react';

// import {
//   View,
//   Text,
//   StyleSheet,
//   Pressable,
//   ScrollView,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';

// import * as Location from 'expo-location';


// export default function HomeScreen({
//   navigation,
//   isLoggedIn = false,
// }) {

//   // =====================================================
//   // WEATHER
//   // =====================================================

//   const [weather, setWeather] = useState(null);
//   const [city, setCity] = useState('');
//   const [weatherLoading, setWeatherLoading] = useState(true);


//   // =====================================================
//   // WEATHER ON OPEN
//   // =====================================================

//   useEffect(() => {
//     getWeather();
//   }, []);


//   // =====================================================
//   // LOGIN CHECK
//   // =====================================================

//   const requireLogin = (screenName) => {

//     if (isLoggedIn) {
//       navigation.navigate(screenName);
//       return;
//     }


//     Alert.alert(
//       'Login Required',
//       'Please login or create an account to use this feature.',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },

//         {
//           text: 'Sign Up',
//           onPress: () =>
//             navigation.navigate('SignupScreen'),
//         },

//         {
//           text: 'Login',
//           onPress: () =>
//             navigation.navigate('LoginScreen'),
//         },
//       ]
//     );
//   };


//   // =====================================================
//   // WEATHER
//   // =====================================================

//   const getWeather = async () => {

//     try {

//       setWeatherLoading(true);


//       const { status } =
//         await Location.requestForegroundPermissionsAsync();


//       if (status !== 'granted') {

//         Alert.alert(
//           'Location Permission',
//           'Please allow location permission to show your current weather.'
//         );

//         setWeatherLoading(false);

//         return;
//       }


//       const location =
//         await Location.getCurrentPositionAsync({
//           accuracy: Location.Accuracy.Balanced,
//         });


//       const latitude =
//         location.coords.latitude;

//       const longitude =
//         location.coords.longitude;


//       // =================================================
//       // CITY
//       // =================================================

//       const address =
//         await Location.reverseGeocodeAsync({
//           latitude,
//           longitude,
//         });


//       if (address && address.length > 0) {

//         const place = address[0];

//         const currentCity =
//           place.city ||
//           place.district ||
//           place.subregion ||
//           place.region ||
//           'Current Location';

//         setCity(currentCity);
//       }


//       // =================================================
//       // OPEN-METEO
//       // =================================================

//       const weatherURL =
//         `https://api.open-meteo.com/v1/forecast` +
//         `?latitude=${latitude}` +
//         `&longitude=${longitude}` +
//         `&current=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m` +
//         `&timezone=auto`;


//       const response =
//         await fetch(weatherURL);


//       const data =
//         await response.json();


//       if (!response.ok) {
//         throw new Error('Weather API error');
//       }


//       setWeather({
//         temperature:
//           data.current.temperature_2m,

//         feelsLike:
//           data.current.apparent_temperature,

//         precipitation:
//           data.current.precipitation,

//         weatherCode:
//           data.current.weather_code,

//         windSpeed:
//           data.current.wind_speed_10m,
//       });


//     } catch (error) {

//       console.log('Weather Error:', error);

//       Alert.alert(
//         'Weather Error',
//         'Unable to get your current weather. Please try again.'
//       );


//     } finally {

//       setWeatherLoading(false);

//     }
//   };


//   // =====================================================
//   // WEATHER INFO
//   // =====================================================

//   const getWeatherInfo = (code) => {

//     if (code === 0) {

//       return {
//         emoji: '☀️',
//         condition: 'Sunny',
//         description: 'Perfect for a casual look',
//       };

//     }


//     if (code === 1 || code === 2) {

//       return {
//         emoji: '🌤️',
//         condition: 'Partly Cloudy',
//         description: 'A comfortable day for going out',
//       };

//     }


//     if (code === 3) {

//       return {
//         emoji: '☁️',
//         condition: 'Cloudy',
//         description: 'A cloudy day today',
//       };

//     }


//     if (code === 45 || code === 48) {

//       return {
//         emoji: '🌫️',
//         condition: 'Foggy',
//         description: 'Visibility may be reduced',
//       };

//     }


//     if (code >= 51 && code <= 57) {

//       return {
//         emoji: '🌦️',
//         condition: 'Drizzle',
//         description: 'Light rain may occur',
//       };

//     }


//     if (code >= 61 && code <= 67) {

//       return {
//         emoji: '🌧️',
//         condition: 'Rainy',
//         description: 'Carry an umbrella today',
//       };

//     }


//     if (code >= 71 && code <= 77) {

//       return {
//         emoji: '❄️',
//         condition: 'Snowy',
//         description: 'Keep yourself warm',
//       };

//     }


//     if (code >= 80 && code <= 82) {

//       return {
//         emoji: '🌦️',
//         condition: 'Rain Showers',
//         description: 'Rain showers are possible',
//       };

//     }


//     if (code >= 95) {

//       return {
//         emoji: '⛈️',
//         condition: 'Thunderstorm',
//         description: 'Stay safe during the storm',
//       };

//     }


//     return {
//       emoji: '🌤️',
//       condition: 'Weather',
//       description: 'Current weather conditions',
//     };
//   };


//   // =====================================================
//   // WEATHER CARD
//   // =====================================================

//   const renderWeather = () => {

//     if (weatherLoading) {

//       return (

//         <View style={styles.weatherCard}>

//           <View>

//             <Text style={styles.weatherTitle}>
//               Today's Weather
//             </Text>

//             <Text style={styles.loadingText}>
//               Getting your current weather...
//             </Text>

//           </View>


//           <ActivityIndicator
//             size="large"
//             color="#ffffff"
//           />

//         </View>
//       );
//     }


//     if (!weather) {

//       return (

//         <View style={styles.weatherCard}>

//           <View>

//             <Text style={styles.weatherTitle}>
//               Today's Weather
//             </Text>

//             <Text style={styles.weatherText}>
//               Weather unavailable
//             </Text>

//           </View>


//           <Pressable
//             onPress={getWeather}
//             style={styles.refreshButton}
//           >

//             <Text style={styles.refreshText}>
//               ↻
//             </Text>

//           </Pressable>

//         </View>
//       );
//     }


//     const info =
//       getWeatherInfo(weather.weatherCode);


//     return (

//       <View style={styles.weatherCard}>

//         <View style={styles.weatherLeft}>

//           <Text style={styles.weatherTitle}>
//             Today's Weather
//           </Text>

//           <Text style={styles.cityText}>
//             📍 {city || 'Current Location'}
//           </Text>

//           <Text style={styles.temperature}>
//             {Math.round(weather.temperature)}°C
//           </Text>

//           <Text style={styles.weatherText}>
//             {info.condition} • {info.description}
//           </Text>


//           <View style={styles.weatherDetails}>

//             <Text style={styles.detailText}>
//               🌡️ Feels {Math.round(weather.feelsLike)}°C
//             </Text>

//             <Text style={styles.detailText}>
//               💨 {Math.round(weather.windSpeed)} km/h
//             </Text>

//             <Text style={styles.detailText}>
//               💧 {weather.precipitation} mm
//             </Text>

//           </View>

//         </View>


//         <View style={styles.weatherRight}>

//           <Text style={styles.weatherEmoji}>
//             {info.emoji}
//           </Text>

//           <Pressable
//             onPress={getWeather}
//             style={styles.refreshButton}
//           >

//             <Text style={styles.refreshText}>
//               ↻
//             </Text>

//           </Pressable>

//         </View>

//       </View>
//     );
//   };


//   // =====================================================
//   // UI
//   // =====================================================

//   return (

//     <View style={styles.container}>

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >


//         {/* =================================================
//             HEADER
//         ================================================= */}

//         <View style={styles.header}>

//           <View>

//             <Text style={styles.greeting}>
//               Hello! 👋
//             </Text>

//             <Text style={styles.title}>
//               Outfit Planner
//             </Text>

//           </View>


//           <Pressable
//             style={styles.profileButton}
//             onPress={() =>
//               navigation.navigate('ProfileScreen')
//             }
//           >

//             <Text style={styles.profileIcon}>
//               👤
//             </Text>

//           </Pressable>

//         </View>


//         {/* =================================================
//             WEATHER
//         ================================================= */}

//         {renderWeather()}


//         <Text style={styles.sectionTitle}>
//           What do you want to do?
//         </Text>


//         {/* =================================================
//             ROW 1
//         ================================================= */}

//         <View style={styles.row}>

//           <Pressable
//             style={styles.featureCard}
//             onPress={() =>
//               requireLogin('CreateScreen')
//             }
//           >

//             <Text style={styles.icon}>
//               🪄
//             </Text>

//             <Text style={styles.cardTitle}>
//               Create Outfit
//             </Text>

//             <Text style={styles.cardDescription}>
//               Create your own outfit combination
//             </Text>

//           </Pressable>


//           <Pressable
//             style={styles.featureCard}
//             onPress={() =>
//               requireLogin('WardrobeScreen')
//             }
//           >

//             <Text style={styles.icon}>
//               👗
//             </Text>

//             <Text style={styles.cardTitle}>
//               My Wardrobe
//             </Text>

//             <Text style={styles.cardDescription}>
//               Manage your clothes and accessories
//             </Text>

//           </Pressable>

//         </View>


//         {/* =================================================
//             ROW 2
//         ================================================= */}

//         <View style={styles.row}>

//           <Pressable
//             style={styles.featureCard}
//             onPress={() =>
//               requireLogin('SuggestOutfitsScreen')
//             }
//           >

//             <Text style={styles.icon}>
//               💡
//             </Text>

//             <Text style={styles.cardTitle}>
//               Suggest Outfit
//             </Text>

//             <Text style={styles.cardDescription}>
//               Get outfit suggestions according to occasion
//             </Text>

//           </Pressable>


//           <Pressable
//             style={styles.featureCard}
//             onPress={() =>
//               requireLogin('SavedOutfitsScreen')
//             }
//           >

//             <Text style={styles.icon}>
//               ❤️
//             </Text>

//             <Text style={styles.cardTitle}>
//               Saved Outfits
//             </Text>

//             <Text style={styles.cardDescription}>
//               View your favorite outfit combinations
//             </Text>

//           </Pressable>

//         </View>


//         {/* =================================================
//             ROW 3
//         ================================================= */}

//         <View style={styles.row}>

//           <Pressable
//             style={styles.featureCard}
//             onPress={() =>
//               requireLogin('TryOutfitScreen')
//             }
//           >

//             <Text style={styles.icon}>
//               📷
//             </Text>

//             <Text style={styles.cardTitle}>
//               Try Outfit
//             </Text>

//             <Text style={styles.cardDescription}>
//               See the outfit on your photo
//             </Text>

//           </Pressable>


//           <Pressable
//             style={styles.featureCard}
//             onPress={() =>
//               requireLogin('CalendarScreen')
//             }
//           >

//             <Text style={styles.icon}>
//               📅
//             </Text>

//             <Text style={styles.cardTitle}>
//               Calendar
//             </Text>

//             <Text style={styles.cardDescription}>
//               Plan your outfits for each day
//             </Text>

//           </Pressable>

//         </View>


//         {/* =================================================
//             SMART STYLE
//         ================================================= */}

//         <Pressable
//           style={styles.smartCard}
//           onPress={() =>
//             requireLogin('SuggestOutfitsScreen')
//           }
//         >

//           <Text style={styles.smartIcon}>
//             ✨
//           </Text>

//           <View style={styles.smartContent}>

//             <Text style={styles.smartTitle}>
//               Smart Style Suggestion
//             </Text>

//             <Text style={styles.smartText}>
//               Add clothes to your wardrobe and get
//               personalized outfit recommendations.
//             </Text>

//           </View>

//         </Pressable>


//         {/* =================================================
//             AUTH BUTTONS
//         ================================================= */}

//         {!isLoggedIn && (

//           <View style={styles.authButtonGroup}>

//             <Pressable
//               style={styles.loginButton}
//               onPress={() =>
//                 navigation.navigate('LoginScreen')
//               }
//             >

//               <Text style={styles.loginText}>
//                 Log In
//               </Text>

//             </Pressable>


//             <Pressable
//               style={styles.signupButton}
//               onPress={() =>
//                 navigation.navigate('SignupScreen')
//               }
//             >

//               <Text style={styles.signupText}>
//                 Sign Up
//               </Text>

//             </Pressable>

//           </View>

//         )}

//       </ScrollView>


//       {/* =================================================
//           BOTTOM NAV
//       ================================================= */}

//       <View style={styles.bottomNav}>


//         <Pressable
//           style={styles.navItem}
//           onPress={() =>
//             navigation.navigate('HomeScreen')
//           }
//         >

//           <Text style={styles.navIcon}>
//             🏠
//           </Text>

//           <Text style={styles.activeNavText}>
//             Home
//           </Text>

//         </Pressable>


//         <Pressable
//           style={styles.navItem}
//           onPress={() =>
//             requireLogin('WardrobeScreen')
//           }
//         >

//           <Text style={styles.navIcon}>
//             👗
//           </Text>

//           <Text style={styles.navText}>
//             Wardrobe
//           </Text>

//         </Pressable>


//         <Pressable
//           style={styles.addButton}
//           onPress={() =>
//             requireLogin('CreateScreen')
//           }
//         >

//           <Text style={styles.addText}>
//             +
//           </Text>

//         </Pressable>


//         <Pressable
//           style={styles.navItem}
//           onPress={() =>
//             requireLogin('CalendarScreen')
//           }
//         >

//           <Text style={styles.navIcon}>
//             📅
//           </Text>

//           <Text style={styles.navText}>
//             Calendar
//           </Text>

//         </Pressable>


//         <Pressable
//           style={styles.navItem}
//           onPress={() =>
//             navigation.navigate('ProfileScreen')
//           }
//         >

//           <Text style={styles.navIcon}>
//             👤
//           </Text>

//           <Text style={styles.navText}>
//             Profile
//           </Text>

//         </Pressable>

//       </View>

//     </View>
//   );
// }


// // =====================================================
// // STYLES
// // =====================================================

// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     backgroundColor: '#488eae',
//   },

//   scrollContent: {
//     padding: 20,
//     paddingBottom: 110,
//   },


//   // HEADER

//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 35,
//     marginBottom: 20,
//   },

//   greeting: {
//     fontSize: 16,
//     color: '#777',
//   },

//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#0d0101',
//     marginTop: 3,
//   },

//   profileButton: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: '#ffffff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 2,
//   },

//   profileIcon: {
//     fontSize: 23,
//   },


//   // WEATHER

//   weatherCard: {
//     backgroundColor: '#0e4c64',
//     borderRadius: 22,
//     padding: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 28,
//   },

//   weatherLeft: {
//     flex: 1,
//   },

//   weatherRight: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginLeft: 10,
//   },

//   weatherTitle: {
//     color: '#dddddd',
//     fontSize: 13,
//   },

//   cityText: {
//     color: '#bbbbbb',
//     fontSize: 11,
//     marginTop: 4,
//   },

//   temperature: {
//     color: '#ffffff',
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginTop: 4,
//   },

//   weatherText: {
//     color: '#bbbbbb',
//     fontSize: 12,
//     marginTop: 4,
//     paddingRight: 5,
//   },

//   weatherEmoji: {
//     fontSize: 52,
//   },

//   loadingText: {
//     color: '#bbbbbb',
//     fontSize: 12,
//     marginTop: 8,
//   },

//   weatherDetails: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginTop: 10,
//   },

//   detailText: {
//     color: '#dddddd',
//     fontSize: 9,
//     marginRight: 9,
//     marginTop: 3,
//   },

//   refreshButton: {
//     marginTop: 8,
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: 'rgba(255,255,255,0.15)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   refreshText: {
//     color: '#ffffff',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },


//   // SECTION

//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#0d0101',
//     marginBottom: 15,
//   },


//   // ROW

//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 15,
//   },


//   // CARD

//   featureCard: {
//     width: '48%',
//     backgroundColor: '#d9f0f8',
//     borderRadius: 20,
//     padding: 16,
//     minHeight: 155,
//     elevation: 2,
//   },

//   icon: {
//     fontSize: 32,
//     marginBottom: 12,
//   },

//   cardTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#0d0101',
//     marginBottom: 6,
//   },

//   cardDescription: {
//     fontSize: 12,
//     lineHeight: 17,
//     color: '#777',
//   },


//   // SMART CARD

//   smartCard: {
//     backgroundColor: '#ead9cc',
//     borderRadius: 20,
//     padding: 18,
//     marginTop: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   smartIcon: {
//     fontSize: 30,
//     marginRight: 15,
//   },

//   smartContent: {
//     flex: 1,
//   },

//   smartTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#0d0101',
//     marginBottom: 5,
//   },

//   smartText: {
//     fontSize: 12,
//     lineHeight: 17,
//     color: '#555',
//   },


//   // AUTH

//   authButtonGroup: {
//     marginTop: 24,
//   },

//   loginButton: {
//     backgroundColor: '#022030',
//     borderRadius: 16,
//     paddingVertical: 16,
//     alignItems: 'center',
//     marginBottom: 14,
//   },

//   loginText: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },

//   signupButton: {
//     backgroundColor: '#022030',
//     borderRadius: 16,
//     paddingVertical: 16,
//     alignItems: 'center',
//     borderWidth: 1.5,
//     borderColor: '#0d0101',
//   },

//   signupText: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },


//   // BOTTOM NAV

//   bottomNav: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 75,
//     backgroundColor: '#ffffff',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     borderTopWidth: 1,
//     borderTopColor: '#eeeeee',
//   },

//   navItem: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 60,
//   },

//   navIcon: {
//     fontSize: 20,
//     marginBottom: 3,
//   },

//   navText: {
//     fontSize: 10,
//     color: '#888',
//   },

//   activeNavText: {
//     fontSize: 10,
//     color: '#0d0101',
//     fontWeight: 'bold',
//   },

//   addButton: {
//     width: 52,
//     height: 52,
//     borderRadius: 26,
//     backgroundColor: '#0d0101',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: -25,
//     elevation: 4,
//   },

//   addText: {
//     color: '#ffffff',
//     fontSize: 30,
//     fontWeight: '300',
//     marginTop: -2,
//   },

// });
import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';

import * as Location from 'expo-location';

export default function HomeScreen({
  navigation,
  isLoggedIn = false,
}) {

  // =====================================================
  // WEATHER
  // =====================================================

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [weatherLoading, setWeatherLoading] = useState(true);

  // =====================================================
  // WEATHER ON OPEN
  // =====================================================

  useEffect(() => {
    getWeather();
  }, []);

  // =====================================================
  // LOGIN CHECK
  // =====================================================

  /*
  const requireLogin = (screenName) => {

    if (isLoggedIn) {
      navigation.navigate(screenName);
      return;
    }

    Alert.alert(
      'Login Required',
      'Please login or create an account to use this feature.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },

        {
          text: 'Sign Up',
          onPress: () =>
            navigation.navigate('SignupScreen'),
        },

        {
          text: 'Login',
          onPress: () =>
            navigation.navigate('LoginScreen'),
        },
      ]
    );
  };
  */

  // =====================================================
  // WEATHER
  // =====================================================

  const getWeather = async () => {

    try {

      setWeatherLoading(true);

      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {

        Alert.alert(
          'Location Permission',
          'Please allow location permission to show your current weather.'
        );

        setWeatherLoading(false);

        return;
      }

      const location =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

      const latitude =
        location.coords.latitude;

      const longitude =
        location.coords.longitude;

      // =================================================
      // CITY
      // =================================================

      const address =
        await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

      if (address && address.length > 0) {

        const place = address[0];

        const currentCity =
          place.city ||
          place.district ||
          place.subregion ||
          place.region ||
          'Current Location';

        setCity(currentCity);
      }

      // =================================================
      // OPEN-METEO
      // =================================================

      const weatherURL =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m` +
        `&timezone=auto`;

      const response =
        await fetch(weatherURL);

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error('Weather API error');
      }

      setWeather({

        temperature:
          data.current.temperature_2m,

        feelsLike:
          data.current.apparent_temperature,

        precipitation:
          data.current.precipitation,

        weatherCode:
          data.current.weather_code,

        windSpeed:
          data.current.wind_speed_10m,

      });

    } catch (error) {

      console.log('Weather Error:', error);

      Alert.alert(
        'Weather Error',
        'Unable to get your current weather. Please try again.'
      );

    } finally {

      setWeatherLoading(false);

    }
  };

  // =====================================================
  // WEATHER INFO
  // =====================================================

  const getWeatherInfo = (code) => {

    if (code === 0) {

      return {
        emoji: '☀️',
        condition: 'Sunny',
        description: 'Perfect for a casual look',
      };

    }

    if (code === 1 || code === 2) {

      return {
        emoji: '🌤️',
        condition: 'Partly Cloudy',
        description: 'A comfortable day for going out',
      };

    }

    if (code === 3) {

      return {
        emoji: '☁️',
        condition: 'Cloudy',
        description: 'A cloudy day today',
      };

    }

    if (code === 45 || code === 48) {

      return {
        emoji: '🌫️',
        condition: 'Foggy',
        description: 'Visibility may be reduced',
      };

    }

    if (code >= 51 && code <= 57) {

      return {
        emoji: '🌦️',
        condition: 'Drizzle',
        description: 'Light rain may occur',
      };

    }

    if (code >= 61 && code <= 67) {

      return {
        emoji: '🌧️',
        condition: 'Rainy',
        description: 'Carry an umbrella today',
      };

    }

    if (code >= 71 && code <= 77) {

      return {
        emoji: '❄️',
        condition: 'Snowy',
        description: 'Keep yourself warm',
      };

    }

    if (code >= 80 && code <= 82) {

      return {
        emoji: '🌦️',
        condition: 'Rain Showers',
        description: 'Rain showers are possible',
      };

    }

    if (code >= 95) {

      return {
        emoji: '⛈️',
        condition: 'Thunderstorm',
        description: 'Stay safe during the storm',
      };

    }

    return {
      emoji: '🌤️',
      condition: 'Weather',
      description: 'Current weather conditions',
    };
  };

  // =====================================================
  // WEATHER CARD
  // =====================================================

  const renderWeather = () => {

    if (weatherLoading) {

      return (

        <View style={styles.weatherCard}>

          <View>

            <Text style={styles.weatherTitle}>
              Today's Weather
            </Text>

            <Text style={styles.loadingText}>
              Getting your current weather...
            </Text>

          </View>

          <ActivityIndicator
            size="large"
            color="#ffffff"
          />

        </View>
      );
    }

    if (!weather) {

      return (

        <View style={styles.weatherCard}>

          <View>

            <Text style={styles.weatherTitle}>
              Today's Weather
            </Text>

            <Text style={styles.weatherText}>
              Weather unavailable
            </Text>

          </View>

          <Pressable
            onPress={getWeather}
            style={styles.refreshButton}
          >

            <Text style={styles.refreshText}>
              ↻
            </Text>

          </Pressable>

        </View>
      );
    }

    const info =
      getWeatherInfo(weather.weatherCode);

    return (

      <View style={styles.weatherCard}>

        <View style={styles.weatherLeft}>

          <Text style={styles.weatherTitle}>
            Today's Weather
          </Text>

          <Text style={styles.cityText}>
            📍 {city || 'Current Location'}
          </Text>

          <Text style={styles.temperature}>
            {Math.round(weather.temperature)}°C
          </Text>

          <Text style={styles.weatherText}>
            {info.condition} • {info.description}
          </Text>

          <View style={styles.weatherDetails}>

            <Text style={styles.detailText}>
              🌡️ Feels {Math.round(weather.feelsLike)}°C
            </Text>

            <Text style={styles.detailText}>
              💨 {Math.round(weather.windSpeed)} km/h
            </Text>

            <Text style={styles.detailText}>
              💧 {weather.precipitation} mm
            </Text>

          </View>

        </View>

        <View style={styles.weatherRight}>

          <Text style={styles.weatherEmoji}>
            {info.emoji}
          </Text>

          <Pressable
            onPress={getWeather}
            style={styles.refreshButton}
          >

            <Text style={styles.refreshText}>
              ↻
            </Text>

          </Pressable>

        </View>

      </View>
    );
  };

  // =====================================================
  // UI
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

          <View>

            <Text style={styles.greeting}>
              Hello! 👋
            </Text>

            <Text style={styles.title}>
              Outfit Planner
            </Text>

          </View>

          <Pressable
            style={styles.profileButton}
            onPress={() =>
              navigation.navigate('ProfileScreen')
            }
          >

            <Text style={styles.profileIcon}>
              👤
            </Text>

          </Pressable>

        </View>

        {/* =================================================
            WEATHER
        ================================================= */}

        {renderWeather()}

        <Text style={styles.sectionTitle}>
          What do you want to do?
        </Text>

        {/* =================================================
            ROW 1
        ================================================= */}

        <View style={styles.row}>

          <Pressable
            style={styles.featureCard}
            onPress={() =>
              navigation.navigate('CreateOutfitScreen')
            }
          >

            <Text style={styles.icon}>
              🪄
            </Text>

            <Text style={styles.cardTitle}>
              Create Outfit
            </Text>

            <Text style={styles.cardDescription}>
              Create your own outfit combination
            </Text>

          </Pressable>

          <Pressable
            style={styles.featureCard}
            onPress={() =>
              navigation.navigate('WardrobeScreen')
            }
          >

            <Text style={styles.icon}>
              👗
            </Text>

            <Text style={styles.cardTitle}>
              My Wardrobe
            </Text>

            <Text style={styles.cardDescription}>
              Manage your clothes and accessories
            </Text>

          </Pressable>

        </View>

        {/* =================================================
            ROW 2
        ================================================= */}

        <View style={styles.row}>

          <Pressable
            style={styles.featureCard}
            onPress={() =>
              navigation.navigate('SuggestOutfitScreen')
            }
          >

            <Text style={styles.icon}>
              💡
            </Text>

            <Text style={styles.cardTitle}>
              Suggest Outfit
            </Text>

            <Text style={styles.cardDescription}>
              Get outfit suggestions according to occasion
            </Text>

          </Pressable>

          <Pressable
            style={styles.featureCard}
            onPress={() =>
              navigation.navigate('SavedOutfitsScreen')
            }
          >

            <Text style={styles.icon}>
              ❤️
            </Text>

            <Text style={styles.cardTitle}>
              Saved Outfits
            </Text>

            <Text style={styles.cardDescription}>
              View your favorite outfit combinations
            </Text>

          </Pressable>

        </View>

        {/* =================================================
            ROW 3
        ================================================= */}

        <View style={styles.row}>

          <Pressable
            style={styles.featureCard}
            onPress={() =>
              navigation.navigate('TryOutfitScreen')
            }
          >

            <Text style={styles.icon}>
              📷
            </Text>

            <Text style={styles.cardTitle}>
              Try Outfit
            </Text>

            <Text style={styles.cardDescription}>
              See the outfit on your photo
            </Text>

          </Pressable>

          <Pressable
            style={styles.featureCard}
            onPress={() =>
              navigation.navigate('CalendarScreen')
            }
          >

            <Text style={styles.icon}>
              📅
            </Text>

            <Text style={styles.cardTitle}>
              Calendar
            </Text>

            <Text style={styles.cardDescription}>
              Plan your outfits for each day
            </Text>

          </Pressable>

        </View>

        {/* =================================================
            SMART STYLE
        ================================================= */}

        <Pressable
          style={styles.smartCard}
          onPress={() =>
            navigation.navigate('SuggestOutfitScreen')
          }
        >

          <Text style={styles.smartIcon}>
            ✨
          </Text>

          <View style={styles.smartContent}>

            <Text style={styles.smartTitle}>
              Smart Style Suggestion
            </Text>

            <Text style={styles.smartText}>
              Add clothes to your wardrobe and get
              personalized outfit recommendations.
            </Text>

          </View>

        </Pressable>

        {/* =================================================
            AUTH BUTTONS
        ================================================= */}

        {!isLoggedIn && (

          <View style={styles.authButtonGroup}>

            <Pressable
              style={styles.loginButton}
              onPress={() =>
                navigation.navigate('LoginScreen')
              }
            >

              <Text style={styles.loginText}>
                Log In
              </Text>

            </Pressable>

            <Pressable
              style={styles.signupButton}
              onPress={() =>
                navigation.navigate('SignUpScreen')
              }
            >

              <Text style={styles.signupText}>
                Sign Up
              </Text>

            </Pressable>

          </View>

        )}

      </ScrollView>

      {/* =================================================
          BOTTOM NAV
      ================================================= */}

      <View style={styles.bottomNav}>

        <Pressable
          style={styles.navItem}
          onPress={() =>
            navigation.navigate('HomeScreen')
          }
        >

          <Text style={styles.navIcon}>
            🏠
          </Text>

          <Text style={styles.activeNavText}>
            Home
          </Text>

        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() =>
            navigation.navigate('WardrobeScreen')
          }
        >

          <Text style={styles.navIcon}>
            👗
          </Text>

          <Text style={styles.navText}>
            Wardrobe
          </Text>

        </Pressable>

        <Pressable
          style={styles.addButton}
          onPress={() =>
            navigation.navigate('CreateOutfitScreen')
          }
        >

          <Text style={styles.addText}>
            +
          </Text>

        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() =>
            navigation.navigate('CalendarScreen')
          }
        >

          <Text style={styles.navIcon}>
            📅
          </Text>

          <Text style={styles.navText}>
            Calendar
          </Text>

        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() =>
            navigation.navigate('ProfileScreen')
          }
        >

          <Text style={styles.navIcon}>
            👤
          </Text>

          <Text style={styles.navText}>
            Profile
          </Text>

        </Pressable>

      </View>

    </View>
  );
}

// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#5ebeea',
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 110,
  },

  // HEADER

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 20,
  },

  greeting: {
    fontSize: 18,
    color: '#f5f4f4',
    
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0d0101',
    marginTop: 3,
  },

  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },

  profileIcon: {
    fontSize: 23,
  },

  // WEATHER

  weatherCard: {
    backgroundColor: '#0e4c64',
    borderRadius: 22,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },

  weatherLeft: {
    flex: 1,
  },

  weatherRight: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },

  weatherTitle: {
    color: '#dddddd',
    fontSize: 13,
  },

  cityText: {
    color: '#bbbbbb',
    fontSize: 11,
    marginTop: 4,
  },

  temperature: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 4,
  },

  weatherText: {
    color: '#bbbbbb',
    fontSize: 12,
    marginTop: 4,
    paddingRight: 5,
  },

  weatherEmoji: {
    fontSize: 52,
  },

  loadingText: {
    color: '#bbbbbb',
    fontSize: 12,
    marginTop: 8,
  },

  weatherDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },

  detailText: {
    color: '#dddddd',
    fontSize: 9,
    marginRight: 9,
    marginTop: 3,
  },

  refreshButton: {
    marginTop: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  refreshText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  // SECTION

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0d0101',
    marginBottom: 15,
  },

  // ROW

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  // CARD

  featureCard: {
    width: '48%',
    backgroundColor: '#d9f0f8',
    borderRadius: 20,
    padding: 16,
    minHeight: 155,
    elevation: 2,
  },

  icon: {
    fontSize: 32,
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0d0101',
    marginBottom: 6,
  },

  cardDescription: {
    fontSize: 12,
    lineHeight: 17,
    color: '#777',
  },

  // SMART CARD

  smartCard: {
    backgroundColor: '#ead9cc',
    borderRadius: 20,
    padding: 18,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },

  smartIcon: {
    fontSize: 30,
    marginRight: 15,
  },

  smartContent: {
    flex: 1,
  },

  smartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0d0101',
    marginBottom: 5,
  },

  smartText: {
    fontSize: 12,
    lineHeight: 17,
    color: '#555',
  },

  // AUTH

  authButtonGroup: {
    marginTop: 24,
  },

  loginButton: {
    backgroundColor: '#022030',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 14,
  },

  loginText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  signupButton: {
    backgroundColor: '#022030',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#0d0101',
  },

  signupText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // BOTTOM NAV

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
  },

  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },

  navIcon: {
    fontSize: 20,
    marginBottom: 3,
  },

  navText: {
    fontSize: 10,
    color: '#888',
  },

  activeNavText: {
    fontSize: 10,
    color: '#0d0101',
    fontWeight: 'bold',
  },

  addButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#0d0101',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -25,
    elevation: 4,
  },

  addText: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '300',
    marginTop: -2,
  },

});