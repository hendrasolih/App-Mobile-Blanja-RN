import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLOR_DISABLE} from '../../utils/constans';

const CategoryFilter = ({category}) => {
  return (
    <View style={styles.wrap}>
      <Text style={{alignSelf: 'center'}}>{category}</Text>
    </View>
  );
};

export default CategoryFilter;

const styles = StyleSheet.create({
  wrap: {
    borderWidth: 1,
    borderColor: COLOR_DISABLE,
    marginHorizontal: 5,
    padding: 5,
    borderRadius: 3,
    width: 100,
    marginTop: 5,
  },
});
