import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { ListItem, Text, Icon, Button } from 'react-native-elements';
import Colors from '../constants/Colors';
import { formatTime } from '../helpers/timeHelper';

const LiftInstanceItem = ({ measurements, item, callback, setDisplay }) => {

  const data = [];
  if (measurements.includes('reps')) data.push({ label: '', val: item.reps });
  if (measurements.includes('weight')) data.push({ label: 'lbs', val: item.weight });
  if (measurements.includes('distance')) data.push({ label: 'miles', val: item.distance });
  if (measurements.includes('time')) data.push({ label: 'mins', val: formatTime(item.time) });

  const dataContent = () => {
    if (data.length === 1 || data[1].toString().length === 0) {
      const displayVal = `${data[0].val.toString().padStart(6, ' ')} ${data[0].label}`;
      if (setDisplay) { setDisplay(displayVal) }
      return (
        <View style={{flex: 3, flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <Text style={{fontSize: 18}}>
            {displayVal}
          </Text>
        </View>
      )
    }
    const displayVal = `${data[0].val.toString().padStart(2, ' ')} ${data[0].label} x ${data[1].val.toString().padStart(6, ' ')} ${data[1].label}`;
    if (setDisplay) { setDisplay(displayVal) }
    return(
      <View style={{flex: 3, flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Text style={{fontSize: 18}}>
          {data[0].val.toString().padStart(2, ' ')} {data[0].label}
        </Text>
        <Icon color={Colors.secondary} name={Platform.OS === 'ios' ? `ios-close` : 'md-close'} type='ionicon'/>
        <Text style={{fontSize: 18}}>
          {data[1].val.toString().padStart(6, ' ')} {data[1].label}
        </Text>
      </View>
    );
  }

  const content = () => {
    if (!callback) {
      return dataContent();
    }
    return (
     <View style={styles.liftInstanceContainer}>
       {dataContent()}
       <Button
        buttonStyle={{ backgroundColor: Colors.primary, width: '60%', alignSelf: 'flex-end' }}
        containerStyle={{
          flex: 1,
          height: 40,
          padding: 0
        }}
        title=''
        icon={
          <Icon iconStyle={{fontSize: 20 }} color='#fff' name={Platform.OS === 'ios' ? `ios-refresh` : 'md-refresh'} type='ionicon'/>
        }
        onPress={() => callback(item)} />
      </View>
    )
  }

  return (
    <ListItem
      containerStyle={{paddingBottom: 4}}
      title={content()}
      bottomDivider
    />
  )
};

const styles = StyleSheet.create({
  liftInstanceContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff'
  }
});

export default LiftInstanceItem;
