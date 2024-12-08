import { createContext } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { app } from "../firebase/config";

const Context = createContext(null);

const Firebase = ({ children }) => {
  const auth = getAuth(app);
  const db = getFirestore(app);

  return (
    <Context.Provider value={{ auth, db }}>
      {children}
    </Context.Provider>
  );
};

export { Context, Firebase };
