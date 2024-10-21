// Profile.js
import React, { useState, useEffect } from 'react';
import './Profile.css'; // Pastikan Anda mengimpor file CSS

function Profile({ username }) {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://api.github.com/users/${username}`)
            .then(response => response.json())
            .then(data => {
                setProfileData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching GitHub profile:', error);
                setLoading(false);
            });
    }, [username]);

    return (
        <div className="profile-card">
            {loading ? (
                <p className="loading">Loading...</p>
            ) : profileData ? (
                <>
                    <img
                        src={profileData.avatar_url || "https://via.placeholder.com/150"}
                        alt={`${profileData.name || 'Profile'}'s Picture`}
                    />
                    <h1>{profileData.name || "No Name Provided"}</h1>
                    <a
                        href={profileData.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Visit GitHub Profile
                    </a>
                    <p>Followers: {profileData.followers || 0}</p>
                </>
            ) : (
                <p className="error">Profile not found</p>
            )}
        </div>
    );
}

export default function Profiles() {
    const usernames = ["fluffyeaaq", "melisanyh", "RendyAkbar", "Kyuzans"]; // Ganti dengan username lain jika diperlukan

    return (
        <div className="profiles-container">
            {usernames.map((username) => (
                <Profile key={username} username={username} />
            ))}
        </div>
    );
}