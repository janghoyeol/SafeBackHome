import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function Header({ openMenu }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={openMenu} style={styles.iconContainer}>
        <Text style={styles.icon}>☰</Text>
      </TouchableOpacity>
      <Text style={styles.title}>안심 친구</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  iconContainer: {
    position: 'absolute',
    left: 10,
  },
  icon: {
    fontSize: 24,
    color: 'white',
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
});

export default Header;
