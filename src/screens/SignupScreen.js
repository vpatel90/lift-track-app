import React, { useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import { NavigationEvents } from 'react-navigation';
import globalStyles from '../styles/global';
import AuthForm from '../components/AuthForm';

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={globalStyles.pseudoCenterContainer}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <Spacer>
        <Text h3>Sign Up!</Text>
      </Spacer>
      <AuthForm title='Signup' onPress={(email, password) => signup({ email, password })} />
      <Spacer>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={globalStyles.link}>Already have an account? Login here!</Text>
        </TouchableOpacity>
      </Spacer>
    </View>
  );
};

SignupScreen.navigationOptions = {
  header: null,
  title: 'Signup'
};

export default SignupScreen;
