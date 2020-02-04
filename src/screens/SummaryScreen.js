import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Card, Input, Text, Icon } from 'react-native-elements'
import { Context as LiftContext } from '../context/LiftContext';
import moment from 'moment';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Colors from '../constants/Colors';

const SummaryScreen = () => {
  const { state, getLiftDates, getDailySummary } = useContext(LiftContext);
  const date = moment(new Date()).format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState(date);
  const [liftDates, setLiftDates] = useState({});
  const [dailySummary, setDailySummary] = useState([]);

  useEffect(() => {
    getLiftDates();
    getDailySummary({ date })
  }, [])

  useEffect(() => {
    const lds = {};
    state.liftDates.forEach((d) => {
      lds[moment(new Date(d)).format('YYYY-MM-DD')] = { marked: true, markedColor: Colors.secondary };
    })
    setLiftDates(lds);
  }, [state.liftDates.length]);

  useEffect(() => {
    setDailySummary(state.dailySummary);
  }, [state.dailySummary]);

  function dateSelected(d) {
    setSelectedDate(d);
    getDailySummary({ date: d})
  }

  function markedDates() {
    return { ...liftDates,
      [selectedDate]: {...liftDates[selectedDate], selected: true, selectedColor: Colors.primary }
    }
  }

  return (
    <ScrollView style={styles.container}>
      <CalendarList
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={new Date()}

        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => dateSelected(day.dateString)}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => {console.log('selected day', day)}}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'MMMM yyyy'}
        // Handler which gets executed when visible month changes in calendar. Default = undefined

        horizontal={true}
        scrollEnabled={true}
        pagingEnabled={true}
        futureScrollRange={0}
        renderArrow={(direction) => {
          if (direction === 'left') {
            return <Icon color={Colors.secondary} name={Platform.OS === 'ios' ? `ios-arrow-back` : 'md-arrow-back'} type="ionicon"/>;
          }
          return <Icon color={Colors.secondary} name={Platform.OS === 'ios' ? `ios-arrow-forward` : 'md-arrow-forward'} type="ionicon"/>;
        }}

        hideExtraDays={true}
        // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        disableMonthChange={true}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
        firstDay={7}
        onPressArrowLeft={substractMonth => substractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        markedDates={markedDates()}
        theme={{
          todayTextColor: Colors.primary
        }}
      />
    </ScrollView>
  );
};

SummaryScreen.navigationOptions = {
  title: 'Daily Summary',
  headerBackTitleStyle: { color: Colors.primary },
  headerTintColor: Colors.primary
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});


export default SummaryScreen;
