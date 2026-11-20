

// import React, { useEffect, useState } from 'react';

// import {
//   View,
//   Text,
//   TextInput,
//   Pressable,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';

// import * as Location from 'expo-location';

// // import { GoogleGenAI } from '@google/genai';<-----------------------------------------------------


// // =====================================================
// // GEMINI API
// // =====================================================

// // const GEMINI_API_KEY =  process.env.EXPO_PUBLIC_GEMINI_API_KEY;
// // const ai = new GoogleGenAI({
// //   apiKey: GEMINI_API_KEY,
// // });<-------------------------------------------------------------------------------------------------------


// // =====================================================
// // SUGGEST OUTFIT SCREEN
// // =====================================================

// export default function SuggestOutfitScreen({

//   navigation,

//   wardrobeItems = [],

//   savedOutfits = [],

//   setSavedOutfits,

//   isLoggedIn = false,

//   user = {},

// }) {
    

//   // ===================================================
//   // STATES
//   // ===================================================

//   const [occasion, setOccasion] = useState('');

//   const [loading, setLoading] = useState(false);

//   const [recommendation, setRecommendation] = useState('');

//   const [weather, setWeather] = useState(null);

//   const [weatherLoading, setWeatherLoading] = useState(true);

//   const [locationName, setLocationName] = useState('');


//   // ===================================================
//   // GET WEATHER WHEN SCREEN OPENS
//   // ===================================================

//   useEffect(() => {

//     getWeather();

//   }, []);


//   // ===================================================
//   // LOGIN REQUIRED
//   // ===================================================

//   const requireLogin = () => {

//     Alert.alert(

//       'Login Required',

//       'Please login or signup to use AI outfit suggestions.',

//       [

//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },

//         {
//           text: 'Login',

//           onPress: () => {

//             navigation.navigate('LoginScreen');

//           },

//         },

//         {
//           text: 'Sign Up',

//           onPress: () => {

//             navigation.navigate('SignUpScreen');

//           },

//         },

//       ]

//     );

//   };


//   // ===================================================
//   // WEATHER
//   // ===================================================

//   const getWeather = async () => {

//     try {

//       setWeatherLoading(true);


//       // ------------------------------------------------
//       // LOCATION PERMISSION
//       // ------------------------------------------------

//       const { status } =
//         await Location.requestForegroundPermissionsAsync();


//       if (status !== 'granted') {

//         Alert.alert(

//           'Location Permission',

//           'Please allow location permission to get current weather.'

//         );

//         setWeatherLoading(false);

//         return;

//       }


//       // ------------------------------------------------
//       // GET LOCATION
//       // ------------------------------------------------

//       const location =
//         await Location.getCurrentPositionAsync({

//           accuracy: Location.Accuracy.Balanced,

//         });


//       const latitude =
//         location.coords.latitude;

//       const longitude =
//         location.coords.longitude;


//       // ------------------------------------------------
//       // REVERSE GEOCODING
//       // ------------------------------------------------

//       try {

//         const address =
//           await Location.reverseGeocodeAsync({

//             latitude,
//             longitude,

//           });


//         if (
//           address &&
//           address.length > 0
//         ) {

//           const place =
//             address[0];


//           const city =
//             place.city ||
//             place.district ||
//             place.subregion ||
//             place.region ||
//             'Current Location';


//           setLocationName(city);

//         }

//       } catch (geoError) {

//         console.log(
//           'Reverse Geocode Error:',
//           geoError
//         );

//         setLocationName(
//           'Current Location'
//         );

//       }


//       // ------------------------------------------------
//       // OPEN-METEO
//       // ------------------------------------------------

//       const url =
//         `https://api.open-meteo.com/v1/forecast` +
//         `?latitude=${latitude}` +
//         `&longitude=${longitude}` +
//         `&current=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m` +
//         `&timezone=auto`;


//       const response =
//         await fetch(url);


//       const data =
//         await response.json();


//       if (!response.ok) {

//         throw new Error(
//           'Weather API request failed'
//         );

//       }


//       if (!data.current) {

//         throw new Error(
//           'Weather data unavailable'
//         );

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

//       console.log(
//         'Weather Error:',
//         error
//       );


//       Alert.alert(

//         'Weather Error',

//         'Could not get current weather. Please try again.'

//       );


//     } finally {

//       setWeatherLoading(false);

//     }

//   };


//   // ===================================================
//   // WEATHER DESCRIPTION
//   // ===================================================

//   const getWeatherDescription = (code) => {

//     if (code === 0) {

//       return 'Clear Sky ☀️';

//     }


//     if (
//       code === 1 ||
//       code === 2
//     ) {

//       return 'Partly Cloudy ⛅';

//     }


//     if (code === 3) {

//       return 'Cloudy ☁️';

//     }


//     if (
//       code === 45 ||
//       code === 48
//     ) {

//       return 'Foggy 🌫️';

//     }


//     if (
//       code >= 51 &&
//       code <= 57
//     ) {

//       return 'Drizzle 🌦️';

//     }


//     if (
//       code >= 61 &&
//       code <= 67
//     ) {

//       return 'Rainy 🌧️';

//     }


//     if (
//       code >= 71 &&
//       code <= 77
//     ) {

//       return 'Snowy ❄️';

//     }


//     if (
//       code >= 80 &&
//       code <= 82
//     ) {

//       return 'Rain Showers 🌦️';

//     }


//     if (code >= 95) {

//       return 'Thunderstorm ⛈️';

//     }


//     return 'Unknown Weather';

//   };


//   // ===================================================
//   // WEATHER EMOJI
//   // ===================================================

//   const getWeatherEmoji = (code) => {

//     if (code === 0) {

//       return '☀️';

//     }


//     if (
//       code === 1 ||
//       code === 2
//     ) {

//       return '⛅';

//     }


//     if (code === 3) {

//       return '☁️';

//     }


//     if (
//       code === 45 ||
//       code === 48
//     ) {

//       return '🌫️';

//     }


//     if (
//       code >= 51 &&
//       code <= 57
//     ) {

//       return '🌦️';

//     }


//     if (
//       code >= 61 &&
//       code <= 67
//     ) {

//       return '🌧️';

//     }


//     if (
//       code >= 71 &&
//       code <= 77
//     ) {

//       return '❄️';

//     }


