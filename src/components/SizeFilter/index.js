import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLOR_DISABLE, COLOR_MAIN} from '../../utils/constans';

//redux
import {connect} from 'react-redux';
import {addSize} from '../../utils/redux/action/filterAction';
import {useSelector} from 'react-redux';

const SizeFilter = ({size, addSize}) => {
  const sizeRedux = useSelector((state) => state.filter.size);
  const inSize = sizeRedux.includes(size);
  return (
    <View
      style={
        inSize
          ? {...styles.wrap, backgroundColor: COLOR_MAIN}
          : {...styles.wrap, backgroundColor: '#fff'}
      }>
      <TouchableOpacity
        onPress={() => {
          addSize(size);
        }}>
        <Text style={inSize ? {color: '#fff'} : {color: '#000'}}>{size}</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSize: (color) => dispatch(addSize(color)),
  };
};

export default connect(null, mapDispatchToProps)(SizeFilter);

const styles = StyleSheet.create({
  wrap: {
    borderWidth: 1,
    borderColor: COLOR_DISABLE,
    marginHorizontal: 5,
    padding: 5,
    borderRadius: 3,
  },
});
