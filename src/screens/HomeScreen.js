import React, { useState, useContext, useEffect }  from 'react';
import { StyleSheet, View, FlatList, TouchableHighlight } from 'react-native';
import { Text } from 'react-native-elements';
import { Context as LiftContext } from '../context/LiftContext';
import LiftCard from '../components/LiftCard';
import Spacer from '../components/Spacer';
import Tag from '../components/Tag';
import { Overlay, Button } from 'react-native-elements';
import Colors from '../constants/Colors';
import { intersection } from 'lodash';

export default function HomeScreen({ navigation }) {

  const { state, getLifts, getTags } = useContext(LiftContext);
  const [lifts, setLifts] = useState(state.lift);
  const [tags, setTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const selectedTags =  tags.filter(t => t.selected);

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
    setShowFilters(false);
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 10}}>
        <Text h4 style={{height: 40}}>Start your workout!</Text>
        <Button
          buttonStyle={{height: 40, paddingHorizontal: 20, backgroundColor: Colors.primary}}
          title={`Filters${selectedTags.length ? `(${selectedTags.length})` : ''}`}
          onPress={() => setShowFilters(true)}
        />
      </View>
      {filtersOverlay()}
      <FlatList
        keyExtractor={item => `lift-${item.id}`}
        contentContainerStyle={{justifyContent: "space-evenly"}}
        data={lifts}
        renderItem={({item}) => {
          return (
            <LiftCard lift={item} selectedTags={selectedTags} navigation={navigation} />
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
    paddingTop: 10
  },
  contentContainer: {
    paddingTop: 30,
  },
  flexIt: {
    flex: 1,
    paddingTop: 100,
    alignItems: "center"
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
