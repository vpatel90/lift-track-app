import React, { useContext, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import { NavigationEvents } from 'react-navigation';
import globalStyles from '../styles/global';
import AuthForm from '../components/AuthForm';

const LoginScreen = ({ navigation }) => {
  const { state, login, clearErrorMessage, tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin();
  }, []);

  return (
    <View style={globalStyles.pseudoCenterContainer}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <Spacer>
        <Text h3>Welcome!</Text>
      </Spacer>
      <AuthForm title='Login' onPress={(email, password) => login({ email, password })} />
      <Spacer>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={globalStyles.colorPrimary}>Dont have an account? Signup here!</Text>
        </TouchableOpacity>
      </Spacer>
    </View>
  );
};

LoginScreen.navigationOptions = {
  header: null,
  title: 'Login'
};

export default LoginScreen;
