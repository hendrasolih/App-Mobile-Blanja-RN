import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {CategoryFilter, ColorFilter, SizeFilter} from '../../components';

const Filter = () => {
  return (
    <View>
      <Text>Colors</Text>
      <View style={styles.wrapcolor}>
        <View style={{marginLeft: 10}} />
        <ColorFilter title="red" />
        <ColorFilter title="black" />
        <ColorFilter title="blue" />
        <ColorFilter title="yellow" />
      </View>
      <Text>Sizes</Text>
      <View style={styles.wrapcolor}>
        <View style={{marginLeft: 10}} />
        <SizeFilter size={41} />
        <SizeFilter size={41} />
        <SizeFilter size={41} />
        <SizeFilter size={41} />
      </View>
      <Text>Category</Text>
      <View style={styles.wrapcolor}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: 10,
          }}>
          <CategoryFilter category="All" />
          <CategoryFilter category="Women" />
          <CategoryFilter category="Men" />
          <CategoryFilter category="Boys" />
        </View>
      </View>
      <View style={styles.wrapbrand}>
        <Text>Brand</Text>
      </View>
    </View>
  );
};

export default Filter;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  wrapcolor: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 5,
    width: windowWidth,
    flexWrap: 'wrap',
  },
  wrapbrand: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 5,
    width: windowWidth,
    flexWrap: 'wrap',
    marginTop: 10,
  },
});
