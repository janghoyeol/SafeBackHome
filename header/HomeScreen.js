import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/Header';
import Menu from '../components/Menu';

function HomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  const openMenu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const makePhoneCall = () => {
    const phoneNumber = 'tel:010-0000-0000';
    Linking.openURL(phoneNumber);
  }

  const goGTPScreen = () => {
    navigation.navigate('GPT');
  }
  

  return (
    <View style={styles.container}>
        <Header openMenu={openMenu} />
        {menuVisible && 
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={closeMenu}
          />}
          {menuVisible && <Menu closeMenu={closeMenu} />}
      <View style={styles.contentContainer}>
        <View style={styles.sosContainer}>
          <Text style={styles.infoText}>긴급 상황 시 3초간 꾹 누르세요</Text>
          <TouchableOpacity 
            style={styles.sosButton}
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
        
          <Text style={styles.iconText}>음성대화 시작</Text>
        </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
