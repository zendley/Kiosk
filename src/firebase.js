// import { initializeApp } from 'firebase/app';
// import { getToken, getMessaging, onMessage } from 'firebase/messaging';

// const firebaseConfig = {
//     apiKey: "AIzaSyAqiY-tbwmrbhC-Uv_wIlQEMII28yw7eFg",
//     authDomain: "dwtf-4e314.firebaseapp.com",
//     projectId: "dwtf-4e314",
//     storageBucket: "dwtf-4e314.appspot.com",
//     messagingSenderId: "289887133046",
//     appId: "1:289887133046:web:b54e2685fc703b5cfdee57",
//     measurementId: "G-D68PK05RE1",
//     databaseURL: "https://dwtf-4e314-default-rtdb.asia-southeast1.firebasedatabase.app/"
//   };

// // console.log('*** Firebase Config ***', firebaseConfig)

// const firebaseApp = initializeApp(firebaseConfig);
// const messaging = getMessaging(firebaseApp);

// export const getOrRegisterServiceWorker = () => {
//     if ('serviceWorker' in navigator) {
//       return window.navigator.serviceWorker
//         .getRegistration('/firebase-push-notification-scope')
//         .then((serviceWorker) => {
//           console.log('testststststs')
//           if (serviceWorker) return serviceWorker;
//           return window.navigator.serviceWorker.register('/firebase-messaging-sw.js', {
//             scope: '/firebase-push-notification-scope',
//           });
//         });
//     }
//     throw new Error('The browser doesn`t support service worker.');
//   };

//   export const getFirebaseToken = () =>
//     getOrRegisterServiceWorker()
//       .then((serviceWorkerRegistration) =>
//         getToken(messaging, { vapidKey: 'BOSXZJdWcVG6DLt9lfu41NWPhf-70sx3dAAllO_wIhiPwt9DoNX9w1VI9lkkxvvxJ9Lz0ApmyVrpi30r5p_1MDg', serviceWorkerRegistration }));

// export const onForegroundMessage = () =>
// new Promise((resolve) => onMessage(messaging, (payload) => resolve(payload)));
