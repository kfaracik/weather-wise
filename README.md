# weather-wise

## Features:
- City search functionality.
- Fetches weather data (temperature, weather description) from OpenWeather API.
- Displays detailed weather information on a separate screen.
- Option to save a favorite city for quick access.
- State persistence using Zustand for storing favorite cities.
- Unit tests using Jest.

## Technologies:
- **React Native (Bare Setup)**: For mobile app development.
- **TypeScript**: For type-safe coding.
- **React Navigation**: For navigating between screens.
- **Zustand**: For state management and persistence.
- **React Query**: For handling API calls and caching.
- **Flash List**: For optimized list rendering.
- **Jest**: For unit testing.

## How to run:
1. Clone the repository
2. Install dependencies: `npm install` or `yarn install`
3. Start the Metro Server:
   ```bash
   # using npm
   npm start
   ```
4. Start Application

### For Android
```bash
# using npm
npm run android
```

### For iOS

```bash
# using npm
npm run ios
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.




## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```