import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Button, Card, Input, Text } from 'react-native-elements'
import Colors from '../constants/Colors';
import { Context as LiftInstanceContext } from '../context/LiftInstanceContext';
import Spacer from '../components/Spacer';
import moment from 'moment';
import { groupBy, sortBy, reverse } from 'lodash';

const NewLiftInstanceScreen = ({ navigation }) => {
  const { state, createLiftInstance, getLiftInstances } = useContext(LiftInstanceContext);
  const [liftInstances, setLiftInstances] = useState([]);
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const lift_id = navigation.getParam('lift_id');
  const lift_name = navigation.getParam('lift_name');
  const date = moment().format("MMM D, YYYY");

  const inputReps = React.createRef();
  const inputWeight = React.createRef();

  useEffect(() => {
    getLiftInstances({ lift_id, lift_name });
  }, [])

  useEffect(() => {
    setLiftInstances(state[lift_name]);
  }, [state[lift_name]]);

  const submit = () => {
    createLiftInstance({ lift_id, lift_name, date, reps, weight });
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
          labelStyle={{ height: 20 }}
          inputContainerStyle={{
            borderBottomColor: Colors.primary,
            height: 40
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
          labelStyle={{ height: 20 }}
          inputContainerStyle={{
            borderBottomColor: Colors.primary,
            height: 40
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
            flex: 1,
            height: 50,
            marginTop: 20
          }}
          title="Save Set"
          onPress={submit} />
      </View>

      <FlatList
        style={{marginTop: 80}}
        keyExtractor={item => `liftInstance-${item.date}`}
        data={liftInstances}
        renderItem={({item}) => {
          return (
            <>
            <Text>{item.date}</Text>
            <FlatList
              keyExtractor={item => `liftInstance-${item.id}`}
              data={item.value}
              renderItem={({item}) => {
                return (
                  <Text>Reps: {item.reps} Weight: {item.weight}</Text>
                );
              }}
              />
            </>
          );
        }}
      />
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
