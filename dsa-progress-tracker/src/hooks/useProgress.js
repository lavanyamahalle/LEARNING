import { useState, useEffect } from 'react';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';

export function useProgress() {
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    console.log('useProgress hook mounted');
    console.log('Current user in useProgress:', currentUser);
    
    if (currentUser) {
      loadProgress();
    } else {
      console.log('No current user, resetting progress');
      setProgress({});
      setLoading(false);
    }
  }, [currentUser]);

  async function loadProgress() {
    try {
      console.log('Loading progress for user:', currentUser.uid);
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log('Found existing user document:', {
          email: userData.email,
          displayName: userData.displayName,
          progress: userData.progress
        });
        
        // Ensure progress is an object
        const progressData = userData.progress || {};
        console.log('Setting progress data:', progressData);
        setProgress(progressData);
      } else {
        console.log('Creating new user document');
        // Initialize progress for new user
        const initialData = {
          progress: {},
          email: currentUser.email,
          displayName: currentUser.displayName
        };
        console.log('Initializing with data:', initialData);
        await setDoc(doc(db, 'users', currentUser.uid), initialData);
        setProgress({});
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setLoading(false);
    }
  }

  async function markProblemSolved(problemId) {
    if (!currentUser) {
      console.warn('No current user, cannot mark problem solved');
      return;
    }

    try {
      console.log('Marking problem solved:', problemId);
      const userRef = doc(db, 'users', currentUser.uid);
      const updateData = {
        [`progress.${problemId}`]: {
          solved: true,
          solvedAt: new Date().toISOString()
        }
      };
      console.log('Updating with data:', updateData);
      await updateDoc(userRef, updateData);
      
      setProgress(prev => {
        const newProgress = {
          ...prev,
          [problemId]: {
            solved: true,
            solvedAt: new Date().toISOString()
          }
        };
        console.log('Updated progress state:', newProgress);
        return newProgress;
      });
      console.log('Successfully marked problem solved');
    } catch (error) {
      console.error('Error marking problem solved:', error);
      throw error;
    }
  }

  async function markProblemUnsolved(problemId) {
    if (!currentUser) {
      console.warn('No current user, cannot mark problem unsolved');
      return;
    }

    try {
      console.log('Marking problem unsolved:', problemId);
      const userRef = doc(db, 'users', currentUser.uid);
      const updateData = {
        [`progress.${problemId}`]: {
          solved: false,
          solvedAt: null
        }
      };
      console.log('Updating with data:', updateData);
      await updateDoc(userRef, updateData);
      
      setProgress(prev => {
        const newProgress = {
          ...prev,
          [problemId]: {
            solved: false,
            solvedAt: null
          }
        };
        console.log('Updated progress state:', newProgress);
        return newProgress;
      });
      console.log('Successfully marked problem unsolved');
    } catch (error) {
      console.error('Error marking problem unsolved:', error);
      throw error;
    }
  }

  return {
    progress,
    loading,
    markProblemSolved,
    markProblemUnsolved
  };
} 