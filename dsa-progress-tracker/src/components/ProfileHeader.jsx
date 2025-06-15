import React from 'react';

const ProfileHeader = () => {
  return (
    <div className="card mb-8">
      <div className="flex flex-col items-center">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-primary-500 mb-4"
        />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Lavanya Mahalle
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center max-w-md mb-4">
          Passionate about Data Structures, Algorithms, and building scalable solutions.
          Always learning, always growing!
        </p>
        <div className="flex space-x-4">
          <a
            href="https://github.com/your-github"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
          >
            <i className="fab fa-github text-2xl"></i>
          </a>
          <a
            href="https://linkedin.com/in/your-linkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
          >
            <i className="fab fa-linkedin text-2xl"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader; 