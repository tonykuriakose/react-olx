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
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <Context.Provider value={{ auth, db, user }}>
      {children}
    </Context.Provider>
  );
};

export { Context, Firebase };

