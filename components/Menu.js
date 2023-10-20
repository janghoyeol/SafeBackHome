import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Modal, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

function Menu({ closeMenu }) {
  const [modalType, setModalType] = useState(null);

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

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalType !== null}
        onRequestClose={closeModal}
      >

    </Modal>
    <TouchableOpacity style={styles.modal} onPress={handlePress} activeOpacity={1}>
        <View style={styles.topSection}>
        <TouchableOpacity 
          onPress={goToPopup} 
  hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
  style={{position: 'absolute', top: 10, right: 10, zIndex: 3}}>
  <Icon name="cog" style={styles.settingsIcon} size={30} color="white"/>
</TouchableOpacity>
          <Text style={styles.userName}>user1</Text>
          <Image source={require('../assets/images/kemal.jpg')} style={styles.profileImage} />
        </View>
      <View style={styles.bottomSection}>
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
  },
  topSection: {
    height: '40%',
    backgroundColor: 'darkblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    height: '60%',
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 10
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userName: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10
  },
  settingsIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 3,
  }
});

export default Menu;
