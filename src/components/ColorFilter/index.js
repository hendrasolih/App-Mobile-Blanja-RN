import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {COLOR_MAIN} from '../../utils/constans';

//redux
import {connect} from 'react-redux';
import {addColor} from '../../utils/redux/action/filterAction';
import {useSelector} from 'react-redux';

const ColorFilter = ({title, addColor}) => {
  const colorRedux = useSelector((state) => state.filter.color);
  const inColor = colorRedux.includes(title);
  //console.log(colorRedux);
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          addColor(title);
        }}>
        <View
          style={
            inColor
              ? {
                  marginHorizontal: 5,
                  height: 36,
                  width: 36,
                  backgroundColor: `${
                    title == 'Merah'
                      ? '#ff0000'
                      : title == 'Kuning'
                      ? '#ffff66'
                      : title == 'Hijau'
                      ? '#008000'
                      : title == 'Biru'
                      ? '#0000ff'
                      : title == 'Coklat'
                      ? '#964B00'
                      : title == 'Abu - Abu'
                      ? '#808080'
                      : '#000000'
                  }`,
                  borderRadius: 36 / 2,
                  borderColor: 'aqua',
                  borderWidth: 3,
                }
              : {
                  marginHorizontal: 5,
                  height: 36,
                  width: 36,
                  backgroundColor: `${
                    title == 'Merah'
                      ? '#ff0000'
                      : title == 'Kuning'
                      ? '#ffff66'
                      : title == 'Hijau'
                      ? '#008000'
                      : title == 'Biru'
                      ? '#0000ff'
                      : title == 'Coklat'
                      ? '#964B00'
                      : title == 'Abu - Abu'
                      ? '#808080'
                      : '#000000'
                  }`,
                  borderRadius: 36 / 2,
                }
          }
        />
      </TouchableOpacity>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addColor: (color) => dispatch(addColor(color)),
  };
};

export default connect(null, mapDispatchToProps)(ColorFilter);

const styles = StyleSheet.create({});
