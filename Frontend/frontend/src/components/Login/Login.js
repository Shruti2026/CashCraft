import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import logo_cashcraft from '../../img/logo_cashcraft.png';
import BACKGROUND_LOGIN_SIGNUP from '../../img/BACKGROUND_LOGIN_SIGNUP.jpg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(false);
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth <= 768);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100); // Trigger drop animation
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  const fadeInDown = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(-20px)',
    transition: `all 0.6s ease ${delay}s`,
  });

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      backgroundImage: `url(${BACKGROUND_LOGIN_SIGNUP})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      padding: isMobile ? '10px' : '0',
    },
    form: {
      marginTop: isMobile ? '50px' : '170px',
      marginLeft: isMobile ? '0' : '600px',
      backgroundColor: '#f0f0f0',
      width: isMobile ? '90%' : '960px',
      paddingBottom: '40px',
    },
    input: {
      width: '100%',
      maxWidth: '400px',
      padding: '12px',
      margin: '12px auto',
      display: 'block',
      borderRadius: '10px',
      border: '1px solid #ced4da',
      fontSize: '16px',
    },
    button: {
      width: '100%',
      maxWidth: '300px',
      padding: '12px',
      background: 'linear-gradient(to right, #ff69b4, #ff85a2)', // softer pink gradient
      color: '#fff',
      border: 'none',
      borderRadius: '50px',
      fontSize: '18px',
      fontWeight: 'bold',
      letterSpacing: '1px',
      cursor: 'pointer',
      margin: '15px auto',
      display: 'block',
      transition: 'all 0.3s ease-in-out',
      boxShadow: '0 4px 14px rgba(255, 105, 180, 0.4)',
    },
    mainHeading: {
      textAlign: 'center',
      marginTop: '0',
      marginBottom: '10px',
      marginBottom: '20px',
      fontSize: isMobile ? '42px' : '60px',
      fontFamily: "'Pacifico', cursive",
      background: 'linear-gradient(to right, #ff6ec4, #7873f5)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
      ...fadeInDown(0.1),
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#343a40',
      fontSize: isMobile ? '24px' : '32px',
      ...fadeInDown(0.3),
    },
    subtitle: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#6c757d',
      fontSize: '16px',
      ...fadeInDown(0.5),
    },
    error: {
      color: 'red',
      textAlign: 'center',
      marginBottom: '10px',
      ...fadeInDown(0.5),
    },
    link: {
      textAlign: 'center',
      marginTop: '20px',
      color: '#007bff',
      textDecoration: 'none',
      fontSize: '14px',
      ...fadeInDown(1.4),
    },
    logo: {
      textAlign: 'center',
      marginTop: '-80px',
      marginBottom: '-70px', // Pulls heading up
    },
    logoImg: {
      width: '290px',
      height: '200px',
      borderRadius: '50%',  // Circular shape
    },
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.logo}>
               <img
                  src={logo_cashcraft}
                  alt=""
                  style={styles.logoImg}
                  />
                </div>
        <p style={styles.mainHeading}>CashCraft</p>
        <h2 style={styles.heading}>Login</h2>
        <p style={styles.subtitle}>Streamline your expense management...</p>
        {error && <p style={styles.error}>{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ ...styles.input, ...fadeInDown(0.7) }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ ...styles.input, ...fadeInDown(0.9) }}
        />
        <button
          type="submit"
          style={{ ...styles.button, ...fadeInDown(1.1) }}
          onMouseEnter={(e) => {
            e.target.style.background = 'linear-gradient(to right, #ff85a2, #ff69b4)';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'linear-gradient(to right, #ff69b4, #ff85a2)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          Login
        </button>

        <p style={styles.link}>
          New here?{' '}
          <Link to="/signup" style={{ color: '#007bff' }}>
            Create an Account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
