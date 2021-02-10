import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CategoryFilter, ColorFilter, SizeFilter} from '../../components';
import {API_URL} from '@env';
import {COLOR_MAIN} from '../../utils/constans';

//redux
import {useSelector} from 'react-redux';

const Filter = ({navigation}) => {
  const brand = useSelector((state) => state.filter.brand);
  //console.log(brand);
  useEffect(() => {
    getColor();
    getSize();
    getCategory();
  }, []);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [category, setCategory] = useState([]);
  const getColor = () => {
    axios
      .get(`${API_URL}/color`)
      .then((res) => {
        setColor(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const getSize = () => {
    axios
      .get(`${API_URL}/size`)
      .then((res) => {
        setSize(res.data.data);
      })
      .catch((err) => console.log(err));
  };

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
  return (
    <View>
      <Text>Colors</Text>
      <View style={styles.wrapcolor}>
        <View style={{marginLeft: 10}} />
        {color.length !== 0 &&
          color.map(({color_type, id}) => {
            return <ColorFilter title={color_type} key={id} />;
          })}
      </View>
      <Text>Sizes</Text>
      <View style={styles.wrapcolor}>
        <View style={{marginLeft: 10}} />
        {size.length !== 0 &&
          size.map(({size_prd, size_id}) => {
            return <SizeFilter size={size_prd} key={size_id} />;
          })}
      </View>
      <Text>Category</Text>
      <View style={styles.wrapcolor}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: 10,
          }}>
          {category.length !== 0 &&
            category.map(({ctg_id, ctg_name}) => {
              return <CategoryFilter category={ctg_name} key={ctg_id} />;
            })}
        </View>
      </View>
      <TouchableOpacity
        style={styles.wrapbrand}
        onPress={() => navigation.navigate('Filter Brand')}>
        <Text>Brand</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{backgroundColor: COLOR_MAIN}}
        onPress={() => navigation.goBack()}>
        <Text style={{color: '#fff'}}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Filter;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  wrapcolor: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 5,
    width: windowWidth,
    flexWrap: 'wrap',
  },
  wrapbrand: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 5,
    width: windowWidth,
    flexWrap: 'wrap',
    marginTop: 10,
  },
});
