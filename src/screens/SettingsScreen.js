import React, { useContext } from 'react';
import Spacer from '../components/Spacer';
import { View, Platform, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
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
      leftIcon: <Icon name={Platform.OS === 'ios' ? `ios-power` : 'md-power'} type='ionicon'/>,
      onPress: () => logout()
    }
  ]

  renderItem = ({ item }) => (
    <ListItem
      title={item.title}
      leftIcon={item.leftIcon}
      onPress={item.onPress}
      bottomDivider
    />
  )
  return (
    <View style={{flex: 1}}>
      <FlatList
        keyExtractor={(item, index) => `settings-${index}`}
        data={list}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            leftIcon={item.leftIcon}
            onPress={item.onPress}
            bottomDivider
          />
        )}
      />
      <Text style={{textAlign: 'right', padding: 15}}>{process.env.NODE_ENV.toUpperCase()}</Text>
    </View>
  )
}

SettingsScreen.navigationOptions = {
  title: 'Settings',
  headerBackTitleStyle: globalStyles.colorPrimary,
  headerTintColor: Colors.primary
};
