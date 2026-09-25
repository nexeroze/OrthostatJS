import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [compressionAlertsEnabled, setCompressionAlertsEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Device Preferences</Text>

          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>Notifications</Text>
              <Text style={styles.settingHint}>Receive health and device alerts</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#3f3f46', true: '#2563eb' }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>Compression Alerts</Text>
              <Text style={styles.settingHint}>Warn before pressure adjustments</Text>
            </View>
            <Switch
              value={compressionAlertsEnabled}
              onValueChange={setCompressionAlertsEnabled}
              trackColor={{ false: '#3f3f46', true: '#2563eb' }}
              thumbColor="#fff"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  content: { padding: 20 },
  section: { backgroundColor: '#1E1E1E', borderRadius: 12, borderWidth: 1, borderColor: '#333', padding: 16 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 16 },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
  },
  settingLabel: { color: '#fff', fontSize: 16, fontWeight: '600' },
  settingHint: { color: '#888', fontSize: 12, marginTop: 4 },
});
