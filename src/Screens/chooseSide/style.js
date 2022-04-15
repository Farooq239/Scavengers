import {StyleSheet, Dimensions} from 'react-native';
import Theme from '../../Utils/Theme';
const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  setWidth: {
    width: Theme.width,
    paddingVertical: '40%',
    alignSelf: Theme.align,
    alignItems: Theme.align,
  },
  txtPass: {
    fontSize: Theme.txtLarge,
    color: Theme.txtBlack,
  },
  txtEnter: {
    fontSize: Theme.txtMedium,
    color: Theme.txtBlack,
    textAlign: Theme.align,
    paddingVertical: '5%',
  },
  wrapBtn: {
    backgroundColor: '#D4D4D4',
    width: Theme.wp('60%'),
    height: Theme.hp('15%'),
    borderRadius: 10,
    alignItems: Theme.align,
    justifyContent: Theme.align,
    margin: '5%',
  },
  txtPhone: {
    color: Theme.txtBlack,
    fontWeight: Theme.bold,
    // textAlign: Theme.align,
    marginTop: '3%',
  },
});

export default styles;
