import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function Profile() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    birthDate: '',
    address: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'users', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFormData({
          name: data.name,
          phone: data.phone,
          birthDate: data.birthDate.toDate().toISOString().split('T')[0],
          address: data.address
        });
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        ...formData,
        birthDate: new Date(formData.birthDate)
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Update error:', error);
      alert('Error updating profile');
    }
  };

  return (
    <div className="profile-form">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* Add form fields similar to AuthForm */}
      </form>
    </div>
  );
}