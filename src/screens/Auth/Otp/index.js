import axios from 'axios';
import React, {useState} from 'react';
import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {COLOR_MAIN, FONT_BOLD, FONT_REG} from '../../../utils/constans';

//navigation.navigate('ResetPass');
import {API_URL} from '@env';

const Otp = ({navigation, route}) => {
  const {user_id} = route.params;
  const [otp, setOtp] = useState('');
  const handleSubmit = () => {
    const data = {
      otp: otp,
    };
    axios
      .post(`${API_URL}/auth/otp`, data)
      .then(async (res) => {
        Alert.alert(
          'OTP',
          'Kode OTP Valid',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
        navigation.navigate('ResetPass', {user_id});
      })
      .catch((err) => {
        Alert.alert(
          'OTP',
          'Kode OTP Tidak Valid',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
        console.log(err);
        console.log('error disini');
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP</Text>
      <Text>Please, enter your OTP code. You received from your email.</Text>
      <TextInput
        style={styles.form}
        placeholder="OTP"
        defaultValue={otp}
        onChangeText={(otp) => setOtp(otp)}
      />
      <TouchableOpacity onPress={handleSubmit}>
        <View style={styles.button}>
          <Text style={styles.textBtn}>SEND</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Otp;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: windowWidth * 0.04,
  },
  title: {
    fontFamily: FONT_BOLD,
    fontSize: 34,
    marginTop: windowHeight * 0.08,
    marginBottom: windowHeight * 0.08,
  },
  form: {
    backgroundColor: '#fff',
    marginBottom: 8,
    marginTop: 16,
    borderRadius: 4,
  },
  button: {
    backgroundColor: COLOR_MAIN,
    alignItems: 'center',
    height: 48,
    paddingVertical: 14,
    borderRadius: 25,
    marginTop: windowHeight * 0.08,
  },
  textBtn: {
    color: '#fff',
    fontFamily: FONT_REG,
    fontSize: 14,
  },
});
