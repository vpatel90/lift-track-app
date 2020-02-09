import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button, Input, Text, Icon } from 'react-native-elements'
import Colors from '../constants/Colors';
import { Context as LiftContext } from '../context/LiftContext';
import Spacer from '../components/Spacer';
import Tag from '../components/Tag';
import { ScrollView } from 'react-native-gesture-handler';

const NewLiftScreen = () => {
  const { state, createLift, getTags } = useContext(LiftContext);
  const [name, setName] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tagsToSave, setTagsToSave] = useState([])
  const [userTags, setUserTags] = useState([]);

  useEffect(() => {
    setUserTags(state.tags);
  }, [state.tags.length]);

  const addTag = (tag) => {
    if (tagsToSave.includes(tag) || tag.trim() === "") return setTagInput('')
    setTagsToSave([...tagsToSave, tag])
    setTagInput('')
  }

  const removeTag = (selectedTag) => {
    setTagsToSave(tagsToSave.filter(listedTag => listedTag != selectedTag))
  }

  return (
    <View style={styles.container}>
      <ScrollView>
     <Input
        inputContainerStyle={{ borderBottomColor: Colors.primary }}
        placeholder="Bench Press"
        autoCapitalize="none"
        autoCorrect={false}
        label="Name"
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
      <View style={{ marginLeft: 8, marginBottom: 16 }}>
        <Text h4>
          Would you like to tag it?
        </Text>
        <Text style={styles.tagText}>
          Tags can be any thing that might help you filter for this exercise later. i.e "chest", "leg"
        </Text>
        <Text style={styles.tagText}>
          You can add an existing tag, or you may create a new one. These tags are tied to your account
        </Text>
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
        flex: 0,
        flexDirection: "row",
      }}>
        <Input
          inputContainerStyle={{ borderBottomColor: Colors.primary }}
          containerStyle={styles.tagInput}
          placeholder="Chest"
          autoCapitalize="none"
          autoCorrect={true}
          label="Tag"
          value={tagInput}
          onChangeText={setTagInput}
        />
        <Button
          type="outline"
          buttonStyle={styles.tagSubmit}
          containerStyle={{
            marginLeft: -10,
            width: 75,
          }}
          title=""
          onPress={() => addTag(tagInput)}
          icon={
            <Icon
              color="#fff"
              name={Platform.OS === 'ios' ? `ios-checkmark` : 'md-checkmark'}
              type="ionicon"
            />
          }
        />
      </View>
      </ScrollView>
      <Spacer/>
      <Button
        buttonStyle={{ backgroundColor: Colors.primary, marginBottom: 10 }}
        title="Save"
        onPress={() => createLift({ name, tags: tagsToSave })} />
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
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  tagsContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 24
  },
  tagText: {
    fontSize: 16,
    marginTop: 8
  },
  tagInput: {
    width: (Dimensions.get('window').width * .75) + 10,
  },
  tagSubmit: {
    backgroundColor: Colors.primary,
    alignSelf: "flex-end",
    width: (Dimensions.get('window').width * .25) - 30
  }
});

export default NewLiftScreen;
