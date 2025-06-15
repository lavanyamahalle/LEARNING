import React from "react";

const subjects = [
	{
		name: "Artificial Intelligence (AI)",
		notesUrl: "https://github.com/lavanyamahalle/LEARNING/blob/main/CORESUB/AI/NOTES.MD",
	},
	{
		name: "Cloud Computing (CC)",
		notesUrl: "https://github.com/lavanyamahalle/LEARNING/blob/main/CORESUB/CC/NOTES.MD",
	},
	{
		name: "Computer Networks & Security (CNS)",
		notesUrl: "https://github.com/lavanyamahalle/LEARNING/blob/main/CORESUB/CNS/NOTES.MD",
	},
	{
		name: "DBMS",
		notesUrl: "https://github.com/lavanyamahalle/LEARNING/blob/main/CORESUB/DBMS/NOTES.MD",
	},
	{
		name: "Data Science & Big Data Analytics (DSBDA)",
		notesUrl: "https://github.com/lavanyamahalle/LEARNING/blob/main/CORESUB/DSBDA/NOTES.MD",
	},
	{
		name: "Object Oriented Programming (OOP)",
		notesUrl: "https://github.com/lavanyamahalle/LEARNING/blob/main/CORESUB/OOP/NOTES.MD",
	},
	{
		name: "Operating Systems (OS)",
		notesUrl: "https://github.com/lavanyamahalle/LEARNING/blob/main/CORESUB/OS/NOTES.MD",
	},
];

const CoreSubjectsNotes = () => (
	<div className="max-w-3xl mx-auto px-4 py-10">
		<h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
			Core Subjects Learning
		</h1>
		<p className="mb-10 text-center text-base text-gray-600 dark:text-gray-300">
			Access concise, exam-focused learning resources for all major CS core
			subjects. Each subject links to detailed learning material on GitHub.
			Perfect for building strong fundamentals and deep understanding.
		</p>
		<ul className="space-y-4">
			{subjects.map((subj) => (
				<li
					key={subj.name}
					className="flex items-center justify-between border-b pb-3"
				>
					<span className="font-medium text-lg text-gray-800 dark:text-gray-100">
						{subj.name}
					</span>
					<a
						href={subj.notesUrl}
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
			All notes are based on university PYQs, interviews, and last-minute
			revision needs.
		</p>
		<p className="mt-16 text-center text-primary-500 text-base font-semibold">
			More core subject resources will be added soon. Stay curious and keep
			learning!
		</p>
		<p className="mt-2 text-center text-gray-500 text-sm">
			I'm also a learner—let's keep growing together!
		</p>
	</div>
);

export default CoreSubjectsNotes;
