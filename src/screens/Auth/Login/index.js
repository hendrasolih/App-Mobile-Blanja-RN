import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {COLOR_MAIN, FONT_BOLD, FONT_REG} from '../../../utils/constans';
import {API_URL} from '@env';

//redux
import {connect} from 'react-redux';
import {login, logout} from '../../../utils/redux/action/authAction';

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('token', value);
  } catch (e) {
    // saving error
  }
};

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    const userid = await AsyncStorage.getItem('userid');
    if (value !== null) {
      // value previously stored
      console.log(value);
      console.log(userid);
    }
  } catch (e) {
    // error reading value
  }
};

const Login = ({navigation, login}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = () => {
    const data = {
      email: email,
      user_password: password,
    };
    axios
      .post(`${API_URL}/auth/login`, data)
      .then(async (res) => {
        console.log(res.data.data.token);
        console.log(res.data.data.user_id);
        console.log(res.data.data.level);
        const token = res.data.data.token;
        const id = res.data.data.user_id;
        const level = res.data.data.level;
        login(token, id, level);

        console.log('done');
        navigation.navigate('MainApp');
      })
      .catch((err) => {
        console.log(err);
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
    login: (token, id, level) => dispatch(login(token, id, level)),
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
    marginBottom: 32,
    marginTop: 5,
  },
});
