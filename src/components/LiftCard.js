import React from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import Colors from '../constants/Colors';
import { intersection } from 'lodash';

const LiftCard = ({ lift, selectedTags, navigation }) => {
  const show = intersection(lift.tags.map(t => t.name), selectedTags.map(t => t.name)).length;
  const navParams = { lift_id: lift.id, lift_name: lift.name, measurements: lift.measurements };

  if (selectedTags.length && !show) { return <></>; }
  return (
    <TouchableHighlight
    style={{ borderBottomColor: Colors.secondaryLight, borderBottomWidth: 1 }}
    onPress={() => navigation.navigate('NewLiftInstance', navParams)}>
    <View style={styles.liftContainer}>
      <Text style={{ fontSize: 18, flex: 1 }}>
        {lift.name}
      </Text>
      <Icon color={Colors.secondaryLight} name='chevron-small-right' type='entypo' />
    </View>
  </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  title: {
    color: Colors.primary,
    textAlign: "center"
  },
  liftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 70,
    paddingHorizontal: 10
  }
});

export default LiftCard;