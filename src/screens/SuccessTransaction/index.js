import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Bags} from '../../assets';
import {COLOR_MAIN, FONT_BOLD, FONT_REG} from '../../utils/constans';

const SuccessTrans = ({navigation}) => {
  return (
    <>
      <View style={styles.container}>
        <Image style={{width: 208, height: 213}} source={Bags} />
        <View style={{width: 225, alignItems: 'center'}}>
          <Text style={{fontFamily: FONT_BOLD, fontSize: 34}}>Success!</Text>
          <Text style={{fontFamily: FONT_REG, fontSize: 13}}>
            Your order will be delivered soon.
          </Text>
          <Text style={{fontFamily: FONT_REG, fontSize: 13}}>
            Thank you for choosing our app!
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('Home')}>
        <Text style={{color: '#fff'}}>CONTINUE SHOPPING</Text>
      </TouchableOpacity>
    </>
  );
};

export default SuccessTrans;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 180,
  },
  btn: {
    backgroundColor: COLOR_MAIN,
    height: 48,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 24,
    marginHorizontal: windowWidth * 0.04,
    position: 'relative',
    marginTop: 200,
  },
});
