import React from 'react';

export default function ProgressBar({ 
  progress, 
  color = 'primary', 
  height = 'h-2',
  showPercentage = true,
  className = ''
}) {
  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.min(100, Math.max(0, progress));
  
  // Color classes based on progress
  const getColorClasses = () => {
    switch (color) {
      case 'success':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'danger':
        return 'bg-red-500';
      case 'primary':
      default:
        return 'bg-primary-500';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={`relative ${height} w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden`}>
        <div
          className={`absolute top-0 left-0 ${height} ${getColorClasses()} transition-all duration-500 ease-out`}
          style={{ width: `${normalizedProgress}%` }}
        />
      </div>
      {showPercentage && (
        <div className="mt-1 text-sm text-gray-600 dark:text-gray-400 text-right">
          {Math.round(normalizedProgress)}%
        </div>
      )}
    </div>
  );
} 