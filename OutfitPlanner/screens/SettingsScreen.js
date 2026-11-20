import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Switch,
  ScrollView,
} from 'react-native';

export default function SettingsScreen({ navigation }) {

  const [notifications, setNotifications] = useState(true);
  const [weatherUpdates, setWeatherUpdates] = useState(true);

  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.content}>

        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>
            ← Back
          </Text>
        </Pressable>

        <Text style={styles.title}>
          Settings
        </Text>

        {/* NOTIFICATIONS */}

        <View style={styles.settingCard}>

          <View style={styles.textContainer}>

            <Text style={styles.settingTitle}>
              Notifications
            </Text>

            <Text style={styles.description}>
              Receive outfit and app notifications
            </Text>

          </View>

          <Switch
            value={notifications}
            onValueChange={setNotifications}
          />

        </View>


        {/* WEATHER */}

        <View style={styles.settingCard}>

          <View style={styles.textContainer}>

            <Text style={styles.settingTitle}>
              Weather Updates
            </Text>

            <Text style={styles.description}>
              Get outfit suggestions based on weather
            </Text>

          </View>

          <Switch
            value={weatherUpdates}
            onValueChange={setWeatherUpdates}
          />

        </View>


        {/* ACCOUNT */}

        <Pressable style={styles.optionCard}>

          <Text style={styles.optionTitle}>
            Change Password
          </Text>

          <Text style={styles.arrow}>
            →
          </Text>

        </Pressable>


        {/* ABOUT */}

        <Pressable style={styles.optionCard}>

          <Text style={styles.optionTitle}>
            About Outfit Planner
          </Text>

          <Text style={styles.arrow}>
            →
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
    fontWeight: 'bold',
    color: '#0d0101',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0d0101',
    marginBottom: 25,
  },

  settingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  textContainer: {
    flex: 1,
    marginRight: 10,
  },

  settingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0d0101',
  },

  description: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },

  optionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  optionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0d0101',
  },

  arrow: {
    fontSize: 20,
    color: '#777',
  },

});