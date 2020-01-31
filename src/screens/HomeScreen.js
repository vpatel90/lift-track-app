import React, { useState, useContext, useEffect }  from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Context as LiftContext } from '../context/LiftContext';
import LiftCard from '../components/LiftCard';
import { Text } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Overlay, Button } from 'react-native-elements';
import Colors from '../constants/Colors';

export default function HomeScreen({ navigation }) {

  const { state, getLifts, getTags } = useContext(LiftContext);
  const [lifts, setLifts] = useState(state.lift);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    // getTags();
    getLifts();
  }, []);

  useEffect(() => {
    setLifts(state.lifts);
  }, [state.lifts.length]);

  return (
    <View style={styles.container}>
      <Text h4>Start your workout!</Text>

      {/* <Overlay
        isVisible={showFilters}
        onBackdropPress={()=>setShowFilters(false)}
      >
        <FlatList
          contentContainerStyle={styles.flexIt}
          keyExtractor={item => item.name}
          data={state.tags}
          renderItem={({item}) => {
            return (
              <Text style={styles.pill}>{item.name}</Text>
            );
          }}
        />
      </Overlay> */}

      <FlatList
        keyExtractor={item => `lift-${item.id}`}
        data={lifts}
        renderItem={({item}) => {
          return (
            <LiftCard lift={item} />
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
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  flexIt: {
    flex: 1,
    padding: 8,
    flexDirection: 'row', // main axis
    flexWrap: "wrap"
  },
  pill: {
    color: Colors.primary,
    borderColor: Colors.primary,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    margin: 5
  },
  floatingButton: {
    backgroundColor: Colors.primary,
    marginBottom: 10
  }

});