//     if (
//       code >= 80 &&
//       code <= 82
//     ) {

//       return '🌦️';

//     }


//     if (code >= 95) {

//       return '⛈️';

//     }


//     return '🌤️';

//   };


//   // ===================================================
//   // CONVERT WARDROBE TO TEXT
//   // ===================================================

//   const createWardrobeText = () => {

//     if (
//       !wardrobeItems ||
//       wardrobeItems.length === 0
//     ) {

//       return 'NO WARDROBE ITEMS AVAILABLE.';

//     }


//     return wardrobeItems

//       .map((item, index) => {

//         // ---------------------------------------------
//         // STRING ITEM
//         // ---------------------------------------------

//         if (
//           typeof item === 'string'
//         ) {

//           return (
//             `${index + 1}. ${item}`
//           );

//         }


//         // ---------------------------------------------
//         // OBJECT ITEM
//         // ---------------------------------------------

//         const name =
//           item?.name ||
//           item?.title ||
//           item?.itemName ||
//           'Unnamed clothing item';


//         const category =
//           item?.category ||
//           item?.type ||
//           'Unknown category';


//         const color =
//           item?.color ||
//           item?.colour ||
//           'Unknown color';


//         const size =
//           item?.size ||
//           '';


//         return (

//           `${index + 1}. ` +

//           `Name: ${name} | ` +

//           `Category: ${category} | ` +

//           `Color: ${color}` +

//           `${size ? ` | Size: ${size}` : ''}`

//         );

//       })

//       .join('\n');

//   };


//   // ===================================================
//   // GET RECOMMENDATION
//   // ===================================================

//   const getRecommendation = () => {

//     if (!isLoggedIn) {

//       requireLogin();

//       return;

//     }


//     generateRecommendation();

//   };


//   // ===================================================
//   // GENERATE AI OUTFIT
//   // ===================================================

//   const generateRecommendation = async () => {


//     // -------------------------------------------------
//     // OCCASION VALIDATION
//     // -------------------------------------------------

//     if (!occasion.trim()) {

//       Alert.alert(

//         'Enter Occasion',

//         'Please enter an occasion first.\n\nExample: College'

//       );

//       return;

//     }


//     // -------------------------------------------------
//     // WEATHER VALIDATION
//     // -------------------------------------------------

//     if (!weather) {

//       Alert.alert(

//         'Weather Unavailable',

//         'Please wait until weather information is available.'

//       );

//       return;

//     }


//     // -------------------------------------------------
//     // API KEY VALIDATION
//     // -------------------------------------------------

//     if (
//       !GEMINI_API_KEY ||
//       GEMINI_API_KEY !==  process.env.EXPO_PUBLIC_GEMINI_API_KEY
//     ) {

//       // Alert.alert(

//       //   'Gemini API Key Missing',

//       //   'Please add your Gemini API key at the top of SuggestOutfitScreen.js.'

//       // );

//       // return;

//     }


//     // -------------------------------------------------
//     // START LOADING
//     // -------------------------------------------------

//     setLoading(true);

//     setRecommendation('');


//     try {


//       // ------------------------------------------------
//       // WARDROBE
//       // ------------------------------------------------

//       const wardrobeText =
//         createWardrobeText();


//       // ------------------------------------------------
//       // WEATHER
//       // ------------------------------------------------

//       const weatherText = `

// Location:
// ${locationName || 'Current Location'}

// Temperature:
// ${weather.temperature}°C

// Feels Like:
// ${weather.feelsLike}°C

// Condition:
// ${getWeatherDescription(weather.weatherCode)}

// Precipitation:
// ${weather.precipitation} mm

// Wind Speed:
// ${weather.windSpeed} km/h

// `;


//       // =================================================
//       // AI PROMPT
//       // =================================================

// //       const prompt = `

// // You are an expert professional fashion stylist.

// // Create EXACTLY ONE complete outfit for the user.

// // IMPORTANT RULES:

// // 1. Prefer clothing items from the user's wardrobe.

// // 2. Do NOT invent clothing items when suitable wardrobe items exist.

// // 3. Consider the user's occasion.

// // 4. Consider current temperature.

// // 5. Consider feels-like temperature.

// // 6. Consider rain.

// // 7. Consider wind.

// // 8. Consider comfort.

// // 9. Consider practicality.

// // 10. Consider color matching.

// // 11. Consider occasion appropriateness.

// // 12. Give EXACTLY ONE outfit.

// // 13. Do NOT give multiple outfit options.

// // 14. Do NOT say "you can choose".

// // 15. TOP must always be included.

// // 16. BOTTOM must always be included.

// // 17. SHOES must always be included.

// // 18. OUTERWEAR must always be included.

// // 19. ACCESSORIES must always be included.

// // 20. If outerwear is unnecessary, write "Not needed".

// // 21. If accessories are unnecessary, write "Not needed".

// // 22. The outfit must be realistic and wearable.

// // 23. Keep the answer concise.

// // USER:
// // ${user?.name || 'User'}


// // WARDROBE:
// // ${wardrobeText}


// // OCCASION:
// // ${occasion.trim()}


// // CURRENT WEATHER:
// // ${weatherText}


// // RETURN EXACTLY THIS FORMAT:

// // 👕 TOP:
// // [one specific top]

// // 👖 BOTTOM:
// // [one specific bottom]

// // 👟 SHOES:
// // [one specific pair of shoes]

// // 🧥 OUTERWEAR:
// // [one specific outerwear item OR "Not needed"]

// // 👜 ACCESSORIES:
// // [one or two specific accessories OR "Not needed"]

// // 🌤️ WEATHER TIP:
// // [one short practical weather tip]

// // ✨ WHY:
// // [one or two short sentences explaining why this complete outfit works]


// // FINAL CHECK:

// // ✓ One outfit only
// // ✓ Top included
// // ✓ Bottom included
// // ✓ Shoes included
// // ✓ Outerwear included
// // ✓ Accessories included
// // ✓ Weather considered
// // ✓ Occasion considered
// // ✓ Wardrobe considered

// // `;
// const prompt = `

// You are an expert professional fashion stylist and personal wardrobe assistant.

// Your job is to create EXACTLY ONE realistic, stylish, wearable outfit using the user's wardrobe, current weather, temperature, feels-like temperature, wind, rain, occasion, colors, fabric suitability, and comfort.

