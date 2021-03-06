import React, { useState, useContext, useEffect }  from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { Context as LiftContext } from '../context/LiftContext';
import Tag from '../components/Tag';
import { Overlay, Button } from 'react-native-elements';
import Colors from '../constants/Colors';
import globalStyles from '../styles/global';
import { SwipeListView } from 'react-native-swipe-list-view';
import LiftCard from '../components/LiftCard';

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
  }, [state.lifts]);

  useEffect(() => {
    setTags(state.tags);
  }, [state.tags]);

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

  const filtersOverlay = () => {
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
          title='Reset'
          type='outline'
          titleStyle={globalStyles.colorPrimary}
          onPress={() => resetFilters()}
        />
        <Button
          buttonStyle={{...styles.floatingButton }}
          title='Apply'
          onPress={() => setShowFilters(false)}
        />
      </>
      </Overlay>
    );
  }

  return (
    <View style={{ ...globalStyles.container, flex: 1 }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
        <Text h4 style={{height: 40}}>Start your workout!</Text>
        <Button
          buttonStyle={{height: 40, paddingHorizontal: 20, backgroundColor: Colors.primary}}
          title={`Filters${selectedTags.length ? `(${selectedTags.length})` : ''}`}
          onPress={() => setShowFilters(true)}
        />
      </View>
      {filtersOverlay()}
      <SwipeListView
        keyExtractor={item => `lift-${item.id}`}
        data={lifts}
        renderItem={({ item }) => {
          return (
            <LiftCard lift={item} selectedTags={selectedTags} navigation={navigation} />
          )
        }}
        leftOpenValue={140}
        swipeToOpenPercent={10}
        renderHiddenItem={({item}) => (
          <View style={{ alignItems: 'center', flexDirection: 'row', flex: 1 }}>
            <Button
              type='outline'
              titleStyle={globalStyles.colorPrimary}
              buttonStyle={globalStyles.hiddenButtonStyle}
              containerStyle={globalStyles.hiddenButtonContainerStyle}
              title=''
              icon={
                <Icon color={Colors.primary} name={Platform.OS === 'ios' ? 'ios-create' : 'md-create' } type='ionicon' />
              }
              onPress={() => navigation.navigate('LiftDetails', { lift_id: item.id})} />
            <Button
              type='outline'
              titleStyle={globalStyles.colorPrimary}
              buttonStyle={globalStyles.hiddenButtonStyle}
              containerStyle={globalStyles.hiddenButtonContainerStyle}
              title=''
              icon={
                <Icon color={Colors.primary} name={Platform.OS === 'ios' ? `ios-trash` : 'md-trash'} type='ionicon' />
              }
              onPress={() => console.log('delete')} />
          </View>
        )}
      />
      <Button
        buttonStyle={styles.floatingButton}
        title='Add New Exercise'
        onPress={() => navigation.navigate('LiftDetails')}
      />
    </View>
  );

}

HomeScreen.navigationOptions = {
  title: 'Exercises',
  headerBackTitleStyle: globalStyles.colorPrimary,
  headerTintColor: Colors.primary
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 30,
  },
  flexIt: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 50,
    justifyContent: 'flex-start'
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
