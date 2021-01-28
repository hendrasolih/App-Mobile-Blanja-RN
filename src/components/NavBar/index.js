import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {IconChevron, IconSearch} from '../../assets';
import {FONT_MED} from '../../utils/constans';

const NavBar = ({title, navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{alignSelf: 'center'}}
        onPress={() => navigation.goBack()}>
        <IconChevron />
      </TouchableOpacity>
      <View style={{alignSelf: 'center'}}>
        <Text style={{fontFamily: FONT_MED, fontSize: 18}}>{title}</Text>
      </View>
      <IconSearch
        style={{alignSelf: 'center', marginLeft: 35, marginRight: 5}}
        onPress={() => navigation.navigate('Search')}
      />
      <View style={{display: 'none'}}>
        <TextInput placeholder="Search" style={styles.searchBar} />
      </View>
    </View>
  );
};

export default NavBar;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: windowWidth * 0.04,
    height: 40,
  },
  searchBar: {
    fontSize: 15,
    margin: 5,
    width: '90%',
    height: 40,
    backgroundColor: 'white',
    marginLeft: 5,
  },
});
