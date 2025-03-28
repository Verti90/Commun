import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import apiClient from './services/api';
import { useNavigation } from '@react-navigation/native';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const loadStorageData = async () => {
      const storedUser = await AsyncStorage.getItem('@Auth:user');
      const storedToken = await AsyncStorage.getItem('@Auth:token');

      if (storedUser && storedToken) {
        console.log("Loaded user from storage:", storedUser);
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    };

    loadStorageData();
  }, []);

  const login = async (username, password) => {
    try {
      console.log("Attempting backend login with username:", username);
      const response = await apiClient.post('/login/', { username, password });
      console.log("Backend login response:", response.data);
      const { user, token } = response.data;

      setUser(user);
      setToken(token.access);

      await AsyncStorage.setItem('@Auth:user', JSON.stringify(user));
      await AsyncStorage.setItem('@Auth:token', token.access);

      console.log("Navigating to Home after login");
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      console.error('Login error', error);
      Alert.alert('Login Error', 'Invalid username or password');
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);

    await AsyncStorage.removeItem('@Auth:user');
    await AsyncStorage.removeItem('@Auth:token');

    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
