import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';

export default function EditProfileScreen({ navigation }) {

  const [name, setName] = useState('Sania');
  const [email, setEmail] = useState('sania@example.com');
  const [phone, setPhone] = useState('');

  const saveProfile = () => {

    Alert.alert(
      'Profile Updated',
      'Your profile has been updated successfully.'
    );

    navigation.goBack();
  };

  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.content}>

        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        <Text style={styles.title}>
          Edit Profile
        </Text>

        <Text style={styles.label}>
          Name
        </Text>

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />

        <Text style={styles.label}>
          Email
        </Text>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <Text style={styles.label}>
          Phone Number
        </Text>

        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
        />

        <Pressable
          style={styles.saveButton}
          onPress={saveProfile}
        >
          <Text style={styles.saveText}>
            Save Changes
          </Text>
        </Pressable>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f8f3f0',
  },

  content: {
    padding: 20,
    paddingTop: 45,
  },

  backButton: {
    marginBottom: 25,
  },

  backText: {
    fontSize: 16,
    color: '#0d0101',
    fontWeight: 'bold',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0d0101',
    marginBottom: 30,
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0d0101',
    marginBottom: 8,
  },

  input: {
    height: 52,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 15,
  },

  saveButton: {
    backgroundColor: '#0d0101',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },

  saveText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});