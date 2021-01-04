import React from 'react';
import {Button, Dimensions, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ImageGallery, SizeColorPicker} from '../../components';
import {COLOR_MAIN} from '../../utils/constans';

const DetailPage = () => {
  return (
    <>
      <View>
        <ImageGallery />
        <View style={styles.container}>
          <SizeColorPicker />
        </View>
      </View>
      <View style={styles.addcart}>
        <TouchableOpacity>
          <View style={styles.btn}>
            <Text>ADD TO CART</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default DetailPage;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: windowWidth * 0.04,
    marginTop: windowWidth * 0.04,
  },
  addcart: {
    position: 'absolute',
    bottom: 0,
    top: undefined,
    height: 48,
    backgroundColor: COLOR_MAIN,
    width: windowWidth,
    borderRadius: 24,
    alignItems: 'center',
  },
});
