import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {CardPictNew, IconMin, IconPlus} from '../../assets';
import {COLOR_DISABLE, FONT_BOLD} from '../../utils/constans';

const CardMyBag = () => {
  return (
    <View style={styles.container}>
      <Image source={CardPictNew} style={styles.img} />
      <View style={styles.infobag}>
        <Text>T-Shirt</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{marginRight: 16}}>Color: Gray</Text>
          <Text>Size: L</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 14}}>
          <View style={styles.btn}>
            <IconMin />
          </View>
          <Text style={{marginTop: 7, marginHorizontal: 10}}>1</Text>
          <View style={styles.btn}>
            <IconPlus />
          </View>
          <View style={styles.price}>
            <Text style={{fontFamily: FONT_BOLD, fontSize: 20}}>30$</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CardMyBag;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  price: {
    marginTop: 7,
    marginLeft: 50,
  },
  btn: {
    width: 36,
    height: 36,
    borderWidth: 1,
    borderRadius: 36 / 2,
    alignItems: 'center',
    paddingTop: 4,
    borderColor: COLOR_DISABLE,
  },
  img: {
    width: 104,
    height: 104,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  infobag: {
    backgroundColor: '#fff',
    width: 220,
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
