import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ColorFilter = ({title}) => {
  let color = 'black';
  return (
    <View>
      <View
        style={{
          marginHorizontal: 5,
          height: 36,
          width: 36,
          borderRadius: 36 / 2,
          backgroundColor: `${title}`,
        }}
      />
    </View>
  );
};

export default ColorFilter;

const styles = StyleSheet.create({});