// ====================================================
// CORE RULE
// ====================================================

// Create ONE complete outfit only.

// The outfit should feel like something a real person would actually wear for the given occasion and weather.

// DO NOT repeatedly recommend the same combination if other suitable wardrobe items are available.

// Use intelligent variation between suitable wardrobe items.

// ====================================================
// WARDROBE RULES
// ====================================================

// 1. FIRST analyze the user's wardrobe carefully.

// 2. Prefer existing wardrobe items whenever they are suitable.

// 3. Do NOT invent clothing items if a suitable item already exists in the wardrobe.

// 4. If multiple suitable items are available, choose the combination that best matches:
//    - weather
//    - occasion
//    - color harmony
//    - fabric
//    - comfort
//    - practicality
//    - overall style

// 5. Avoid always selecting the first or most obvious wardrobe item.

// 6. Rotate between suitable wardrobe pieces across different recommendations.

// 7. Do not force an item into the outfit simply to use it.

// 8. If the wardrobe contains different fabrics, select fabric according to the weather.

// ====================================================
// WEATHER + FABRIC LOGIC
// ====================================================

// Use the actual temperature and feels-like temperature to determine fabric suitability.

// HOT WEATHER:
// Prefer lightweight and breathable fabrics such as:
// - cotton
// - linen
// - rayon
// - viscose
// - lightweight blends

// Avoid unnecessarily heavy fabrics such as:
// - wool
// - thick denim
// - heavy fleece
// - thick sweaters
// - heavy leather

// WARM WEATHER:
// Prefer:
// - cotton
// - linen
// - viscose
// - lightweight denim
// - breathable blends

// COOL WEATHER:
// Prefer:
// - denim
// - cotton blends
// - thicker cotton
// - knitwear
// - corduroy
// - lightweight wool

// COLD WEATHER:
// Prefer:
// - wool
// - fleece
// - thick knitwear
// - layered cotton
// - warm denim
// - heavier fabrics

// RAINY WEATHER:
// Prefer practical fabrics and layers that handle moisture better.

// Avoid recommending delicate or uncomfortable clothing when rain is significant.

// WINDY WEATHER:
// Consider wind chill and choose appropriate outerwear or layers.

// IMPORTANT:
// Do not mention a fabric that is not present in the wardrobe unless you are describing why a wardrobe item is suitable.

// ====================================================
// COLOR STYLING
// ====================================================

// Do not randomly combine colors.

// Create intentional color coordination.

// Use principles such as:

// - neutral + accent color
// - monochromatic shades
// - complementary colors
// - analogous colors
// - balanced light + dark combinations
// - warm + neutral combinations
// - cool + neutral combinations

// Examples:

// White / cream / beige can work with:
// - blue
// - brown
// - black
// - olive
// - pastel shades

// Black can work with:
// - white
// - beige
// - grey
// - burgundy
// - denim
// - muted colors

// Blue denim can work with:
// - white
// - black
// - beige
// - pastel colors
// - earthy tones

// Avoid combinations that look visually mismatched unless the occasion specifically calls for bold styling.

// ====================================================
// OCCASION LOGIC
// ====================================================

// Adapt the outfit to the occasion.

// COLLEGE / CASUAL:
// Prioritize:
// - comfort
// - practical footwear
// - breathable fabrics
// - relaxed but polished combinations

// OFFICE / FORMAL:
// Prioritize:
// - structured silhouettes
// - subtle colors
// - polished footwear
// - minimal accessories

// PARTY:
// Prioritize:
// - stylish silhouettes
// - stronger color combinations
// - statement accessories
// - dressier footwear when available

// DATE:
// Prioritize:
// - flattering combinations
// - coordinated colors
// - elegant but comfortable styling

// TRAVEL:
// Prioritize:
// - comfort
// - layering
// - practical fabrics
// - comfortable footwear

// FESTIVE / TRADITIONAL:
// Prioritize:
// - culturally appropriate clothing
// - coordinated colors
// - suitable accessories

// ====================================================
// OUTFIT VARIETY
// ====================================================

// IMPORTANT:

// Do not keep generating the same outfit structure.

// When multiple suitable wardrobe items exist, vary:

// - top
// - bottom
// - shoes
// - outerwear
// - accessories
// - color combinations
// - fabric combinations
// - layering

// For example, if the wardrobe contains several suitable tops, do NOT always choose the same top.

// However, NEVER sacrifice weather suitability or occasion appropriateness just to create variety.

// ====================================================
// LAYERING
// ====================================================

// Use layering intelligently.

// For cold or cool weather:
// Top + outerwear should provide realistic warmth.

// For mild/warm weather:
// Use lightweight layers only when appropriate.

// For hot weather:
// Avoid unnecessary layering.

// For rain:
// Consider whether outerwear should provide practical protection.

// ====================================================
// OUTERWEAR
// ====================================================

// OUTERWEAR must always be included in the response.

// If the weather does not require outerwear, write:

// Not needed

// Do NOT force a jacket, coat, sweater, or cardigan into hot weather.

// ====================================================
// ACCESSORIES
// ====================================================

// Include 1–2 accessories when they genuinely improve the outfit.

// Choose accessories based on:
// - occasion
// - color coordination
// - weather
// - practicality
// - outfit style

// Examples:
// - watch
// - handbag
// - tote bag
// - belt
// - scarf
// - earrings
// - necklace
// - sunglasses
// - cap

// If accessories are unnecessary, write:

// Not needed

// ====================================================
// FOOTWEAR
// ====================================================

// Shoes must be practical for both the occasion and weather.

// For rain, avoid footwear that would be impractical if suitable alternatives exist.

// For college/travel, prioritize comfort.

// For formal occasions, prioritize polished footwear.

// ====================================================
// REALISTIC STYLING
// ====================================================

// The outfit must look like a naturally styled real-world outfit.

// Do NOT create unrealistic combinations such as:

// - heavy winter layers in hot weather
// - sweaters with shorts unless stylistically/weather appropriate
// - formal shoes for casual outdoor activities
// - excessive accessories
// - conflicting colors
// - impractical rain outfits
// - too many layers
// - clothing that does not match the occasion

// Think like a professional stylist, not like a random clothing generator.

// ====================================================
// USER INFORMATION
// ====================================================

// USER:
// ${user?.name || 'User'}

