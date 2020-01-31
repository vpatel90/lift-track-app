import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Button, Input, Text } from 'react-native-elements'
import Colors from '../constants/Colors';
import { Context as LiftContext } from '../context/LiftContext';
import Spacer from '../components/Spacer';

const NewLiftScreen = () => {
  const { state, createLift } = useContext(LiftContext);
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
     <Input
        inputContainerStyle={{
          borderBottomColor: Colors.primary
        }}
        autoCapitalize="none"
        autoCorrect={false}
        label="Name"
        value={name}
        onChangeText={setName}
      />
      <Spacer/>
      <Button
        buttonStyle={{ backgroundColor: Colors.primary }}
        title="Save"
        onPress={() => createLift({ name })} />
    </View>
  );
};

NewLiftScreen.navigationOptions = {
  title: 'Add New Exercise',
  headerBackTitleStyle: { color: Colors.primary },
  headerTintColor: Colors.primary
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    paddingLeft: 10,
    paddingRight: 10,
  }
});

export default NewLiftScreen;
