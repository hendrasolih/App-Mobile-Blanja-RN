import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IconStar, IconStarAct} from '../../assets';
import {COLOR_DISABLE} from '../../utils/constans';
import {API_URL} from '@env';

const CardCatalog = ({
  name,
  brand,
  price,
  image,
  itemId,
  navigation,
  rating,
  review,
}) => {
  //console.log(image[0]);
  const imgs = {uri: `${API_URL}${image[0]}`};
  const toPrice = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {rating == null ? (
            <>
              <IconStar />
              <IconStar />
              <IconStar />
              <IconStar />
              <IconStar />
            </>
          ) : rating <= 1 ? (
            <>
              <IconStarAct />
              <IconStar />
              <IconStar />
              <IconStar />
              <IconStar />
            </>
          ) : rating <= 2 ? (
            <>
              <IconStarAct />
              <IconStarAct />
              <IconStar />
              <IconStar />
              <IconStar />
            </>
          ) : rating <= 3 ? (
            <>
              <IconStarAct />
              <IconStarAct />
              <IconStarAct />
              <IconStar />
              <IconStar />
            </>
          ) : rating <= 4 ? (
            <>
              <IconStarAct />
              <IconStarAct />
              <IconStarAct />
              <IconStarAct />
              <IconStar />
            </>
          ) : (
            <>
              <IconStarAct />
              <IconStarAct />
              <IconStarAct />
              <IconStarAct />
              <IconStarAct />
            </>
          )}
          <Text>({review})</Text>
        </View>
        <Text>Rp {toPrice(price)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardCatalog;

const windowWidth = Dimensions.get('window').width;
console.log('here', windowWidth);
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
    width: windowWidth * 0.92,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  img: {
    width: windowWidth * 0.28,
    height: windowWidth * 0.28,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  infobag: {
    backgroundColor: '#fff',
    paddingHorizontal: 5,
  },
});
