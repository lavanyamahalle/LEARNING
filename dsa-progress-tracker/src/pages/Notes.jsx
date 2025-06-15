import React from 'react';

const Notes = () => (
  <div className="max-w-3xl mx-auto px-4 py-10">
    <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Learning Resources</h1>
    <ul className="space-y-4">
      <li>
        <a href="/core-subjects-notes" className="text-blue-600 hover:underline font-medium text-lg">Core Subjects Learning (AI, Cloud, CN, DBMS, DSBDA, OOP, OS)</a>
      </li>
      <li>
        <a href="/cpp-stl-notes" className="text-blue-600 hover:underline font-medium text-lg">C++ STL Learning</a>
      </li>
      <li>
        <a href="/dsa-pdf-notes" className="text-blue-600 hover:underline font-medium text-lg">DSA Sheets & PDFs</a>
      </li>
      <li>
        <a href="/sql-notes" className="text-blue-600 hover:underline font-medium text-lg">SQL Learning</a>
      </li>
      <li>
        <a href="/system-design-notes" className="text-blue-600 hover:underline font-medium text-lg">System Design Learning</a>
      </li>
      <li>
        <a href="/webdev-notes" className="text-blue-600 hover:underline font-medium text-lg">Web Development Learning</a>
      </li>
    </ul>
    <p className="mt-12 text-center text-gray-400 text-xs">
      All resources are curated for university learning, practical skills, and deep understanding.
    </p>
    <p className="mt-16 text-center text-primary-500 text-base font-semibold">
      More resources and features coming soon. Stay curious and keep learning!
    </p>
    <p className="mt-2 text-center text-gray-500 text-sm">
      I'm also a learner—let's keep growing together!
    </p>
  </div>
);

export default Notes;
