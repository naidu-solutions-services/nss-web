import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../config/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setUserProfile(userDoc.data());
        } else {
          const defaultData = { 
            email: currentUser.email, 
            organizationId: 'default-midc-org', 
            role: 'manager' 
          };
          await setDoc(doc(db, 'users', currentUser.uid), defaultData);
          setUserProfile(defaultData);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  
  const register = async (email, password, orgName) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const orgId = orgName.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
    const profile = { 
      email, 
      organizationId: orgId, 
      organizationName: orgName, 
      role: 'admin', 
      createdAt: new Date().toISOString() 
    };
    await setDoc(doc(db, 'users', res.user.uid), profile);
    await setDoc(doc(db, 'organizations', orgId), { 
      name: orgName, 
      ownerId: res.user.uid, 
      createdAt: new Date().toISOString() 
    });
    setUserProfile(profile);
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, userProfile, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);