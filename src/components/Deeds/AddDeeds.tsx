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
import { categories, suggestionsByCategory } from './const';
import { DeedCategory, AddDeedsProps } from './types';
//style
import {margins, paddings, fontSizes, fontWeights} from '../../constants/theme';


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
    paddingHorizontal: paddings.xl,
    paddingBottom: paddings.xl,
    paddingTop: paddings.s,
    borderColor: '#2B2345',
    borderWidth: 1,
  },
  handle: {
    width: 44,
    height: 5,
    borderRadius: 999,
    backgroundColor: '#3B3158',
    alignSelf: 'center',
    marginBottom: margins.m,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: margins.m,
  },
  headerTextWrap: {
    flex: 1,
  },
  eyebrow: {
    color: '#F5B842',
    fontSize: fontSizes.xs,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 4,
  },
  title: {
    color: '#F6F2FF',
    fontSize: fontSizes.l,
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
    fontSize: fontSizes.l,
    fontWeight: '600',
  },
  content: {
    marginBottom: 4,
  },
  bodyText: {
    color: '#B7B1CC',
    fontSize: fontSizes.s,
    lineHeight: 20,
    marginBottom: margins.m,
  },
  optionButton: {
    paddingVertical: paddings.m,
    paddingHorizontal: paddings.m,
    borderRadius: 16,
    backgroundColor: '#1A1830',
    borderWidth: 1,
    borderColor: '#2D2644',
    marginBottom: margins.s,
  },
  optionText: {
    color: '#F6F2FF',
    fontSize: fontSizes.m,
    fontWeight: '600',
    marginBottom: margins.xxs,
  },
  optionHint: {
    color: '#8C86A5',
    fontSize: fontSizes.s,
  },
  selectedBox: {
    paddingVertical: paddings.s,
    paddingHorizontal: paddings.m,
    borderRadius: 16,
    backgroundColor: '#1B1630',
    borderWidth: 1,
    borderColor: '#3A2E61',
    marginBottom: margins.m,
  },
  selectedLabel: {
    color: '#8C86A5',
    fontSize: fontSizes.xs,
    textTransform: 'uppercase',
    letterSpacing: 1.1,
    marginBottom: margins.xs,
  },
  selectedValue: {
    color: '#F5B842',
    fontSize: fontSizes.m,
    fontWeight: '700',
  },
  sectionTitle: {
    color: '#F6F2FF',
    fontSize: fontSizes.m,
    fontWeight: '600',
    marginBottom: 8,
  },
  suggestionsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: margins.m,
  },
  suggestionChip: {
    borderRadius: 999,
    paddingHorizontal: paddings.m,
    paddingVertical: paddings.xs,
    backgroundColor: '#231D39',
    borderWidth: 1,
    borderColor: '#3A2E61',
    marginRight: margins.s,
    marginBottom: margins.s,
  },
  suggestionText: {
    color: '#F6F2FF',
    fontSize: fontSizes.s,
  },
  input: {
    minHeight: 96,
    borderRadius: 16,
    paddingHorizontal: paddings.l,
    paddingVertical: paddings.l,
    backgroundColor: '#161423',
    color: '#F6F2FF',
    borderWidth: 1,
    borderColor: '#2D2644',
    textAlignVertical: 'top',
    marginBottom: margins.m,
  },
  actions: {
    flexDirection: 'row',
    marginTop: margins.xs,
  },
  secondaryButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: paddings.m,
    borderRadius: 14,
    backgroundColor: '#1D1C2D',
    borderWidth: 1,
    borderColor: '#2D2644',
    marginRight: margins.s,
  },
  secondaryText: {
    color: '#F6F2FF',
    fontWeight: '600',
  },
  primaryButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: paddings.m,
    borderRadius: 14,
    backgroundColor: '#F5B842',
  },
  primaryText: {
    color: '#120E1F',
    fontWeight: '700',
  },
});