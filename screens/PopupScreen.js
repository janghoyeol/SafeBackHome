import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Image } from 'react-native';
import { db, doc, setDoc, auth, signOut, getDoc } from '../config';
import { Audio } from 'expo-av';
import RadioForm from 'react-native-simple-radio-button';
import { useNavigation } from '@react-navigation/native';

function PopupScreen() {
  const [userData, setUserData] = useState(null);
  const [emergencyNumber, setEmergencyNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [word, setWord] = useState('');
  const [sirenSound, setSirenSound] = useState(null);
  const [sound, setSound] = useState(null);
  const [selectedImage, setSelectedImage] = useState('default.png');
  const [isImagePickerVisible, setImagePickerVisible] = useState(false);

  const navigation = useNavigation();

  const fetchUserData = async () => {
    try {
      const uid = auth.currentUser.uid;
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData(data);
        setEmergencyNumber(data.emergencyNumber);
        setFullName(data.fullName);
        setWord(data.word);
        setSirenSound(data.sirenSound);
      } else {
        console.log('firebase 오류!');
      }
    } catch (error) {
      console.error('파이어 베이스 오류:', error);
    }
  };

  const radio_props = [
    {label: '1', value: 'siren1' },
    {label: '2', value: 'siren2' },
    {label: '3', value: 'siren3' }
  ];

  const sirenFiles = {
    siren1: require('../assets/sound/siren1.mp3'),
    siren2: require('../assets/sound/siren2.mp3'),
    siren3: require('../assets/sound/siren3.mp3')
  };

  const imageOptions = [
    { label: 'Default', value: 'default.png' },
    { label: 'Child', value: 'child.png' },
    { label: 'Elder', value: 'elder.png' },
    { label: 'Girl', value: 'girl.png' },
    { label: 'Man', value: 'man.png' },
  ];
  const getIcon = (iconName) => {
    switch(iconName) {
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

  const playSiren = async (siren) => {
    const soundObj = new Audio.Sound();
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      await soundObj.loadAsync(sirenFiles[siren]);
      await soundObj.playAsync();
      setSound(soundObj);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleUpdateUser = async () => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const uid = auth.currentUser.uid;
      const docRef = doc(db, 'users', uid);
      await setDoc(docRef, {
        emergencyNumber,
        fullName,
        word,
        sirenSound,
        profile: selectedImage,
      }, { merge: true });

      console.log('개인 정보 업데이트 성공!');
      navigation.navigate('Home');
    } catch (error) {
      console.error('업데이트 오류:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('로그아웃 완료');
    } catch (error) {
      console.error('로그아웃 오류: ', error);
    }
  };

  const getIndex = (sound) => {
    return sound === 'siren1' ? 0 : sound === 'siren2' ? 1 : 2;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>환경 설정</Text>
      <TextInput
        style={styles.input}
        placeholder="비상 전화번호"
        value={emergencyNumber}
        onChangeText={setEmergencyNumber}
        maxLength={11}
        keyboardType="number-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="닉네임"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="예약어"
        value={word}
        onChangeText={setWord}
      />

      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => setImagePickerVisible(true)}
      >
        <Text>프로필 사진 변경</Text>
      </TouchableOpacity>
      {isImagePickerVisible && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={isImagePickerVisible}
          onRequestClose={() => setImagePickerVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {imageOptions.map((option, index) => (
              <TouchableOpacity key={index} onPress={() => {
                setSelectedImage(option.value);
                setImagePickerVisible(false);  // 이미지 선택 후 Modal 닫기
              }}>
                <Image source={getIcon(option.value)} style={{ width: 50, height: 50 }} />
                <Text style={{textAlign: 'center'}}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
      )}
      <Text style={{marginBottom: 10}}>긴급 상황 사이렌</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '80%'}}></View>
      <RadioForm
        radio_props={radio_props}
        initial={getIndex(sirenSound)}
        onPress={(value) => { 
          setSirenSound(value);
          playSiren(value);
        }}
        buttonColor={'#2196f3'}
        selectedButtonColor={'#2196f3'}
        labelHorizontal={true}
        labelStyle={{paddingRight: 10}}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdateUser}>
        <Text style={styles.buttonText}>개인정보 수정</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>로그아웃</Text>
      </TouchableOpacity>
      </View>
  );
}      

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 20,
    width: '80%',
    paddingHorizontal: 10,
  },
  profileButton: {
    backgroundColor: '#0dee0d',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
    profileButtonText: {
      color: 'black',
    },
  button: {
    backgroundColor: '#008CBA',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default PopupScreen;