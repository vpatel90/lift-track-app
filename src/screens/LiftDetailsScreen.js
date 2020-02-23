import React, { useState, useContext, useEffect } from 'react';
import { View, Switch, StyleSheet, Dimensions } from 'react-native';
import { Button, Input, Text, Icon, Tooltip } from 'react-native-elements'
import Colors from '../constants/Colors';
import { Context as LiftContext } from '../context/LiftContext';
import Spacer from '../components/Spacer';
import Tag from '../components/Tag';
import { ScrollView } from 'react-native-gesture-handler';
import globalStyles from '../styles/global';
import { showMessage } from 'react-native-flash-message';

const LiftDetailsScreen = ({ navigation }) => {
  const { state, createLift, updateLift } = useContext(LiftContext);
  const [name, setName] = useState('');
  const [measurements, setMeasurements] = useState({ reps: true, weight: true, distance: false, time: false });
  const [disableUnchecked, setDisableUnchecked] = useState(true);
  const [tagInput, setTagInput] = useState('');
  const [tagsToSave, setTagsToSave] = useState([])
  const [userTags, setUserTags] = useState([]);

  const lift_id = navigation.getParam('lift_id');

  useEffect(() => {
    setUserTags(state.tags);
  }, [state.tags.length]);

  useEffect(() => {
    if (!lift_id) return;
    const lift = state.lifts.find((l) => l.id === lift_id);
    setName(lift.name);
    const newMeasurements = { reps: false, weight: false, distance: false, time: false }
    lift.measurements.forEach(m => newMeasurements[m] = true)
    setMeasurements(newMeasurements);
    lift.tags.forEach(t => addTag(t.name));
    if (lift.measurements.length === 1) setDisableUnchecked(false);
  }, [])

  const addTag = (tag) => {
    if (tagsToSave.includes(tag) || tag.trim() === '') return setTagInput('')
    setTagsToSave([...tagsToSave, tag])
    setTagInput('')
  }

  const removeTag = (selectedTag) => {
    setTagsToSave(tagsToSave.filter(listedTag => listedTag != selectedTag))
  }

  const addRemoveMeasurement = (measurement) => {
    const val = measurements[measurement];
    const newMeasurements = { ...measurements, [measurement]: !val };
    const totalTrue = Object.values(newMeasurements).filter(i => i === true).length;
    setMeasurements(newMeasurements);
    setDisableUnchecked(totalTrue >= 2);
  }

  const saveLift = () => {
    const formattedMeasurements = Object.keys(measurements).filter(m => measurements[m] === true);
    if (lift_id) {
      updateLift({ name, measurements: formattedMeasurements, tags: tagsToSave, liftId: lift_id });
    } else {
      createLift({ name, measurements: formattedMeasurements, tags: tagsToSave });
    }
  }

  const validateForm = () => {
    const errors = [];
    if (!name.length) { errors.push('Name can\'t be blank') }
    if (!Object.values(measurements).filter(i => i === true).length) { errors.push('Must select at least 1 measurement') }

    if (errors.length) {
      showMessage({ message: errors.join(' &\n'), type: 'danger' });
    } else {
      saveLift();
    }
  }

  return (
    <View style={{ ...globalStyles.container, flex: 1 }}>
      <ScrollView>
        <Input
          inputContainerStyle={{ borderBottomColor: Colors.primary }}
          placeholder='Bench Press'
          label='Name'
          value={name}
          onChangeText={setName}
        />
        <View style={styles.tagsContainer}>
          {
            tagsToSave.map((tag, i) => {
              return <Tag
                key={i}
                tag={{ name: tag }}
                selected={true}
                update={() => removeTag(tag)}
              />
            })
          }
        </View>
        <Text style={{ fontSize: 16, marginBottom: 5, marginLeft: 10 }}>Please Select between 1 and 2 items to track</Text>
        <View style={{flex: 1, flexDirection: "row", marginBottom: 20, marginLeft: 10}}>
          <View style={{marginRight: 20, alignItems: "center"}}>
            <Switch value={measurements.reps} disabled={!measurements.reps && disableUnchecked} onChange={() => addRemoveMeasurement('reps')}></Switch><Text>Reps</Text>
          </View>
          <View style={{marginRight: 20, alignItems: "center"}}>
            <Switch value={measurements.weight} disabled={!measurements.weight && disableUnchecked} onChange={() => addRemoveMeasurement('weight')}></Switch><Text>Weight</Text>
          </View>
          <View style={{marginRight: 20, alignItems: "center"}}>
            <Switch value={measurements.distance} disabled={!measurements.distance && disableUnchecked} onChange={() => addRemoveMeasurement('distance')}></Switch><Text>Distance</Text>
          </View>
          <View style={{marginRight: 20, alignItems: "center"}}>
            <Switch value={measurements.time} disabled={!measurements.time && disableUnchecked} onChange={() => addRemoveMeasurement('time')}></Switch><Text>Time</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 20,marginRight: 5 }}>
            Tag your exercise!
          </Text>
          <Tooltip width={300} height={150} backgroundColor={Colors.secondary} popover={toolTipText()}>
            <Icon color={Colors.primary} name={Platform.OS === 'ios' ? `ios-help-circle-outline` : 'md-help-circle-outline'} type='ionicon'/>
          </Tooltip>
        </View>
        <View style={styles.tagsContainer}>
          {
            userTags.map((tag, i) => {
              return <Tag
                key={`tag-index-${i}`}
                tag={{ name: tag.name }}
                update={() => addTag(tag.name)}
              />
            })
          }
        </View>
        <View style={{
          flex: 1,
          flexDirection: 'row'
        }}>
          <Input
            inputContainerStyle={{ borderBottomColor: Colors.primary, height: 40 }}
            labelStyle={{ height: 20 }}
            containerStyle={styles.tagInput}
            placeholder='Chest'
            autoCapitalize='none'
            autoCorrect={true}
            label='New Tag'
            value={tagInput}
            onChangeText={setTagInput}
          />
          <Button
            type='outline'
            buttonStyle={styles.tagSubmit}
            containerStyle={styles.tagSubmitContainer}
            onPress={() => addTag(tagInput)}
            icon={
              <Icon
                color='#fff'
                name={Platform.OS === 'ios' ? `ios-checkmark` : 'md-checkmark'}
                type='ionicon'
              />
            }
          />
        </View>
      </ScrollView>
      <Spacer/>
      <Button
        buttonStyle={{ backgroundColor: Colors.primary, marginBottom: 10 }}
        title='Save'
        onPress={() => validateForm()} />
    </View>
  );
};

const toolTipText = () => {
  return (
    <Text style={globalStyles.toolTipText}>
      Tags can be any thing that might help you filter for this exercise later. i.e 'chest', 'leg'.
      You can add an existing tag, or you may create a new one.
    </Text>
  );
}

LiftDetailsScreen.navigationOptions = {
  title: 'Details',
  headerBackTitleStyle: globalStyles.colorPrimary,
  headerTintColor: Colors.primary
}

const styles = StyleSheet.create({
  tagsContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 24
  },
  tagInput: {
    width: (Dimensions.get('window').width * .75) + 10,
    flex: 1
  },
  tagSubmit: {
    backgroundColor: Colors.primary,
    alignSelf: 'flex-end',
    width: (Dimensions.get('window').width * .25) - 30
  },
  tagSubmitContainer: {
    marginLeft: -10,
    width: 75,
    height: 40,
    marginTop: 20,
    flex: 0
  }
});

export default LiftDetailsScreen;
