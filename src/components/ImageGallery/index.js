import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {PictDetail, PictDetail2} from '../../assets';

const ImageGallery = ({image}) => {
  //const img = {uri: `${image}`};
  console.log(`ini pic ${image}`);
  console.log(image[0]);
  return (
    <View style={styles.imgwrap}>
      <ScrollView horizontal={true}>
        {image.map((img) => {
          return (
            <Image
              source={{uri: `${img}`}}
              style={styles.image}
              key={image.indexOf(img)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ImageGallery;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  imgwrap: {
    flexDirection: 'row',
  },
  image: {
    width: windowWidth,
    height: 413,
  },
});
