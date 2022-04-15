/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-keys */
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

const Theme = {
  primary: '#1596F3',
  // secondary: '#ff6f00',
  secondary: '#ff6f00',
  txtWhite: '#ffffff',
  white: 'white',
  black: 'black',
  optionsize: RFValue(18),
  green: 'green',
  txtBlack: 'black',
  txtGrey: '#B7B7B7',
  iconGrey: '#D1D1D1',
  lightestGrey: '#FAFAFA',
  lightGray: '#F2F2F2',
  darkGray: '#d4d4d4',
  lightGreen: '#F1F9ED',
  iconSize: 26,
  iconSizee:30,
  bold: 'bold',
  red: 'red',
  blueBtn: '#5BC0EB',
  lightBlue: '#5BC0EB',
  iconSizeSm: 18,
  iconSizeExSm: 12,
  txtSmallest: hp('1.5%'),
  txtSmall: hp('1.7%'),
  txtMedium: hp('2%'),
  txtMedium2: hp('2.5%'),
  txtMedium1: hp('3%'),
  txtLarge: hp('4%'),
  txtMediumLarge: hp('3.5%'),
  align: 'center',
  wp,
  hp,
  width: wp('95%'),
  width2: wp('80%'),
  height: height,
  width: width,
};

export default Theme;
