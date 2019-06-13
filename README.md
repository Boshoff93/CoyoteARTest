# AR maps with React Native and Mapbox AR SDK

## Before running the app (Android)
- Open RNMapboxARDemo android solution in Android Studio to generate local.properties which sets sdk.dir

## Run app in debug mode
- react-native start --reset-cache
- react-native run-android --variant=gvrDebug

## Generate Release APK
cd into \RNMapboxARDemo\android\
run command: gradlew assembleGvrRelease
cd into \RNMapboxARDemo\android\app\build\outputs\apk
run command to install on device: adb install app-gvr-release.apk

## Assets
- Download Google Poly 3d obj files
