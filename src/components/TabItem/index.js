import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  IconHomeAct,
  IconHome,
  IconShopAct,
  IconShop,
  IconBagAct,
  IconBag,
  IconFavoriteAct,
  IconFavorite,
  IconProfileAct,
  IconProfile,
} from '../../assets';

const TabItem = ({isFocused, onPress, onLongPress, label}) => {
  const Icon = () => {
    if (label === 'Home') return isFocused ? <IconHomeAct /> : <IconHome />;
    if (label === 'Shop') return isFocused ? <IconShopAct /> : <IconShop />;
    if (label === 'Bag') return isFocused ? <IconBagAct /> : <IconBag />;
    if (label === 'Favorites')
      return isFocused ? <IconFavoriteAct /> : <IconFavorite />;
    if (label === 'Profile')
      return isFocused ? <IconProfileAct /> : <IconProfile />;
    return <IconHome />;
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <Icon />
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  icon: {
    color: 'yellow',
  },
});
