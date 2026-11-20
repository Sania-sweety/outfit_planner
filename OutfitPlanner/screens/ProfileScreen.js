
import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  Modal,
  TextInput,
  Switch,
} from 'react-native';


// =====================================================
// PROFILE SCREEN
// =====================================================

export default function ProfileScreen({
  navigation,
  user,
  onLogout,
}) {

  // ===================================================
  // PROFILE EDIT STATES
  // ===================================================

  const [editName, setEditName] = useState(
    user?.name || ''
  );

  const [editEmail, setEditEmail] = useState(
    user?.email || ''
  );


  // ===================================================
  // MODAL STATES
  // ===================================================

  const [editProfileVisible, setEditProfileVisible] =
    useState(false);

  const [notificationsVisible, setNotificationsVisible] =
    useState(false);

  const [settingsVisible, setSettingsVisible] =
    useState(false);

  const [helpVisible, setHelpVisible] =
    useState(false);


  // ===================================================
  // SETTINGS STATES
  // ===================================================

  const [notificationsEnabled, setNotificationsEnabled] =
    useState(true);

  const [darkMode, setDarkMode] =
    useState(false);


  // ===================================================
  // EDIT PROFILE
  // ===================================================

  const handleEditProfile = () => {

    // Load current user information
    setEditName(user?.name || '');
    setEditEmail(user?.email || '');

    setEditProfileVisible(true);
  };


  // ===================================================
  // SAVE EDIT PROFILE
  // ===================================================

  const handleSaveProfile = () => {

    if (editName.trim() === '') {

      Alert.alert(
        'Error',
        'Please enter your name.'
      );

      return;
    }


    if (editEmail.trim() === '') {

      Alert.alert(
        'Error',
        'Please enter your email.'
      );

      return;
    }


    setEditProfileVisible(false);

    Alert.alert(
      'Profile Updated',
      'Your profile has been updated.'
    );
  };


  // ===================================================
  // NOTIFICATIONS
  // ===================================================

  const handleNotifications = () => {

    setNotificationsVisible(true);
  };


  // ===================================================
  // SETTINGS
  // ===================================================

  const handleSettings = () => {

    setSettingsVisible(true);
  };


  // ===================================================
  // HELP & SUPPORT
  // ===================================================

  const handleHelpSupport = () => {

    setHelpVisible(true);
  };


  // ===================================================
  // LOGOUT
  // ===================================================

  const handleLogout = () => {

    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',

      [
        {
          text: 'Cancel',
          style: 'cancel',
        },

        {
          text: 'Logout',
          style: 'destructive',

          onPress: () => {

            // Clear login state in App.js
            if (onLogout) {
              onLogout();
            }

            // Go back to login
            navigation.replace('LoginScreen');
          },
        },
      ]
    );
  };


  // ===================================================
  // UI
  // ===================================================

  return (

    <View
      style={[
        styles.container,
        darkMode && styles.darkContainer,
      ]}
    >

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <View style={styles.header}>

          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >

            <Text style={styles.backText}>
              ←
            </Text>

          </Pressable>


          <Text style={styles.headerTitle}>
            Profile
          </Text>


          <View style={styles.emptySpace} />

        </View>


        {/* =================================================
            PROFILE
        ================================================= */}

        <View style={styles.profileSection}>

          <View style={styles.profileCircle}>

            <Text style={styles.profileIcon}>
              👤
            </Text>

          </View>


          {/* USER NAME */}

          <Text style={styles.name}>
            {user?.name || 'Your Name'}
          </Text>


          {/* USER EMAIL */}

          <Text style={styles.email}>
            {user?.email || 'Email not set'}
          </Text>

        </View>


        {/* =================================================
            EDIT PROFILE
        ================================================= */}

        <Pressable
          style={styles.menuItem}
          onPress={handleEditProfile}
        >

          <View style={styles.menuIconCircle}>

            <Text style={styles.menuIcon}>
              👤
            </Text>

          </View>


          <View style={styles.menuContent}>

            <Text style={styles.menuTitle}>
              Edit Profile
            </Text>

            <Text style={styles.menuDescription}>
              Change your name, email and profile information
            </Text>

          </View>


          <Text style={styles.arrow}>
            ›
          </Text>

        </Pressable>


        {/* =================================================
            NOTIFICATIONS
        ================================================= */}

        <Pressable
          style={styles.menuItem}
          onPress={handleNotifications}
        >

          <View style={styles.menuIconCircle}>

            <Text style={styles.menuIcon}>
              🔔
            </Text>

          </View>


          <View style={styles.menuContent}>

            <Text style={styles.menuTitle}>
              Notifications
            </Text>

            <Text style={styles.menuDescription}>
              Manage your notification preferences
            </Text>

          </View>


          <Text style={styles.arrow}>
            ›
          </Text>

        </Pressable>


        {/* =================================================
            SETTINGS
        ================================================= */}

        <Pressable
          style={styles.menuItem}
          onPress={handleSettings}
        >

          <View style={styles.menuIconCircle}>

            <Text style={styles.menuIcon}>
              ⚙️
            </Text>

          </View>


          <View style={styles.menuContent}>

            <Text style={styles.menuTitle}>
              Settings
            </Text>

            <Text style={styles.menuDescription}>
              Manage app preferences and settings
            </Text>

          </View>


          <Text style={styles.arrow}>
            ›
          </Text>

        </Pressable>


        {/* =================================================
            HELP & SUPPORT
        ================================================= */}

        <Pressable
          style={styles.menuItem}
          onPress={handleHelpSupport}
        >

          <View style={styles.menuIconCircle}>

            <Text style={styles.menuIcon}>
              ?
            </Text>

          </View>


          <View style={styles.menuContent}>

            <Text style={styles.menuTitle}>
              Help & Support
            </Text>

            <Text style={styles.menuDescription}>
              Get help and contact support
            </Text>

          </View>


          <Text style={styles.arrow}>
            ›
          </Text>

        </Pressable>


        {/* =================================================
            LOGOUT
        ================================================= */}

        <Pressable
          style={styles.logoutButton}
          onPress={handleLogout}
        >

          <Text style={styles.logoutText}>
            Logout
          </Text>

        </Pressable>


        {/* =================================================
            BACK TO HOME
        ================================================= */}

        <Pressable
          style={styles.homeButton}
          onPress={() => navigation.navigate('HomeScreen')}
        >

          <Text style={styles.homeButtonText}>
            ← Back to Home
          </Text>

        </Pressable>

      </ScrollView>


      {/* ===================================================
          EDIT PROFILE MODAL
      =================================================== */}

      <Modal
        visible={editProfileVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() =>
          setEditProfileVisible(false)
        }
      >

        <View style={styles.modalBackground}>

          <View style={styles.modalBox}>

            <Text style={styles.modalTitle}>
              Edit Profile
            </Text>


            {/* NAME */}

            <Text style={styles.inputLabel}>
              Name
            </Text>

            <TextInput
              style={styles.input}
              value={editName}
              onChangeText={setEditName}
              placeholder="Enter your name"
              placeholderTextColor="#999"
            />


            {/* EMAIL */}

            <Text style={styles.inputLabel}>
              Email
            </Text>

            <TextInput
              style={styles.input}
              value={editEmail}
              onChangeText={setEditEmail}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
            />


            {/* BUTTONS */}

            <View style={styles.modalButtonRow}>

              <Pressable
                style={styles.cancelButton}
                onPress={() =>
                  setEditProfileVisible(false)
                }
              >

                <Text style={styles.cancelText}>
                  Cancel
                </Text>

              </Pressable>


              <Pressable
                style={styles.saveButton}
                onPress={handleSaveProfile}
              >

                <Text style={styles.saveText}>
                  Save
                </Text>

              </Pressable>

            </View>

          </View>

        </View>

      </Modal>


      {/* ===================================================
          NOTIFICATIONS MODAL
      =================================================== */}

      <Modal
        visible={notificationsVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() =>
          setNotificationsVisible(false)
        }
      >

        <View style={styles.modalBackground}>

          <View style={styles.modalBox}>

            <Text style={styles.modalTitle}>
              Notifications
            </Text>


            <View style={styles.settingRow}>

              <View style={styles.settingContent}>

                <Text style={styles.settingTitle}>
                  Outfit Notifications
                </Text>

                <Text style={styles.settingDescription}>
                  Receive outfit suggestions and reminders
                </Text>

              </View>


              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
              />

            </View>


            <Pressable
              style={styles.closeButton}
              onPress={() =>
                setNotificationsVisible(false)
              }
            >

              <Text style={styles.closeText}>
                Done
              </Text>

            </Pressable>

          </View>

        </View>

      </Modal>


      {/* ===================================================
          SETTINGS MODAL
      =================================================== */}

      <Modal
        visible={settingsVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() =>
          setSettingsVisible(false)
        }
      >

        <View style={styles.modalBackground}>

          <View style={styles.modalBox}>

            <Text style={styles.modalTitle}>
              Settings
            </Text>


            {/* DARK MODE */}

            <View style={styles.settingRow}>

              <View style={styles.settingContent}>

                <Text style={styles.settingTitle}>
                  Dark Mode
                </Text>

                <Text style={styles.settingDescription}>
                  Change the appearance of the app
                </Text>

              </View>


              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
              />

            </View>


            {/* APP VERSION */}

            <View style={styles.versionBox}>

              <Text style={styles.versionTitle}>
                Outfit Planner
              </Text>

              <Text style={styles.versionText}>
                Version 1.0.0
              </Text>

            </View>


            <Pressable
              style={styles.closeButton}
              onPress={() =>
                setSettingsVisible(false)
              }
            >

              <Text style={styles.closeText}>
                Done
              </Text>

            </Pressable>

          </View>

        </View>

      </Modal>


      {/* ===================================================
          HELP & SUPPORT MODAL
      =================================================== */}

      <Modal
        visible={helpVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() =>
          setHelpVisible(false)
        }
      >

        <View style={styles.modalBackground}>

          <View style={styles.modalBox}>

            <Text style={styles.modalTitle}>
              Help & Support
            </Text>


            <Text style={styles.helpTitle}>
              Need Help?
            </Text>


            <Text style={styles.helpText}>
              You can use Outfit Planner to manage your
              wardrobe, create outfits, get outfit suggestions,
              save outfits and plan your outfits on the calendar.
            </Text>


            <Text style={styles.helpTitle}>
              Contact Support
            </Text>


            <Text style={styles.helpText}>
              Support: Open an issue on GitHub.
            </Text>


            <Pressable
              style={styles.closeButton}
              onPress={() =>
                setHelpVisible(false)
              }
            >

              <Text style={styles.closeText}>
                Close
              </Text>

            </Pressable>

          </View>

        </View>

      </Modal>

    </View>
  );
}


// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({

  // ===================================================
  // MAIN
  // ===================================================

  container: {
    flex: 1,
    backgroundColor: '#f8f3f0',
  },

  darkContainer: {
    backgroundColor: '#222',
  },

  content: {
    padding: 20,
    paddingTop: 45,
    paddingBottom: 40,
  },


  // ===================================================
  // HEADER
  // ===================================================

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },

  backText: {
    fontSize: 25,
    color: '#0d0101',
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0d0101',
  },

  emptySpace: {
    width: 42,
  },


  // ===================================================
  // PROFILE
  // ===================================================

  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },

  profileCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#ead9cc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  profileIcon: {
    fontSize: 42,
  },

  name: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#0d0101',
  },

  email: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },


  // ===================================================
  // MENU
  // ===================================================

  menuItem: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },

  menuIconCircle: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#f3e9e2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuIcon: {
    fontSize: 20,
  },

  menuContent: {
    flex: 1,
    marginLeft: 14,
  },

  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0d0101',
  },

  menuDescription: {
    fontSize: 11,
    color: '#777',
    marginTop: 4,
    lineHeight: 16,
  },

  arrow: {
    fontSize: 28,
    color: '#777',
    marginLeft: 8,
  },


  // ===================================================
  // LOGOUT
  // ===================================================

  logoutButton: {
    backgroundColor: '#0d0101',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 15,
  },

  logoutText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },


  // ===================================================
  // HOME
  // ===================================================

  homeButton: {
    marginTop: 15,
    alignItems: 'center',
    paddingVertical: 12,
  },

  homeButtonText: {
    color: '#0d0101',
    fontSize: 14,
    fontWeight: 'bold',
  },


  // ===================================================
  // MODAL
  // ===================================================

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },

  modalBox: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 22,
    elevation: 5,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0d0101',
    textAlign: 'center',
    marginBottom: 20,
  },


  // ===================================================
  // INPUTS
  // ===================================================

  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 7,
    marginTop: 10,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#222',
    backgroundColor: '#fafafa',
  },


  // ===================================================
  // MODAL BUTTONS
  // ===================================================

  modalButtonRow: {
    flexDirection: 'row',
    marginTop: 25,
  },

  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  cancelText: {
    color: '#555',
    fontSize: 15,
    fontWeight: 'bold',
  },

  saveButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#0d0101',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },

  saveText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },


  // ===================================================
  // SETTINGS
  // ===================================================

  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  settingContent: {
    flex: 1,
    paddingRight: 15,
  },

  settingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },

  settingDescription: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
    lineHeight: 17,
  },


  // ===================================================
  // VERSION
  // ===================================================

  versionBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8f3f0',
    borderRadius: 12,
  },

  versionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
  },

  versionText: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },


  // ===================================================
  // CLOSE
  // ===================================================

  closeButton: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#0d0101',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },

  closeText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },


  // ===================================================
  // HELP
  // ===================================================

  helpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 10,
    marginBottom: 6,
  },

  helpText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },

});