import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IconStar, IconStarAct} from '../../assets';
import {COLOR_DISABLE, FONT_LIGHT, FONT_REG} from '../../utils/constans';

const ReviewSection = ({userName, reviewText, rating, date}) => {
  return (
    <View style={styles.reviewsection}>
      <Text>{userName}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          {rating == 5 ? (
            <>
              <IconStarAct />
              <IconStarAct />
              <IconStarAct />
              <IconStarAct />
              <IconStarAct />
            </>
          ) : rating == 4 ? (
            <>
              <IconStarAct />
              <IconStarAct />
              <IconStarAct />
              <IconStarAct />
              <IconStar />
            </>
          ) : rating == 3 ? (
            <>
              <IconStarAct />
              <IconStarAct />
              <IconStarAct />
              <IconStar />
              <IconStar />
            </>
          ) : rating == 2 ? (
            <>
              <IconStarAct />
              <IconStarAct />
              <IconStar />
              <IconStar />
              <IconStar />
            </>
          ) : (
            <>
              <IconStarAct />
              <IconStar />
              <IconStar />
              <IconStar />
              <IconStar />
            </>
          )}
        </View>
        <Text
          style={{
            fontSize: 11,
            marginBottom: 2,
            fontFamily: FONT_REG,
            color: COLOR_DISABLE,
          }}>
          {date}
        </Text>
      </View>
      <Text style={{fontFamily: FONT_LIGHT}}>{reviewText}</Text>
    </View>
  );
};

export default ReviewSection;

const styles = StyleSheet.create({
  reviewsection: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
  },
});
