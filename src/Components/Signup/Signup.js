import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Context } from "../../store/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { auth } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !phone || !password) {
      toast.error("All fields are required!", { position: "top-center" });
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: username });
      const firestore = getFirestore();
      await addDoc(collection(firestore, "users"), {
        id: result.user.uid,
        username: username,
        phone: phone,
      });
      toast.success("Signup successful!", {
        position: "top-center",
      });
      setTimeout(() => history.push("/login"), 2000);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already in use. Please try another one.", {
          position: "top-center",
        });
      } else {
        console.error("Error creating user:", error.message);
        toast.error("An error occurred while creating your account. Please try again.", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="lname"
            name="phone"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
      <ToastContainer />
    </div>
  );
}


