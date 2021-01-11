import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CardAddress, CheckboxPayments} from '../../components';
import {
  COLOR_DISABLE,
  COLOR_MAIN,
  FONT_BOLD,
  FONT_LIGHT,
  FONT_MED,
} from '../../utils/constans';

const Checkout = ({navigation}) => {
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
          <Text style={{fontFamily: FONT_BOLD}}>112</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Success')}>
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
