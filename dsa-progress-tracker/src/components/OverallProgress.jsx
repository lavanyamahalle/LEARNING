import React from 'react';
import ProgressBar from './ProgressBar';

export default function OverallProgress({ problems, progress }) {
  // Calculate total progress
  const totalProblems = problems.length;
  const solvedProblems = problems.filter(problem => progress[problem.id]?.solved).length;
  const progressPercentage = (solvedProblems / totalProblems) * 100;

  // Calculate progress by difficulty
  const difficultyProgress = {
    Easy: {
      total: problems.filter(p => p.difficulty === 'Easy').length,
      solved: problems.filter(p => p.difficulty === 'Easy' && progress[p.id]?.solved).length
    },
    Medium: {
      total: problems.filter(p => p.difficulty === 'Medium').length,
      solved: problems.filter(p => p.difficulty === 'Medium' && progress[p.id]?.solved).length
    },
    Hard: {
      total: problems.filter(p => p.difficulty === 'Hard').length,
      solved: problems.filter(p => p.difficulty === 'Hard' && progress[p.id]?.solved).length
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Overall Progress
      </h2>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700 dark:text-gray-300">
            Total Progress
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            {solvedProblems} / {totalProblems} problems solved
          </span>
        </div>
        <ProgressBar 
          progress={progressPercentage} 
          color={progressPercentage === 100 ? 'success' : 'primary'}
          height="h-3"
        />
      </div>

      <div className="space-y-4">
        {Object.entries(difficultyProgress).map(([difficulty, stats]) => {
          const percentage = (stats.solved / stats.total) * 100;
          return (
            <div key={difficulty}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 dark:text-gray-300">
                  {difficulty}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {stats.solved} / {stats.total} solved
                </span>
              </div>
              <ProgressBar 
                progress={percentage}
                color={
                  difficulty === 'Easy' ? 'success' :
                  difficulty === 'Medium' ? 'warning' : 'danger'
                }
                height="h-2"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
} 