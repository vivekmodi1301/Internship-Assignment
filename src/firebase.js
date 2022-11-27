import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/messaging';
import 'firebase/compat/firestore';
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getDownloadURL,getStorage, ref, uploadBytes} from 'firebase/storage'
import { updateProfile } from "firebase/auth";


// const app = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// })
// export const auth = app.auth()
// export default app
// import * as firebase from 'firebase';

let config = {
    apiKey: "AIzaSyB-Dyf7OyR--L4ZpoaI-kzB1D0AjFd9rJI",
    authDomain: "auth-development-a9412.firebaseapp.com",
    projectId: "auth-development-a9412",
    storageBucket: "auth-development-a9412.appspot.com",
    messagingSenderId: "95409650432",
    appId : "1:95409650432:web:cad377841deaa6c84d11e5"
};
const app = firebase.initializeApp(config);
const db = getFirestore(app);
export const auth = app.auth()
export const storage = getStorage();
export default firebase;
export { db };

// storage
export async function upload(file , currentUser ,setLoading){
    const fileRef = ref(storage , currentUser.uid + '.png');
    setLoading(true)
    const snaphot = await uploadBytes(fileRef , file);
    const photoURL = await getDownloadURL(fileRef);
    await updateProfile(currentUser , { photoURL})
    setLoading(false)
    alert("File Uploaded sucessfully");
    window.location.reload();
}