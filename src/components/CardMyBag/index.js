import React, {useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CardPictNew, IconMin, IconPlus} from '../../assets';
import {COLOR_DISABLE, COLOR_MAIN, FONT_BOLD} from '../../utils/constans';
import CheckBox from '@react-native-community/checkbox';

import {connect} from 'react-redux';
import {
  pickCart,
  removeFromCart,
  plusQty,
  minQty,
} from '../../utils/redux/action/cartAction';

const CardMyBag = ({
  name,
  img,
  price,
  size,
  color,
  id,
  qty,
  removeFromCart,
  status,
  pickCart,
  plusQty,
  minQty,
}) => {
  const imgs = {uri: `${img}`};
  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'center'}}>
        <CheckBox
          disabled={false}
          value={status}
          onChange={() => pickCart(id)}
          tintColors={{
            true: COLOR_MAIN,
            false: COLOR_DISABLE,
          }}
        />
      </View>

      <Image source={imgs} style={styles.img} />
      <View style={styles.infobag}>
        <Text>{name}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{marginRight: 16}}>Color: {color}</Text>
          <Text>Size: {size}</Text>
          <TouchableOpacity onPress={() => removeFromCart(id)}>
            <Text style={{color: '#c71a0e'}}>Delete</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', marginTop: 14}}>
          <View style={styles.btn}>
            <IconMin onPress={() => minQty(id)} />
          </View>
          <Text style={{marginTop: 7, marginHorizontal: 10}}>{qty}</Text>
          <View style={styles.btn}>
            <IconPlus onPress={() => plusQty(id)} />
          </View>
          <View style={styles.price}>
            <Text style={{fontFamily: FONT_BOLD, fontSize: 11}}>
              Rp. {price}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (id) => dispatch(removeFromCart(id)),
    pickCart: (id) => dispatch(pickCart(id)),
    plusQty: (id) => dispatch(plusQty(id)),
    minQty: (id) => dispatch(minQty(id)),
  };
};

export default connect(null, mapDispatchToProps)(CardMyBag);
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
  },
  price: {
    marginTop: 7,
    marginLeft: 20,
  },
  btn: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderRadius: 36 / 2,
    alignItems: 'center',
    paddingTop: 2,
    borderColor: COLOR_DISABLE,
  },
  img: {
    height: windowWidth * 0.25,
    width: windowWidth * 0.25,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  infobag: {
    backgroundColor: '#fff',
    width: windowWidth * 0.6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    paddingHorizontal: 5,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
  },
});