// WARDROBE:
// ${wardrobeText}

// OCCASION:
// ${occasion.trim()}

// CURRENT WEATHER:
// ${weatherText}

// ====================================================
// FINAL STYLING DECISION
// ====================================================

// Before answering, internally evaluate:

// 1. What is the weather?
// 2. What is the feels-like temperature?
// 3. Is it raining?
// 4. Is it windy?
// 5. Is the weather hot, warm, mild, cool, or cold?
// 6. Which wardrobe fabrics are appropriate?
// 7. Which wardrobe colors coordinate well?
// 8. What is appropriate for the occasion?
// 9. Which wardrobe combination has NOT been overused?
// 10. Is the outfit comfortable and practical?

// Then select the BEST single combination.

// Do not show this analysis.

// ====================================================
// RETURN EXACTLY THIS FORMAT
// ====================================================

// 👕 TOP:
// [one specific wardrobe top + color + fabric if available]

// 👖 BOTTOM:
// [one specific wardrobe bottom + color + fabric if available]

// 👟 SHOES:
// [one specific pair of wardrobe shoes]

// 🧥 OUTERWEAR:
// [one specific wardrobe outerwear item OR "Not needed"]

// 👜 ACCESSORIES:
// [one or two specific wardrobe accessories OR "Not needed"]

// 🌤️ WEATHER TIP:
// [one short practical weather tip mentioning the relevant weather/fabric/layering consideration]

// ✨ WHY:
// [1–2 concise sentences explaining the color coordination, fabric suitability, weather suitability, and occasion suitability]

// ====================================================
// FINAL CHECK
// ====================================================

// ✓ EXACTLY ONE outfit
// ✓ Top included
// ✓ Bottom included
// ✓ Shoes included
// ✓ Outerwear included or "Not needed"
// ✓ Accessories included or "Not needed"
// ✓ Existing wardrobe prioritized
// ✓ Weather considered
// ✓ Temperature considered
// ✓ Feels-like temperature considered
// ✓ Rain considered
// ✓ Wind considered
// ✓ Fabric considered
// ✓ Color coordination considered
// ✓ Occasion considered
// ✓ Comfort considered
// ✓ Practicality considered
// ✓ Outfit variation considered
// ✓ Realistic and wearable
// ✓ No alternative outfits
// ✓ No "you can choose"
// ✓ No multiple options

// `;


//       // =================================================
//       // GEMINI 3.1 FLASH-LITE
//       // =================================================

//       console.log(
//         'Sending wardrobe + occasion + weather to Gemini...'
//       );


//       const response =
//         await ai.models.generateContent({

//           model: 'gemini-3.1-flash-lite',

//           contents: prompt,

//           config: {

//             thinkingConfig: {

//               thinkingLevel: 'low',

//             },

//             maxOutputTokens: 700,

//           },

//         });


//       // ------------------------------------------------
//       // GET RESPONSE
//       // ------------------------------------------------
//         console.log('api response',response)
//       const reply =
//         response?.text?.trim();


//       if (!reply) {

//         throw new Error(
//           'Gemini returned an empty response.'
//         );

//       }


//       console.log(
//         'Gemini response received.'
//       );


//       setRecommendation(reply);


//     } catch (error) {

//       console.log(
//         'Gemini API Error:',
//         error
//       );


//       const errorText =
//         String(
//           error?.message ||
//           error
//         );


//       let message =
//         'Could not generate outfit recommendation.';


//       if (
//         errorText.includes(
//           'API_KEY_INVALID'
//         ) ||
//         errorText.includes(
//           'API key not valid'
//         )
//       ) {

//         message =
//           'Your Gemini API key is invalid. Please check your Google AI Studio API key.';

//       }


//       else if (
//         errorText.includes('404') ||
//         errorText.includes('NOT_FOUND')
//       ) {

//         message =
//           'The Gemini model is unavailable for this API request. Check the model name and API access.';

//       }


//       else if (
//         errorText.includes('429') ||
//         errorText.includes('RESOURCE_EXHAUSTED')
//       ) {

//         message =
//           'Gemini API rate limit reached. Please wait and try again.';

//       }


//       else if (
//         errorText.includes('403') ||
//         errorText.includes('PERMISSION_DENIED')
//       ) {

//         message =
//           'Gemini API access was denied. Check your API key and Google AI Studio project.';

//       }


//       Alert.alert(

//         'Gemini Error',

//         message

//       );

//     }


//     finally {

//       setLoading(false);

//     }

//   };


//   // ===================================================
//   // SAVE OUTFIT
//   // ===================================================

//   const handleSave = () => {


//     if (!isLoggedIn) {

//       requireLogin();

//       return;

//     }


//     if (!recommendation) {

//       Alert.alert(

//         'No Outfit',

//         'Generate an outfit first.'

//       );

//       return;

//     }


//     const newOutfit = {

//       id:
//         Date.now().toString(),

//       occasion:
//         occasion.trim(),

//       description:
//         recommendation,

//       weather: {

//         temperature:
//           weather?.temperature,

//         feelsLike:
//           weather?.feelsLike,

//         condition:

//           weather

//             ? getWeatherDescription(
//                 weather.weatherCode
//               )

//             : 'Unknown',

//       },

//       createdAt:
//         new Date().toISOString(),

//     };


//     if (setSavedOutfits) {

//       setSavedOutfits([

//         ...(savedOutfits || []),

//         newOutfit,

//       ]);

//     }


//     Alert.alert(

//       'Saved ❤️',

//       'Complete outfit saved successfully!'

//     );

//   };


//   // ===================================================
//   // CLEAR / GENERATE AGAIN
//   // ===================================================

//   const handleClear = () => {

//     setRecommendation('');

//     setOccasion('');

//   };


//   // ===================================================
//   // UI
//   // ===================================================

//   return (

//     <View style={styles.container}>

//       <ScrollView

//         showsVerticalScrollIndicator={false}

//         contentContainerStyle={
//           styles.scrollContent
//         }

//       >


//         {/* ==========================================
//             HEADER
//         ========================================== */}

//         <View style={styles.header}>


//           <Pressable

//             style={styles.backButton}

//             onPress={() =>
//               navigation.goBack()
//             }

//           >

//             <Text style={styles.backText}>
//               ←
//             </Text>

//           </Pressable>


