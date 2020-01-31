import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import Colors from '../constants/Colors';

const LiftCard = ({ lift, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('NewLiftInstance', { lift_id: lift.id, lift_name: lift.name })}
      style={styles.container}
    >
      <Text style={styles.title}>{lift.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    padding: 15
  },
  title: {
    color: Colors.primary,
    textAlign: "center"
  }
});

export default LiftCard;