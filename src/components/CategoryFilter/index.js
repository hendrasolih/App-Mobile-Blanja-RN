import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {COLOR_DISABLE, COLOR_MAIN} from '../../utils/constans';

//redux
import {connect} from 'react-redux';
import {addCategory} from '../../utils/redux/action/filterAction';
import {useSelector} from 'react-redux';

const CategoryFilter = ({category, addCategory}) => {
  const ctgRedux = useSelector((state) => state.filter.category);
  const inCtg = ctgRedux.includes(category);
  return (
    <View
      style={
        inCtg
          ? {...styles.wrap, backgroundColor: COLOR_MAIN}
          : {...styles.wrap, backgroundColor: '#fff'}
      }>
      <TouchableOpacity
        onPress={() => {
          addCategory(category);
        }}>
        <Text
          style={
            inCtg
              ? {alignSelf: 'center', color: '#fff'}
              : {alignSelf: 'center', color: '#000'}
          }>
          {category}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCategory: (ctg) => dispatch(addCategory(ctg)),
  };
};

export default connect(null, mapDispatchToProps)(CategoryFilter);

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
