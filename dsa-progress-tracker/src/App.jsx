import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Notes from './pages/Notes';
import CppStlNotes from './pages/CppStlNotes';
import DsaPdfNotes from './pages/DsaPdfNotes';
import SqlNotes from './pages/SqlNotes';
import SystemDesignNotes from './pages/SystemDesignNotes';
import './App.css';
import WebdevNotes from './pages/WebdevNotes';

const CoreSubjectsNotes = React.lazy(() => import('./pages/CoreSubjectsNotes'));

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <nav className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center h-16">
                <Link to="/" className="text-xl font-bold text-primary-600 dark:text-primary-400">
                 TOP 100 DSA Problems
                </Link>
              
                  <div className="flex space-x-4">
                      <Link
                    to="/notes"
                    className="text-gray-2000 font-bold hover:text-primary-600 dark:text-gray-600 dark:hover:text-primary-400">
                  
                    Learning Resources
                  </Link>

                  <Link to="/"
                    className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                    Home
                  </Link>

                    <Link
                      to="/profile"
                    className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                  >
                    Profile
                  </Link>
                  
                  {/* <Link
                    to="/cpp-stl-notes"
                    className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                  >
                    C++ STL Learning
                  </Link> */}
                {/* <Link
                    to="/dsa-pdf-notes"
                    className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                  >
                    DSA PDFs & Learning
                  </Link>
                  <Link
                    to="/sql-notes"
                    className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                  >
                    SQL Learning
                  </Link>
                  <Link
                    to="/system-design-notes"
                    className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                  >
                    System Design Learning
                  </Link>
                  <Link
                    to="/core-subjects-notes"
                    className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                  >
                    Core Subjects Learning
                  </Link>
                  <Link
                    to="/webdev-notes"
                    className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                  >
                    Web Development Learning
                  </Link> */}
                </div>
              </div>
            </div>
          </nav>

          <main>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route path="/notes" element={<Notes />} />
                <Route path="/cpp-stl-notes" element={<CppStlNotes />} />
                <Route path="/dsa-pdf-notes" element={<DsaPdfNotes />} />
                <Route path="/sql-notes" element={<SqlNotes />} />
                <Route path="/system-design-notes" element={<SystemDesignNotes />} />
                <Route path="/core-subjects-notes" element={<CoreSubjectsNotes />} />
                <Route path="/webdev-notes" element={<WebdevNotes />} />
                <Route path="/" element={<Navigate to="/dashboard" />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
