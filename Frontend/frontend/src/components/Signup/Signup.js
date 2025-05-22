import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import logo_cashcraft from '../../img/logo_cashcraft.png';
import BACKGROUND_SIGNUP from '../../img/BACKGROUND_SIGNUP.jpg';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);
  const { signup } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(username, password).catch(err => {
      setError('Signup failed. Please try again.');
    });
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
      height: '100vh',
      backgroundImage: `url(${BACKGROUND_SIGNUP})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
    form: {
      backgroundColor: '#f0f0f0',
      padding: '40px',
      borderRadius: '20px',
      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
      maxWidth: '450px',
      width: '100%',
      marginTop: '140px',
      marginLeft: '100px',
      ...fadeInDown(0.3),
    },
    input: {
      width: '100%',
      padding: '12px',
      margin: '12px 0',
      borderRadius: '10px',
      border: '1px solid #ced4da',
      fontSize: '16px',
      boxSizing: 'border-box',
      ...fadeInDown(0.5),
    },
    button: {
      width: '100%',
      padding: '12px',
      background: 'linear-gradient(to right, #ff69b4, #ff85a2)',
      color: '#fff',
      border: 'none',
      borderRadius: '50px',
      fontSize: '18px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '15px',
      boxShadow: '0 4px 14px rgba(255, 105, 180, 0.4)',
      transition: 'all 0.3s ease-in-out',
      ...fadeInDown(0.7),
    },
    heading: {
      textAlign: 'center',
      marginBottom: '30px',
      color: '#343a40',
      fontSize: '24px',
      ...fadeInDown(0.1),
    },
    link: {
      marginTop: '20px',
      textAlign: 'center',
      color: '#007bff',
      textDecoration: 'none',
      fontSize: '14px',
      ...fadeInDown(1.0),
    },
    subtitle: {
      textAlign: 'center',
      marginBottom: '30px',
      color: '#6c757d',
      fontSize: '16px',
      ...fadeInDown(0.2),
    },
    logo: {
      marginLeft: '55px',
      marginTop: '-30px',
      marginBottom: '-50px',
      ...fadeInDown(0.05),
    },
    logoImg: {
      width: '280px',
      height: '200px',
      borderRadius: '50%',
    },
    error: {
      color: 'red',
      textAlign: 'center',
      marginTop: '10px',
      ...fadeInDown(0.8),
    },
  };

  return (
    <div style={styles.container}>
      
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.logo}>
        <img src={logo_cashcraft} alt="Logo" style={styles.logoImg} />
      </div>
        <h2 style={styles.heading}>New to CashCraft? Join us now.</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button
          type="submit"
          style={styles.button}
          onMouseEnter={(e) => {
            e.target.style.background = 'linear-gradient(to right, #ff85a2, #ff69b4)';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'linear-gradient(to right, #ff69b4, #ff85a2)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          Signup
        </button>
        {error && <p style={styles.error}>{error}</p>}
        <p style={styles.link}>
          Already have an account? <Link to="/login" style={{ color: '#007bff' }}>Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
