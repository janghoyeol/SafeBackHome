import React, { useEffect, useState } from 'react';
import { firebase } from '../../safe/src/firebase/config';
import { LoginScreen, HomeScreen, RegistrationScreen } from '../../safe/src/screens';
import { decode, encode } from 'base-64';

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      console.log("onAuthStateChanged", user);
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            console.log("User data fetched:", userData);
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
            setLoading(false);
          });
      } else {
        console.log("No user found");
        setLoading(false);
        setUser(null);
      }
    });
}, []);

  if (loading) {
    return (
      <>
        <p>로딩 중...</p>
      </>
    )
  }

  if (user) {
    return <HomeScreen extraData={user} />;
  }

  if (showRegistration) {
    return (
      <>
        <RegistrationScreen />
      </>
    );
  }

  return (
    <>
      <LoginScreen />
    </>
  );
}
