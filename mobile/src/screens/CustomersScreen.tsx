import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function CustomersScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Customers</Text>
      <Text style={styles.comingSoon}>Customers Screen - Coming Soon</Text>
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
  comingSoon: {
    textAlign: 'center',
    color: '#64748b',
    marginTop: 100,
    fontSize: 16,
  },
});
