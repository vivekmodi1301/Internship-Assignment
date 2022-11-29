import { db } from "../firebase";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const userCollectionRef = collection(db, "Users-Info");

class userDataService {
    addUser = (newUser) => {
        return addDoc(userCollectionRef, newUser);
    };

    updateUser = (id, updatedUser) => {
        const userDoc = doc(db, "Users-Info", id);
        return updateDoc(userDoc, updatedUser);
    };

    deleteUser = (id) => {
        const userDoc = doc(db, "Users-Info", id);
        return deleteDoc(userDoc);
    };

    getAllUsers = () => {
        return getDocs(userCollectionRef);
    };

    getUser = (id) => {
        const userDoc = doc(db, "Users-Info", id);
        return getDoc(userDoc);
    };
}


const todoCollectionRef = collection(db, "Todo");
class todoDataService {
  addTodos = (newTodo) => {
    return addDoc(todoCollectionRef, newTodo);
  };

  updateTodo = (id, updatedTodo) => {
    const todoDoc = doc(db, "Todo", id);
    return updateDoc(todoDoc, updatedTodo);
  };

  deleteTodo = (id) => {
    const todoDoc = doc(db, "Todo", id);
    return deleteDoc(todoDoc);
  };

  getAllTodos = () => {
    return getDocs(todoCollectionRef);
  };

  getTodo = (id) => {
    const todoDoc = doc(db, "Todo", id);
    return getDoc(todoDoc);
  };
}
export default new userDataService();
todoDataService = new todoDataService();
export {todoDataService};