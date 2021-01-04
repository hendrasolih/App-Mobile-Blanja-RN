import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {ProfilePict} from '../../assets';
import {createStackNavigator} from '@react-navigation/stack';
import {ProfileMenu} from '../../components';
import {COLOR_DISABLE, FONT_BOLD, FONT_LIGHT} from '../../utils/constans';

const Stack = createStackNavigator();

const Profile = ({navigation}) => {
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
