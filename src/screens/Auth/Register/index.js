import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {COLOR_MAIN, FONT_BOLD, FONT_REG} from '../../../utils/constans';

const Register = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <View>
        <TextInput style={styles.form} placeholder="Name" />
        <TextInput style={styles.form} placeholder="Email" />
        <TextInput secureTextEntry style={styles.form} placeholder="Password" />
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
      <TouchableOpacity>
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
