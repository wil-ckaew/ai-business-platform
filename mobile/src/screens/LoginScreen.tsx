import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const API_URL = 'http://localhost:8080';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    
    try {
      // Simulação de login - em produção, usar API real
      if (email === 'admin@business.com' && password === 'password123') {
        // Simular token JWT
        const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBidXNpbmVzcy5jb20iLCJuYW1lIjoiQWRtaW4gVXNlciIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwMzM0NTYwMH0.mock-token-for-demo';
        
        await AsyncStorage.setItem('auth_token', mockToken);
        await AsyncStorage.setItem('user_email', email);
        await AsyncStorage.setItem('user_name', 'Admin User');
        
        // Navegar para o dashboard
        navigation.replace('Main');
      } else {
        Alert.alert('Login Failed', 'Invalid email or password. Try: admin@business.com / password123');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail('admin@business.com');
    setPassword('password123');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Icon name="robot" size={80} color="#3b82f6" />
          </View>
          <Text style={styles.title}>AI Business Platform</Text>
          <Text style={styles.subtitle}>Intelligent Business Management</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.loginTitle}>Sign In</Text>
          <Text style={styles.loginSubtitle}>Enter your credentials to continue</Text>

          <View style={styles.inputContainer}>
            <Icon name="email-outline" size={24} color="#64748b" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="#94a3b8"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock-outline" size={24} color="#64748b" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#94a3b8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              editable={!loading}
            />
            <TouchableOpacity 
              onPress={() => setShowPassword(!showPassword)}
              style={styles.passwordToggle}
            >
              <Icon 
                name={showPassword ? 'eye-off' : 'eye'} 
                size={24} 
                color="#64748b" 
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <Text style={styles.loginButtonText}>Signing In...</Text>
            ) : (
              <>
                <Text style={styles.loginButtonText}>Sign In</Text>
                <Icon name="arrow-right" size={20} color="white" />
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.demoButton}
            onPress={handleDemoLogin}
            disabled={loading}
          >
            <Icon name="rocket-launch" size={20} color="#3b82f6" />
            <Text style={styles.demoButtonText}>Use Demo Credentials</Text>
          </TouchableOpacity>

          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>AI-Powered Features:</Text>
            <View style={styles.featureItem}>
              <Icon name="chart-line" size={20} color="#10b981" />
              <Text style={styles.featureText}>Sales Prediction (94.7% accuracy)</Text>
            </View>
            <View style={styles.featureItem}>
              <Icon name="package-variant" size={20} color="#f59e0b" />
              <Text style={styles.featureText}>Inventory Optimization (23% savings)</Text>
            </View>
            <View style={styles.featureItem}>
              <Icon name="shield-check" size={20} color="#ef4444" />
              <Text style={styles.featureText}>Fraud Detection (99.1% accuracy)</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  inputIcon: {
    marginLeft: 15,
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1e293b',
  },
  passwordToggle: {
    padding: 16,
  },
  loginButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  loginButtonDisabled: {
    backgroundColor: '#93c5fd',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 10,
  },
  demoButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#3b82f6',
    borderRadius: 12,
    marginBottom: 30,
  },
  demoButtonText: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  featuresContainer: {
    marginTop: 20,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#475569',
    marginLeft: 12,
    flex: 1,
  },
});
