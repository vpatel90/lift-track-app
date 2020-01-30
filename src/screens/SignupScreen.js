import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import { showMessage, hideMessage } from "react-native-flash-message";
import { NavigationEvents } from 'react-navigation';

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <Spacer>
        <Text h3>Sign Up!</Text>
      </Spacer>
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        label="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Spacer/>
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        label="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Spacer/>
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {state.errorMessage.length ? <Text style={styles.error}>{state.errorMessage}</Text> : null}
      <Spacer>
        <Button title="Signup" onPress={() => signup({ email, password })}/>
      </Spacer>
      <Spacer>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Already have an account? Login here!</Text>
        </TouchableOpacity>
      </Spacer>
    </View>
  );
};

SignupScreen.navigationOptions = {
  header: null,
  title: 'Signup'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 250
  },
  error: {
    color: 'red',
    marginLeft: 15,
    marginTop: 15
  },
  link: {
    color: 'blue'
  }
});

export default SignupScreen;
