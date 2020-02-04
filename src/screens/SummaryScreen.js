import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, StyleSheet, View, FlatList } from 'react-native';
import { Button, Card, Input, Text, Icon } from 'react-native-elements'
import { Context as LiftContext } from '../context/LiftContext';
import moment from 'moment';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';

const SummaryScreen = () => {
  const { state, getLiftDates, getDailySummary } = useContext(LiftContext);
  const date = moment(new Date()).format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(true);
  const [liftDates, setLiftDates] = useState({});
  const [dailySummary, setDailySummary] = useState([]);

  useEffect(() => {
    getLiftDates();
    setSelectedDate(date);
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
    getDailySummary({ date: d});
    setShowCalendar(!showCalendar);
  }

  function markedDates() {
    return { ...liftDates,
      [selectedDate]: {...liftDates[selectedDate], selected: true, selectedColor: Colors.primary }
    }
  }

  function renderCalendar() {
    if (showCalendar) {
      return (
        <Calendar
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={new Date()}

          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => dateSelected(day.dateString)}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={(day) => {console.log('selected day', day)}}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'MMMM yyyy'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
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
      )
    }
    return <></>;
  }

  function renderSummary() {
    if (showCalendar) {
      return <></>;
    }
    return (
      <View>
        <TouchableOpacity onPress={() => setShowCalendar(!showCalendar)} style={{ flexDirection: "row", justifyContent: "center", marginBottom: 10}}>
          <Text style={{fontSize: 20, marginRight: 10}}>{moment(selectedDate).format("MMM D, YYYY")}</Text>
          <Icon color={Colors.primary} name={Platform.OS === 'ios' ? `ios-calendar` : 'md-calendar'} type="ionicon"/>
        </TouchableOpacity>
        {renderSummaryList()}
      </View>
    )
  }

  function renderSummaryList() {
    if (dailySummary.length) {
      return(
        <FlatList
          keyExtractor={item => `dailySummary-${item.lift_name}`}
          data={dailySummary}
          renderItem={({item}) => {
            return (
              <View style={{paddingBottom: 10, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: Colors.secondaryLight }}>
                <Text style={{fontSize: 24, marginBottom: 12}}>{item.lift_name}</Text>
                <FlatList
                  keyExtractor={item => `liftInstance-${item.id}`}
                  data={item.value}
                  renderItem={({item}) => {
                    return (
                      <View style={styles.liftInstanceContainer}>
                        <View style={{flex: 3, flexDirection: "row", justifyContent: "space-evenly"}}>
                          <Text style={{fontSize: 18}}>
                            {item.reps.toString().padStart(2, ' ')}
                          </Text>
                          <Icon color={Colors.secondary} name={Platform.OS === 'ios' ? `ios-close` : 'md-close'} type="ionicon"/>
                          <Text style={{fontSize: 18, width: 90}}>
                            {item.weight ? item.weight.toString().padStart(6, ' ') : ''.padStart(6, ' ')} {item.weight ? 'lbs' : ''}
                          </Text>
                        </View>
                      </View>
                    );
                  }}
                />
              </View>
            );
          }}
        />
      )
    }
    return <Text style={{fontSize: 16, textAlign: "center"}}>You did not record your exercise for this day.</Text>;
  }

  return (
    <View style={styles.container}>
      {renderCalendar()}
      {renderSummary()}
    </View>
  );
};

SummaryScreen.navigationOptions = {
  title: 'Daily Summary',
  headerBackTitleStyle: { color: Colors.primary },
  headerTintColor: Colors.primary
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 55
  },
  liftInstanceContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    width: "100%"
  }
});


export default SummaryScreen;
