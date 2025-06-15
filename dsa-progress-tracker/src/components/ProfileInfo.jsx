import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const ProfileInfo = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [about, setAbout] = useState('');
  const [skills, setSkills] = useState('');
  const [education, setEducation] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      if (!currentUser) return;
      const ref = doc(db, 'users', currentUser.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setProfile(data);
        setAbout(data.about || '');
        setSkills(data.skills || '');
        setEducation(data.education || '');
      }
    }
    fetchProfile();
  }, [currentUser]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await setDoc(doc(db, 'users', currentUser.uid), {
      ...profile,
      about,
      skills,
      education,
    }, { merge: true });
    setProfile({ ...profile, about, skills, education });
    setEditMode(false);
    setSaving(false);
  };

  if (!profile) return <div>Loading profile...</div>;

  if (editMode) {
    return (
      <form onSubmit={handleSave} className="space-y-4 max-w-xl mx-auto mb-8">
        <div>
          <label className="block font-semibold mb-1">About Me</label>
          <textarea className="w-full border rounded p-2" rows={3} value={about} onChange={e => setAbout(e.target.value)} />
        </div>
        <div>
          <label className="block font-semibold mb-1">Skills (comma separated)</label>
          <input className="w-full border rounded p-2" value={skills} onChange={e => setSkills(e.target.value)} />
        </div>
        <div>
          <label className="block font-semibold mb-1">Education</label>
          <input className="w-full border rounded p-2" value={education} onChange={e => setEducation(e.target.value)} />
        </div>
        <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
        <button type="button" className="ml-2 px-4 py-2 bg-gray-300 rounded" onClick={() => setEditMode(false)}>Cancel</button>
      </form>
    );
  }

  return (
    <div className="card p-6 max-w-xl mx-auto mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{profile.about || 'No info provided.'}</p>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Skills</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {(profile.skills || '').split(',').filter(Boolean).map(skill => (
          <span key={skill.trim()} className="px-3 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded-full text-sm">{skill.trim()}</span>
        ))}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Education</h3>
      <div className="text-gray-600 dark:text-gray-300 mb-4">{profile.education || 'No info provided.'}</div>
      <button className="px-4 py-2 bg-primary-600 text-white rounded" onClick={() => setEditMode(true)}>Edit</button>
    </div>
  );
};

export default ProfileInfo;
