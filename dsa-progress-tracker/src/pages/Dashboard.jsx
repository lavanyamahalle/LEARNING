import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../hooks/useProgress';
import { dsaProblems } from '../data/dsaProblems';
import OverallProgress from '../components/OverallProgress';
import TopicProgress from '../components/TopicProgress';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const { progress, loading, markProblemSolved, markProblemUnsolved } = useProgress();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  // Flatten all problems for overall progress
  const allProblems = dsaProblems.flatMap(topic => topic.problems);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome, {currentUser?.displayName || 'Learner'}!
        </h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>

      <OverallProgress problems={allProblems} progress={progress} />
      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Your Learning Progress by Topic
        </h2>
        <div className="space-y-6">
          {dsaProblems.map((topic) => (
            <TopicProgress
              key={topic.topic}
              topic={topic.topic}
              problems={topic.problems}
              progress={progress}
              onMarkSolved={markProblemSolved}
              onMarkUnsolved={markProblemUnsolved}
            />
          ))}
        </div>
      </div>
    </div>
  );
}