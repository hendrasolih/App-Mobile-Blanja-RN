import React, {useState} from 'react';
import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {COLOR_MAIN, FONT_BOLD, FONT_REG} from '../../../utils/constans';
import {API_URL} from '@env';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const regexPwd = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

const ResetPass = ({navigation, route}) => {
  const {user_id} = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const handleSubmit = () => {
    if (password == '' || confirmPassword == '') {
      return setErrorMsg('input');
    }
    if (!regexPwd.test(password)) {
      return setErrorMsg('strongpass');
    }
    if (password !== confirmPassword) {
      return setErrorMsg('notsame');
    }
    const data = {
      user_password: password,
    };
    axios
      .post(`${API_URL}/auth/resetpass/${user_id}`, data)
      .then((res) => {
        //console.log(res);
        Alert.alert(
          'Reset Password',
          'Reset Password Berhasil',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
        navigation.navigate('Login');
      })
      .catch((err) => {
        console.log(err);
        console.log('error disini');
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <View>
        <Text
          style={{
            color: '#F01F0E',
            textAlign: 'center',
            marginBottom: windowHeight * 0.04,
          }}>
          You need to change your password to activate your account
        </Text>
        <TextInput
          secureTextEntry
          style={styles.form}
          placeholder="New Password"
          defaultValue={password}
          onChangeText={(password) => setPassword(password)}
        />
        <TextInput
          secureTextEntry
          style={styles.form}
          placeholder="Confirmation New Password"
          defaultValue={confirmPassword}
          onChangeText={(confirmPassword) =>
            setConfirmPassword(confirmPassword)
          }
        />
      </View>
      <Text style={styles.error}>
        {errorMsg == 'input'
          ? 'Please Enter Your New Password'
          : errorMsg == 'strongpass'
          ? 'Password should at least have 1 Lower Case (a-z), 1 Upper Case (A-Z), 1 Number (0-9)'
          : errorMsg == 'notsame'
          ? `Password didn't match`
          : ''}
      </Text>
      <TouchableOpacity onPress={handleSubmit}>
        <View style={styles.button}>
          <Text style={styles.textBtn}>Reset Password</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPass;

const styles = StyleSheet.create({
  title: {
    fontFamily: FONT_BOLD,
    fontSize: 34,
    marginTop: windowHeight * 0.08,
    marginBottom: windowHeight * 0.08,
  },
  container: {
    paddingHorizontal: windowWidth * 0.04,
  },
  form: {
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 4,
  },
  button: {
    backgroundColor: COLOR_MAIN,
    alignItems: 'center',
    height: 48,
    paddingVertical: 14,
    borderRadius: 25,
  },
  textBtn: {
    color: '#fff',
    fontFamily: FONT_REG,
    fontSize: 14,
  },
  forgotPas: {
    alignSelf: 'flex-end',
    fontFamily: FONT_REG,
    marginBottom: 32,
    marginTop: 5,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: windowHeight * 0.04,
  },
});
