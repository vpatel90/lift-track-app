import React, { useState, useContext, useEffect } from 'react';
import { Platform, View, StyleSheet, FlatList } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Button, Card, Input, Text, Icon } from 'react-native-elements'
import Colors from '../constants/Colors';
import { Context as LiftInstanceContext } from '../context/LiftInstanceContext';
import Spacer from '../components/Spacer';
import moment from 'moment';
import { groupBy, sortBy, reverse } from 'lodash';

const NewLiftInstanceScreen = ({ navigation }) => {
  const { state, createLiftInstance, destroyLiftInstance, getLiftInstances } = useContext(LiftInstanceContext);
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

  const clone = (item) => {
    createLiftInstance({ lift_id, lift_name, date, reps: item.reps, weight: item.weight });
  }

  const destroy = (item) => {
    destroyLiftInstance({ lift_id, lift_name, date, lift_instance_id: item.id });
  }

  return (
    <View style={styles.container}>
      <Text h4>{lift_name}</Text>
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
        style={{marginTop: 80, marginBottom: 30}}
        keyExtractor={item => `liftInstance-${item.date}`}
        data={liftInstances}
        renderItem={({item}) => {
          return (
            <View style={{marginBottom: 10, borderBottomWidth: 1, borderBottomColor: Colors.secondaryLight }}>
              <Text style={{fontSize: 24, marginBottom: 12}}>{item.date === date ? "Today's Sets" : item.date}</Text>
              <FlatList
                keyExtractor={item => `liftInstance-${item.id}`}
                data={item.value}
                renderItem={({item}) => {
                  return (
                    <View style={styles.liftInstanceContainer}>
                      <Text style={{width: "50%", fontSize: 18}}>Reps: {item.reps}, Weight: {item.weight}</Text>
                      <Button
                        buttonStyle={{ backgroundColor: Colors.primary, width: "80%", alignSelf: "flex-end" }}
                        containerStyle={{
                          flex: 1,
                          height: 50,
                          padding: 0
                        }}
                        title=""
                        icon={
                          <Icon color="#fff" name={Platform.OS === 'ios' ? `ios-refresh` : 'md-refresh'} type="ionicon"/>
                        }
                        onPress={() => clone(item)} />
                      <Button
                        buttonStyle={{ backgroundColor: Colors.primary, width: "80%", alignSelf: "flex-end" }}
                        containerStyle={{
                          flex: 1,
                          height: 50,
                          padding: 0
                        }}
                        title=""
                        icon={
                          <Icon color="#fff" name={Platform.OS === 'ios' ? `ios-trash` : 'md-trash'} type="ionicon"/>
                        }
                        onPress={() => destroy(item)} />
                    </View>
                  );
                }}
                />
            </View>
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
  },
  liftInstanceContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    width: "100%"
  }
});

export default NewLiftInstanceScreen;
