import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [isCompressing, setIsCompressing] = useState(false);
  const [pressure, setPressure] = useState('45');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.statusCard}>
          <Text style={styles.statusText}>Device Status: Connected (Bluetooth)</Text>
        </View>

        <Text style={styles.sectionTitle}>Real-Time Metrics</Text>
        <View style={styles.grid}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Heart Rate</Text>
            <Text style={styles.cardValue}>72</Text>
            <Text style={styles.cardSub}>BPM</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Blood Pressure</Text>
            <Text style={styles.cardValue}>118/78</Text>
            <Text style={styles.cardSub}>mmHg</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Strap Control</Text>
        <View style={styles.cardFull}>
          <Text style={styles.cardTitle}>Leg Compression Motor</Text>
          <Text style={styles.cardSub}>Current Pressure: {pressure} mmHg</Text>
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: isCompressing ? '#EF4444' : '#2563EB', marginTop: 12 }]}
            onPress={() => setIsCompressing(!isCompressing)}
          >
            <Text style={styles.buttonText}>
              {isCompressing ? 'Stop Compression' : 'Start Squeezing Cycle'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.cardTitle}>Max Target Pressure</Text>
          <TextInput
            style={[styles.input, { width: 100, marginTop: 6 }]}
            value={pressure}
            onChangeText={setPressure}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: '#EF4444', marginTop: 16 }]}
          onPress={() => router.replace('/(auth)')}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  scrollContainer: { padding: 20, paddingBottom: 40 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#CCC', marginVertical: 12 },
  statusCard: { backgroundColor: 'rgba(34, 197, 94, 0.15)', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#22C55E', marginBottom: 10 },
  statusText: { color: '#22C55E', fontWeight: 'bold' },
  grid: { flexDirection: 'row', justifyContent: 'space-between' },
  card: { width: '48%', backgroundColor: '#1E1E1E', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#333' },
  cardFull: { backgroundColor: '#1E1E1E', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#333' },
  cardTitle: { color: '#888', fontSize: 14 },
  cardValue: { color: '#FFF', fontSize: 28, fontWeight: 'bold', marginVertical: 6 },
  cardSub: { color: '#666', fontSize: 12 },
  settingItem: { backgroundColor: '#1E1E1E', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#333' },
  input: { backgroundColor: '#1E1E1E', color: '#FFF', padding: 16, borderRadius: 12, marginBottom: 16, fontSize: 16, borderWidth: 1, borderColor: '#333' },
  primaryButton: { backgroundColor: '#2563EB', padding: 16, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});