import React, { useState, useEffect } from 'react';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';
import SchedulePost from '../components/SchedulePost';
import RegisterUser from '../components/RegisterUser';
import LinkedInAuthButton from '../components/LinkedInAuthButton';

const Home: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      fetch(`http://localhost:5000/api/linkedin/callback?code=${code}`)
        .then(response => response.json())
        .then(data => {
          if (data.access_token) {
            setIsAuthenticated(true);
            setAccessToken(data.access_token);
            localStorage.setItem('linkedin_access_token', data.access_token);
          }
        })
        .catch(error => console.error('Error fetching access token:', error));
    } else {
      const storedToken = localStorage.getItem('linkedin_access_token');
      if (storedToken) {
        setIsAuthenticated(true);
        setAccessToken(storedToken);
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('linkedin_access_token');
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  const postToLinkedIn = async (content: string, scheduleDate: Date | null) => {
    if (!accessToken) return;
    try {
      const response = await fetch('http://localhost:5000/api/linkedin/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          accessToken,
          content,
          scheduleDate: scheduleDate ? scheduleDate.toISOString() : null
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error posting to LinkedIn:', errorData);
        return;
      }

      const data = await response.json();
      console.log('Post successful:', data);
    } catch (error) {
      console.error('Unexpected error posting to LinkedIn:', error);
    }
  };

  return (
    <div>
      <Navbar />
      {!isAuthenticated ? (
        <LinkedInAuthButton />
      ) : (
        <>
          <button onClick={logout} className="bg-red-500 text-white p-2 mt-2">Logout</button>
          <Dashboard />
          <RegisterUser />
          <SchedulePost onPost={postToLinkedIn} />
        </>
      )}
    </div>
  );
};

export default Home;
