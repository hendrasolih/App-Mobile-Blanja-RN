import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {COLOR_MAIN, FONT_BOLD, FONT_REG} from '../../../utils/constans';
import {API_URL} from '@env';
const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const regexPwd = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
//redux
import {connect} from 'react-redux';
import {login} from '../../../utils/redux/action/authAction';

const Login = ({navigation, login}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const handleSubmit = async () => {
    setErrorMsg('');
    if (email == '' || password == '') {
      return setErrorMsg('input');
    } else if (!regexEmail.test(email)) {
      return setErrorMsg('errormail');
    } else if (!regexPwd.test(password)) {
      return setErrorMsg('strongpass');
    }
    const data = {
      email: email,
      user_password: password,
    };
    await axios
      .post(`${API_URL}/auth/login`, data)
      .then(async (res) => {
        // console.log(res.data.data.token);
        // console.log(res.data.data.user_id);
        // console.log(res.data.data.level);
        // console.log('hereeeee   ' + res.data.data.user_name);
        const token = await res.data.data.token;
        const id = await res.data.data.user_id;
        const level = await res.data.data.level;
        const nameUser = await res.data.data.user_name;
        await login(token, id, level, nameUser);

        console.log('done');
        navigation.navigate('MainApp');
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg('wrong email');
        console.log('error disini');
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View>
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ForgotPass');
          }}>
          <Text style={styles.forgotPas}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.errormsg}>
        {errorMsg == 'wrong email'
          ? 'Invalid Email or Password'
          : errorMsg == 'input'
          ? 'Please Enter Your Email and Password'
          : errorMsg == 'errormail'
          ? 'Please Input Correct Email Format'
          : errorMsg == 'strongpass'
          ? 'Password should at least have 1 Lower Case (a-z), 1 Upper Case (A-Z), 1 Number (0-9)'
          : ''}
      </Text>
      <TouchableOpacity onPress={handleSubmit}>
        <View style={styles.button}>
          <Text style={styles.textBtn}>Login</Text>
        </View>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <Text>Don't have an account?</Text>
        <Text
          style={{marginLeft: 5, color: COLOR_MAIN}}
          onPress={() => navigation.navigate('Register')}>
          Register
        </Text>
      </View>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (token, id, level, nameUser) =>
      dispatch(login(token, id, level, nameUser)),
  };
};

export default connect(null, mapDispatchToProps)(Login);

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
    marginBottom: windowHeight * 0.05,
    marginTop: 5,
  },
  errormsg: {
    color: 'red',
    textAlign: 'center',
    marginBottom: windowHeight * 0.05,
  },
});
