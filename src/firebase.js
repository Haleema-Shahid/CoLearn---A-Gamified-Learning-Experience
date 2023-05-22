import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyABWov6Geo0jNkb-dExGyBqaOWFob0JeGA",
    authDomain: "colearn-35de8.firebaseapp.com",
    projectId: "colearn-35de8",
    storageBucket: "colearn-35de8.appspot.com",
    messagingSenderId: "991604203681",
    appId: "1:991604203681:web:7e804462215e152e5f90e0",
    measurementId: "G-BBVV5RPBH2"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, "colearn-35de8.appspot.com");

export default storage;