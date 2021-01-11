import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IconStar, IconStarAct} from '../../assets';
import {COLOR_DISABLE} from '../../utils/constans';

const CardCatalog = ({name, brand, price, image, itemId, navigation}) => {
  //console.log(image[0]);
  const imgs = {uri: image[0]};
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('DetailPage', {itemId: itemId});
      }}>
      <Image source={imgs} style={styles.img} />
      <View style={styles.infobag}>
        <Text>{name}</Text>
        <Text>{brand}</Text>
        <View style={{flexDirection: 'row'}}>
          <IconStarAct />
          <IconStarAct />
          <IconStarAct />
          <IconStarAct />
          <IconStar />
        </View>
        <Text>Rp.{price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardCatalog;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
  },
  img: {
    width: 104,
    height: 104,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  infobag: {
    backgroundColor: '#fff',
    width: 220,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    paddingHorizontal: 5,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
  },
});
