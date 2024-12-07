import { createContext } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { app } from "../firebase/config";

const FirebaseContext = createContext(null);

const FirebaseProvider = ({ children }) => {
  const auth = getAuth(app);
  const db = getFirestore(app);

  return (
    <FirebaseContext.Provider value={{ auth, db }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext, FirebaseProvider };
