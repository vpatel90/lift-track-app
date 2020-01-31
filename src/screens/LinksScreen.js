import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function LinksScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={{textAlign:"center"}}>Coming Soon!</Text>
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: 'Charts',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
