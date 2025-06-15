import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function ProfileForm() {
  const { currentUser } = useAuth();
  const [about, setAbout] = useState('');
  const [skills, setSkills] = useState('');
  const [education, setEducation] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      if (!currentUser) return;
      const ref = doc(db, 'users', currentUser.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setAbout(data.about || '');
        setSkills(data.skills || '');
        setEducation(data.education || '');
      }
      setLoading(false);
    }
    fetchProfile();
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await setDoc(doc(db, 'users', currentUser.uid), {
      about,
      skills,
      education,
      displayName: currentUser.displayName,
      email: currentUser.email,
    }, { merge: true });
    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  if (loading) return <div>Loading profile...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
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
      <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded" disabled={saving}>{saving ? 'Saving...' : 'Save Profile'}</button>
      {success && <div className="text-green-600">Profile updated!</div>}
    </form>
  );
}
