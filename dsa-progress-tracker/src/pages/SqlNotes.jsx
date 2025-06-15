import React from 'react';

const resources = [
  {
    name: "SQL Notes (PDF)",
    url: "https://github.com/lavanyamahalle/LEARNING/blob/main/SQL/sql_notes_1742246152.pdf"
  },
  {
    name: "SQL Interview Questions (Markdown)",
    url: "https://github.com/lavanyamahalle/LEARNING/blob/main/SQL/InterviewQues.MD"
  },
  {
    name: "SQL Learning Notes (Markdown)",
    url: "https://github.com/lavanyamahalle/LEARNING/blob/main/SQL/Learning.md"
  },
  {
    name: "SQL Revision Table (Markdown)",
    url: "https://github.com/lavanyamahalle/LEARNING/blob/main/SQL/Revision(table).MD"
  },
  {
    name: "SQL Revision Questions (Markdown)",
    url: "https://github.com/lavanyamahalle/LEARNING/blob/main/SQL/revisionQues.MD"
  },
 
];

const SqlNotes = () => (
  <div className="max-w-3xl mx-auto px-4 py-10">
    <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">SQL Learning</h1>
    <p className="mb-8 text-center text-base text-gray-600 dark:text-gray-300">
      Essential SQL concepts, queries, and resources for learning and university exams. All links open the latest learning material on GitHub.
    </p>
    <ul className="space-y-4 mb-10">
      {resources.map((res) => (
        <li key={res.name} className="flex items-center justify-between border-b pb-3">
          <span className="font-medium text-lg text-gray-800 dark:text-gray-100">{res.name}</span>
          <a
            href={res.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm font-semibold"
          >
            View
          </a>
        </li>
      ))}
    </ul>
    
    <p className="mt-12 text-center text-gray-400 text-xs">
      All resources are curated for university learning, practical skills, and deep understanding.
    </p>
    <p className="mt-16 text-center text-primary-500 text-base font-semibold">
      More SQL resources and practice sets coming soon. Stay curious and keep learning!
    </p>
    <p className="mt-2 text-center text-gray-500 text-sm">
      I'm also a learner—let's keep growing together!
    </p>
  </div>
);

export default SqlNotes;
