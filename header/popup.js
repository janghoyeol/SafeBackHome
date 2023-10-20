import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { db, collection, addDoc, auth, signOut } from '../config';

function Popup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthYear, setBirthYear] = useState('');

  const handleAddUser = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: firstName,
        last: lastName,
        born: parseInt(birthYear, 10)
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
      navigation.navigate('App');  // Assuming 'App' is the name of the route to navigate back to App.js
    } catch (e) {
      console.error('Error signing out: ', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add User</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Birth Year"
        value={birthYear}
        onChangeText={setBirthYear}
        keyboardType="number-pad"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddUser}>
        <Text style={styles.buttonText}>Ada User</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '80%',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#008CBA',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default Popup;