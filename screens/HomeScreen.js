import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Linking } from 'react-native';
import { Audio } from 'expo-av';
import { auth, db, doc, getDoc } from '../config';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/Header';
import MenuScreen from './MenuScreen';

function HomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [emergencyNumber, setEmergencyNumber] = useState(null);
  const [sirenSound, setSirenSound] = useState('siren1');

  const navigation = useNavigation();

  useEffect(() => {
    const fetchEmergencyNumber = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setEmergencyNumber(docSnap.data().emergencyNumber);
          setSirenSound(docSnap.data().sirenSound);
        }
      }
    };
    fetchEmergencyNumber();
  }, []);

  const openMenu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const sirenFiles = {
    siren1: require('../assets/sound/siren1.mp3'),
    siren2: require('../assets/sound/siren2.mp3'),
    siren3: require('../assets/sound/siren3.mp3')
  };

  const playSiren = async () => {
    const siren = new Audio.Sound();
    try {
      const sirenFile = sirenFiles[sirenSound];
      await siren.loadAsync(sirenFile);
      await siren.playAsync();
    } catch (error) {
      console.error(error);
    }
  };

  const makePhoneCall = () => {
    if (emergencyNumber) {
      const formattedNumber = emergencyNumber.slice(0, 3) + '-' + emergencyNumber.slice(3, 7) + '-' + emergencyNumber.slice(7, 11);
      const phoneNumber = `tel:${formattedNumber}`;
      Linking.openURL(phoneNumber);
    }
  };

  const goGTPScreen = () => {
    navigation.navigate('GPT');
  }
  

  return (
    <View style={styles.container}>
      <View style={styles.topBar}></View>
        <Header openMenu={openMenu} />
        {menuVisible && 
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={closeMenu}
          />}
          {menuVisible && <MenuScreen closeMenu={closeMenu} />}
      <View style={styles.contentContainer}>
        <View style={styles.sosContainer}>
          <Text style={styles.infoText}>짧게 누르면 사이렌</Text>
          <Text style={styles.infoText}>3초 누르면 긴급신고</Text>
          <TouchableOpacity 
            style={styles.sosButton}
            onPressIn={playSiren}
            onLongPress={makePhoneCall}
            delayLongPress={3000}
          >
            <Image source={require('../assets/sos.png')} style={styles.sosIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={goGTPScreen}>
            <Image source={require('../assets/gpt.png')} style={styles.icon} />
          </TouchableOpacity>
        
          <Text style={styles.iconText}>대화 시작</Text>
        </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    backgroundColor: 'black',
    height: '3%',
  },
  contentContainer: {
    flex: 1,
    zIndex: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  sosContainer: {
    flex: 4,
    backgroundColor: '#A1DD70',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 20,
  },
  sosButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosIcon: {
    width: 100,
    height: 100,
  },
  iconContainer: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5E3B8',
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  iconText: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;
