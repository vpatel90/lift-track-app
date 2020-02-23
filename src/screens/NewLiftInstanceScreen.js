import React, { useState, useContext, useEffect } from 'react';
import { Platform, View, StyleSheet, FlatList } from 'react-native';
import { Button, Input, Text, Icon } from 'react-native-elements'
import Colors from '../constants/Colors';
import { Context as LiftInstanceContext } from '../context/LiftInstanceContext';
import moment from 'moment';
import { SwipeListView } from 'react-native-swipe-list-view';
import LiftInstanceItem from '../components/LiftInstanceItem';
import globalStyles from '../styles/global';
import { formatTime } from '../helpers/timeHelper';

const NewLiftInstanceScreen = ({ navigation }) => {
  const { state, createLiftInstance, destroyLiftInstance, getLiftInstances } = useContext(LiftInstanceContext);
  const [liftInstances, setLiftInstances] = useState([]);
  const [measurements, setMeasurements] = useState({ reps: '', weight: '', time: '00:00', distance: '' });

  const inputRefs = { reps: React.createRef(), weight: React.createRef(), time: React.createRef(), distance: React.createRef() };
  const lift_id = navigation.getParam('lift_id');
  const lift_name = navigation.getParam('lift_name');
  const lift_measurements = navigation.getParam('measurements');
  const date = moment().format('MMM D, YYYY');

  useEffect(() => {
    getLiftInstances({ lift_id, lift_name });
  }, [])

  useEffect(() => {
    setLiftInstances(state[lift_name]);
  }, [state[lift_name]]);

  const inputChange = (key, value) => {
    if (key === 'time') {
      if (value.length < 5) value = value.padStart(5, '0');
      const timeNums = value.replace(':', '').substr(value.length - 5);
      value = [timeNums.slice(0,2), timeNums.slice(2,4)].join(':');
    }
    setMeasurements({ ...measurements, [key]: value });
  };

  const submit = () => {
    createLiftInstance({...measurements, lift_id, lift_name, date });
    setMeasurements({ reps: '', weight: '', time: '00:00', distance: '' });
    lift_measurements.forEach(m => inputRefs[m].current.blur());
  };

  const clone = (item) => {
    createLiftInstance({
      lift_id, lift_name, date,
      reps: item.reps, weight: item.weight,
      distance: item.distance, time: formatTime(item.time)
    });
  }

  const destroy = (item) => {
    destroyLiftInstance({ lift_id, lift_name, date: item.date, lift_instance_id: item.id });
  }

  const labels = {
    reps: 'Reps',
    weight: 'Weight (lbs)',
    distance: 'Distance (Miles)',
    time: 'Time'
  }

  return (
    <View style={globalStyles.container}>
      <Text h4>{lift_name}</Text>
      <View style={styles.formContainer}>
        {
          lift_measurements.map((measurement, i) => {
            return <Input
              ref={inputRefs[measurement]}
              key={measurement + i}
              labelStyle={{ height: 20, fontSize: 12 }}
              inputContainerStyle={{
                borderBottomColor: Colors.primary,
                height: 40
              }}
              containerStyle= {{
                flex: 1
              }}
              keyboardType='numeric'
              autoCapitalize='none'
              autoCorrect={false}
              label={labels[measurement]}
              value={measurements[measurement]}
              onChangeText={(val) => inputChange(measurement, val)}
            />
          })
        }
        <Button
          buttonStyle={{ backgroundColor: Colors.primary }}
          containerStyle= {{
            flex: 1,
            height: 50,
            marginTop: 20
          }}
          title='Save Set'
          onPress={submit} />
      </View>

      <FlatList
        style={{marginTop: 80, marginBottom: 30}}
        contentContainerStyle={{justifyContent: 'flex-start'}}
        keyExtractor={item => `liftInstance-${item.date}`}
        data={liftInstances}
        renderItem={({item}) => {
          return (
            <View style={{marginBottom: 10, borderBottomWidth: 1, borderBottomColor: Colors.secondaryLight }}>
              <Text style={{fontSize: 24, marginBottom: 12}}>{item.date === date ? 'Today\'s Sets' : item.date}</Text>
              <SwipeListView
                keyExtractor={item => `liftInstance-${item.id}`}
                data={item.value}
                renderHiddenItem={({item}) => {
                  return (
                    <View style={{ alignItems: 'flex-start'}}>
                      <Button
                        type='outline'
                        titleStyle={globalStyles.colorPrimary}
                        buttonStyle={globalStyles.hiddenButtonStyle}
                        containerStyle={{...globalStyles.hiddenButtonContainerStyle, marginTop: 15, height: 40}}
                        title=''
                        icon={
                          <Icon color={Colors.primary} name={Platform.OS === 'ios' ? `ios-trash` : 'md-trash'} type='ionicon'/>
                        }
                        onPress={() => destroy(item)} />
                    </View>
                  )
                }}
                leftOpenValue={75}
                swipeToOpenPercent={10}
                renderItem={({item}) => {
                  return (
                    <LiftInstanceItem measurements={lift_measurements} item={item} callback={() => clone(item)}/>
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
  headerBackTitleStyle: globalStyles.colorPrimary,
  headerTintColor: Colors.primary
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'row'
  },
  liftInstanceContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff'
  }
});

export default NewLiftInstanceScreen;
