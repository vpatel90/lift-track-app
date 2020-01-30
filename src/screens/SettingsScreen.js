import React, { useContext } from 'react';
import Spacer from '../components/Spacer';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';

export default function SettingsScreen() {
  const { logout } = useContext(AuthContext);
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  return (
    <Spacer>
      <TouchableOpacity onPress={() => logout()}>
        <Text style={styles.link}>Logout (Development Mode)</Text>
      </TouchableOpacity>
    </Spacer>
  )
}

const styles = StyleSheet.create({
  link: {
    color: 'blue'
  }
});

SettingsScreen.navigationOptions = {
  title: 'Settings',
};
