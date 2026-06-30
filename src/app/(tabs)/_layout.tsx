import { Tabs } from 'expo-router';
import { Platform, Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#F5B842',
        tabBarInactiveTintColor: '#6B6490',
        tabBarStyle: {
          backgroundColor: '#1A1635',
          borderTopColor: 'rgba(123, 47, 190, 0.15)',
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 65,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: '#0D0B1A',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 22, color: focused ? '#F5B842' : '#6B6490' }}>✦</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="deeds"
        options={{
          title: 'Deeds',
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 22, color: focused ? '#F5B842' : '#6B6490' }}>📝</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="causes"
        options={{
          title: 'Causes',
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 22, color: focused ? '#F5B842' : '#6B6490' }}>🌍</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 22, color: focused ? '#F5B842' : '#6B6490' }}>👤</Text>
          ),
        }}
      />
    </Tabs>
  );
}
