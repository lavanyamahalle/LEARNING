import React from 'react';

const resources = [
 
  {
    name: "150 DSA Questions PDF (GitHub)",
    url: "https://github.com/lavanyamahalle/LEARNING/blob/main/DSA/150-DSA-questions%202.pdf"
  },
  {
    name: "Handwritten Notes PDF (GitHub)",
    url: "https://github.com/lavanyamahalle/LEARNING/blob/main/DSA/Data_Structure_Handwritten_Notes_%EF%BF%BD_1735369811.pdf"
  },
  {
    name: "DSA 1741283310 PDF (GitHub)",
    url: "https://github.com/lavanyamahalle/LEARNING/blob/main/DSA/DSA_1741283310.pdf"
  },
  {
    name: "DSA README (GitHub)",
    url: "https://github.com/lavanyamahalle/LEARNING/blob/main/DSA/README.md"
  },
  {
    name: "DSA Ques and Theory (GitHub)",
    url: "https://github.com/lavanyamahalle/LEARNING/blob/main/DSA/TOPIC%20WISE%20QUE%20AND%20NOTES/DP_QUES%20AND%20THOERY.md"
  }
];

const DsaPdfNotes = () => (
  <div className="max-w-3xl mx-auto px-4 py-10">
    <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">DSA Sheets & PDFs</h1>
    <p className="mb-8 text-center text-base text-gray-600 dark:text-gray-300">
      Here are all DSA PDF and markdown resources available for your learning. Download and use these for offline study and deep understanding.
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
      More DSA sheets and PDFs will be added soon. Stay curious and keep learning!
    </p>
    <p className="mt-2 text-center text-gray-500 text-sm">
      I'm also a learner—let's keep growing together!
    </p>
  </div>
);

export default DsaPdfNotes;
