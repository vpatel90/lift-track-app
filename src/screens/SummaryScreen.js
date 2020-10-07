import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, FlatList, Clipboard } from 'react-native';
import { Text, Icon } from 'react-native-elements'
import { Context as LiftContext } from '../context/LiftContext';
import moment from 'moment';
import { Calendar } from 'react-native-calendars';
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import globalStyles from '../styles/global';
import LiftInstanceItem from '../components/LiftInstanceItem';
import { groupBy, map, uniq } from 'lodash';

const SummaryScreen = () => {
  const { state, getLiftDates, getDailySummary } = useContext(LiftContext);
  const date = moment(new Date()).format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [liftDates, setLiftDates] = useState({});
  const [dailySummary, setDailySummary] = useState([]);
  const textSummary = [];
  const liftsDone = [];

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

  const dateSelected = (d) => {
    setSelectedDate(d);
    getDailySummary({ date: d});
    setShowCalendar(!showCalendar);
  }

  const markedDates = () => {
    return { ...liftDates,
      [selectedDate]: {...liftDates[selectedDate], selected: true, selectedColor: Colors.primary }
    }
  }

  const setDisplay = (exercise, val) => {
    textSummary.push({ name: exercise, value: val });
    liftsDone.push(exercise);
  }

  const copyToClipboard = () => {
    const groupedTs = groupBy(textSummary, 'name');
    const uniqLifts = uniq(liftsDone);
 
    uniqLifts.forEach((ln) => {
      str = str + `\n**${ln}**`;
      groupedTs[ln].forEach((itm) => {
        str = str + `\n${itm.value}`;
      });
    })
    console.log(str);
    Clipboard.setString(str)
  }

  const renderCalendar = () => {
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
              return <Icon color={Colors.secondary} name={Platform.OS === 'ios' ? `ios-arrow-back` : 'md-arrow-back'} type='ionicon'/>;
            }
            return <Icon color={Colors.secondary} name={Platform.OS === 'ios' ? `ios-arrow-forward` : 'md-arrow-forward'} type='ionicon'/>;
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

  const renderSummary = () => {
    if (showCalendar) {
      return <></>;
    }
    return (
      <View>
        <TouchableOpacity onPress={() => setShowCalendar(!showCalendar)} style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10}}>
          <Text style={{fontSize: 20, marginRight: 10}}>{moment(selectedDate).format('MMM D, YYYY')}</Text>
          <Icon color={Colors.primary} name={Platform.OS === 'ios' ? `ios-calendar` : 'md-calendar'} type='ionicon'/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => copyToClipboard()}>
          <Text>Copy to Clipboard</Text>
        </TouchableOpacity>
        {renderSummaryList()}
      </View>
    )
  }

  const renderSummaryList = () => {
    if (dailySummary.length) {
      return(
        <FlatList
          keyExtractor={item => `dailySummary-${item.lift_name}`}
          data={dailySummary}
          renderItem={({item}) => {
            const measurements = item.measurements;
            return (
              <View style={{paddingBottom: 10, marginBottom: 10}}>
                <Text style={{fontSize: 24, marginBottom: 12}}>{item.lift_name}</Text>
                <FlatList
                  keyExtractor={item => `liftInstance-${item.id}`}
                  data={item.value}
                  renderItem={(obj) => {

                    return (
                      <LiftInstanceItem measurements={measurements} item={obj.item} setDisplay={(val) => setDisplay(item.lift_name, val)}/>
                    );
                  }}
                />
              </View>
            );
          }}
        />
      )
    }
    return <Text style={{fontSize: 16, textAlign: 'center'}}>You did not record your exercise for this day.</Text>;
  }

  return (
    <View style={{...globalStyles.container, paddingBottom: 50}}>
      {renderCalendar()}
      {renderSummary()}
    </View>
  );
};

SummaryScreen.navigationOptions = {
  title: 'Daily Summary',
  headerBackTitleStyle: globalStyles.colorPrimary,
  headerTintColor: Colors.primary
};

const styles = StyleSheet.create({
  liftInstanceContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  }
});


export default SummaryScreen;
