import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CardMyBag} from '../../components';
import {
  COLOR_DISABLE,
  COLOR_MAIN,
  FONT_BOLD,
  FONT_LIGHT,
} from '../../utils/constans';

const Bag = () => {
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
        <CardMyBag />
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
          <Text style={{fontFamily: FONT_BOLD}}>112$</Text>
        </View>
        <TouchableOpacity>
          <View style={styles.btn}>
            <Text style={{color: '#fff'}}>CHECK OUT</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Bag;

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
});
