import {StyleSheet, Dimensions} from 'react-native';
import Theme from '../../../Utils/Theme';
const styles = StyleSheet.create({
  setWidth: {
    width: Theme.wp('95%'),
    alignSelf: Theme.align,
  },
  flexJustify: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '2%',
    borderBottomWidth: 0.5,
    paddingVertical: '2%',
    paddingTop: '5%',
  },
  flexJustify1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '2%',
    borderWidth: 0.5,
    width: '100%',
    alignItems: Theme.align,
    padding: '2%',
    borderRadius: 5,
    height: Theme.hp('15%'),
    borderColor: 'gray',
  },
  chatHead: {
    width: Theme.wp('12%'),
    height: Theme.wp('12%'),
  },
  TutorHead: {
    width: Theme.wp('17%'),
    height: Theme.wp('17%'),
    borderRadius: 90,
  },
  txtWrap: {
    width: Theme.wp('80%'),
  },
  txtName: {
    fontWeight: Theme.bold,
    color: Theme.txtBlack,
    fontSize: Theme.txtMedium,
  },
  txtLocation: {
    color: Theme.txtBlack,
    fontSize: Theme.txtSmall,
    width: '70%',
  },
  txtTime: {
    color: Theme.txtBlack,
    fontSize: Theme.txtSmall,
  },
  flexJustifyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtChild: {
    fontSize: Theme.txtSmall,
    fontWeight: Theme.bold,
  },
  txtMsg: {
    width: '90%',
  },
  alignFlexJustify: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: Theme.align,
    paddingHorizontal: '1%',
  },
  txtTitle: {
    fontWeight: Theme.bold,
    fontSize: Theme.txtMedium,
    marginTop: '5%',
  },
  flexJustify2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingHorizontal: '0%',
    marginTop: '5%',
  },
  width40: {
    width: '40%',
  },
  txtAges: {
    fontSize: Theme.txtSmall,
    color: Theme.txtBlack,
  },
  ImgChild: {
    alignSelf: Theme.align,
    height: Theme.wp('30%'),
    width: Theme.wp('30%'),
    borderRadius: 90,
  },
  txtChildName: {
    fontWeight: Theme.bold,
    fontSize: Theme.txtMedium,
    textAlign: Theme.align,
    margin: '2%',
  },
});

export default styles;
