import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginPage onLogin={() => setCurrentScreen('home')} />;
      case 'home':
        return <HomePage 
                  navigateTo={(screen) => setCurrentScreen(screen)} 
                  logout={() => setCurrentScreen('login')} 
                />;
      case 'metrics':
        return <MetricsDetailPage goBack={() => setCurrentScreen('home')} />;
      case 'settings':
        return <SettingsPage goBack={() => setCurrentScreen('home')} />;
      default:
        return <LoginPage onLogin={() => setCurrentScreen('home')} />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {renderScreen()}
    </View>
  );
}

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.centerContainer}>
      <Text style={styles.logoText}>ORTHOSTAT</Text>
      <Text style={styles.subText}>Preventing Syncope, Protecting Circulation</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        placeholderTextColor="#888"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      
      <TouchableOpacity style={styles.primaryButton} onPress={onLogin}>
        <Text style={styles.buttonText}>Sign In / Register</Text>
      </TouchableOpacity>
    </View>
  );
}

function HomePage({ navigateTo, logout }) {
  return (
    <View style={styles.dashboardContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Orthostat Dashboard</Text>
        <TouchableOpacity onPress={() => navigateTo('settings')}>
          <Text style={styles.linkText}>Settings</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statusCard}>
        <Text style={styles.statusText}>🟢 Wrist Tracker & Leg Strap: Connected</Text>
      </View>

      <Text style={styles.sectionTitle}>Live Telemetry</Text>

      <View style={styles.grid}>
        <TouchableOpacity style={styles.card} onPress={() => navigateTo('metrics')}>
          <Text style={styles.cardTitle}>Heart Rate</Text>
          <Text style={styles.cardValue}>78 BPM</Text>
          <Text style={styles.cardSub}>Tap for details</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigateTo('metrics')}>
          <Text style={styles.cardTitle}>Blood Pressure</Text>
          <Text style={styles.cardValue}>118/76</Text>
          <Text style={styles.cardSub}>Tap for details</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Leg Perfusion</Text>
          <Text style={styles.cardValue}>Normal</Text>
          <Text style={styles.cardSub}>No pooling detected</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Compression</Text>
          <Text style={styles.cardValue}>Standby</Text>
          <Text style={styles.cardSub}>Strap disengaged</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.secondaryButton} onPress={logout}>
        <Text style={styles.secondaryButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

function MetricsDetailPage({ goBack }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Text style={styles.linkText}>← Back to Dashboard</Text>
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Detailed Analytics</Text>
      <Text style={styles.sectionTitle}>Blood Pressure & HR Trends</Text>
      
      <View style={styles.graphPlaceholder}>
        <Text style={styles.cardSub}>[Live Graph: Systolic/Diastolic drop tracking]</Text>
      </View>

      <Text style={styles.sectionTitle}>Orthostatic Safety Thresholds</Text>
      <View style={styles.warningBox}>
        <Text style={styles.cardTitle}>⚠️ Hypotension Trigger Active</Text>
        <Text style={styles.cardSub}>Activates leg pneumatic compression automatically if systolic pressure drops sharply.</Text>
      </View>
    </ScrollView>
  );
}

function SettingsPage({ goBack }) {
  const [autoCompress, setAutoCompress] = useState(true);

  return (
    <View style={styles.dashboardContainer}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Text style={styles.linkText}>← Back to Dashboard</Text>
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Settings & Hardware</Text>
      
      <View style={styles.settingRow}>
        <View>
          <Text style={styles.cardTitle}>Auto-Compression</Text>
          <Text style={styles.cardSub}>Squeezes leg strap when fainting is detected</Text>
        </View>
        <Switch 
          value={autoCompress} 
          onValueChange={setAutoCompress} 
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.cardTitle}>Paired Wrist Tracker</Text>
        <Text style={styles.cardSub}>Orthostat-BLE-Wristband (Connected)</Text>
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.cardTitle}>Leg Strap Actuator Calibration</Text>
        <Text style={styles.cardSub}>Calibrate pressure limits and motor limits</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', paddingTop: 50 },
  centerContainer: { flex: 1, justifyContent: 'center', padding: 24 },
  dashboardContainer: { flex: 1, padding: 20 },
  scrollContainer: { padding: 20 },
  logoText: { fontSize: 32, fontWeight: 'bold', color: '#00FFFF', textAlign: 'center', letterSpacing: 2 },
  subText: { color: '#888', textAlign: 'center', marginBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#FFF' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#CCC', marginVertical: 12 },
  input: { backgroundColor: '#1E1E1E', color: '#FFF', padding: 16, borderRadius: 12, marginBottom: 16, borderWidth: 1, borderColor: '#333' },
  primaryButton: { backgroundColor: '#2563EB', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  secondaryButton: { marginTop: 20, padding: 12, alignItems: 'center' },
  secondaryButtonText: { color: '#EF4444', fontSize: 14 },
  linkText: { color: '#38BDF8', fontWeight: 'bold' },
  statusCard: { backgroundColor: 'rgba(34, 197, 94, 0.15)', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#22C55E', marginBottom: 10 },
  statusText: { color: '#22C55E', fontWeight: 'bold' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48%', backgroundColor: '#1E1E1E', padding: 16, borderRadius: 16, marginBottom: 16, borderWidth: 1, borderColor: '#222' },
  cardTitle: { color: '#888', fontSize: 14 },
  cardValue: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginVertical: 6 },
  cardSub: { color: '#666', fontSize: 12 },
  graphPlaceholder: { height: 180, backgroundColor: '#1E1E1E', borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  warningBox: { backgroundColor: 'rgba(234, 179, 8, 0.1)', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#EAB308' },
  backButton: { marginBottom: 10 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1E1E1E', padding: 16, borderRadius: 12, marginBottom: 12 },
  settingItem: { backgroundColor: '#1E1E1E', padding: 16, borderRadius: 12, marginBottom: 12 },
});        