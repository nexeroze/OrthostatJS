import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#18181b',
          borderBottomWidth: 1,
          borderBottomColor: '#27272a',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          color: '#ffffff',
          fontWeight: '700',
        },
        drawerStyle: {
          backgroundColor: '#18181b',
          width: 280,
        },
        drawerActiveTintColor: '#00ffff',
        drawerInactiveTintColor: '#d4d4d8',
        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: '600',
        },
        drawerItemStyle: {
          borderRadius: 12,
          marginHorizontal: 8,
          marginVertical: 4,
        },
      }}
    >
      <Drawer.Screen
        name="home"
        options={{
          title: 'Dashboard',
          drawerLabel: 'Home',
        }}
      />
      <Drawer.Screen
        name="chat"
        options={{
          title: 'AI Chat',
          drawerLabel: 'AI Chat',
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: 'Settings',
          drawerLabel: 'Settings',
        }}
      />
    </Drawer>
  );
}
