import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLOR_DISABLE, COLOR_MAIN} from '../../utils/constans';

const SizeFilter = ({size}) => {
  return (
    <View style={styles.wrap}>
      <Text>{size}</Text>
    </View>
  );
};

export default SizeFilter;

const styles = StyleSheet.create({
  wrap: {
    borderWidth: 1,
    borderColor: COLOR_DISABLE,
    marginHorizontal: 5,
    padding: 5,
    borderRadius: 3,
  },
});
