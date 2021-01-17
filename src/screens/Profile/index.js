import React, {useEffect, useState} from 'react';
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

//redux
import {connect, useSelector} from 'react-redux';
import {logout} from '../../utils/redux/action/authAction';

import {API_URL} from '@env';

const Profile = ({navigation, logoutRedux, isLogin, token, id}) => {
  const level = useSelector((state) => state.auth.level);
  const user_id = useSelector((state) => state.auth.id);
  const [userid, setUserid] = useState(0);
  const [profile, setProfile] = useState({});
  console.log(isLogin);
  console.log(level);
  console.log(user_id);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (!isLogin) {
        navigation.navigate('Login');
      }
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    // code to run on component mount
    getUserId();
    if (userid !== 0) {
      getProfile();
    }
  }, [userid]);
  const logout = async () => {
    try {
      console.log(`ini token: ${token}`);
      await axios.delete(`${API_URL}/auth/logout`, {
        headers: {
          'x-access-token': 'Bearer ' + token,
        },
      });
      logoutRedux();
      navigation.navigate('Login');
    } catch (e) {
      // remove error
      console.log(e);
    }
  };
  const getProfile = async () => {
    axios
      .get(`${API_URL}/user/${userid}`)
      .then((res) => {
        console.log(res.data.data[0]);
        setProfile(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getUserId = async () => {
    try {
      const value = await AsyncStorage.getItem('userid');

      if (value !== null) {
        // value previously stored
        console.log(value);
        setUserid(value);
      }
    } catch (e) {
      // error reading value
    }
  };
  const {user_name, email, photo_user} = profile;
  const img = {uri: photo_user};
  return (
    <>
      <View style={styles.titlewrap}>
        <Text style={styles.title}>My Profile</Text>
      </View>
      <View style={styles.profile}>
        <Image
          style={styles.img}
          source={photo_user !== null ? img : ProfilePict}
        />
        <View>
          <Text style={styles.main}>{user_name}</Text>
          <Text style={styles.second}>{email}</Text>
        </View>
      </View>
      {level === 'Seller' ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MyProduct');
          }}>
          <ProfileMenu
            title={'My products'}
            detail={`Already have 12 products`}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MyOrder');
          }}>
          <ProfileMenu title={'My orders'} detail={`Already have 12 orders`} />
        </TouchableOpacity>
      )}

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
      <View style={{height: 20}} />
      <View style={{height: 20}} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLogin: state.auth.isLogin,
    token: state.auth.token,
    id: state.auth.id,
    level: state.auth.level,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutRedux: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

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
