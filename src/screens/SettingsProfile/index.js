import React from 'react';
import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import {NotifSetting} from '../../components';
import {
  COLOR_DISABLE,
  FONT_BOLD,
  FONT_LIGHT,
  FONT_MED,
  FONT_REG,
} from '../../utils/constans';

const SettingProfile = () => {
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
        <Text
          style={{fontFamily: FONT_LIGHT, fontSize: 14, color: COLOR_DISABLE}}>
          Change
        </Text>
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
    </View>
  );
};

export default SettingProfile;
const windowWidth = Dimensions.get('window').width;

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
});
