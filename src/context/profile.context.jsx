import { useEffect } from 'react';
import { useContext } from 'react';
import { createContext, useState } from 'react';
import { auth, database } from '../misc/firebase';
import { useRef } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let userRef;
    const authunSub = auth.onAuthStateChanged(authObj => {
      if (authObj) {
        userRef = database.ref(`/profiles/${authObj.uid}`);
        useRef.on('value', snap => {
          const { name, createdAt } = snap.val();
          // console.log(profileData)

          const data = {
            name,
            createdAt,
            uid: authObj.uid,
            email: authObj.email,
          };
          setProfile(data);
          setIsLoading(false);
        });
      } else {

        if(userRef){
            userRef.off()
        }
        setProfile(null);
        setIsLoading(false);
      }
      // console.log('authObj',authObj);
    });
    return () => {
      authunSub();
      if(userRef){
        userRef.off();

      }
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
