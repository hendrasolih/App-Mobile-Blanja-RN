import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

const SettingProfile = () => {
  return (
    <View>
      <Text>Settings</Text>
      <Text>Personal Information</Text>
      <TextInput style={styles.input} placeholder="Full name" />
    </View>
  );
};

export default SettingProfile;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
  },
});
