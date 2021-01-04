import React, {useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {SplashLogo} from '../../assets';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainApp');
    }, 3000);
  }, [navigation]);
  return (
    <View style={styles.background}>
      <Image source={SplashLogo} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
