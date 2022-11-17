import { db } from "../firebase";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const userCollectionRef = collection(db, "Users-Info");

class userDataService {
    addUser = (newUser) => {
        return addDoc(userCollectionRef, newUser);
    };

    updateUser = (id, updatedUser) => {
        const userDoc = doc(db, "users", id);
        return updateDoc(userDoc, updatedUser);
    };

    deleteUser = (id) => {
        const userDoc = doc(db, "users", id);
        return deleteDoc(userDoc);
    };

    getAllUsers = () => {
        return getDocs(userCollectionRef);
    };

    getUser = (id) => {
        const userDoc = doc(db, "users", id);
        return getDoc(userDoc);
    };
}

export default new userDataService();