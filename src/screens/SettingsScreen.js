import React, { useContext } from 'react';
import Spacer from '../components/Spacer';
import { Platform, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Text, ListItem, Icon } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import Colors from '../constants/Colors';

export default function SettingsScreen() {
  const { logout } = useContext(AuthContext);
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  const list = [
    {
      title: 'Logout',
      leftIcon: <Icon name={Platform.OS === 'ios' ? `ios-power` : 'md-power'} type="ionicon"/>
    }
  ]
  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <ListItem
      title={item.title}
      leftIcon={item.leftIcon}
      onPress={logout}
      bottomDivider
    />
  )
  return (
    <FlatList
      keyExtractor={this.keyExtractor}
      data={list}
      renderItem={this.renderItem}
    />
  )
}

SettingsScreen.navigationOptions = {
  title: 'Settings',
  headerBackTitleStyle: { color: Colors.primary },
  headerTintColor: Colors.primary
};
