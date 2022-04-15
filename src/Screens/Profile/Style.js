import {StyleSheet, Dimensions} from 'react-native';
import Theme from '../../Utils/Theme';
const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  setWidth: {
    width: Theme.width,
    alignSelf: Theme.align,
    marginTop: '20%',
  },
  wrapTxtEdit: {
    backgroundColor: Theme.primary,
    width: '15%',
    alignItems: 'center',
    borderRadius: 5,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  txtEdit: {
    fontSize: Theme.txtMedium,
    color: 'yellow',
    fontWeight: Theme.bold,
  },
  imgProfile: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  txtEmail: {
    fontSize: Theme.txtSmall,
    fontWeight: Theme.bold,
    // marginTop: '5%',
  },
  flexJustify: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  wrap40: {
    width: '40%',
  },
  wrap60: {
    width: '60%',
  },
  wrapImg: {
    width: '100%',
    height: Theme.hp('30%'),
    alignItems: Theme.align,
    justifyContent: Theme.align,
  },
  txtAddImg: {
    fontSize: Theme.txtSmall,
    textAlign: Theme.align,
    marginTop: '5%',
  },
});

export default styles;
