import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

// Try to keep this Alphabetical
export default globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10
  },
  colorPrimary: {
    color: Colors.primary
  },
  pseudoCenterContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 250
  },
  toolTipText: {
    fontSize: 18,
    color: '#fff'
  },
});