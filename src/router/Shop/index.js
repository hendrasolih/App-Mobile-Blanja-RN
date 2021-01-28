import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Catalog, Shop} from '../../screens';

const Stack = createStackNavigator();

const ShopCategory = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Shop"
        component={Shop}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Catalog"
        component={Catalog}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ShopCategory;
