# Outfit Planner

An Expo and React Native project for planning outfits, organizing a wardrobe, and trying AI-assisted outfit ideas. The repository contains a mobile app and a small Express backend for text outfit recommendations.

## Features

- Wardrobe, outfit creation, saved outfits, and calendar screens
- Outfit suggestions based on a prompt and wardrobe details
- A virtual try-on screen with image selection and Gemini image generation
- Profile, settings, and help screens
- A backend endpoint for text-based Gemini outfit recommendations

## Technology and requirements

- Node.js 22.13 or newer and npm
- Expo SDK 57, React Native 0.86, and React 19
- Android Studio/emulator, an iOS simulator on macOS, or a compatible Expo Go setup

See the [Expo SDK 57 documentation](https://docs.expo.dev/versions/v57.0.0/) for platform and development details.

## Run the mobile app

From the repository root:

```powershell
cd OutfitPlanner
npm install
Copy-Item .env.example .env
```

Edit `OutfitPlanner/.env` and set the values you need:

```dotenv
EXPO_PUBLIC_BACKEND_URL=http://10.0.2.2:3000/api/outfit
EXPO_PUBLIC_GEMINI_API_KEY=
```

Then start Expo:

```powershell
npx expo start
```

For an Android emulator, `10.0.2.2` points back to the development computer. For a physical phone, use the computer's LAN IP address instead. For an iOS simulator, `localhost` may be used when the backend runs on the same Mac.

## Run the backend

In a separate terminal from the repository root:

```powershell
cd outfit-planner-backend
npm install
Copy-Item .env.example .env
```

Edit `outfit-planner-backend/.env` and set `GEMINI_API_KEY`, then start the server:

```powershell
node server.js
```

The server listens on port `3000` by default. You can set `PORT` to use another port. The app's `EXPO_PUBLIC_BACKEND_URL` must point to the server's `/api/outfit` endpoint.

### Text recommendation endpoint

`POST /api/outfit` accepts JSON with a non-empty `prompt` and returns a `recommendation`:

```json
{
  "prompt": "Suggest a comfortable outfit for a rainy workday using a navy jacket."
}
```

The backend uses `GEMINI_API_KEY` from its local environment file and limits API requests to 20 per IP address per 15-minute window.

## Privacy and API keys

- The repository includes `.env.example` templates only. Real `.env` files are ignored by Git; never commit API keys, personal contact details, or private photos.
- `EXPO_PUBLIC_` variables are included in the mobile app's client bundle and are readable by app users. The current Try Outfit screen calls Gemini directly, so any key used there is **not confidential**. Use only a restricted development key for that flow. For a production app, route that request through a secured backend before using a key that must remain private.
- The Suggest Outfit screen calls the included backend. Keep its `GEMINI_API_KEY` on the server and do not expose it as an `EXPO_PUBLIC_` variable.
- Profile and wardrobe state is currently held in the app's runtime state; this repository does not include a database or production authentication service.

## Repository layout

```text
OutfitPlanner/          Expo mobile app
outfit-planner-backend/ Express API
OutfitPlanner/.env.example          Mobile app environment template
outfit-planner-backend/.env.example Backend environment template
```

Support requests can be opened through the repository's [GitHub Issues](https://github.com/Sania-sweety/outfit_planner/issues).
