import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {ProfilePict} from '../../assets';
import {createStackNavigator} from '@react-navigation/stack';
import {ProfileMenu} from '../../components';
import {
  COLOR_DISABLE,
  COLOR_MAIN,
  FONT_BOLD,
  FONT_LIGHT,
} from '../../utils/constans';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Stack = createStackNavigator();

const Profile = ({navigation}) => {
  const logout = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      axios.delete('http://192.168.100.2:8000/auth/logout', {
        headers: {
          'x-access-token': 'Bearer ' + token,
        },
      });
      await AsyncStorage.removeItem('token');
      console.log('remove');
      navigation.navigate('MyOrder');
    } catch (e) {
      // remove error
      console.log(e);
    }
  };
  return (
    <>
      <View style={styles.titlewrap}>
        <Text style={styles.title}>My Profile</Text>
      </View>
      <View style={styles.profile}>
        <Image style={styles.img} source={ProfilePict} />
        <View>
          <Text style={styles.main}>Matilda Brown</Text>
          <Text style={styles.second}>matildabrown@mail.com</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MyOrder');
        }}>
        <ProfileMenu title={'My orders'} detail={`Already have 12 orders`} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ShippingAddress');
        }}>
        <ProfileMenu title={'Shipping addresses'} detail={`3 ddresses`} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SettingsProfile');
        }}>
        <ProfileMenu title={'Settings'} detail={`Notifications, password`} />
      </TouchableOpacity>
      <TouchableOpacity style={{marginTop: 50}} onPress={logout}>
        <View
          style={{
            backgroundColor: COLOR_MAIN,
            width: 75,
            height: 20,
            borderRadius: 5,
            marginLeft: 10,
            paddingHorizontal: 15,
          }}>
          <Text style={{color: '#fff'}}>Logout</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  main: {
    fontFamily: FONT_BOLD,
  },
  second: {
    fontFamily: FONT_LIGHT,
    color: COLOR_DISABLE,
  },
  title: {
    fontSize: 34,
    fontFamily: FONT_BOLD,
  },
  titlewrap: {
    marginTop: 74,
  },
  img: {
    height: 69,
    width: 69,
    borderRadius: 69 / 2,
    marginRight: 17,
  },
  profile: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 20,
  },
  myorder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
});
