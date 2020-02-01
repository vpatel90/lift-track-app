import React, { useState, useContext, useEffect }  from 'react';
import { StyleSheet, View, FlatList, Text, TouchableHighlight } from 'react-native';
import { Text as ElementsText } from 'react-native-elements';
import { Context as LiftContext } from '../context/LiftContext';
import LiftCard from '../components/LiftCard';
import Spacer from '../components/Spacer';
import Tag from '../components/Tag';
import { Overlay, Button } from 'react-native-elements';
import Colors from '../constants/Colors';

export default function HomeScreen({ navigation }) {

  const { state, getLifts, getTags } = useContext(LiftContext);
  const [lifts, setLifts] = useState(state.lift);
  const [tags, setTags] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    getTags();
    getLifts();
  }, []);

  useEffect(() => {
    setLifts(state.lifts);
  }, [state.lifts.length]);

  useEffect(() => {
    setTags(state.tags);
  }, [state.tags.length]);

  function updateSelectedTag(pressedTag) {
    const newTags = tags.map((tag) => {
      if (tag.name === pressedTag.name) {
        return { ...tag, selected: !tag.selected };
      }
      return tag;
    })
    setTags(newTags);
  };

  function resetFilters() {
    setTags(state.tags);
  }

  return (
    <View style={styles.container}>
      <ElementsText h4 onPress={() => setShowFilters(true)}>Start your workout!</ElementsText>
      {filtersOverlay()}
      <FlatList
        keyExtractor={item => `lift-${item.id}`}
        data={lifts}
        renderItem={({item}) => {
          return (
            <LiftCard lift={item} navigation={navigation} />
          );
        }}
      />

      <Button
        buttonStyle={styles.floatingButton}
        title="Add New Exercise"
        onPress={() => navigation.navigate('NewLift')}
      />
    </View>
  );

  // Nested Components

  function filtersOverlay() {
    return (
      <Overlay
        isVisible={showFilters}
        fullScreen
        onBackdropPress={()=>setShowFilters(false)}>
        <>
        <FlatList
          contentContainerStyle={styles.flexIt}
          keyExtractor={item => item.name}
          numColumns={2}
          data={tags}
          renderItem={({item}) => {
            return <Tag tag={item} update={(tag) => updateSelectedTag(tag)} />;
          }}
        />
        <Button
          buttonStyle={styles.floatingButtonSecondary}
          title="Reset"
          type="outline"
          titleStyle={{ color: Colors.primary }}
          onPress={() => resetFilters()}
        />
        <Button
          buttonStyle={{...styles.floatingButton, marginBottom: 30}}
          title="Close"
          onPress={() => setShowFilters(false)}
        />
        </>
      </Overlay>
    );
  }
}

HomeScreen.navigationOptions = {
  title: 'Exercises',
  headerBackTitleStyle: { color: Colors.primary },
  headerTintColor: Colors.primary
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 35
  },
  contentContainer: {
    paddingTop: 30,
  },
  flexIt: {
    padding: 15,
    paddingTop: 100
  },
  selectedPill: {
    borderColor: "#fff",
    backgroundColor: Colors.primary,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    margin: 5,
    width: 170,
  },
  pill: {
    color: Colors.primary,
    borderColor: Colors.primary,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    margin: 5,
    width: 170,
    textAlign: "center"
  },
  floatingButton: {
    backgroundColor: Colors.primary,
    marginBottom: 10
  },
  floatingButtonSecondary: {
    marginBottom: 10,
    borderColor: Colors.primary
  }

});
