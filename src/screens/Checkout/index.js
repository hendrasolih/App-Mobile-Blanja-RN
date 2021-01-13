import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React from 'react';
import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CardAddress, CheckboxPayments} from '../../components';
import {
  COLOR_DISABLE,
  COLOR_MAIN,
  FONT_BOLD,
  FONT_LIGHT,
  FONT_MED,
} from '../../utils/constans';

const url = 'http://192.168.100.2:8000';

const Checkout = ({navigation, route}) => {
  //const userid = await AsyncStorage.getItem('userid');
  const {totalPrice, totalItems} = route.params;
  console.log('price here ckout ' + totalPrice);
  console.log('item here ckout ' + totalItems);
  const postHistory = async () => {
    const user_id = await AsyncStorage.getItem('userid');
    // console.log('userid: ' + user_id);
    // console.log('price here ckout ' + totalPrice);
    // console.log('item here ckout ' + totalItems);
    const data = {
      user_id: user_id,
      qty: totalItems,
      price: totalPrice,
    };
    axios
      .post(`${url}/history`, data)
      .then((res) => {
        console.log(res.data.msg);
        Alert.alert(
          `Checkout Berhasil !!!`,
          'Ayo Belanja Lagi :)',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <View>
        <View style={{margin: 16}}>
          <Text style={{fontFamily: FONT_MED, fontSize: 16}}>
            Shipping address
          </Text>
        </View>
        <CardAddress />
        <View style={{margin: 16}}>
          <Text style={{fontFamily: FONT_MED, fontSize: 16}}>Payment</Text>
        </View>
        <CheckboxPayments image="Mastercard" />
        <CheckboxPayments image="Pos" />
        <CheckboxPayments image="Gopay" />
      </View>
      {/* Bottom BTN */}
      <View style={styles.addcart}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            marginHorizontal: 10,
            marginVertical: 20,
          }}>
          <Text style={{fontFamily: FONT_LIGHT, color: COLOR_DISABLE}}>
            Total amount:
          </Text>
          <Text style={{fontFamily: FONT_BOLD}}>Rp.{totalPrice}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            postHistory();
            navigation.navigate('Success');
          }}>
          <View style={styles.btn}>
            <Text style={{color: '#fff'}}>SUBMIT ORDER</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Checkout;

const windowWidth = Dimensions.get('window').width;

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
});
