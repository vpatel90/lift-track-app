import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';


const SignupScreen = ({ navigation }) => {
  const { state, signup } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.container}>
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
      <Spacer>
        <Button title="Signup" onPress={() => signup({ email, password })}/>
      </Spacer>
      <Spacer>
        <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
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
  }
});

export default SignupScreen;
