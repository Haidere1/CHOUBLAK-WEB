import './login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Backend/Firebase/config';
import vodd from './adminvideo.mp4';

const Login = () => { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State to handle error messages
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Check if the user is the admin
      const adminEmail = "syedfizanhaider.fh@gmail.com";
      if (user.email === adminEmail) {
        navigate('/addproduct');
        console.log(user); // Redirect to admin page
      } else {
        setError("Unauthorized user. Please use an admin account.");
        
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div style={{fontFamily:"Jovelyn Blur Demo"}}>
      <div className="menu">
        <video src={vodd} autoPlay muted loop playsInline className='img'></video>
      </div>
      <div className="login glow">
        <h1>CHOUBLAK RESTAURANT</h1>
      </div>
      <div className="input glass">
        <form onSubmit={handleLogin}>
          <table>
            <tr>
              <td><label><b>Email</b></label></td>
              <td>
                <input 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className='inpt' 
                  type="email" 
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label><b>Password</b></label></td>
              <td>
                <input 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className='inpt' 
                  type="password" 
                  required
                />
              </td>
            </tr>
          </table>
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
          <button type="submit" className="btn1">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
