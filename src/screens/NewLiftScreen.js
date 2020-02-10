import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button, Input, Text, Icon, Tooltip } from 'react-native-elements'
import Colors from '../constants/Colors';
import { Context as LiftContext } from '../context/LiftContext';
import Spacer from '../components/Spacer';
import Tag from '../components/Tag';
import { ScrollView } from 'react-native-gesture-handler';
import globalStyles from '../styles/global';

const NewLiftScreen = () => {
  const { state, createLift } = useContext(LiftContext);
  const [name, setName] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tagsToSave, setTagsToSave] = useState([])
  const [userTags, setUserTags] = useState([]);

  useEffect(() => {
    setUserTags(state.tags);
  }, [state.tags.length]);

  const addTag = (tag) => {
    if (tagsToSave.includes(tag) || tag.trim() === '') return setTagInput('')
    setTagsToSave([...tagsToSave, tag])
    setTagInput('')
  }

  const removeTag = (selectedTag) => {
    setTagsToSave(tagsToSave.filter(listedTag => listedTag != selectedTag))
  }

  return (
    <View style={globalStyles.container}>
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
        <View style={{ marginBottom: 10, flexDirection: 'row' }}>
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
        onPress={() => createLift({ name, tags: tagsToSave })} />
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

NewLiftScreen.navigationOptions = {
  title: 'Add New Exercise',
  headerBackTitleStyle: { color: Colors.primary },
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

export default NewLiftScreen;
