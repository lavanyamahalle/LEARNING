import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';

export default function TopicProgress({ 
  topic, 
  problems = [], 
  progress = {}, 
  onMarkSolved, 
  onMarkUnsolved 
}) {
  // Ensure topic is a string
  const topicName = React.useMemo(() => {
    if (typeof topic === 'string') return topic;
    if (typeof topic === 'object' && topic !== null) {
      if (typeof topic.topic === 'string') return topic.topic;
      if (typeof topic.toString === 'function') return topic.toString();
    }
    return 'Untitled Topic';
  }, [topic]);
  
  const solvedCount = problems.filter(problem => progress[problem.id]?.solved).length;
  const progressPercentage = problems.length > 0 ? (solvedCount / problems.length) * 100 : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {topicName}
        </h3>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {solvedCount} / {problems.length} solved
        </span>
      </div>
      
      <ProgressBar 
        progress={progressPercentage} 
        color={progressPercentage === 100 ? 'success' : 'primary'}
        className="mb-4"
      />

      <div className="space-y-2">
        {problems.map((problem) => (
          <div 
            key={problem.id}
            className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={progress[problem.id]?.solved || false}
                onChange={(e) => {
                  if (e.target.checked) {
                    onMarkSolved(problem.id);
                  } else {
                    onMarkUnsolved(problem.id);
                  }
                }}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <a
                href={problem.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                {problem.title}
              </a>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${
              problem.difficulty === 'Easy' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                : problem.difficulty === 'Medium'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
            }`}>
              {problem.difficulty}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

TopicProgress.propTypes = {
  topic: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      topic: PropTypes.string
    })
  ]).isRequired,
  problems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      difficulty: PropTypes.oneOf(['Easy', 'Medium', 'Hard']).isRequired
    })
  ),
  progress: PropTypes.object,
  onMarkSolved: PropTypes.func.isRequired,
  onMarkUnsolved: PropTypes.func.isRequired
}; 