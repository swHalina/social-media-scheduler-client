import React from 'react';

const LinkedInAuthButton: React.FC = () => {
    const handleAuth = () => {
        const clientId = '86sr51vz6iilo7';
        const redirectUri = 'http://localhost:3000';
        const scope = encodeURIComponent('profile email w_member_social');
        const state = 'DCEeFWf45A53sdfKef424';
        const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;

        window.location.href = authUrl;
    };

    return <button onClick={handleAuth}>Authorize LinkedIn</button>;
};

export default LinkedInAuthButton;