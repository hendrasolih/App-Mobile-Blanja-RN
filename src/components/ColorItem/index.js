import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {COLOR_MAIN} from '../../utils/constans';

const ColorItem = ({color, changeColor}) => {
  return (
    <TouchableHighlight
      style={{
        ...styles.openButton,
        backgroundColor: COLOR_MAIN,
        marginBottom: 10,
      }}
      onPress={() => changeColor(color)}>
      <View>
        <Text style={styles.textStyle}>{color}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default ColorItem;

const styles = StyleSheet.create({
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
