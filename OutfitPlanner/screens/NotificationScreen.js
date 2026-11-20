import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';

export default function NotificationScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>←</Text>
          </Pressable>

          <Text style={styles.title}>
            Notifications
          </Text>

          <View style={styles.headerSpace} />
        </View>

        {/* NOTIFICATION 1 */}
        <Pressable style={styles.notificationCard}>
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>☀</Text>
          </View>

          <View style={styles.notificationContent}>
            <Text style={styles.notificationTitle}>
              Weather Update
            </Text>

            <Text style={styles.notificationText}>
              Today's weather is perfect for a casual outfit.
            </Text>

            <Text style={styles.time}>
              Just now
            </Text>
          </View>
        </Pressable>

        {/* NOTIFICATION 2 */}
        <Pressable style={styles.notificationCard}>
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>👗</Text>
          </View>

          <View style={styles.notificationContent}>
            <Text style={styles.notificationTitle}>
              Wardrobe Reminder
            </Text>

            <Text style={styles.notificationText}>
              Add more clothes to your wardrobe for better outfit suggestions.
            </Text>

            <Text style={styles.time}>
              10 minutes ago
            </Text>
          </View>
        </Pressable>

        {/* NOTIFICATION 3 */}
        <Pressable style={styles.notificationCard}>
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>✨</Text>
          </View>

          <View style={styles.notificationContent}>
            <Text style={styles.notificationTitle}>
              Style Suggestion
            </Text>

            <Text style={styles.notificationText}>
              Check today's recommended outfit.
            </Text>

            <Text style={styles.time}>
              1 hour ago
            </Text>
          </View>
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
    paddingBottom: 30,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  backButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },

  backText: {
    fontSize: 25,
    color: '#0d0101',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0d0101',
  },

  headerSpace: {
    width: 45,
  },

  notificationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 15,
    flexDirection: 'row',
    elevation: 2,
  },

  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3e9e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  icon: {
    fontSize: 22,
  },

  notificationContent: {
    flex: 1,
  },

  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0d0101',
    marginBottom: 5,
  },

  notificationText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#666',
  },

  time: {
    fontSize: 11,
    color: '#999',
    marginTop: 7,
  },

});