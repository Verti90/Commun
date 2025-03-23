import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  const icons = [
    { name: 'Admin', source: require('../assets/images/Admin.jpg') },
    { name: 'Dining', source: require('../assets/images/Dining.jpg') },
    { name: 'Activities', source: require('../assets/images/Activities.jpg') },
    { name: 'Maintenance', source: require('../assets/images/Maintenance.jpg') },
    { name: 'Transportation', source: require('../assets/images/Transportation.jpg') },
    { name: 'Wellness', source: require('../assets/images/Wellness.jpg') },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcome}>Welcome, Resident Name!</Text>
      <Text style={styles.title}>Aravah Senior Living</Text>
      <View style={styles.iconContainer}>
        {icons.map((icon) => (
          <TouchableOpacity
            key={icon.name}
            style={styles.iconButton}
            onPress={() => navigation.navigate('More', { screen: icon.name })}
          >
            <Image source={icon.source} style={styles.iconImage} />
            <Text>{icon.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f0f0e5',
  },
  welcome: { fontSize: 24, marginBottom: 10 },
  title: { fontSize: 30, fontWeight: 'bold', marginBottom: 20 },
  iconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  iconButton: {
    width: '40%',
    padding: 10,
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    elevation: 3
  },
  iconImage: {
    width: 50, height: 50, resizeMode: 'contain', marginBottom: 10
  },
});
