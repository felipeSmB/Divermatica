import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import JugadoresScreen from '../screens/JugadoresScreen';
import DeportesScreen from '../screens/DeportesScreen';
import EquiposScreen from '../screens/EquiposScreen';
import HistorialScreen from '../screens/HistorialScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BotonSalir() {
    const { logout } = useAuth();
    return (
        <TouchableOpacity onPress={logout} style={{ marginRight: 16 }}>
            <Text style={{ color: '#ff4d4d', fontWeight: 'bold' }}>Salir</Text>
        </TouchableOpacity>
    );
}

function AppTabs() {
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            screenOptions={{
                headerRight: () => <BotonSalir />,
                headerStyle: {
                    backgroundColor: '#0f1115',
                    borderBottomWidth: 1,
                    borderBottomColor: '#1c1f26',
                    elevation: 0,
                    shadowOpacity: 0,
                },
                headerShadowVisible: false,
                headerTitleStyle: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
                headerTitleAlign: 'left',
                sceneContainerStyle: { backgroundColor: '#0f1115' },
                tabBarStyle: {
                    backgroundColor: '#0f1115',
                    borderTopWidth: 1,
                    borderTopColor: '#1c1f26',
                    elevation: 0,
                    shadowOpacity: 0,
                    height: 56 + insets.bottom,
                    paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: '#00c2ff',
                tabBarInactiveTintColor: '#5b6478',
                tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
                tabBarShowLabel: true,
            }}>
            <Tab.Screen
                name="Jugadores"
                component={JugadoresScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>👥</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="Deportes"
                component={DeportesScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>🏅</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="Equipos"
                component={EquiposScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>⚡</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="Historial"
                component={HistorialScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>📖</Text>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    const { autenticado, cargando } = useAuth();

    if (cargando) return null;

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {autenticado ? (
                    <Stack.Screen name="App" component={AppTabs} />
                ) : (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}