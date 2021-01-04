import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {COLOR_MAIN, FONT_BOLD, FONT_REG} from '../../../utils/constans';

const ResetPass = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <View>
        <Text style={{color: '#F01F0E'}}>
          You need to change your password to activate your account
        </Text>
        <TextInput style={styles.form} placeholder="New Password" />
        <TextInput
          style={styles.form}
          placeholder="Confirmation New Password"
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ForgotPass');
          }}></TouchableOpacity>
      </View>
      <TouchableOpacity>
        <View style={styles.button}>
          <Text style={styles.textBtn}>Reset Password</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPass;

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
