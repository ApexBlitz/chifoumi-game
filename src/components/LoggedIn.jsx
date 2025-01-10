import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LoggedIn = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = Cookies.get('JWT');
    
    if (!jwt) {
      navigate('/');
    }
  }, [navigate]);

  return children;
};

export default LoggedIn;