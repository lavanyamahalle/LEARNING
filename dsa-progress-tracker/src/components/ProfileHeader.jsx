import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const ProfileHeader = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function fetchProfile() {
      if (!currentUser) return;
      const ref = doc(db, 'users', currentUser.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setProfile(snap.data());
      }
    }
    fetchProfile();
  }, [currentUser]);

  return (
    <div className="card mb-8">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {currentUser?.displayName || profile.displayName || 'Learner'}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center max-w-md mb-4">
          {currentUser?.email}
        </p>
        <p className="text-base text-gray-500 dark:text-gray-400 text-center max-w-md mb-2">
          Welcome to your learning profile! Track your progress, update your skills, and keep growing.
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;