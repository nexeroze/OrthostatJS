import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignInScreen() {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isSignUp = authMode === 'signup';

  const handleSubmit = () => {
    router.replace('/(drawer)/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerContainer}>
        <Text style={styles.logoText}>ORTHOSTAT</Text>
        <Text style={styles.subText}>Sign In/Sign Up</Text>

        <View style={styles.authToggleBar}>
          <TouchableOpacity
            style={[styles.authToggleButton, authMode === 'signin' && styles.authToggleButtonActive]}
            onPress={() => setAuthMode('signin')}
          >
            <Text style={[styles.authToggleText, authMode === 'signin' && styles.authToggleTextActive]}>
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.authToggleButton, authMode === 'signup' && styles.authToggleButtonActive]}
            onPress={() => setAuthMode('signup')}
          >
            <Text style={[styles.authToggleText, authMode === 'signup' && styles.authToggleTextActive]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        {isSignUp && (
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#888"
            value={fullName}
            onChangeText={setFullName}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder={isSignUp ? 'Email Address' : 'Email or Username'}
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {isSignUp && (
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        )}

        <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{isSignUp ? 'Create Account' : 'Sign In'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  centerContainer: { flex: 1, justifyContent: 'center', padding: 24 },
  logoText: { fontSize: 32, fontWeight: 'bold', color: '#00FFFF', textAlign: 'center', letterSpacing: 2 },
  subText: { color: '#888', textAlign: 'center', marginBottom: 24, fontSize: 14 },
  authToggleBar: { flexDirection: 'row', backgroundColor: '#1E1E1E', borderRadius: 12, padding: 4, marginBottom: 20, borderWidth: 1, borderColor: '#333' },
  authToggleButton: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 8 },
  authToggleButtonActive: { backgroundColor: '#2563EB' },
  authToggleText: { color: '#888', fontSize: 14, fontWeight: '600' },
  authToggleTextActive: { color: '#FFF' },
  input: { backgroundColor: '#1E1E1E', color: '#FFF', padding: 16, borderRadius: 12, marginBottom: 16, fontSize: 16, borderWidth: 1, borderColor: '#333' },
  primaryButton: { backgroundColor: '#2563EB', padding: 16, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});
