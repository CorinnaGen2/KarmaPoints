import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type DeedCategory =
  | 'Environment'
  | 'Education'
  | 'Health'
  | 'Fight Poverty'
  | 'Animals'
  | 'Community';

interface AddDeedsProps {
  visible?: boolean;
  onClose?: () => void;
  onSubmit?: (payload: { category: DeedCategory; description: string }) => void;
}

const categories: DeedCategory[] = [
  'Environment',
  'Education',
  'Health',
  'Fight Poverty',
  'Animals',
  'Community',
];

const suggestionsByCategory: Record<DeedCategory, string[]> = {
  Environment: ['Planted trees in a local park', 'Picked up litter on a walk', 'Used a reusable bottle'],
  Education: ['Tutored a student after school', 'Donated books to a school library', 'Shared a useful resource'],
  Health: ['Checked in on a neighbor', 'Supported a wellness event', 'Shared healthy habits'],
  'Fight Poverty': ['Donated food to a local pantry', 'Helped with a food drive', 'Supported a community fund'],
  Animals: ['Volunteered at an animal rescue', 'Helped foster a pet for a weekend', 'Fed stray animals'],
  Community: ['Joined a neighborhood cleanup', 'Helped at a local event', 'Supported a friend in need'],
};

export default function AddDeeds({ visible = true, onClose = () => {}, onSubmit = () => {} }: AddDeedsProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedCategory, setSelectedCategory] = useState<DeedCategory | null>(null);
  const [description, setDescription] = useState('');

  const suggestions = useMemo(() => {
    if (!selectedCategory) {
      return [];
    }

    return suggestionsByCategory[selectedCategory];
  }, [selectedCategory]);

  const resetFlow = () => {
    setStep(1);
    setSelectedCategory(null);
    setDescription('');
  };

  const handleClose = () => {
    resetFlow();
    onClose();
  };

  const handleSelectCategory = (category: DeedCategory) => {
    setSelectedCategory(category);
    setStep(2);
    setDescription('');
  };

  const handleSubmit = () => {
    if (!selectedCategory || !description.trim()) {
      return;
    }

    onSubmit({ category: selectedCategory, description: description.trim() });
    handleClose();
  };

  return (
    <Modal transparent visible={visible} animationType="slide" onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.sheetWrapper}
        >
          <View style={styles.sheet}>
            <View style={styles.handle} />

            <View style={styles.headerRow}>
              <View style={styles.headerTextWrap}>
                <Text style={styles.eyebrow}>Add a deed</Text>
                <Text style={styles.title}>{step === 1 ? 'Choose a category' : 'Describe your deed'}</Text>
              </View>

              <Pressable onPress={handleClose} style={styles.closeButton}>
                <Text style={styles.closeText}>✕</Text>
              </Pressable>
            </View>

            {step === 1 ? (
              <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.bodyText}>Pick a category that best matches the kindness you want to log.</Text>

                {categories.map((category) => (
                  <Pressable
                    key={category}
                    style={styles.optionButton}
                    onPress={() => handleSelectCategory(category)}
                  >
                    <Text style={styles.optionText}>{category}</Text>
                    <Text style={styles.optionHint}>Tap to continue</Text>
                  </Pressable>
                ))}
              </ScrollView>
            ) : (
              <View style={styles.content}>
                <View style={styles.selectedBox}>
                  <Text style={styles.selectedLabel}>Selected category</Text>
                  <Text style={styles.selectedValue}>{selectedCategory}</Text>
                </View>

                <Text style={styles.sectionTitle}>Suggestions</Text>
                <View style={styles.suggestionsWrap}>
                  {suggestions.map((suggestion) => (
                    <Pressable
                      key={suggestion}
                      style={styles.suggestionChip}
                      onPress={() => setDescription(suggestion)}
                    >
                      <Text style={styles.suggestionText}>{suggestion}</Text>
                    </Pressable>
                  ))}
                </View>

                <TextInput
                  style={styles.input}
                  placeholder="Tell us what you did..."
                  placeholderTextColor="#7A7890"
                  multiline
                  value={description}
                  onChangeText={setDescription}
                />

                <View style={styles.actions}>
                  <Pressable style={styles.secondaryButton} onPress={() => setStep(1)}>
                    <Text style={styles.secondaryText}>Back</Text>
                  </Pressable>

                  <Pressable style={styles.primaryButton} onPress={handleSubmit}>
                    <Text style={styles.primaryText}>Save deed</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(4, 4, 14, 0.78)',
  },
  sheetWrapper: {
    width: '100%',
  },
  sheet: {
    borderTopLeftRadius: 54,
    borderTopRightRadius: 54,
    backgroundColor: '#11111D',
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 8,
    borderColor: '#2B2345',
    borderWidth: 1,
  },
  handle: {
    width: 44,
    height: 5,
    borderRadius: 999,
    backgroundColor: '#3B3158',
    alignSelf: 'center',
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTextWrap: {
    flex: 1,
  },
  eyebrow: {
    color: '#F5B842',
    fontSize: 12,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 4,
  },
  title: {
    color: '#F6F2FF',
    fontSize: 24,
    fontWeight: '700',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1D1C2D',
  },
  closeText: {
    color: '#F6F2FF',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    marginBottom: 4,
  },
  bodyText: {
    color: '#B7B1CC',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  optionButton: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#1A1830',
    borderWidth: 1,
    borderColor: '#2D2644',
    marginBottom: 10,
  },
  optionText: {
    color: '#F6F2FF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  optionHint: {
    color: '#8C86A5',
    fontSize: 13,
  },
  selectedBox: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#1B1630',
    borderWidth: 1,
    borderColor: '#3A2E61',
    marginBottom: 12,
  },
  selectedLabel: {
    color: '#8C86A5',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.1,
    marginBottom: 4,
  },
  selectedValue: {
    color: '#F5B842',
    fontSize: 16,
    fontWeight: '700',
  },
  sectionTitle: {
    color: '#F6F2FF',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  suggestionsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  suggestionChip: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#231D39',
    borderWidth: 1,
    borderColor: '#3A2E61',
    marginRight: 8,
    marginBottom: 8,
  },
  suggestionText: {
    color: '#F6F2FF',
    fontSize: 13,
  },
  input: {
    minHeight: 96,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#161423',
    color: '#F6F2FF',
    borderWidth: 1,
    borderColor: '#2D2644',
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 4,
  },
  secondaryButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: '#1D1C2D',
    borderWidth: 1,
    borderColor: '#2D2644',
    marginRight: 10,
  },
  secondaryText: {
    color: '#F6F2FF',
    fontWeight: '600',
  },
  primaryButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: '#F5B842',
  },
  primaryText: {
    color: '#120E1F',
    fontWeight: '700',
  },
});