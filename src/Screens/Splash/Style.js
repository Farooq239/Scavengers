import {StyleSheet, Dimensions} from 'react-native';
import Theme from '../../Utils/Theme';
const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    alignItems: Theme.align,
    backgroundColor: Theme.white,
    justifyContent: Theme.align,
  },
  imgSplash: {
    width: Theme.wp('40%'),
    height: Theme.wp('40%'),
  },
  txtScavenger: {
    color: Theme.primary,
    fontSize: Theme.txtLarge,
    fontWeight: Theme.bold,
  },
});

export default styles;
