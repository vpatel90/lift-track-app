import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Input, Text, CheckBox } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import { NavigationEvents } from 'react-navigation';
import Colors from '../constants/Colors';

const LoginScreen = ({ navigation }) => {
  const { state, login, clearErrorMessage, tryLocalSignin } = useContext(AuthContext);
  const [email, setEmail] = useState('vnp229@gmail.com');
  const [password, setPassword] = useState('123456');

  useEffect(() => {
    tryLocalSignin();
  }, []);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <Spacer>
        <Text h3>Welcome!</Text>
      </Spacer>
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
        title="Login"
        onPress={() => login({ email, password })} />
      </Spacer>
      {state.errorMessage.length ? <Text style={styles.error}>{state.errorMessage}</Text> : null}
      <Spacer>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.link}>Dont have an account? Signup here!</Text>
        </TouchableOpacity>
      </Spacer>
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
  },
  error: {
    color: 'red',
    marginLeft: 15,
    marginTop: 15
  },
  link: {
    color: Colors.primary
  }
});

export default LoginScreen;
