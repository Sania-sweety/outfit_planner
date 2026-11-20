import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';

export default function HelpSupportScreen({ navigation }) {

  const contactSupport = () => {

    Alert.alert(
      'Contact Support',
      'For help, open an issue in the project repository.'
    );

  };

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
          Help & Support
        </Text>


        <Text style={styles.sectionTitle}>
          Frequently Asked Questions
        </Text>


        <View style={styles.card}>

          <Text style={styles.question}>
            How do I add clothes?
          </Text>

          <Text style={styles.answer}>
            Go to My Wardrobe and choose Gallery or Camera
            to add your clothes.
          </Text>

        </View>


        <View style={styles.card}>

          <Text style={styles.question}>
            How do I create an outfit?
          </Text>

          <Text style={styles.answer}>
            Open Create Outfit and select clothes from
            your wardrobe.
          </Text>

        </View>


        <View style={styles.card}>

          <Text style={styles.question}>
            How do I get outfit suggestions?
          </Text>

          <Text style={styles.answer}>
            Open Suggest Outfit and select an occasion.
            The app will recommend an outfit.
          </Text>

        </View>


        <Pressable
          style={styles.supportButton}
          onPress={contactSupport}
        >

          <Text style={styles.supportText}>
            Contact Support
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
    marginBottom: 30,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#0d0101',
    marginBottom: 15,
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,
  },

  question: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0d0101',
    marginBottom: 8,
  },

  answer: {
    fontSize: 13,
    lineHeight: 19,
    color: '#666',
  },

  supportButton: {
    backgroundColor: '#0d0101',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 15,
  },

  supportText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },

});