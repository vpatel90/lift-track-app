import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Button, Input, Text } from 'react-native-elements'
import Colors from '../constants/Colors';
import { Context as LiftContext } from '../context/LiftContext';
import Spacer from '../components/Spacer';
import moment from 'moment';

const NewLiftInstanceScreen = ({ navigation }) => {
  const { state, createLiftInstance } = useContext(LiftContext);
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const lift_id = navigation.getParam('lift_id');
  const lift_name = navigation.getParam('lift_name');
  const date = moment().format("MMM D, YYYY");

  const inputReps = React.createRef();
  const inputWeight = React.createRef();

  const submit = () => {
    createLiftInstance({ lift_id, date, reps, weight });
    setReps('');
    setWeight('');
    inputReps.current.blur();
    inputWeight.current.blur();
  };

  return (
    <View style={styles.container}>
      <Text h4>Today's {lift_name}</Text>
      <View style={styles.formContainer}>
        <Input
          ref={inputReps}
          inputContainerStyle={{
            borderBottomColor: Colors.primary
          }}
          containerStyle= {{
            flex: 1
          }}
          keyboardType="numeric"
          autoCapitalize="none"
          autoCorrect={false}
          label="Reps"
          value={reps}
          onChangeText={setReps}
        />
        <Input
          ref={inputWeight}
          inputContainerStyle={{
            borderBottomColor: Colors.primary
          }}
          containerStyle= {{
            flex: 1
          }}
          keyboardType="numeric"
          autoCapitalize="none"
          autoCorrect={false}
          label="Weight"
          value={weight}
          onChangeText={setWeight}
        />
        <Button
          buttonStyle={{ backgroundColor: Colors.primary }}
          containerStyle= {{
            marginTop: 20,
            flex: 1
          }}
          title="Save"
          onPress={submit} />
      </View>
    </View>
  );
};

NewLiftInstanceScreen.navigationOptions = {
  title: 'Add New Set',
  headerBackTitleStyle: { color: Colors.primary },
  headerTintColor: Colors.primary
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    paddingLeft: 10,
    paddingRight: 10,
  },
  formContainer: {
    flex: 1,
    marginTop: 10,
    flexDirection: "row"
  }
});

export default NewLiftInstanceScreen;
