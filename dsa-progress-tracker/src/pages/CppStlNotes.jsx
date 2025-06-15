import React from 'react';

const CppStlNotes = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">C++ STL Learning</h1>
    <div className="prose dark:prose-invert max-w-none">
       <p className="mb-10 text-center text-base text-gray-600 dark:text-gray-300">
        Essential C++ STL concepts, libraries, and resources for learning, interviews, and university exams. All links open the latest learning material on GitHub.
    </p>
      <ul className="space-y-2 mb-6">
        <li className="flex items-center justify-between border-b pb-2">
          <span className="font-medium text-base text-gray-800 dark:text-gray-100">C++ STL Library README (GitHub)</span>
          <a
            href="https://github.com/lavanyamahalle/LEARNING/blob/main/CPP-STL-libraries/README.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm font-semibold"
          >
            View
          </a>
        </li>
      </ul>
      <p className="mt-16 text-center text-primary-500 text-base font-semibold">
        More C++ STL resources coming soon. Stay curious and keep learning!
      </p>
      <p className="mt-2 text-center text-gray-500 text-sm">
        I'm also a learner—let's keep growing together!
      </p>
    </div>
  </div>
);

export default CppStlNotes;