//           <Text style={styles.title}>
//             Suggest Outfit
//           </Text>


//           <View style={styles.headerSpace} />

//         </View>


//         {/* ==========================================
//             SUBTITLE
//         ========================================== */}

//         <Text style={styles.subtitle}>

//           AI creates one complete outfit using your
//           wardrobe, occasion and current weather.

//         </Text>


//         {/* ==========================================
//             LOGIN STATUS
//         ========================================== */}

//         <View style={styles.loginInfo}>

//           <Text style={styles.loginInfoText}>

//             {isLoggedIn

//               ? '✓ Logged in'

//               : '🔒 Login required for AI suggestions'}

//           </Text>

//         </View>


//         {/* ==========================================
//             WARDROBE
//         ========================================== */}

//         <View style={styles.wardrobeInfo}>

//           <Text style={styles.wardrobeText}>

//             👗 Wardrobe Items: {
//               wardrobeItems.length
//             }

//           </Text>

//         </View>


//         {/* ==========================================
//             WEATHER CARD
//         ========================================== */}

//         <View style={styles.weatherCard}>


//           <View style={styles.weatherHeader}>


//             <Text style={styles.weatherTitle}>
//               🌤️ Current Weather
//             </Text>


//             <Pressable

//               onPress={getWeather}

//               disabled={weatherLoading}

//             >

//               <Text style={styles.refreshText}>
//                 ↻ Refresh
//               </Text>

//             </Pressable>


//           </View>


//           {weatherLoading ? (

//             <View style={styles.weatherLoading}>

//               <ActivityIndicator />

//               <Text style={styles.loadingWeatherText}>

//                 Getting weather...

//               </Text>

//             </View>

//           ) : weather ? (

//             <View>


//               <Text style={styles.location}>

//                 📍 {
//                   locationName ||
//                   'Current Location'
//                 }

//               </Text>


//               <View style={styles.weatherMain}>


//                 <Text style={styles.weatherEmoji}>

//                   {
//                     getWeatherEmoji(
//                       weather.weatherCode
//                     )
//                   }

//                 </Text>


//                 <View>


//                   <Text style={styles.temperature}>

//                     {
//                       Math.round(
//                         weather.temperature
//                       )
//                     }°C

//                   </Text>


//                   <Text style={styles.condition}>

//                     {
//                       getWeatherDescription(
//                         weather.weatherCode
//                       )
//                     }

//                   </Text>

//                 </View>

//               </View>


//               <View style={styles.weatherDetails}>


//                 <Text style={styles.weatherDetail}>

//                   🌡️ Feels {
//                     Math.round(
//                       weather.feelsLike
//                     )
//                   }°C

//                 </Text>


//                 <Text style={styles.weatherDetail}>

//                   🌧️ Rain {
//                     weather.precipitation
//                   } mm

//                 </Text>


//                 <Text style={styles.weatherDetail}>

//                   💨 Wind {
//                     Math.round(
//                       weather.windSpeed
//                     )
//                   } km/h

//                 </Text>


//               </View>

//             </View>

//           ) : (

//             <Text style={styles.noWeather}>

//               Weather unavailable.

//             </Text>

//           )}

//         </View>


//         {/* ==========================================
//             OCCASION
//         ========================================== */}

//         <Text style={styles.label}>
//           Occasion
//         </Text>


//         <TextInput

//           style={styles.input}

//           placeholder="e.g. College, Office, Wedding"

//           placeholderTextColor="#999"

//           value={occasion}

//           onChangeText={setOccasion}

//           editable={!loading}

//         />


//         <Text style={styles.examples}>

//           Try: College • Office • Interview •
//           Wedding • Date • Party

//         </Text>


//         {/* ==========================================
//             AI BUTTON
//         ========================================== */}

//         <Pressable

//           style={[

//             styles.suggestButton,

//             loading &&
//             styles.disabledButton,

//           ]}

//           onPress={getRecommendation}

//           disabled={loading}

//         >


//           {loading ? (

//             <View style={styles.loadingRow}>


//               <ActivityIndicator
//                 color="#ffffff"
//               />


//               <Text style={styles.loadingText}>

//                 Creating complete outfit...

//               </Text>


//             </View>

//           ) : (

//             <Text style={styles.suggestButtonText}>

//               ✨ Suggest Complete Outfit

//             </Text>

//           )}


//         </Pressable>


//         {/* ==========================================
//             RESULT
//         ========================================== */}

//         {recommendation ? (

//           <View style={styles.resultCard}>


//             <Text style={styles.resultTitle}>

//               ✨ Complete Outfit

//             </Text>


//             <Text style={styles.resultOccasion}>

//               For: {occasion}

//             </Text>


//             {weather && (

//               <View style={styles.weatherUsed}>

//                 <Text style={styles.weatherUsedText}>

//                   {
//                     getWeatherEmoji(
//                       weather.weatherCode
//                     )
//                   }{' '}

//                   Based on{' '}

//                   {
//                     Math.round(
//                       weather.temperature
//                     )
//                   }°C •{' '}

//                   {
//                     getWeatherDescription(
//                       weather.weatherCode
//                     )
//                   }

//                 </Text>

//               </View>

//             )}


//             <Text style={styles.resultText}>

//               {recommendation}

//             </Text>


//             {/* SAVE */}

//             <Pressable

//               style={styles.saveButton}

//               onPress={handleSave}

//             >

//               <Text style={styles.saveButtonText}>

//                 ❤️ Save Complete Outfit

//               </Text>

//             </Pressable>


//             {/* GENERATE AGAIN */}

//             <Pressable

//               style={styles.clearButton}

//               onPress={handleClear}

//             >

//               <Text style={styles.clearButtonText}>

//                 Generate Another Outfit

//               </Text>

//             </Pressable>


//           </View>

//         ) : null}


//       </ScrollView>

//     </View>

//   );

// }


// // =====================================================
// // STYLES
// // =====================================================

// const styles = StyleSheet.create({

//   container: {

//     flex: 1,

//     backgroundColor: '#4db7e8',

//   },


//   scrollContent: {

//     padding: 20,

//     paddingTop: 55,

//     paddingBottom: 60,

//   },


//   // ===================================================
//   // HEADER
//   // ===================================================

//   header: {

//     flexDirection: 'row',

//     alignItems: 'center',

//     justifyContent: 'space-between',

//     marginBottom: 12,

