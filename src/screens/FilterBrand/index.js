import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {CheckboxBrand} from '../../components';
import axios from 'axios';
import {API_URL} from '@env';

const FilterBrand = () => {
  useEffect(() => {
    getBrand();
  }, []);
  const [brand, setBrand] = useState([]);
  const getBrand = () => {
    axios
      .get(`${API_URL}/category/brand`)
      .then(({data}) => {
        //console.log(data.data);
        setBrand(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View>
      <View style={{height: 20}} />
      {brand.length !== 0 &&
        brand.map(({prd_brand}, index) => {
          return <CheckboxBrand brand={prd_brand} key={index} />;
        })}
    </View>
  );
};

export default FilterBrand;

const styles = StyleSheet.create({});
