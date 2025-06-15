import React from 'react';
import ProfileHeader from '../components/ProfileHeader';
import ProfileInfo from '../components/ProfileInfo';

const Profile = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileHeader />
      <ProfileInfo />
    </div>
  );
};

export default Profile;