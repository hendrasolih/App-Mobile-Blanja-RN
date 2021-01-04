import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {IconRatingLine, IconStar, IconStarAct} from '../../assets';
import {ReviewSection} from '../../components';
import {
  COLOR_DISABLE,
  COLOR_MAIN,
  FONT_BOLD,
  FONT_LIGHT,
  FONT_REG,
} from '../../utils/constans';

const Review = () => {
  return (
    <>
      <ScrollView scrollEnabled={true} vertical={true}>
        <View style={styles.container}>
          <Text style={styles.title}>Rating&Reviews</Text>
          <View style={styles.wrap}>
            <View style={{marginBottom: 26}}>
              <Text style={styles.rating}>4.3</Text>
              <Text style={styles.infrating}>23 ratings</Text>
            </View>
            <View style={styles.wrapstar}>
              <IconStarAct />
              <IconStarAct />
              <IconStarAct />
              <IconStarAct />
              <IconStarAct />
            </View>
            <IconRatingLine style={styles.wrapline} />
            <Text
              style={{
                marginTop: 6,
                fontSize: 14,
                fontFamily: FONT_LIGHT,
                marginLeft: 5,
              }}>
              12
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 40,
            }}>
            <Text style={{fontFamily: FONT_BOLD, fontSize: 24}}>8 reviews</Text>
            <Text style={{fontFamily: FONT_LIGHT, marginTop: 7}}>
              With photo
            </Text>
          </View>
          <ReviewSection
            userName="Helene Moore"
            reviewText={`The dress is great! Very classy and comfortable. It fit perfectly! I'm 5'7" and 130 pounds. I am a 34B chest. This dress would be too long for those who are shorter but could be hemmed. I wouldn't recommend it for those big chested as I am smaller chested and it fit me perfectly. The underarms were not too wide and the dress was made well.`}
          />
          <ReviewSection
            userName="Helene Moore"
            reviewText={`The dress is great! Very classy and comfortable. It fit perfectly! I'm 5'7" and 130 pounds. I am a 34B chest. This dress would be too long for those who are shorter but could be hemmed. I wouldn't recommend it for those big chested as I am smaller chested and it fit me perfectly. The underarms were not too wide and the dress was made well.`}
          />
          <ReviewSection
            userName="Helene Moore"
            reviewText={`The dress is great! Very classy and comfortable. It fit perfectly! I'm 5'7" and 130 pounds. I am a 34B chest. This dress would be too long for those who are shorter but could be hemmed. I wouldn't recommend it for those big chested as I am smaller chested and it fit me perfectly. The underarms were not too wide and the dress was made well.`}
          />
        </View>
        <View style={{height: 50}}></View>
      </ScrollView>
      <View style={styles.addcart}>
        <TouchableOpacity>
          <View style={{justifyContent: 'flex-end'}}>
            <View style={styles.btn}>
              <Text style={{color: '#fff'}}>Write a review</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Review;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: windowWidth * 0.04,
  },
  addcart: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    top: undefined,
  },
  btn: {
    backgroundColor: COLOR_MAIN,
    width: windowWidth * 0.34,
    height: 48,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 24,
  },
  rating: {
    fontFamily: FONT_BOLD,
    fontSize: 44,
    marginBottom: -5,
  },
  infrating: {
    fontFamily: FONT_LIGHT,
    fontSize: 14,
    color: COLOR_DISABLE,
  },
  title: {
    fontFamily: FONT_BOLD,
    fontSize: 34,
    marginTop: 20,
  },
  wrapstar: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 6,
  },
  wrapline: {
    marginTop: 12,
  },
  wrap: {
    flexDirection: 'row',
    marginTop: 40,
    marginBottom: 34,
  },
  reviewsection: {
    backgroundColor: '#fff',
    padding: 10,
  },
});
