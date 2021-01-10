import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ColorFilter} from '../../components';

const Filter = () => {
  return (
    <View>
      <Text>Colors</Text>
      <View style={styles.wrapcolor}>
        <ColorFilter title="red" />
        <ColorFilter title="black" />
        <ColorFilter title="blue" />
        <ColorFilter title="yellow" />
      </View>
      <Text>Sizes</Text>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  wrapcolor: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 5,
  },
});
