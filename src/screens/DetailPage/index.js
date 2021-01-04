import React from 'react';
import {Button, Dimensions, StyleSheet, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {IconStar, IconStarAct} from '../../assets';
import {Card, ImageGallery, ListBar, SizeColorPicker} from '../../components';
import {
  COLOR_DISABLE,
  COLOR_MAIN,
  FONT_BOLD,
  FONT_LIGHT,
  FONT_REG,
} from '../../utils/constans';

const DetailPage = () => {
  return (
    <>
      <ScrollView scrollEnabled={true} vertical={true}>
        <ImageGallery />
        <View style={styles.container}>
          <SizeColorPicker />
          <View style={styles.wraptitle}>
            <Text style={styles.title}>H&M</Text>
            <Text style={styles.title}>$19.99</Text>
          </View>
          <Text style={styles.PrdName}>Short black dress</Text>
          <View style={styles.rating}>
            <IconStarAct />
            <IconStarAct />
            <IconStarAct />
            <IconStarAct />
            <IconStar />
            <Text style={styles.PrdName}> (10)</Text>
          </View>
          <Text style={styles.desc}>
            Short dress in soft cotton jersey with decorative buttons down the
            front and a wide, frill-trimmed square neckline with concealed
            elastication. Elasticated seam under the bust and short puff sleeves
            with a small frill trim.
          </Text>
          <ListBar />
          <View style={styles.text}>
            <Text style={{fontFamily: FONT_BOLD, fontSize: 18}}>
              You can also like this
            </Text>
            <Text
              style={{
                fontFamily: FONT_LIGHT,
                fontSize: 11,
                color: COLOR_DISABLE,
              }}>
              3 items
            </Text>
          </View>
          <ScrollView horizontal={true}>
            <View style={styles.card}>
              <Card />
              <Card />
              <Card />
            </View>
          </ScrollView>
          <View style={{height: 75}}></View>
        </View>
      </ScrollView>

      <View style={styles.addcart}>
        <TouchableOpacity>
          <View style={styles.btn}>
            <Text style={{color: '#fff'}}>ADD TO CART</Text>
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
  },
  btn: {
    backgroundColor: COLOR_MAIN,
    width: windowWidth,
    height: 48,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 24,
  },
  title: {
    fontFamily: FONT_BOLD,
    fontSize: 24,
  },
  wraptitle: {
    flexDirection: 'row',
    marginTop: 22,
    justifyContent: 'space-between',
  },
  PrdName: {
    fontFamily: FONT_LIGHT,
    fontSize: 11,
    color: COLOR_DISABLE,
  },
  rating: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  desc: {
    fontFamily: FONT_REG,
  },
  text: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
  },
});
