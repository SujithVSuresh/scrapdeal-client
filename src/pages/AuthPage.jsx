import React, { useState, useEffect } from 'react';
import WelcomePage from '../components/AuthSection/WelcomePage';
import LoginPage from '../components/AuthSection/LoginPage';
import SignupPage from '../components/AuthSection/SignupPage';
import ConfirmationPage from '../components/AuthSection/ConfirmationPage';
import axios from '../api/axiosInstance';
import { useContext } from 'react';
import AuthContext from '../context/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthController = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState('welcome'); // welcome, login, signup, confirmation
  const [userType, setUserType] = useState('seller'); // seller, buyer

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    setCurrentPage('signup');
  };

const { login, user } = useContext(AuthContext);

  useEffect(() => {
    if (user && user.role === "seller") {
      navigate('/seller');
    } else if(user && user.role === "buyer"){
      navigate('/buyer'); 
    }
  }, [user, navigate]);

const handleLoginSubmit = async (formData) => {
  try {
    const res = await axios.post('/auth/signin', formData); // Assuming { email, password }
    login(res.data.user, res.data.token);
    // Navigate to dashboard or home
    console.log('Logged in:', res.data);
     toast.success("Logged in successfully.");
  } catch (err) {
    alert('Login failed: ' + err.response?.data?.message);
  }
};

const handleSignupSubmit = async (formData) => {
  try {
    const res = await axios.post('/auth/signup', {
      ...formData,
      role: userType,
    });
    console.log('Registered:', res.data);
    setCurrentPage('confirmation');
  } catch (err) {
    alert('Signup failed: ' + err.response?.data?.message);
  }
};
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'welcome':
        return (
          <WelcomePage
            onUserTypeSelect={handleUserTypeSelect}
            onNavigateToLogin={() => setCurrentPage('login')}
          />
        );
      
      case 'login':
        return (
          <LoginPage
            onBack={() => setCurrentPage('welcome')}
            onNavigateToSignup={() => setCurrentPage('welcome')}
            onSubmit={handleLoginSubmit}
          />
        );
      
      case 'signup':
        return (
          <SignupPage
            userType={userType}
            onBack={() => setCurrentPage('welcome')}
            onNavigateToLogin={() => setCurrentPage('login')}
            onSubmit={handleSignupSubmit}
          />
        );
      
      case 'confirmation':
        return (
          <ConfirmationPage
            onNavigateToLogin={() => setCurrentPage('login')}
            onNavigateToHome={() => setCurrentPage('welcome')}
          />
        );
      
      default:
        return (
          <WelcomePage
            onUserTypeSelect={handleUserTypeSelect}
            onNavigateToLogin={() => setCurrentPage('login')}
          />
        );
    }
  };

  return renderCurrentPage();
};

export default AuthController;