import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {ListCategory, NavBar} from '../../components';
import {
  COLOR_DISABLE,
  COLOR_MAIN,
  FONT_LIGHT,
  FONT_REG,
} from '../../utils/constans';
import {API_URL} from '@env';

const Shop = ({navigation}) => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    // code to run on component mount
    getCategory();
  }, []);
  const getCategory = () => {
    axios
      .get(`${API_URL}/category`)
      .then(({data}) => {
        //console.log(data.data);
        setCategory(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //console.log(category);
  return (
    <View style={styles.container}>
      <NavBar title="Categories" navigation={navigation} />
      <TouchableOpacity
        style={styles.viewAll}
        onPress={() =>
          navigation.navigate('Catalog', {title: 'View All Items', keyword: ''})
        }>
        <Text style={{color: '#ffffff'}}>VIEW ALL ITEMS</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Choose category</Text>
      <ScrollView vertical={true}>
        {category.length !== 0 &&
          category.map(({ctg_id, ctg_name}) => {
            return (
              <ListCategory
                key={ctg_id}
                title={ctg_name}
                navigation={navigation}
              />
            );
          })}
        <View style={{borderTopColor: COLOR_DISABLE, borderTopWidth: 1}}></View>
        <View style={styles.gap} />
      </ScrollView>
    </View>
  );
};

export default Shop;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {},
  viewAll: {
    marginTop: 16,
    fontFamily: FONT_REG,
    backgroundColor: COLOR_MAIN,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    height: 48,
    marginHorizontal: windowWidth * 0.04,
  },
  text: {
    fontFamily: FONT_LIGHT,
    color: COLOR_DISABLE,
    fontSize: 14,
    marginVertical: 16,
    marginHorizontal: windowWidth * 0.04,
  },
  gap: {
    height: 170,
  },
});
