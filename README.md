# WebApp is live at https://angular-chatapp.onrender.com/
# Get the Android App -- https://drive.google.com/file/d/15Ac1OQ3BUL6eiceiuTKRoUdOrYrDz70z/view?usp=drive_link
# Ionic Chatapp

Welcome to Ionic Chatapp! This hybrid mobile application is designed for Android and web platforms, offering a range of exciting features:

- 💡 **QR Scanner for Login**: Seamlessly log in by scanning unique QR codes generated by the server.

- 🔐 **Firebase Authentication**: The authentication needs are managed efficiently with Firebase Authentication, ensuring secure access.

- 📦 **MongoDB Database**: Storing user data is a breeze, thanks to our NoSQL MongoDB database.

- 🌐 **Real-time Chatting**: Engage in real-time conversations with other users, powered by Socket.io for a dynamic chat experience.

- 🌍 **Hosting Platform**: The application is hosted on a Render to make it accessible to users worldwide.

## Technologies Used

- ![Angular](https://img.shields.io/badge/Angular-FF5733?style=for-the-badge&logo=angular&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
- ![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
- ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
- ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
- ![Ionic](https://img.shields.io/badge/Ionic-3880FF?style=for-the-badge&logo=ionic&logoColor=white)
- ![Capacitor](https://img.shields.io/badge/Capacitor-4FC08D?style=for-the-badge&logo=capacitor&logoColor=white)
- ![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)

## Project Structure

The project is organized as follows:

- 📁 `server/`: This directory contains the application's server code, including middleware, routes, and multer.

- 📄 `client/`: This directory contains the application's source code, including pages, components, and services.

- 📄 `package.json`: This file lists project dependencies and defines useful scripts to manage the app.

- 📄 `README.md`: You're here! This comprehensive documentation is your guide to the app and its features.

## Getting Started

To get started with this app, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/koistav1212/Ionic_chatapp.git
   ```

2. Change to the project directory:

   ```bash
   cd client
   ```

3. Install project dependencies:

   ```bash
   npm install
   ```

4. To add Android as a platform (requires Android Studio and related setup), run:

   ```bash
   npx cap add android
   ```

5. To build the app for Android, use:

   ```bash
   npx cap copy android
   npx cap open android
   ```

6. For web development, simply run:

   ```bash
   ionic serve
   ```
7. For Running the server locally change to the project directory:
 ```bash
   cd server
   ```
8. Install the dependencies:
   ```bash
   npm install
   ```
9. Start the Node server:
   ```bash
   node app.js
   ```


## Contribution

We welcome contributions from the community! Feel free to open issues, create pull requests, or provide feedback to help improve the application.

