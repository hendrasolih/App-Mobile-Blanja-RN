import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CardAddress, CheckboxPayments} from '../../components';
import {
  COLOR_DISABLE,
  COLOR_MAIN,
  FONT_BOLD,
  FONT_LIGHT,
  FONT_MED,
} from '../../utils/constans';
import {API_URL} from '@env';
import {Picker} from '@react-native-picker/picker';

//redux
import {connect, useSelector} from 'react-redux';
import {clearCart} from '../../utils/redux/action/cartAction';

//push notif
import PushNotification from 'react-native-push-notification';
import {showNotification} from '../../notif';

const Checkout = ({navigation, route, clearCart}) => {
  //const userid = await AsyncStorage.getItem('userid');
  const user_id = useSelector((state) => state.auth.id);
  const address = useSelector((state) => state.address.address);
  const [shipping, setShipping] = useState('');
  const channel = 'notif';
  const {totalPrice, totalItems, seller_id} = route.params;
  console.log('price here ckout ' + totalPrice);
  console.log('item here ckout ' + totalItems);
  //pushnotif
  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: 'notif',
        channelName: 'My Notification channel',
        channelDescription: 'A channel to categories your notification',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`createchannel returned '${created}'`),
    );
    // code to run on component mount
  }, []);

  useEffect(() => {
    PushNotification.getChannels((channel_ids) => {
      console.log(channel_ids);
    });
  }, []);
  //pushnotif
  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      'Pick Shipping First',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  };
  const postHistory = async () => {
    if (shipping == 0) {
      return showToastWithGravity();
    }
    // const user_id = await AsyncStorage.getItem('userid');
    // console.log('userid: ' + user_id);
    // console.log('price here ckout ' + totalPrice);
    // console.log('item here ckout ' + totalItems);
    const data = {
      user_id: user_id,
      qty: totalItems,
      price: totalPrice + shipping,
      seller_id: seller_id,
      status: 'Packing',
    };
    axios
      .post(`${API_URL}/history`, data)
      .then((res) => {
        console.log(res.data.msg);
        clearCart();
        showNotification('Notification', 'Checkout Succes', channel);
        navigation.navigate('Success');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const toPrice = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };
  return (
    <>
      <ScrollView>
        <View>
          <View style={{margin: 16}}>
            <Text style={{fontFamily: FONT_MED, fontSize: 16}}>
              Shipping address
            </Text>
          </View>
          {address !== null ? (
            <CardAddress
              address={address.address}
              user={address.user}
              statDelete={false}
              navigation={navigation}
            />
          ) : (
            <View style={styles.pickaddress}>
              <Text style={{fontSize: 16}}>Pick Your Address</Text>
            </View>
          )}
          <TouchableOpacity
            style={{...styles.btn, marginTop: windowHeight * 0.05}}
            onPress={() => navigation.navigate('ShippingAddress')}>
            <Text style={{color: '#fff'}}>Pick Address</Text>
          </TouchableOpacity>
          <View style={{margin: 16}}>
            <Text style={{fontFamily: FONT_MED, fontSize: 16}}>Payment</Text>
          </View>
          <CheckboxPayments image="Mastercard" />
          <CheckboxPayments image="Pos" />
          <CheckboxPayments image="Gopay" />
        </View>
        <View style={styles.wrapPicker}>
          <Text style={{fontFamily: FONT_MED, fontSize: 16}}>Shipping</Text>
          <View style={{borderWidth: 1, borderRadius: 5}}>
            <Picker
              selectedValue={shipping}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setShipping(itemValue)}>
              <Picker.Item label="JNE" value={12000} />
              <Picker.Item label="Si Cepat" value={11000} />
            </Picker>
          </View>
        </View>

        {/* Bottom BTN */}
        <View style={styles.addcart}>
          <View style={styles.costs}>
            <Text style={{fontFamily: FONT_LIGHT, color: COLOR_DISABLE}}>
              Shipping:
            </Text>
            <Text style={{fontFamily: FONT_BOLD}}>Rp {toPrice(shipping)}</Text>
          </View>
          <View style={styles.costs}>
            <Text style={{fontFamily: FONT_LIGHT, color: COLOR_DISABLE}}>
              Cost:
            </Text>
            <Text style={{fontFamily: FONT_BOLD}}>
              Rp {toPrice(totalPrice)}
            </Text>
          </View>
          <View style={{...styles.costs, marginBottom: 15}}>
            <Text style={{fontFamily: FONT_LIGHT, color: COLOR_DISABLE}}>
              Total amount:
            </Text>
            <Text style={{fontFamily: FONT_BOLD}}>
              Rp {toPrice(totalPrice + shipping)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              postHistory();
              //PUSH NOTIF
            }}>
            <View style={styles.btn}>
              <Text style={{color: '#fff'}}>SUBMIT ORDER</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(clearCart()),
  };
};

export default connect(null, mapDispatchToProps)(Checkout);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  addcart: {
    position: 'absolute',
    bottom: 0,
    top: undefined,
    backgroundColor: '#fff',
  },
  btn: {
    backgroundColor: COLOR_MAIN,
    width: windowWidth,
    height: 48,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 24,
  },
  pickaddress: {
    borderWidth: 1,
    borderColor: COLOR_DISABLE,
    backgroundColor: '#fff',
    alignItems: 'center',
    height: windowHeight * 0.07,
    marginHorizontal: windowWidth * 0.04,
    borderRadius: 5,
    marginBottom: windowHeight * 0.02,
    justifyContent: 'center',
  },
  picker: {
    height: windowHeight * 0.06,
    width: windowWidth * 0.4,
  },
  wrapPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: windowWidth * 0.04,
  },
  costs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: windowWidth * 0.04,
    paddingVertical: windowHeight * 0.01,
  },
});
