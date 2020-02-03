import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, Button } from 'react-native';

const SummaryScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={{textAlign:"center"}}>Coming Soon!</Text>
    </ScrollView>
  );
};

SummaryScreen.navigationOptions = {
  title: 'Daily Summary',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});


export default SummaryScreen;
