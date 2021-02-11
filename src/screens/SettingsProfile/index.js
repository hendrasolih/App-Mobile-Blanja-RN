import React, {createRef, useState} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {NotifSetting} from '../../components';
import {
  COLOR_DISABLE,
  COLOR_MAIN,
  FONT_BOLD,
  FONT_LIGHT,
  FONT_MED,
  FONT_REG,
} from '../../utils/constans';
import ActionSheet from 'react-native-actions-sheet';
const actionSheetRef = createRef();
import {API_URL} from '@env';

//redux
import {useSelector} from 'react-redux';

import axios from 'axios';

const regexPwd = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

const SettingProfile = ({route}) => {
  const {email} = route.params;
  const user_id = useSelector((state) => state.auth.id);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confNewPassword, setConfNewPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      'Change Password Success',
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
  };

  const resetpass = async () => {
    const data = {
      user_password: newPassword,
    };
    await axios
      .post(`${API_URL}/auth/resetpass/${user_id}`, data)
      .then((res) => {
        showToastWithGravity();
        //navigation.navigate('Login');
      })
      .catch((err) => {
        console.log(err);
        console.log('error reset pass');
      });
  };

  const changepass = async () => {
    setErrorMsg('');
    console.log('press');
    if (currentPassword == '' || newPassword == '' || confNewPassword == '') {
      return setErrorMsg('input');
    }
    if (!regexPwd.test(newPassword)) {
      return setErrorMsg('strongpass');
    }
    if (newPassword !== confNewPassword) {
      return setErrorMsg('notsame');
    }
    const data = {
      email: email,
      user_password: currentPassword,
    };
    await axios
      .post(`${API_URL}/auth/login`, data)
      .then((res) => {
        console.log('done login');
        resetpass();
        actionSheetRef.current?.setModalVisible(false);
        //navigation.navigate('MainApp');
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg('wrong');
        console.log('error current pass');
      });
  };
  return (
    <View style={styles.container}>
      <Text style={{fontFamily: FONT_BOLD, fontSize: 34, marginVertical: 15}}>
        Settings
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontFamily: FONT_MED, fontSize: 16}}>
          Personal Information
        </Text>
        <Text
          style={{fontFamily: FONT_LIGHT, fontSize: 14, color: COLOR_DISABLE}}>
          Change
        </Text>
      </View>
      <View style={styles.fullname}>
        <Text style={{color: COLOR_DISABLE, fontFamily: FONT_REG}}>
          Full name
        </Text>
      </View>
      <View style={styles.fullname}>
        <Text style={{color: COLOR_DISABLE, fontFamily: FONT_REG}}>
          Date of Birth
        </Text>
        <Text>12/12/1989</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 50,
          marginBottom: 5,
        }}>
        <Text style={{fontFamily: FONT_MED, fontSize: 16}}>Password</Text>
        <TouchableOpacity
          onPress={() => {
            actionSheetRef.current?.setModalVisible();
          }}>
          <Text
            style={{
              fontFamily: FONT_LIGHT,
              fontSize: 14,
              color: COLOR_DISABLE,
            }}>
            Change
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.fullname}>
        <Text style={{color: COLOR_DISABLE, fontFamily: FONT_REG}}>
          Password
        </Text>
        <Text style={{color: COLOR_DISABLE, fontFamily: FONT_REG}}>
          ****************
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontFamily: FONT_MED,
            fontSize: 16,
            marginTop: 45,
            marginBottom: 20,
          }}>
          Notifications
        </Text>
      </View>
      <NotifSetting title="Sales" btn={true} />
      <NotifSetting title="New arrivals" btn={false} />
      <NotifSetting title="Delivery status changes" btn={false} />
      <ActionSheet ref={actionSheetRef}>
        <KeyboardAvoidingView>
          <View style={styles.changepass}>
            <Text style={styles.title}>Change Password</Text>
            <TextInput
              secureTextEntry
              style={styles.form}
              placeholder="Your Password"
              defaultValue={currentPassword}
              onChangeText={(currentPassword) =>
                setCurrentPassword(currentPassword)
              }
            />
            <TextInput
              secureTextEntry
              style={styles.form}
              placeholder="New Password"
              defaultValue={newPassword}
              onChangeText={(newPassword) => setNewPassword(newPassword)}
            />
            <TextInput
              secureTextEntry
              style={styles.form}
              placeholder="Confirm New Password"
              defaultValue={confNewPassword}
              onChangeText={(confNewPassword) =>
                setConfNewPassword(confNewPassword)
              }
            />
            <Text style={{color: 'red', textAlign: 'center'}}>
              {errorMsg == 'input'
                ? 'Please Enter Your Password'
                : errorMsg == 'strongpass'
                ? 'Password should at least have 1 Lower Case (a-z), 1 Upper Case (A-Z), 1 Number (0-9)'
                : errorMsg == 'notsame'
                ? `New Password didn't match with Confirmation`
                : errorMsg == 'wrong'
                ? 'Your Current Password Wrong'
                : ''}
            </Text>
            <View style={styles.btn}>
              <TouchableOpacity
                style={styles.btnAction}
                onPress={() => {
                  actionSheetRef.current?.setModalVisible(false);
                }}>
                <Text style={{color: '#fff'}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnAction} onPress={changepass}>
                <Text style={{color: '#fff'}}>Change Password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ActionSheet>
    </View>
  );
};

export default SettingProfile;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: windowWidth * 0.04,
  },
  fullname: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 5,
  },
  changepass: {
    height: windowHeight * 0.6,
    paddingHorizontal: windowWidth * 0.04,
  },
  title: {
    textAlign: 'center',
    fontFamily: FONT_BOLD,
    marginTop: 5,
    marginBottom: windowHeight * 0.02,
    fontSize: 20,
  },
  form: {
    backgroundColor: '#fff',
    marginBottom: windowHeight * 0.03,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'grey',
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: windowHeight * 0.07,
  },
  btnAction: {
    backgroundColor: COLOR_MAIN,
    width: windowWidth * 0.4,
    height: windowHeight * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