//   },


//   backButton: {

//     width: 42,

//     height: 42,

//     borderRadius: 21,

//     backgroundColor: '#ffffff',

//     justifyContent: 'center',

//     alignItems: 'center',

//   },


//   backText: {

//     fontSize: 25,

//     color: '#022030',

//   },


//   title: {

//     fontSize: 28,

//     fontWeight: 'bold',

//     color: '#0d0101',

//   },


//   headerSpace: {

//     width: 42,

//   },


//   subtitle: {

//     fontSize: 14,

//     color: '#333131',

//     lineHeight: 20,

//     marginBottom: 15,

//   },


//   // ===================================================
//   // LOGIN
//   // ===================================================

//   loginInfo: {

//     backgroundColor:
//       'rgba(255,255,255,0.35)',

//     borderRadius: 12,

//     padding: 10,

//     marginBottom: 12,

//   },


//   loginInfoText: {

//     color: '#022030',

//     fontSize: 13,

//     fontWeight: '600',

//   },


//   // ===================================================
//   // WARDROBE
//   // ===================================================

//   wardrobeInfo: {

//     backgroundColor:
//       'rgba(255,255,255,0.35)',

//     borderRadius: 12,

//     padding: 11,

//     paddingHorizontal: 14,

//     marginBottom: 14,

//   },


//   wardrobeText: {

//     fontSize: 13,

//     fontWeight: '600',

//     color: '#022030',

//   },


//   // ===================================================
//   // WEATHER
//   // ===================================================

//   weatherCard: {

//     backgroundColor: '#ffffff',

//     borderRadius: 18,

//     padding: 18,

//     marginBottom: 22,

//   },


//   weatherHeader: {

//     flexDirection: 'row',

//     justifyContent: 'space-between',

//     alignItems: 'center',

//     marginBottom: 12,

//   },


//   weatherTitle: {

//     fontSize: 17,

//     fontWeight: 'bold',

//     color: '#022030',

//   },


//   refreshText: {

//     color: '#488eae',

//     fontSize: 13,

//     fontWeight: '600',

//   },


//   weatherLoading: {

//     flexDirection: 'row',

//     alignItems: 'center',

//     paddingVertical: 12,

//   },


//   loadingWeatherText: {

//     marginLeft: 10,

//     color: '#555',

//     fontSize: 13,

//   },


//   location: {

//     color: '#555',

//     fontSize: 13,

//     marginBottom: 10,

//   },


//   weatherMain: {

//     flexDirection: 'row',

//     alignItems: 'center',

//     marginBottom: 14,

//   },


//   weatherEmoji: {

//     fontSize: 42,

//     marginRight: 14,

//   },


//   temperature: {

//     fontSize: 32,

//     fontWeight: 'bold',

//     color: '#022030',

//   },


//   condition: {

//     fontSize: 13,

//     color: '#555',

//   },


//   weatherDetails: {

//     flexDirection: 'row',

//     flexWrap: 'wrap',

//   },


//   weatherDetail: {

//     backgroundColor: '#eef7fa',

//     borderRadius: 10,

//     paddingVertical: 7,

//     paddingHorizontal: 10,

//     fontSize: 11,

//     color: '#022030',

//     marginRight: 8,

//     marginBottom: 8,

//   },


//   noWeather: {

//     color: '#777',

//     fontSize: 13,

//   },


//   // ===================================================
//   // OCCASION
//   // ===================================================

//   label: {

//     fontSize: 15,

//     fontWeight: 'bold',

//     color: '#0d0101',

//     marginBottom: 8,

//   },


//   input: {

//     backgroundColor: '#ffffff',

//     borderRadius: 14,

//     paddingHorizontal: 16,

//     paddingVertical: 14,

//     fontSize: 14,

//     color: '#222',

//     marginBottom: 8,

//   },


//   examples: {

//     color: '#333131',

//     fontSize: 12,

//     marginBottom: 16,

//     lineHeight: 18,

//   },


//   // ===================================================
//   // BUTTON
//   // ===================================================

//   suggestButton: {

//     backgroundColor: '#022030',

//     borderRadius: 16,

//     paddingVertical: 16,

//     alignItems: 'center',

//     justifyContent: 'center',

//     minHeight: 54,

//     marginBottom: 10,

//   },


//   disabledButton: {

//     opacity: 0.75,

//   },


//   suggestButtonText: {

//     color: '#ffffff',

//     fontSize: 15,

//     fontWeight: 'bold',

//   },


//   loadingRow: {

//     flexDirection: 'row',

//     alignItems: 'center',

//   },


//   loadingText: {

//     color: '#ffffff',

//     marginLeft: 10,

//     fontSize: 14,

//     fontWeight: '600',

//   },


//   // ===================================================
//   // RESULT
//   // ===================================================

//   resultCard: {

//     backgroundColor: '#ffffff',

//     borderRadius: 18,

//     padding: 18,

//     marginTop: 16,

//     elevation: 3,

//   },


//   resultTitle: {

//     fontSize: 20,

//     fontWeight: 'bold',

//     color: '#0d0101',

//     marginBottom: 5,

//   },


//   resultOccasion: {

//     fontSize: 12,

//     color: '#777',

//     marginBottom: 10,

//   },


//   weatherUsed: {

//     backgroundColor: '#eef7fa',

//     borderRadius: 10,

//     padding: 10,

//     marginBottom: 14,

//   },


//   weatherUsedText: {

//     color: '#022030',

//     fontSize: 12,

//     fontWeight: '600',

//   },


//   resultText: {

//     color: '#333131',

//     fontSize: 14,

//     lineHeight: 23,

//   },


//   // ===================================================
//   // SAVE
//   // ===================================================

//   saveButton: {

//     backgroundColor: '#022030',

//     borderRadius: 14,

//     paddingVertical: 13,

//     alignItems: 'center',

//     marginTop: 18,

//   },


//   saveButtonText: {

//     color: '#ffffff',

//     fontSize: 14,

//     fontWeight: 'bold',

//   },


//   // ===================================================
//   // CLEAR
//   // ===================================================

//   clearButton: {

//     paddingVertical: 12,

//     alignItems: 'center',

//     marginTop: 5,

//   },


//   clearButtonText: {

//     color: '#022030',

//     fontSize: 13,

//     fontWeight: '600',

//   },

