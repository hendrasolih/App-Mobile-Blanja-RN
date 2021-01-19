import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CardMyBag} from '../../components';
import {
  COLOR_DISABLE,
  COLOR_MAIN,
  FONT_BOLD,
  FONT_LIGHT,
} from '../../utils/constans';
import CheckBox from '@react-native-community/checkbox';

//redux
import {connect} from 'react-redux';

const Bag = ({cart, navigation}) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  useEffect(() => {
    let items = 0;
    let price = 0;

    cart.forEach((item) => {
      items += item.qty;
      price += item.qty * item.prc;
    });

    setTotalItems(items);
    setTotalPrice(price);
  }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems]);
  console.log('price here ' + totalPrice);
  console.log('item here' + totalItems);
  return (
    <>
      <View style={styles.container}>
        <Text
          style={{
            fontFamily: FONT_BOLD,
            fontSize: 34,
            marginTop: 90,
            marginBottom: 24,
          }}>
          My Bag
        </Text>
        {cart.map((item) => {
          return (
            <View key={item.id} style={styles.wrapcard}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                tintColors={{true: COLOR_MAIN, false: COLOR_DISABLE}}
              />
              <CardMyBag
                name={item.name}
                img={item.img}
                price={item.prc}
                size={item.size}
                color={item.color}
                id={item.id}
                qty={item.qty}
              />
            </View>
          );
        })}
      </View>
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
          <Text style={{fontFamily: FONT_BOLD}}>Rp. {totalPrice}</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Checkout', {totalPrice, totalItems})
          }>
          <View style={styles.btn}>
            <Text style={{color: '#fff'}}>CHECK OUT</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  };
};

export default connect(mapStateToProps)(Bag);

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: windowWidth * 0.04,
  },
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
  wrapcard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
