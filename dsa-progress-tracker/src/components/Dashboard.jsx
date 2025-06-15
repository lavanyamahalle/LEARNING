import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../hooks/useProgress';
import { dsaProblems } from '../data/dsaProblems';
import OverallProgress from './OverallProgress';
import TopicProgress from './TopicProgress';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { progress, loading: progressLoading, markProblemSolved, markProblemUnsolved } = useProgress();
  const [loading, setLoading] = useState(true);
  const [allProblems, setAllProblems] = useState([]);

  useEffect(() => {
    console.log('Dashboard mounted');
    console.log('Current user:', currentUser);
    console.log('Initial dsaProblems:', dsaProblems);
    console.log('Initial progress:', progress);

    // Flatten all problems for the overall progress
    const flattenedProblems = dsaProblems.reduce((acc, topic) => {
      console.log('Processing topic:', {
        topic: topic.topic,
        problemsCount: topic.problems?.length
      });
      if (!topic || !topic.problems) {
        console.warn('Invalid topic structure:', topic);
        return acc;
      }
      return [...acc, ...topic.problems];
    }, []);
    
    console.log('Flattened problems:', {
      count: flattenedProblems.length,
      problems: flattenedProblems
    });
    setAllProblems(flattenedProblems);
    
    // Simulate loading progress data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentUser, progress]);

  const handleMarkSolved = async (problemId) => {
    try {
      console.log('Marking problem as solved:', problemId);
      await markProblemSolved(problemId);
    } catch (error) {
      console.error('Error marking problem as solved:', error);
    }
  };

  const handleMarkUnsolved = async (problemId) => {
    try {
      console.log('Marking problem as unsolved:', problemId);
      await markProblemUnsolved(problemId);
    } catch (error) {
      console.error('Error marking problem as unsolved:', error);
    }
  };

  if (loading || progressLoading) {
    console.log('Loading state:', { loading, progressLoading });
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Debug log for rendering
  console.log('Rendering Dashboard with:', {
    topics: dsaProblems.map(t => ({ topic: t.topic, problemsCount: t.problems.length })),
    progress,
    allProblemsCount: allProblems.length,
    currentUser
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome, {currentUser?.displayName || 'User'}!
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Track your DSA problem-solving progress
          </p>
        </div>

        <OverallProgress 
          problems={allProblems}
          progress={progress}
        />

        <div className="space-y-6">
          {dsaProblems && dsaProblems.length > 0 ? (
            dsaProblems.map((topicData) => {
              // Debug log for each topic
              console.log('Rendering topic data:', {
                topic: topicData.topic,
                type: typeof topicData.topic,
                problemsCount: topicData.problems?.length
              });

              // Ensure we have valid data
              if (!topicData || !topicData.topic || !Array.isArray(topicData.problems)) {
                console.warn('Invalid topic data:', topicData);
                return null;
              }

              return (
                <TopicProgress
                  key={topicData.topic}
                  topic={topicData.topic}
                  problems={topicData.problems}
                  progress={progress}
                  onMarkSolved={handleMarkSolved}
                  onMarkUnsolved={handleMarkUnsolved}
                />
              );
            })
          ) : (
            <div className="text-center text-gray-600 dark:text-gray-400">
              No topics available. Please check the data source.
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 