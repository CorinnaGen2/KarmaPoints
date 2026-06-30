import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>✦</Text>
        <Text style={styles.title}>KarmaPoints</Text>
        <Text style={styles.subtitle}>Turn kindness into impact</Text>
        <Text style={styles.body}>Home screen — Soul Journey Orb, Karma Booster, Recent Deeds</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0B1A',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emoji: {
    fontSize: 64,
    color: '#F5B842',
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#B0A8C8',
    marginTop: 8,
  },
  body: {
    fontSize: 14,
    color: '#6B6490',
    marginTop: 32,
    textAlign: 'center',
  },
});
