import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IconFilter} from '../../assets';
import {NavBar} from '../../components';
import CardCatalog from '../../components/CardCatalog';
import {FONT_LIGHT} from '../../utils/constans';

const Catalog = ({navigation}) => {
  return (
    <>
      <View style={styles.head}>
        <NavBar navigation={navigation} title="Catalog" />
        <View style={styles.wrapfilter}>
          <TouchableOpacity
            style={styles.filter}
            onPress={() => navigation.navigate('Filter')}>
            <IconFilter style={{marginRight: 10}} />
            <Text style={{fontFamily: FONT_LIGHT}}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Sort</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginHorizontal: windowWidth * 0.04, marginVertical: 10}}>
        <CardCatalog />
        <CardCatalog />
        <CardCatalog />
        <CardCatalog />
      </View>
    </>
  );
};

export default Catalog;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  wrapfilter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    backgroundColor: '#f0f0f0',
  },
  head: {
    backgroundColor: '#fff',
  },
  filter: {
    paddingVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
});
