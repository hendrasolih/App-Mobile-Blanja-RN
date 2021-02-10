import axios from 'axios';
import React from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useState} from 'react/cjs/react.development';
import {
  COLOR_DISABLE,
  COLOR_MAIN,
  FONT_BOLD,
  FONT_REG,
} from '../../../utils/constans';
import {Picker} from '@react-native-picker/picker';
import {API_URL} from '@env';

const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const regexPwd = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [store, setStore] = useState('');
  const [role, setRole] = useState(1);
  const [errorMsg, setErrorMsg] = useState('');
  const handleSubmit = () => {
    if (name == '' || email == '' || password == '' || store == '') {
      return setErrorMsg('input');
    }
    if (name.length < 4 || name.length > 12) {
      return setErrorMsg('name');
    }
    if (!regexEmail.test(email)) {
      return setErrorMsg('email');
    }
    if (store.length < 4 || store.length > 12) {
      return setErrorMsg('store');
    }
    if (!regexPwd.test(password)) {
      return setErrorMsg('strongpass');
    }
    const data = {
      user_name: name,
      email: email,
      user_password: password,
      level_id: role,
      store_name: store,
    };
    axios
      .post(`${API_URL}/auth/signup`, data)
      .then(async (res) => {
        Alert.alert(
          'Register',
          'Register Berhasil',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.log(error.message);
        const status = error.response.data.status;
        setErrorMsg(status);
        //console.log(error.response.data.status);
      });
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Sign up</Text>
        <View>
          <View style={{backgroundColor: '#fff', marginBottom: 10}}>
            <Text style={{fontSize: 14, color: COLOR_DISABLE}}>Pick Role</Text>
            {/* DROPDOWN */}
            <Picker
              selectedValue={role}
              onValueChange={(itemValue) => {
                setRole(itemValue);
              }}>
              <Picker.Item label="Seller" value={1} />
              <Picker.Item label="Customer" value={2} />
            </Picker>
          </View>
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
          {role == 1 && (
            <TextInput
              style={styles.form}
              placeholder="Store Name"
              defaultValue={store}
              onChangeText={(store) => setStore(store)}
            />
          )}
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
        <Text style={styles.errormsg}>
          {errorMsg == 409
            ? 'Email Already Registered'
            : errorMsg == 'input'
            ? 'Please Fill All Form'
            : errorMsg == 'name'
            ? 'Name Length Char Min 4 Max 12'
            : errorMsg == 'email'
            ? 'Please Input Valid Email'
            : errorMsg == 'store'
            ? 'Store Name Length Char Min 4 Max 12'
            : errorMsg == 'strongpass'
            ? 'Password should at least have 1 Lower Case (a-z), 1 Upper Case (A-Z), 1 Number (0-9)'
            : ''}
        </Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.containerKeyboard}>
          <TouchableOpacity onPress={handleSubmit}>
            <View style={styles.button}>
              <Text style={styles.textBtn}>SIGN UP</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default Register;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  containerKeyboard: {
    flex: 1,
  },
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
  errormsg: {
    color: 'red',
    textAlign: 'center',
    marginBottom: windowHeight * 0.03,
  },
});
