import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>

        <TouchableOpacity style={styles.row} onPress={() => Alert.alert('Update Email', 'Coming soon')}>
          <Text style={styles.rowLabel}>Update Email</Text>
          <Text style={styles.rowArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => Alert.alert('Update Password', 'Coming soon')}>
          <Text style={styles.rowLabel}>Update Password</Text>
          <Text style={styles.rowArrow}>→</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legal</Text>

        <TouchableOpacity style={styles.row} onPress={() => Alert.alert('Terms of Use', 'Coming soon')}>
          <Text style={styles.rowLabel}>Terms of Use</Text>
          <Text style={styles.rowArrow}>→</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: '#E55353' }]}>Danger Zone</Text>

        <TouchableOpacity
          style={styles.dangerButton}
          onPress={() => {
            Alert.alert(
              'Delete Profile',
              'This action is permanent and cannot be undone.',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => router.back() },
              ]
            );
          }}
        >
          <Text style={styles.dangerButtonText}>Delete Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0B1A',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 12,
    color: '#B0A8C8',
    letterSpacing: 1,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1A1635',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  rowLabel: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  rowArrow: {
    fontSize: 16,
    color: '#6B6490',
  },
  dangerButton: {
    backgroundColor: 'rgba(229, 83, 83, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(229, 83, 83, 0.3)',
  },
  dangerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E55353',
  },
});
