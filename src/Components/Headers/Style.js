import {StyleSheet, Dimensions} from 'react-native';
import Theme from '../../Utils/Theme';
const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  txtLabel: {
    fontSize: Theme.txtMedium,
    color: Theme.txtWhite,
    fontWeight: Theme.bold,
    textAlign: Theme.align,
  },
  headerWrap: {
    backgroundColor: Theme.primary,
    padding: '4%',
    // position: 'absolute',
    width: '100%',
  },
  cityText: {
    marginLeft: '7%',
    fontSize: 17,
    fontWeight: '400',
    paddingBottom: '2%',
  },
  imgMarker: {
    width: 10,
    height: 20,
    marginTop: '10%',
    marginLeft: '30%',
  },
  headerWrap1: {
    backgroundColor: Theme.white,
    // padding: '4%',
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
  },
  flexAlign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Theme.primary,
    padding: '5%',
  },
  flexJustify: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default styles;
