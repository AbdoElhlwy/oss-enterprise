import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/theme';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import BookingScreen from '../screens/BookingScreen';
import RideConfirmationScreen from '../screens/RideConfirmationScreen';
import ActivityScreen from '../screens/ActivityScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.gold,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'الرئيسية',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          tabBarLabel: 'رحلاتي',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="BookNow"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <View style={styles.bookNowBtn}>
              <LinearGradient
                colors={['#c9a96e', '#f0d78c']}
                style={styles.bookNowGradient}
              >
                <Ionicons name="add" size={28} color={COLORS.dark} />
              </LinearGradient>
            </View>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('Booking', { serviceId: 'daily' });
          },
        })}
      />
      <Tab.Screen
        name="Notifications"
        component={ActivityScreen}
        options={{
          tabBarLabel: 'الإشعارات',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'حسابي',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.dark },
          animation: 'slide_from_left',
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="RideConfirmation" component={RideConfirmationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.dark,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    height: 85,
    paddingBottom: 25,
    paddingTop: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    writingDirection: 'rtl',
  },
  bookNowBtn: {
    top: -20,
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  bookNowGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
