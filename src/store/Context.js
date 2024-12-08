import { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { app } from "../firebase/config";

const Context = createContext(null);

const Firebase = ({ children }) => {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Set up a listener for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Clean up the listener on component unmount
  }, [auth]);

  return (
    <Context.Provider value={{ auth, db, user }}>
      {children}
    </Context.Provider>
  );
};

export { Context, Firebase };

