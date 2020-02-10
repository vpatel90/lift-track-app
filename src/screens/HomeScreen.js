import React, { useState, useContext, useEffect }  from 'react';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import { Text } from 'react-native-elements';
import { Context as LiftContext } from '../context/LiftContext';
import LiftCard from '../components/LiftCard';
import Tag from '../components/Tag';
import { Overlay, Button } from 'react-native-elements';
import Colors from '../constants/Colors';
import globalStyles from '../styles/global';

export default function HomeScreen({ navigation }) {

  const { state, getLifts, getTags } = useContext(LiftContext);
  const [lifts, setLifts] = useState(state.lift);
  const [tags, setTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const selectedTags = tags.filter(t => t.selected);

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

  const updateSelectedTag = (pressedTag) => {
    const newTags = tags.map((tag) => {
      if (tag.name === pressedTag.name) {
        return { ...tag, selected: !tag.selected };
      }
      return tag;
    })
    setTags(newTags);
  };

  const resetFilters = () => {
    setTags(state.tags);
    setShowFilters(false);
  }

  return (
    <View style={globalStyles.container}>
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

        onBackdropPress={()=>setShowFilters(false)}>
        <>
        <ScrollView contentContainerStyle={styles.flexIt}>
        {
          tags.map((tag) => {
            return <Tag
                key={tag.name}
                tag={tag}
                selected={tag.selected}
                update={(tag) => updateSelectedTag(tag)} />
          })
        }
        </ScrollView>
        <Button
          buttonStyle={styles.floatingButtonSecondary}
          title="Reset"
          type="outline"
          titleStyle={{ color: Colors.primary }}
          onPress={() => resetFilters()}
        />
        <Button
          buttonStyle={{...styles.floatingButton }}
          title="Apply"
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
  contentContainer: {
    paddingTop: 30,
  },
  flexIt: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 50,
    justifyContent: "flex-start"
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
