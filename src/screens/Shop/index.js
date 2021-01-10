import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ListCategory, NavBar} from '../../components';
import {
  COLOR_DISABLE,
  COLOR_MAIN,
  FONT_LIGHT,
  FONT_REG,
} from '../../utils/constans';

const Shop = ({navigation}) => {
  return (
    <View style={styles.container}>
      <NavBar title="Categories" navigation={navigation} />
      <TouchableOpacity
        style={styles.viewAll}
        onPress={() => navigation.navigate('Catalog')}>
        <Text style={{color: '#ffffff'}}>VIEW ALL ITEMS</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Choose category</Text>
      <ListCategory title={`Shoes`} navigation={navigation} />
      <ListCategory title={`T-Shirt`} navigation={navigation} />
      <ListCategory title={`Watch`} navigation={navigation} />
      <View style={{borderTopColor: COLOR_DISABLE, borderTopWidth: 1}}></View>
    </View>
  );
};

export default Shop;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {},
  viewAll: {
    marginTop: 16,
    fontFamily: FONT_REG,
    backgroundColor: COLOR_MAIN,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    height: 48,
    marginHorizontal: windowWidth * 0.04,
  },
  text: {
    fontFamily: FONT_LIGHT,
    color: COLOR_DISABLE,
    fontSize: 14,
    marginVertical: 16,
    marginHorizontal: windowWidth * 0.04,
  },
});
