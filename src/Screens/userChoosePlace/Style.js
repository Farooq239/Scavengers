import {StyleSheet} from 'react-native';
import Theme from '../../Utils/Theme';
const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    backgroundColor: Theme.white,
  },

  setWidth: {width: Theme.width, alignSelf: Theme.align},

  searchTxtInp: {
    width: Theme.width,
    alignSelf: Theme.align,
    borderWidth: 0.3,
    marginTop: '15%',
    borderRadius: 5,
    backgroundColor: Theme.lightGray,
  },
});

export default styles;
