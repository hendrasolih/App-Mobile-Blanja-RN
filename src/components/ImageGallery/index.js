import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {PictDetail, PictDetail2} from '../../assets';

const ImageGallery = () => {
  return (
    <View style={styles.imgwrap}>
      <ScrollView horizontal={true}>
        <Image source={PictDetail} style={styles.image} />
        <Image source={PictDetail2} style={styles.image} />
      </ScrollView>
    </View>
  );
};

export default ImageGallery;

const styles = StyleSheet.create({
  imgwrap: {
    flexDirection: 'row',
  },
  image: {
    width: 275,
    height: 413,
  },
});
