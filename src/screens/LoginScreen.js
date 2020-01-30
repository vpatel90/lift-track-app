import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import Spacer from '../components/Spacer';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Spacer>
        <Text h3>Welcome!</Text>
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
      <Spacer>
      <Button title="Login" />
      </Spacer>
      <Spacer>
        <Button title="Go to SignUp" onPress={() => navigation.navigate('Signup')} />
      </Spacer>
      <Spacer/>
      <Button title="Go to Main" onPress={() => navigation.navigate('mainFlow')} />
    </View>
  );
};

LoginScreen.navigationOptions = {
  header: null,
  title: 'Login'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 250
  }
});

export default LoginScreen;
