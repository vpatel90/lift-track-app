import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { showMessage, hideMessage } from "react-native-flash-message";
import { navigate } from '../navigationRef';
import Colors from '../constants/Colors';

const liftInstanceReducer = (state, action) => {
  // State : { lift_name: [{ date: "", value: [] }]}
  switch (action.type){
    case 'get_lift_instances':
      return {...state, [action.payload.lift_name]: action.payload.instances };
    case 'add_lift_instance':
      // payload: { lift_name, date, instance }
      // Get existing lift instances array
      const lift = state[action.payload.lift_name];

      // Check if there is already an item for todays sets
      let todaysSets = lift.find(lv => lv.date === action.payload.date);
      let newLiftValue;

      if (todaysSets) {
        // Add the new Set to the existing sets for the day
        const newTodaysSets = [action.payload.instance, ...todaysSets.value];

        // Filter out todays set, and add it with its new value (with the new set)
        newLiftValue = [
          {...todaysSets, value: newTodaysSets},
          ...lift.filter((lv) => lv.date !== action.payload.date)
        ];
      } else {
        // Create an entry for the day
        todaysSets = { date: action.payload.date, value: [action.payload.instance] };
        newLiftValue = [todaysSets, ...lift];
      }

      return {
        ...state,
        [action.payload.lift_name]: newLiftValue
      }
    default:
      return state;
  }
};

const getLiftInstances = dispatch => async ({ lift_id, lift_name }) => {
  try {
    const response = await trackerApi.get(`/api/v1/lifts/${lift_id}/lift_instances`);
    console.log(response.data);
    dispatch({ type: 'get_lift_instances', payload: { lift_name, instances: response.data }});
  } catch (err) {
    console.log(err);
  }
};

const createLiftInstance = dispatch => async ({ lift_id, lift_name, date, reps, weight }) => {
  try {
    const response = await trackerApi.post(`/api/v1/lifts/${lift_id}/lift_instances`, { lift_instance: { date, reps, weight }});
    console.log(response.data);
    showMessage({ message: 'Great Job!', backgroundColor: Colors.primary });
    dispatch({ type: 'add_lift_instance', payload: { lift_name, instance: response.data, date: response.data.date }});
  } catch (err) {
    console.log(err);
  }
}

export const { Provider, Context } = createDataContext(
  liftInstanceReducer,
  { getLiftInstances, createLiftInstance },
  {}
);