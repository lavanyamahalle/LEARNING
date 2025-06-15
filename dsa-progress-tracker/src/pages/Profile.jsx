import React from 'react';
import ProfileHeader from '../components/ProfileHeader';

const Profile = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileHeader />
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          About Me
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          I am a passionate software developer with a strong focus on Data Structures and Algorithms.
          I love solving complex problems and building efficient solutions.
        </p>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Skills
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'DSA'].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Education
        </h3>
        <div className="text-gray-600 dark:text-gray-300">
          <p className="mb-2">Bachelor of Technology in Computer Science</p>
          <p>University Name, 2018-2022</p>
        </div>
      </div>
    </div>
  );
};

export default Profile; 