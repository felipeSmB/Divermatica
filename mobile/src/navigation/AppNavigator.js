import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import JugadoresScreen from '../screens/JugadoresScreen';
import DeportesScreen from '../screens/DeportesScreen';
import EquiposScreen from '../screens/EquiposScreen';
import HistorialScreen from '../screens/HistorialScreen';
import BrandTitle from '../components/BrandTitle';
import AdminScreen from '../screens/AdminScreen';
import ContaScreen from '../screens/ContaScreen';
import AccountMenu from '../components/AccountMenu';
import ProScreen from '../screens/ProScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppTabs({ role }) {
    const insets = useSafeAreaInsets();
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <>
        <Tab.Navigator
            screenOptions={{
                headerRight: () => (
                    <TouchableOpacity onPress={() => setMenuVisible(true)} style={{ marginRight: 16 }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>☰</Text>
                    </TouchableOpacity>
                ),
                headerStyle: {
                    backgroundColor: '#0f1115',
                    borderBottomWidth: 1,
                    borderBottomColor: '#1c1f26',
                    elevation: 0,
                    shadowOpacity: 0,
                },
                headerShadowVisible: false,
                headerTitle: () => <BrandTitle />,
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
                name="Pro"
                component={ProScreen}
                options={{
                    title: 'PRO',
                    tabBarIcon: ({ focused }) => (
                        <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>⭐</Text>
                    ),
                }}
            />
            
           
            {role === 'admin' && (
                <Tab.Screen
                    name="Admin"
                    component={AdminScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>🛠️</Text>
                        ),
                    }}
                />
            )}
        </Tab.Navigator>
        <AccountMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
        </>
    );
}

export default function AppNavigator() {
    const { autenticado, cargando, role } = useAuth();

    if (cargando) return null;

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {autenticado ? (
                    <>
                        <Stack.Screen name="App">
                            {() => <AppTabs role={role} />}
                        </Stack.Screen>
                        <Stack.Screen
                            name="Conta"
                            component={ContaScreen}
                            options={{
                                headerShown: true,
                                headerStyle: {
                                    backgroundColor: '#0f1115',
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#1c1f26',
                                    elevation: 0,
                                    shadowOpacity: 0,
                                },
                                headerShadowVisible: false,
                                headerTintColor: '#fff',
                                headerTitleStyle: { color: '#fff', fontWeight: '700' },
                                headerTitle: 'Mi Cuenta',
                            }}
                        />
                        <Stack.Screen
                            name="Historial"
                            component={HistorialScreen}
                            options={{
                                headerShown: true,
                                headerStyle: {
                                    backgroundColor: '#0f1115',
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#1c1f26',
                                    elevation: 0,
                                    shadowOpacity: 0,
                                },
                                headerShadowVisible: false,
                                headerTintColor: '#fff',
                                headerTitleStyle: { color: '#fff', fontWeight: '700' },
                                headerTitle: 'Historial',
                            }}
                        />
                    </>
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