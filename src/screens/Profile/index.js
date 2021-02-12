import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import {ProfilePict} from '../../assets';
import {createStackNavigator} from '@react-navigation/stack';
import {ProfileMenu} from '../../components';
import {
  COLOR_DISABLE,
  COLOR_MAIN,
  FONT_BOLD,
  FONT_LIGHT,
} from '../../utils/constans';
import axios from 'axios';

//redux
import {connect, useSelector} from 'react-redux';
import {logout} from '../../utils/redux/action/authAction';

import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation, logoutRedux, isLogin}) => {
  const level = useSelector((state) => state.auth.level);
  const user_id = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);
  const [profile, setProfile] = useState({});
  const [totalProduct, setTotalProduct] = useState(0);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (!isLogin) {
        navigation.replace('Login');
      }
    });

    return unsubscribe;
  }, [navigation]);

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
      console.log('ALL CLEAR');
    } catch (e) {
      // clear error
    }

    console.log('Done.');
  };

  useEffect(() => {
    // code to run on component mount
    getProfile();
    if (level === 'Seller') {
      getProduct();
    }
  }, [navigation, user_id]);

  const logout = async () => {
    Alert.alert(
      'Logout',
      'Are Sure Want Logout ?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            return console.log('Cancel Pressed');
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            //logout
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
          },
        },
      ],
      {cancelable: true},
    );
  };
  const getProfile = () => {
    axios
      .get(`${API_URL}/user/${user_id}`)
      .then((res) => {
        //console.log(res.data.data[0]);
        setProfile(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProduct = async () => {
    const config = {
      headers: {
        'x-access-token': 'Bearer ' + token,
      },
    };
    await axios
      .get(`${API_URL}/product/user/${user_id}`, config)
      .then((res) => {
        //console.log(res.data.data[0]);
        const data = res.data.data;
        setTotalProduct(data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <View style={styles.titlewrap}>
        <Text style={styles.title}>My Profile</Text>
      </View>
      <View style={styles.profile}>
        <Image
          style={styles.img}
          source={
            isLogin && profile && profile.photo_user
              ? {uri: profile.photo_user}
              : ProfilePict
          }
        />
        <View>
          <Text style={styles.main}>
            {isLogin && profile && profile.user_name ? profile.user_name : ''}
          </Text>
          <Text style={styles.second}>
            {isLogin && profile && profile.email ? profile.email : ''}
          </Text>
        </View>
      </View>

      {level === 'Seller' && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MyProduct');
          }}>
          <ProfileMenu
            title={'My products'}
            detail={`Already have ${totalProduct} products`}
          />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MyOrder');
        }}>
        <ProfileMenu title={'My orders'} detail={`Already have 12 orders`} />
      </TouchableOpacity>

      {level === 'Customer' && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ShippingAddress');
          }}>
          <ProfileMenu title={'Shipping addresses'} detail={`3 ddresses`} />
        </TouchableOpacity>
      )}
      {/* CHAT PAGE */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Chat List');
        }}>
        <ProfileMenu title={'Chats'} detail={`Your Chats`} />
      </TouchableOpacity>
      {/* CHAT PAGE */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SettingsProfile', {email: profile.email});
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
      {/* <Button onPress={clearAll} title="Learn More" color={COLOR_MAIN} /> */}
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
    marginHorizontal: 14,
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
    marginHorizontal: 14,
  },
  myorder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
});
