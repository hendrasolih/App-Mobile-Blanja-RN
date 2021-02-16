import axios from 'axios';
import {Rating, AirbnbRating} from 'react-native-ratings';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {
  IconRatingLine,
  IconStarAct,
  IconRatingLine4,
  IconRatingLine3,
  IconRatingLine2,
  IconRatingLine1,
} from '../../assets';
import {ReviewSection} from '../../components';
import {
  COLOR_DISABLE,
  COLOR_MAIN,
  FONT_BOLD,
  FONT_LIGHT,
  FONT_MED,
  FONT_REG,
} from '../../utils/constans';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '@env';
//redux
import {useSelector} from 'react-redux';

const Review = ({route}) => {
  const {itemId} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [rating5, setRating5] = useState(0);
  const [rating4, setRating4] = useState(0);
  const [rating3, setRating3] = useState(0);
  const [rating2, setRating2] = useState(0);
  const [rating1, setRating1] = useState(0);
  const [ratingLength, setRatingLength] = useState(0);
  const [review, setReview] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [errMsg, setErrMsg] = useState('');
  const user_id = useSelector((state) => state.auth.id);
  const date = Date().split(' ');
  useEffect(() => {
    // code to run on component mount
    getRating();
    getReview();
  }, []);

  const getRating = () => {
    axios
      .get(API_URL + '/review/rating/' + itemId)
      .then((res) => {
        console.log(res.data.ratings);
        setRating(res.data.ratings);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getReview = () => {
    axios
      .get(API_URL + '/review/' + itemId)
      .then((res) => {
        console.log(res.data.data);
        const review = res.data.data;
        setReview(review);
        setRating5(review.filter((e) => e.rating == 5).length);
        setRating4(review.filter((e) => e.rating == 4).length);
        setRating3(review.filter((e) => e.rating == 3).length);
        setRating2(review.filter((e) => e.rating == 2).length);
        setRating1(review.filter((e) => e.rating == 1).length);
        setRatingLength(review.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ratingCompleted = (rating) => {
    console.log('Rating is: ' + rating);
    setNewRating(rating);
  };

  const postReview = async () => {
    console.log('itemid: ' + itemId);
    console.log('userid: ' + user_id);
    console.log('review: ' + newReview);
    console.log('rating: ' + newRating);
    if (newReview == '') {
      return setErrMsg('input');
    }
    if (newReview.length < 7 || newReview.length > 200) {
      return setErrMsg('leng');
    }
    const data = {
      review: newReview,
      user_id: user_id,
      rating: newRating,
      date_rating: `${date[1]} ${date[2]}, ${date[3]}`,
    };
    axios
      .post(`${API_URL}/review/${itemId}`, data)
      .then((res) => {
        console.log(res.data);
        getRating();
        getReview();
        setModalVisible(!modalVisible);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(`rating here : ${newRating}`);
  // console.log(`text review: ${newReview}`);

  return (
    <>
      <ScrollView scrollEnabled={true} vertical={true}>
        <View style={styles.container}>
          <Text style={styles.title}>Rating&Reviews</Text>
          <View style={styles.wrap}>
            <View style={{marginBottom: 26}}>
              <Text style={styles.rating}>{rating}</Text>
              <Text style={styles.infrating}>{ratingLength} ratings</Text>
            </View>
            <View>
              <View style={styles.wrapstar}>
                <IconStarAct />
                <IconStarAct />
                <IconStarAct />
                <IconStarAct />
                <IconStarAct />
              </View>
              <View style={styles.wrapstar}>
                <IconStarAct />
                <IconStarAct />
                <IconStarAct />
                <IconStarAct />
              </View>
              <View style={styles.wrapstar}>
                <IconStarAct />
                <IconStarAct />
                <IconStarAct />
              </View>
              <View style={styles.wrapstar}>
                <IconStarAct />
                <IconStarAct />
              </View>
              <View style={styles.wrapstar}>
                <IconStarAct />
              </View>
            </View>
            <View>
              <IconRatingLine style={styles.wrapline} />
              <IconRatingLine4 style={styles.wrapline} />
              <IconRatingLine3 style={styles.wrapline} />
              <IconRatingLine2 style={styles.wrapline} />
              <IconRatingLine1 style={styles.wrapline} />
            </View>
            <View>
              <Text
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  fontFamily: FONT_LIGHT,
                  marginLeft: 5,
                }}>
                {rating5}
              </Text>
              <Text
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  fontFamily: FONT_LIGHT,
                  marginLeft: 5,
                }}>
                {rating4}
              </Text>
              <Text
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  fontFamily: FONT_LIGHT,
                  marginLeft: 5,
                }}>
                {rating3}
              </Text>
              <Text
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  fontFamily: FONT_LIGHT,
                  marginLeft: 5,
                }}>
                {rating2}
              </Text>
              <Text
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  fontFamily: FONT_LIGHT,
                  marginLeft: 5,
                }}>
                {rating1}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 40,
            }}>
            <Text style={{fontFamily: FONT_BOLD, fontSize: 24}}>
              {ratingLength} reviews
            </Text>
            <Text style={{fontFamily: FONT_LIGHT, marginTop: 7}}>
              With photo
            </Text>
          </View>
          {review.length !== 0 &&
            review.map(
              ({id_review, rating, review, user_name, date_rating}) => {
                return (
                  <ReviewSection
                    key={id_review}
                    userName={user_name}
                    reviewText={review}
                    rating={rating}
                    date={date_rating}
                  />
                );
              },
            )}
        </View>
        <View style={{height: 50}}></View>
      </ScrollView>
      <View style={styles.addcart}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={{justifyContent: 'flex-end'}}>
            <View style={styles.btn}>
              <Text style={{color: '#fff'}}>Write a review</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.opacity} />
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>What is you rate?</Text>
            {/* Rating */}

            <AirbnbRating
              count={5}
              reviews={['Bad', 'OK', 'Good', 'Very Good', 'Amazing']}
              defaultRating={4}
              size={33}
              showRating={true}
              onFinishRating={ratingCompleted}
            />
            {/* Rating */}
            <View style={{width: 227}}>
              <Text style={styles.modalText}>
                Please share your opinion about the product
              </Text>
            </View>
            <TextInput
              multiline={true}
              style={styles.review}
              placeholder="Your review"
              defaultValue={newReview}
              onChangeText={(newReview) => setNewReview(newReview)}
            />
            <Text
              style={{
                color: 'red',
                marginTop: windowHeight * 0.05,
                textAlign: 'center',
              }}>
              {errMsg == 'input'
                ? 'Please give your review'
                : errMsg == 'leng'
                ? 'Minimum Char your review 7 and Maximum Char review 200'
                : ''}
            </Text>
            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: COLOR_MAIN}}
              onPress={() => {
                postReview();
              }}>
              <Text style={styles.textStyle}>SEND REVIEW</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
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
  opacity: {
    height: windowHeight * 0.4,
    width: windowWidth,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
    marginTop: 15,
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
  //modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#f2f0f0',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: windowWidth,
    height: windowHeight,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 25,
    paddingVertical: 14,
    elevation: 2,
    height: 48,
    width: 340,
    position: 'absolute',
    bottom: 200,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: FONT_MED,
    fontSize: 18,
  },
  review: {
    backgroundColor: '#fff',
    width: 340,
    height: 154,
    textAlignVertical: 'top',
    borderRadius: 5,
  },
});
