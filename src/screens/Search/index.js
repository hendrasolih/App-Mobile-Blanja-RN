import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import {IconChevron} from '../../assets';

const Search = ({navigation}) => {
  const [keyword, setKeyword] = useState('');
  //console.log(keyword);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconChevron
          style={{marginRight: 20}}
          onPress={() => navigation.goBack()}
        />
        <TextInput
          placeholder="    Search"
          style={styles.searchBar}
          defaultValue={keyword}
          onChangeText={(text) => setKeyword(text)}
          onSubmitEditing={() =>
            navigation.navigate('Catalog', {title: '', keyword: keyword})
          }
        />
      </View>
    </View>
  );
};

export default Search;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: windowWidth * 0.04,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    fontSize: 15,
    margin: 5,
    width: '90%',
    height: 40,
    backgroundColor: 'white',
    marginLeft: 5,
    borderRadius: 23,
  },
});
