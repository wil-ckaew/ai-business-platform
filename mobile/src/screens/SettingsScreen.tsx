import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen({ navigation }: any) {
  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace('Login');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.settingItem}>
          <Icon name="account" size={24} color="#3b82f6" />
          <Text style={styles.settingText}>Profile Settings</Text>
          <Icon name="chevron-right" size={20} color="#cbd5e1" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Icon name="shield" size={24} color="#3b82f6" />
          <Text style={styles.settingText}>Security</Text>
          <Icon name="chevron-right" size={20} color="#cbd5e1" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Icon name="bell" size={24} color="#3b82f6" />
          <Text style={styles.settingText}>Notifications</Text>
          <Icon name="chevron-right" size={20} color="#cbd5e1" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.settingItem}>
          <Icon name="theme-light-dark" size={24} color="#3b82f6" />
          <Text style={styles.settingText}>Dark Mode</Text>
          <Switch value={false} />
        </View>
        <TouchableOpacity style={styles.settingItem}>
          <Icon name="palette" size={24} color="#3b82f6" />
          <Text style={styles.settingText}>Theme</Text>
          <Icon name="chevron-right" size={20} color="#cbd5e1" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <TouchableOpacity style={styles.settingItem}>
          <Icon name="information" size={24} color="#3b82f6" />
          <Text style={styles.settingText}>About App</Text>
          <Icon name="chevron-right" size={20} color="#cbd5e1" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Icon name="help-circle" size={24} color="#3b82f6" />
          <Text style={styles.settingText}>Help & Support</Text>
          <Icon name="chevron-right" size={20} color="#cbd5e1" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Icon name="file-document" size={24} color="#3b82f6" />
          <Text style={styles.settingText}>Privacy Policy</Text>
          <Icon name="chevron-right" size={20} color="#cbd5e1" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="logout" size={20} color="#ef4444" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.version}>Version 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 20,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingText: {
    fontSize: 16,
    color: '#1e293b',
    flex: 1,
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fee2e2',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
    marginLeft: 8,
  },
  version: {
    textAlign: 'center',
    color: '#94a3b8',
    marginTop: 30,
    marginBottom: 20,
    fontSize: 12,
  },
});
