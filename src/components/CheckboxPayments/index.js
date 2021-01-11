import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {COLOR_DISABLE, COLOR_MAIN} from '../../utils/constans';
import {IconGopay, IconMasterCard, IconPos} from '../../assets';

const CheckBoxPayment = ({image}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.wrapicon}>
        {image == 'Mastercard' && <IconMasterCard />}
        {image == 'Pos' && <IconPos />}
        {image == 'Gopay' && <IconGopay />}
      </View>
      <Text style={{marginLeft: -130}}>{image}</Text>
      <CheckBox
        disabled={false}
        value={toggleCheckBox}
        onValueChange={(newValue) => setToggleCheckBox(newValue)}
        tintColors={{true: COLOR_MAIN, false: COLOR_DISABLE}}
      />
    </View>
  );
};

export default CheckBoxPayment;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: windowWidth * 0.04,
    marginBottom: 22,
  },
  wrapicon: {
    width: 64,
    height: 38,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});
