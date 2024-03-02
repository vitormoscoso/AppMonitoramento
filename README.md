# React Native Septic Tank Level Monitoring App (Expo)

## Overview
This mobile app, built with React Native and Expo, offers real-time and historical monitoring of septic tank levels via Esp-32 and ultrasonic sensor data. It leverages Firebase Firestore for data storage and Firebase Authentication for secure access, making it easy for users to stay informed about their septic tank status on any Android or iOS device.

## Features
- **Real-Time Monitoring**: View the latest septic tank level measured by the ultrasonic sensor.
- **Historical Data Access**: Explore past data to observe trends and make informed decisions.
- **Secure User Authentication**: Utilizes Firebase Authentication to protect and personalize user data.
- **Cross-Platform**: Built with Expo for React Native, ensuring compatibility with both Android and iOS platforms without compromising on performance or user experience.

## Technologies Used
- **Expo**: An open-source platform for making universal native apps for Android and iOS with React Native.
- **React Native**: For crafting the mobile application interface and logic.
- **Firebase Firestore**: For real-time data storage and retrieval.
- **Firebase Authentication**: To secure user login mechanisms.

## Getting Started

### Prerequisites
- Node.js and npm installed on your development machine.
- An Expo account and the Expo Go app installed on your testing device or a simulator/emulator setup on your development machine.
- A Firebase project for utilizing Firestore and Authentication.

### Installation
1. Clone the repository:
```bash
git clone https://github.com/vitormoscoso/AppMonitoramento.git
```
2. Navigate to the project directory:
```bash
cd AppMonitoramento
```
3. Install the dependencies:
```bash
npm install
```
4. Install the Expo CLI globally if you haven't already:
```bash
npm install -g expo-cli
```
5. Initialize your Firebase configuration in the application as required.

### Running the App with Expo
1. Start the project:
```bash
expo start
```
2. Open the Expo Go app on your testing device and scan the QR code displayed in your terminal, or use an iOS or Android simulator/emulator to run the app.

## Contributing
Contributions are welcome! If you'd like to improve the Septic Tank Level Monitoring App, feel free to fork the repository, make your changes, and submit a pull request. For substantial changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details.
