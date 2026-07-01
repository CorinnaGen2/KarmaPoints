import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SoulJourneyOrb from '../../components/SoulJourneyOrb';
import AddDeeds from '../../components/Deeds/AddDeeds';
import { Colors, FontWeights, Theme } from '@/constants/theme';

export default function HomeScreen() {
  const [isAddDeedsVisible, setIsAddDeedsVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <SoulJourneyOrb karmaPoints={1000} level={5} levelName="Master" progressPercent={75} />

        <TouchableOpacity style={styles.addButton} onPress={() => setIsAddDeedsVisible(true)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <AddDeeds
        visible={isAddDeedsVisible}
        onClose={() => setIsAddDeedsVisible(false)}
        onSubmit={(payload) => {
          console.log('New deed:', payload);
        }}
      />
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
  addButton: {
    marginTop: 24,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: '#F5B842',
  },
  addButtonText: {
    color: Colors.dark.muted,
    fontWeight:FontWeights.large,
    borderRadius: 999,
    fontSize: 24,
  },
});
