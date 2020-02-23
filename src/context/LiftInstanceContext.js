import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { showMessage, hideMessage } from "react-native-flash-message";
import { navigate } from '../navigationRef';
import Colors from '../constants/Colors';

const liftInstanceReducer = (state, action) => {
  // State : { lift_name: [{ date: "", value: [] }]}
  switch (action.type){
    case 'get_lift_instances': {
      return {...state, [action.payload.lift_name]: action.payload.instances };
    }
    case 'add_lift_instance': {
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
    }
    case 'destroy_lift_instance': {
      // payload: { lift_name, date, instance }
      // Get existing lift instances array
      const lift = state[action.payload.lift_name];

      // Grab the sets from the day of the lift instances
      const daySets = lift.find(lv => lv.date === action.payload.date);
      let newLiftValue;

      if (daySets) {
        // Remove the Set from the existing sets for the day
        const newDaySets = daySets.value.filter(instance => instance.id !== Number(action.payload.instance.lift_instance_id))

        // Without changing the order of days, we want to replace the value of the day where a set was deleted
        newLiftValue = lift.map(lv => {
          if (lv.date === action.payload.date) {
            return { date: action.payload.date, value: newDaySets };
          }
          return lv;
        })
      } else {
        // If there are no sets found, there will be nothing to DELETE
        return state;
      }
      return {
        ...state,
        [action.payload.lift_name]: newLiftValue
      }
    }
    default:
      return state;
  }
};

const getLiftInstances = dispatch => async ({ lift_id, lift_name }) => {
  try {
    const response = await trackerApi.get(`/api/v1/lifts/${lift_id}/lift_instances`);
    dispatch({ type: 'get_lift_instances', payload: { lift_name, instances: response.data }});
  } catch (err) {
    console.log(err);
  }
};

const createLiftInstance = dispatch => async ({ lift_id, lift_name, date, reps, weight, time, distance }) => {
  try {
    const response = await trackerApi.post(`/api/v1/lifts/${lift_id}/lift_instances`, { lift_instance: { date, reps, weight, time, distance }});
    showMessage({ message: 'Great Job!', backgroundColor: Colors.primary });
    dispatch({ type: 'add_lift_instance', payload: { lift_name, instance: response.data, date: response.data.date }});
  } catch (err) {
    console.log(err);
  }
}

const destroyLiftInstance = dispatch => async ({ lift_id, lift_name, date, lift_instance_id }) => {
  try {
    const response = await trackerApi.delete(`/api/v1/lifts/${lift_id}/lift_instances/${lift_instance_id}`);
    showMessage({ message: 'Lift Removed!', backgroundColor: Colors.primary });
    dispatch({ type: 'destroy_lift_instance', payload: { lift_name, instance: response.data, date: date }});
  } catch (err) {
    showMessage({ message: 'Unable to Destroy this Lift!', backgroundColor: Colors.primary });
    console.log(err);
  }
}

export const { Provider, Context } = createDataContext(
  liftInstanceReducer,
  { getLiftInstances, createLiftInstance, destroyLiftInstance },
  {}
);