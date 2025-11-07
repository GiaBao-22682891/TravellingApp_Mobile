import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../type/type';
import Home from '../screens/tab/HomeScreen';
import Profile from '../screens/tab/ProfileScreen';
import BookingScreen from '../screens/tab/BookingScreen';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import Favorite from '../screens/tab/FavoriteScreen';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#5ad6ffff',
        tabBarIcon: ({ color, size }) => {
          let iconName = ""

          if (route.name === 'Home') iconName = 'search-outline';
          else if (route.name === 'Favorites') iconName = 'heart-outline';
          else if (route.name === 'Bookings') iconName = 'list-outline';
          else if (route.name === 'Profile') iconName = 'person-outline';
          else iconName = 'home-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ title: 'Search' }} />
      <Tab.Screen name="Favorites" component={Favorite} options={{ title: 'Favorites' }} />
      <Tab.Screen name="Bookings" component={BookingScreen} options={{ title: 'Bookings' }} /> 
      <Tab.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;