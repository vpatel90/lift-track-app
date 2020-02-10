import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import { NavigationEvents } from 'react-navigation';
import Colors from '../constants/Colors';
import globalStyles from '../styles/global';

const AuthForm = ({ onPress, title }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Input
        inputContainerStyle={{
          borderBottomColor: Colors.primary
        }}
        autoCapitalize="none"
        autoCorrect={false}
        label="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Spacer/>
      <Input
        inputContainerStyle={{
          borderBottomColor: Colors.primary
        }}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        label="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Spacer>
      <Button
        buttonStyle={{ backgroundColor: Colors.primary }}
        title={title}
        onPress={() => onPress(email, password)} />
      </Spacer>
    </>
  );
};

export default AuthForm;