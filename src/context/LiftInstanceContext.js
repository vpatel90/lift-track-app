import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { showMessage, hideMessage } from "react-native-flash-message";
import { navigate } from '../navigationRef';
import Colors from '../constants/Colors';

const liftInstanceReducer = (state, action) => {
  switch (action.type){
    case 'get_lift_instances':
      return {...state, [action.payload.lift_name]: action.payload.instances };
    default:
      return state;
  }
};

const getLiftInstances = dispatch => async ({ lift_id, lift_name }) => {
  try {
    const response = await trackerApi.get(`/api/v1/lifts/${lift_id}/lift_instances`);
    console.log(lift_name);
    dispatch({ type: 'get_lift_instances', payload: { lift_name, instances: response.data }});
  } catch (err) {
    console.log(err);
  }
};

const createLiftInstance = dispatch => async ({ lift_id, date, reps, weight }) => {
  try {
    const response = await trackerApi.post(`/api/v1/lifts/${lift_id}/lift_instances`, { lift_instance: { date, reps, weight }});
    console.log(response.data);
    showMessage({ message: 'Great Job!', backgroundColor: Colors.primary });
    // dispatch({ type: 'add_lift_instance', payload: response.data });
  } catch (err) {
    console.log(err);
  }
}

export const { Provider, Context } = createDataContext(
  liftInstanceReducer,
  { getLiftInstances, createLiftInstance },
  {}
);