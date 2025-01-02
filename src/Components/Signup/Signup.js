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
  const [errors, setErrors] = useState({});
  const { auth } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!username.trim()) validationErrors.username = "Username is required.";
    if (!email.trim()) validationErrors.email = "Email is required.";
    if (!phone.trim()) validationErrors.phone = "Phone number is required.";
    if (!password.trim()) validationErrors.password = "Password is required.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({}); 

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: username });
      const firestore = getFirestore();
      await addDoc(collection(firestore, "users"), {
        id: result.user.uid,
        username: username,
        phone: phone,
      });
      toast.success("Signup successful!", { position: "top-center" });
      setTimeout(() => history.push("/login"), 2000);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already in use. Please try another one.", {
          position: "top-center",
        });
      } else {
        console.error("Error creating user:", error.message);
        toast.error(
          "An error occurred while creating your account. Please try again.",
          { position: "top-center" }
        );
      }
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            name="username"
          />
          {errors.username && <span className="error">{errors.username}</span>}
          <br />

          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <br />

          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            name="phone"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
          <br />

          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
          />
          {errors.password && <span className="error">{errors.password}</span>}
          <br />
          <br />

          <button type="submit">Signup</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
      <ToastContainer />
    </div>
  );
}