// });
import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';

import * as Location from 'expo-location';

// IMPORTANT:
// The Gemini API key is NOT stored in this screen.
// Gemini is called by your backend server.

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export default function SuggestOutfitScreen({
  navigation,
  wardrobeItems = [],
  savedOutfits = [],
  setSavedOutfits,
  isLoggedIn = false,
  user = {},
}) {
  // =========================================
  // STATES
  // =========================================

  const [occasion, setOccasion] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState('');
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [locationName, setLocationName] = useState('');

  // =========================================
  // GET WEATHER WHEN SCREEN OPENS
  // =========================================

  useEffect(() => {
    getWeather();
  }, []);

  // =========================================
  // LOGIN REQUIRED
  // =========================================

  const requireLogin = () => {
    Alert.alert(
      'Login Required',
      'Please login or signup to use AI outfit suggestions.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Login',
          onPress: () => navigation.navigate('LoginScreen'),
        },
        {
          text: 'Sign Up',
          onPress: () => navigation.navigate('SignUpScreen'),
        },
      ]
    );
  };

  // =========================================
  // GET WEATHER
  // =========================================

  const getWeather = async () => {
    try {
      setWeatherLoading(true);

      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Location Permission',
          'Allow location permission to get current weather.'
        );
        return;
      }

      const location =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;

      // Get city name
      try {
        const address = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (address && address.length > 0) {
          const place = address[0];

          setLocationName(
            place.city ||
              place.district ||
              place.subregion ||
              place.region ||
              'Current Location'
          );
        }
      } catch (error) {
        console.log('Geocoding error:', error);
        setLocationName('Current Location');
      }

      // Open-Meteo does not require an API key
      const url =
        'https://api.open-meteo.com/v1/forecast' +
        `?latitude=${latitude}` +
        `&longitude=${longitude}` +
        '&current=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m' +
        '&timezone=auto';

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Weather request failed.');
      }

      const data = await response.json();

      if (!data.current) {
        throw new Error('Weather data is unavailable.');
      }

      setWeather({
        temperature: data.current.temperature_2m,
        feelsLike: data.current.apparent_temperature,
        precipitation: data.current.precipitation,
        weatherCode: data.current.weather_code,
        windSpeed: data.current.wind_speed_10m,
      });
    } catch (error) {
      console.log('Weather error:', error);

      Alert.alert(
        'Weather Error',
        'Could not get current weather. Please try again.'
      );
    } finally {
      setWeatherLoading(false);
    }
  };

  // =========================================
  // WEATHER DESCRIPTION
  // =========================================

  const getWeatherDescription = (code) => {
    if (code === 0) return 'Clear Sky';
    if (code === 1 || code === 2) return 'Partly Cloudy';
    if (code === 3) return 'Cloudy';
    if (code === 45 || code === 48) return 'Foggy';
    if (code >= 51 && code <= 57) return 'Drizzle';
    if (code >= 61 && code <= 67) return 'Rainy';
    if (code >= 71 && code <= 77) return 'Snowy';
    if (code >= 80 && code <= 82) return 'Rain Showers';
    if (code >= 95) return 'Thunderstorm';

    return 'Unknown Weather';
  };

  const getWeatherEmoji = (code) => {
    if (code === 0) return '☀️';
    if (code === 1 || code === 2) return '⛅';
    if (code === 3) return '☁️';
    if (code === 45 || code === 48) return '🌫️';
    if (code >= 51 && code <= 57) return '🌦️';
    if (code >= 61 && code <= 67) return '🌧️';
    if (code >= 71 && code <= 77) return '❄️';
    if (code >= 80 && code <= 82) return '🌦️';
    if (code >= 95) return '⛈️';

    return '🌤️';
  };

  // =========================================
  // CONVERT WARDROBE TO TEXT
  // =========================================

  const createWardrobeText = () => {
    if (!wardrobeItems || wardrobeItems.length === 0) {
      return 'No wardrobe items available.';
    }

    return wardrobeItems
      .map((item, index) => {
        if (typeof item === 'string') {
          return `${index + 1}. ${item}`;
        }

        const name =
          item?.name ||
          item?.title ||
          item?.itemName ||
          'Unnamed clothing item';

        const category =
          item?.category ||
          item?.type ||
          'Unknown category';

        const color =
          item?.color ||
          item?.colour ||
          'Unknown color';

        const size = item?.size || '';

        return (
          `${index + 1}. Name: ${name} | ` +
          `Category: ${category} | ` +
          `Color: ${color}` +
          (size ? ` | Size: ${size}` : '')
        );
      })
      .join('\n');
  };

  // =========================================
  // GENERATE OUTFIT
  // =========================================

  const getRecommendation = () => {
    if (!isLoggedIn) {
      requireLogin();
      return;
    }

    generateRecommendation();
  };

  const generateRecommendation = async () => {
    if (!occasion.trim()) {
      Alert.alert(
        'Enter Occasion',
        'Please enter an occasion, for example College.'
      );
      return;
    }

    if (!weather) {
      Alert.alert(
        'Weather Unavailable',
        'Wait for weather information or try refreshing it.'
      );
      return;
    }

    setLoading(true);
    setRecommendation('');

    try {
      const wardrobeText = createWardrobeText();

      const weatherText = `
Location: ${locationName || 'Current Location'}
Temperature: ${weather.temperature}°C
Feels like: ${weather.feelsLike}°C
Condition: ${getWeatherDescription(weather.weatherCode)}
Precipitation: ${weather.precipitation} mm
Wind speed: ${weather.windSpeed} km/h
`;

      // =========================================
      // YOUR OUTFIT PROMPT
      // =========================================

      const prompt = `
You are a professional fashion stylist and wardrobe assistant.

Create EXACTLY ONE complete, realistic outfit.

USER:
${user?.name || 'User'}

OCCASION:
${occasion.trim()}

AVAILABLE WARDROBE:
${wardrobeText}

CURRENT WEATHER:
${weatherText}

RULES:
1. Prefer suitable items already in the user's wardrobe.
2. Do not invent wardrobe items when suitable items are available.
3. Consider the occasion, temperature, feels-like temperature,
   precipitation, wind, comfort, fabric and color coordination.
4. Choose breathable clothing for hot weather.
5. Choose suitable layers for cold or windy weather.
6. Consider practical footwear for rain and travel.
7. Coordinate colors naturally.
8. Choose only one outfit.
9. Do not give multiple options.
10. Include a top, bottom and shoes.
11. Include outerwear, or write "Not needed".
12. Include accessories, or write "Not needed".
13. If the wardrobe is empty or lacks a suitable item,
    clearly say which item is unavailable instead of pretending
    the user owns it.
14. Keep the recommendation concise and practical.

Return the result in exactly this format:

TOP:
[Selected top]

BOTTOM:
[Selected bottom]

SHOES:
[Selected shoes]

OUTERWEAR:
[Selected item or Not needed]

ACCESSORIES:
[One or two items or Not needed]

WEATHER TIP:
[One practical weather tip]

WHY THIS OUTFIT WORKS:
[Brief explanation of the colors, occasion and weather]
`;

      // =========================================
      // OLD DIRECT GEMINI CALL — COMMENTED OUT
      // Do not restore this client-side call.
      // =========================================

      /*
      const result = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setRecommendation(result.text);
      */

      // =========================================
      // NEW BACKEND REQUEST
      // Gemini is called from server.js instead.
      // =========================================

      if (!BACKEND_URL) {
        throw new Error('Set EXPO_PUBLIC_BACKEND_URL in OutfitPlanner/.env.');
      }

      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || 'Failed to generate outfit.'
        );
      }

      if (!data.recommendation) {
        throw new Error('The server returned an empty recommendation.');
      }

      setRecommendation(data.recommendation);
    } catch (error) {
      console.log('Outfit recommendation error:', error);

      Alert.alert(
        'Recommendation Error',
        error.message ||
          'Could not generate an outfit. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // SAVE OUTFIT
  // =========================================

  const saveOutfit = () => {
    if (!isLoggedIn) {
      requireLogin();
      return;
    }

    if (!recommendation.trim()) {
      Alert.alert('No Outfit', 'Generate an outfit first.');
      return;
    }

    if (typeof setSavedOutfits !== 'function') {
      Alert.alert(
        'Unable to Save',
        'The save function was not provided by the parent screen.'
      );
      return;
    }

    setSavedOutfits((previous = []) => [
      ...previous,
      {
        id: `${Date.now()}`,
        occasion: occasion.trim(),
        recommendation,
        weather,
        locationName,
        createdAt: new Date().toISOString(),
      },
    ]);

    Alert.alert('Saved', 'Your outfit has been saved.');
  };

  // =========================================
  // SCREEN UI
  // =========================================

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>AI Outfit Suggestion</Text>

      <Text style={styles.subtitle}>
        Get an outfit based on your wardrobe, occasion and weather.
      </Text>

      {/* WEATHER CARD */}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Current Weather</Text>

        {weatherLoading ? (
          <ActivityIndicator size="small" color="#488eae" />
        ) : weather ? (
          <>
            <Text style={styles.weatherEmoji}>
              {getWeatherEmoji(weather.weatherCode)}
            </Text>

            <Text style={styles.temperature}>
              {weather.temperature}°C
            </Text>

            <Text style={styles.bodyText}>
              {getWeatherDescription(weather.weatherCode)}
            </Text>

            <Text style={styles.bodyText}>
              Location: {locationName || 'Current Location'}
            </Text>

            <Text style={styles.bodyText}>
              Feels like: {weather.feelsLike}°C
            </Text>

            <Text style={styles.bodyText}>
              Rain: {weather.precipitation} mm
            </Text>

            <Text style={styles.bodyText}>
              Wind: {weather.windSpeed} km/h
            </Text>
          </>
        ) : (
          <Text style={styles.bodyText}>
            Weather information is unavailable.
          </Text>
        )}

        <Pressable
          style={styles.secondaryButton}
          onPress={getWeather}
          disabled={weatherLoading}
        >
          <Text style={styles.secondaryButtonText}>
            {weatherLoading ? 'Loading...' : 'Refresh Weather'}
          </Text>
        </Pressable>
      </View>

      {/* WARDROBE COUNT */}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Wardrobe</Text>

        <Text style={styles.bodyText}>
          Available items: {wardrobeItems.length}
        </Text>

        <Text style={styles.bodyText}>
          {wardrobeItems.length > 0
            ? 'Your available clothing will be considered.'
            : 'Your wardrobe is empty. Add clothing for better suggestions.'}
        </Text>
      </View>

      {/* OCCASION INPUT */}

      <Text style={styles.label}>What is the occasion?</Text>

      <TextInput
        style={styles.input}
        placeholder="Example: College, party, date or travel"
        placeholderTextColor="#777"
        value={occasion}
        onChangeText={setOccasion}
        maxLength={100}
      />

      {/* GENERATE BUTTON */}

      <Pressable
        style={[
          styles.primaryButton,
          loading && styles.disabledButton,
        ]}
        onPress={getRecommendation}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.primaryButtonText}>
            Generate Outfit
          </Text>
        )}
      </Pressable>

      {/* RECOMMENDATION */}

      {recommendation ? (
        <View style={styles.recommendationCard}>
          <Text style={styles.cardTitle}>
            Your Outfit Recommendation
          </Text>

          <Text style={styles.recommendationText}>
            {recommendation}
          </Text>

          <Pressable
            style={styles.primaryButton}
            onPress={saveOutfit}
          >
            <Text style={styles.primaryButtonText}>
              Save Outfit
            </Text>
          </Pressable>
        </View>
      ) : null}
    </ScrollView>
  );
}

// =========================================
// STYLES
// =========================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f3f0',
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#022030',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: '#555555',
    lineHeight: 22,
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
    elevation: 2,
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#022030',
    marginBottom: 12,
  },

  weatherEmoji: {
    fontSize: 36,
    marginBottom: 4,
  },

  temperature: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#488eae',
  },

  bodyText: {
    fontSize: 14,
    color: '#444444',
    lineHeight: 22,
    marginTop: 4,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#022030',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#222222',
    marginBottom: 18,
  },

  primaryButton: {
    backgroundColor: '#488eae',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  disabledButton: {
    opacity: 0.65,
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: '#488eae',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginTop: 12,
  },

  secondaryButtonText: {
    color: '#488eae',
    fontWeight: '600',
  },

  recommendationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginTop: 22,
    elevation: 2,
  },

  recommendationText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#333333',
  },
});