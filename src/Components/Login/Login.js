import React, { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Context } from '../../store/Context';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { auth } = useContext(Context); 
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password).then(() => {
        history.push('/');
      });
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          alert('The email address is not valid. Please check and try again.');
          break;
        case 'auth/user-disabled':
          alert('This account has been disabled. Please contact support.');
          break;
        case 'auth/user-not-found':
          alert('No account found with this email. Please sign up.');
          break;
        case 'auth/wrong-password':
          alert('The password is incorrect. Please try again.');
          break;
        default:
          alert('The password is incorrect. Please try again.');
          console.error('Firebase error:', error.message);
      }
    }
  };
  
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Login;









