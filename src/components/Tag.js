import React, { useState, useContext, useEffect }  from 'react';
import { StyleSheet, View, FlatList, Text, TouchableHighlight } from 'react-native';
import { Text as ElementsText } from 'react-native-elements';
import { Context as LiftContext } from '../context/LiftContext';
import LiftCard from '../components/LiftCard';
import Spacer from '../components/Spacer';
import { Overlay, Button } from 'react-native-elements';
import Colors from '../constants/Colors';

export default function Tag({ tag, update }) {
  if (tag.selected) {
    return (
      <TouchableHighlight style={styles.selectedPill}>
        <Text
        style={{color: "#fff", textAlign: "center"}}
        numberOfLines={1}
        onPress={() => update(tag)}
        >
        {tag.name}
      </Text>
    </TouchableHighlight>
    )
  }
  return (
    <TouchableHighlight>
      <Text
        style={styles.pill}
        numberOfLines={1}
        onPress={() => update(tag)}
        >
        {tag.name}
      </Text>
    </TouchableHighlight>
  );
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
    width: 170,
  },
  pill: {
    color: Colors.primary,
    borderColor: Colors.primary,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    margin: 5,
    width: 170,
    textAlign: "center"
  },
});