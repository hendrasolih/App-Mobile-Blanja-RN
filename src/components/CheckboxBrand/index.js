import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {COLOR_DISABLE, COLOR_MAIN, FONT_REG} from '../../utils/constans';
import {useState} from 'react';

//redux
import {connect} from 'react-redux';
import {addBrand} from '../../utils/redux/action/filterAction';
import {useSelector} from 'react-redux';

const CheckBoxBrand = ({brand, addBrand}) => {
  //const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const brandRedux = useSelector((state) => state.filter.brand);
  const inBrand = brandRedux.includes(brand);
  return (
    <View style={styles.container}>
      <Text style={{fontFamily: FONT_REG}}>{brand}</Text>

      <CheckBox
        disabled={false}
        value={inBrand}
        onValueChange={(newValue) => {
          //setToggleCheckBox(newValue);
          addBrand(brand);
        }}
        tintColors={{true: COLOR_MAIN, false: COLOR_DISABLE}}
      />
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBrand: (brand) => dispatch(addBrand(brand)),
  };
};

export default connect(null, mapDispatchToProps)(CheckBoxBrand);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: windowWidth * 0.05,
    marginVertical: windowHeight * 0.01,
  },
});
