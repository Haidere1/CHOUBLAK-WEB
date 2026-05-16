import './login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Backend/Firebase/config';
import vodd from './adminvideo.mp4';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/addproduct');
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="admin-login">
      <video src={vodd} autoPlay muted loop playsInline className="login-video" />
      <div className="login-overlay">
        <div className="login-card">
          <p className="login-eyebrow">Admin Portal</p>
          <h1 className="login-title">Choublak</h1>
          <form onSubmit={handleLogin} className="login-form">
            <div className="login-field">
              <label>Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="admin@email.com"
                required
              />
            </div>
            <div className="login-field">
              <label>Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
            {error && <p className="login-error">{error}</p>}
            <button type="submit" className="login-btn">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
