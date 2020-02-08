import React from 'react';
import { StyleSheet, Text, TouchableHighlight, Dimensions } from 'react-native';
import Colors from '../constants/Colors';

export default function Tag({ tag, selected, update }) {
  const pillStyles = selected ? styles.selectedPill : styles.unselectedPill
  const textStyles = selected ? styles.selectedText : styles.unselectedText
  return (
    <TouchableHighlight style={pillStyles}>
      <Text
        style={textStyles}
        numberOfLines={1}
        onPress={() => update(tag)}
      >
        {tag.name}
      </Text>
    </TouchableHighlight>
  )
};

const styles = StyleSheet.create({
  selectedPill: {
    borderColor: "#fff",
    backgroundColor: Colors.primary,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    margin: 5,
    maxWidth: (Dimensions.get('window').width / 2) - 30
  },
  selectedText: {
    color: "#fff",
    textAlign: "center"
  },
  unselectedPill: {},
  unselectedText: {
    color: Colors.primary,
    borderColor: Colors.primary,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    margin: 5,
    textAlign: "center",
    maxWidth: (Dimensions.get('window').width / 2) - 30
  },
});