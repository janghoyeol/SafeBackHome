import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Modal, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { db, doc, auth, getDoc, onAuthStateChanged } from '../config';

const screenWidth = Dimensions.get('window').width;

function MenuScreen({ closeMenu }) {
  const [modalType, setModalType] = useState(null);
  const [userData, setUserData] = useState(null);

  const navigation = useNavigation();

  const closeModal = () => {
    setModalType(null);
  }

  const handlePress = (event) => {
    if (event.nativeEvent.locationX > screenWidth / 2) {
      closeMenu();
    }
  };

  const goToPopup = () => {
    navigation.navigate('Popup');
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'default.png':
        return require('../assets/icons/default.png');
      case 'child.png':
        return require('../assets/icons/child.png');
      case 'elder.png':
        return require('../assets/icons/elder.png');
      case 'girl.png':
        return require('../assets/icons/girl.png');
      case 'man.png':
        return require('../assets/icons/man.png');
      default:
        return require('../assets/icons/default.png');
    }
};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        try {
          const docRef = doc(db, 'users', authUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData({
              ...data,
              emergencyNumber: String(data.emergencyNumber).padStart(11, '0'),
            });
          } else {
            console.log('실패!');
          }
        } catch (error) {
          console.error('파이어베이스 에러: ', error);
        }
      }
    });

    return unsubscribe;
  }, []);
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalType !== null}
        onRequestClose={closeModal}
      />
      <TouchableOpacity style={styles.modal} onPress={handlePress} activeOpacity={1}>
        <View style={styles.topSection}>
          <TouchableOpacity 
            onPress={goToPopup} 
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
            style={{position: 'absolute', top: 10, right: 10, zIndex: 3}}>
            <Icon name="cog" style={styles.settingsIcon} size={30} color="white"/>
          </TouchableOpacity>
          <Text style={styles.userName}>{userData ? userData.fullName : 'Loading...'}</Text>
          <Image source={getIcon(userData ? userData.profile : 'default.png')} style={styles.profileImage} />

        </View>
        <View style={styles.bottomSection}>
          <Text style={styles.infoText}>비상 전화번호: {userData ? userData.emergencyNumber.padStart(11, '0') : 'Loading...'}</Text>
          <Text style={styles.infoText}>예약어: {userData ? userData.word : 'Loading...'}</Text>
        </View> 
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '50%',
    height: '100%',
    zIndex: 2,
    backgroundColor: '#f0f0f0',  // 라이트 그레이 배경색 추가
  },
  topSection: {
    height: '50.85%',
    backgroundColor: '#3498db',  // 블루 색상으로 변경
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,  // 구분선 추가
    borderBottomColor: '#ccc',  // 구분선 색상 설정
  },
  bottomSection: {
    height: '49.15%',
    backgroundColor: 'white',
    alignItems: 'flex-start',
    padding: 15,
    paddingLeft: 20,  // 패딩 조정
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 40,
    marginBottom: 10,  // 마진 추가
  },
  userName: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,  // 마진 조정
  },
  settingsIcon: {
    position: 'absolute',
    top: 30,  // 위치 조정
    right: 10,  // 위치 조정
    zIndex: 3,
  },
  infoText: {
    fontSize: 20,
    marginBottom: 60,
  },
});

export default MenuScreen;
