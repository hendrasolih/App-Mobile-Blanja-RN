import axios from 'axios';
import React from 'react';
import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useState} from 'react/cjs/react.development';
import {COLOR_MAIN, FONT_BOLD, FONT_REG} from '../../../utils/constans';
import {API_URL} from '@env';

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = () => {
    const data = {
      user_name: name,
      email: email,
      user_password: password,
      level_id: 1,
    };
    axios
      .post(`${API_URL}/auth/signup`, data)
      .then(async (res) => {
        console.log(res);
        Alert.alert(
          'Register',
          'Register Berhasil',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
        navigation.navigate('Login');
      })
      .catch((err) => {
        console.log(err);
        console.log('erro disini');
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <View>
        <TextInput
          style={styles.form}
          placeholder="Name"
          defaultValue={name}
          onChangeText={(name) => setName(name)}
        />
        <TextInput
          style={styles.form}
          placeholder="Email"
          defaultValue={email}
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          secureTextEntry
          style={styles.form}
          placeholder="Password"
          defaultValue={password}
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity>
          <Text
            style={styles.forgotPas}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            Already have an account?
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleSubmit}>
        <View style={styles.button}>
          <Text style={styles.textBtn}>SIGN UP</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
});
