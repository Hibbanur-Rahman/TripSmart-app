import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import tw from 'twrnc';
import Home from '../screens/home/home';
import Account from '../screens/account';
import Wishlist from '../screens/wishlist';
import Trip from '../screens/trip';

const Tab = createBottomTabNavigator();

const RenderTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={[tw`w-full flex flex-row justify-center pb-3 pt-1 bg-white`]}>
      <View
        style={[
          tw`flex flex-row justify-between items-center w-11/12 p-2 py-2 bg-white border border-gray-300 rounded-2xl shadow-sm`,
        ]}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[tw`flex-1 items-center justify-center`]}>
              {renderIcon(route.name, isFocused)}
              <Text style={[tw`text-center ${isFocused?'text-[#5F48E6]':'text-gray-600'}`,{fontFamily:'Lexend-Regular'}]}>{route.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const renderIcon = (routeName, isFocused) => {
  let iconName;

  switch (routeName) {
    case 'Home':
      return (
        <SimpleLineIcon
          name="home"
          size={25}
          color={isFocused ? '#5F48E6' : '#222'}
        />
      );

      break;
    case 'Account':
      return (
        <SimpleLineIcon
          name="user"
          size={25}
          color={isFocused ? '#5F48E6' : '#222'}
        />
      );

      break;
    case 'Trip':
      return (
        <Fontisto
          name="map"
          size={23}
          color={isFocused ? '#5F48E6' : '#222'}
        />
      );

      break;
    case 'Wishlist':
      return (
        <MaterialCommunityIcons
          name="ticket-percent-outline"
          size={25}
          color={isFocused ? '#5F48E6' : '#222'}
        />
      );

      break;
    default:
      iconName = 'question';
      break;
  }

  return (
    <SimpleLineIcon
      name={iconName}
      size={25}
      color={isFocused ? '#5F48E6' : '#222'}
    />
  );
};

const Layout = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <RenderTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Trip" component={Trip} />
      <Tab.Screen name="Wishlist" component={Wishlist} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default Layout;
