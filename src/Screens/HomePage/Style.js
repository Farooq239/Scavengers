/* eslint-disable no-dupe-keys */
import {StyleSheet, Dimensions} from 'react-native';
import Theme from '../../Utils/Theme';
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  MainView: {
    flex: 1,
  },
  imgBg: {
    width: '100%',
    height: '100%',
  },

  viewWrapper: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  ModalScreen: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#fff',
  },
  modalView: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '40%',
    left: '50%',
    elevation: 5,
    transform: [{translateX: -(width * 0.4)}, {translateY: -90}],
    height: 250,
    width: width * 0.8,
    backgroundColor: '#fff',
    // backgroundColor: 'red',
    borderRadius: 7,
  },
  heading: {
    alignSelf: 'center',
    marginTop: 10,

    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  heading2: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  btnNavigate: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
    width: '90%',
    backgroundColor: '#1596F3',
    borderRadius: 5,
    alignSelf: 'center',
    // bottom: '9%',
    marginTop: '14%',
  },
  txtNavigate: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  imgMarker: {
    width: 10,
    height: 30,
    marginTop: '10%',
    marginLeft: '30%',
  },
  innerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '85%',
    backgroundColor: 'red',
  },
  headingText: {
    alignSelf: 'center',
    // marginBottom: 10,
    color: '#1596F3',
    paddingBottom: 5,
    fontStyle: 'italic',
    fontSize: 15,
    fontWeight: '100',
    flexDirection: 'row',
    width: '100%',
  },

  wrapPlusBtn: {
    backgroundColor: Theme.primary,
    width: Theme.wp('15%'),
    height: Theme.wp('15%'),
    borderRadius: 90,
    alignItems: Theme.align,
    justifyContent: Theme.align,
    position: 'absolute',
    bottom: '5%',
    right: '5%',
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black',
  },
  wrapPlusBtn2: {
    backgroundColor: Theme.primary,
    width: Theme.wp('15%'),
    height: Theme.wp('15%'),
    borderRadius: 90,
    alignItems: Theme.align,
    justifyContent: Theme.align,
    position: 'absolute',
    bottom: '15%',
    right: '5%',
  },
  wrapPlusBtn3: {
    backgroundColor: Theme.primary,
    width: Theme.wp('15%'),
    height: Theme.wp('15%'),
    borderRadius: 90,
    alignItems: Theme.align,
    justifyContent: Theme.align,
    position: 'absolute',
    bottom: '30%',
    right: '5%',
  },
  modalWrap: {
    backgroundColor: Theme.white,

    width: Theme.wp('90%'),
    alignSelf: Theme.align,
    height: Theme.hp('7%'),
    position: 'absolute',
    top: '20%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Theme.primary,
    padding: '1%',
  },
  wrpaTxtSearch: {
    //   backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: Theme.align,
  },
  wrpaTxtSearch2: {
    //   backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: Theme.align,
  },
  map: {width: '100%', height: '100%', marginTop: '15.5%'},

  textInputStyle: {
    backgroundColor: '#F3F3F3',
    color: 'black',
    fontSize: 16,
    height: 48,
  },
  descTxt: {
    width: '100%',
    color: 'black',
    fontSize: 16,
    borderRadius: 7,
    backgroundColor: '#66B5EB',
    marginBottom: 17,
  },
  markerTxin: {
    width: '100%',
    color: 'white',
    fontSize: 16,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    backgroundColor: '#66B5EB',
    marginBottom: 17,
  },
  markerin: {
    width: '100%',
    height: 100,
    color: 'white',
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    backgroundColor: '#66B5EB',
    marginBottom: 17,
  },
  geoAddress: {
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 8,
    padding: 7,
    color: 'black',
    borderRadius: 2,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: Theme.primary,
  },
  markerBtn: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 40,
    borderRadius: 7,
    backgroundColor: '#66B5EB',
    marginTop: 14,
  },
  markerBtnText: {
    color: '#37709a',
    padding: 10,
    fontSize: 16,
  },
  containerStyle: {},
  textInput: {
    padding: 10,
    backgroundColor: 'white',
    marginVertical: 5,
    // marginLeft: 5,
  },
  kk: {
    width: '80%',

    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    marginBottom: 8,
  },

  separator: {
    backgroundColor: 'grey',
    height: 1,
  },
  listView: {
    position: 'absolute',
    top: 105,
  },
  autocompleteContainer: {
    position: 'absolute',
    top: 0,
    left: 10,
    right: 10,
  },
  modalWrapper: {
    backgroundColor: 'white',
    borderRadius: 15,

    elevation: 4,
    marginTop: '15%',
  },
  quizBtn: {
    alignSelf: 'center',
    fontSize: 20,
    marginTop: 10,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#1596F3',
    backgroundColor: Theme.primary,
    width: '72%',
    padding: 7,
    color: '#1596F3',
  },
  addquiz: {
    alignSelf: 'flex-start',
    fontSize: 20,
    marginTop: 10,

    padding: 7,
    color: '#1596F3',
  },
  cancelBtn: {
    alignSelf: 'flex-start',
    fontSize: 20,
    marginTop: 10,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#1596F3',
    backgroundColor: Theme.white,
    padding: 7,
    marginBottom: 20,
    elevation: 3,
    width: '30%',
    color: '#1596F3',
  },
  arrivedBtn: {
    alignSelf: 'center',
    fontSize: 20,
    marginBottom: 20,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#1596F3',
    backgroundColor: Theme.primary,

    padding: 7,
    marginTop: 20,
    elevation: 3,
    // width: '42%',
    color: '#1596F3',
  },
  addpostBtn: {
    alignSelf: 'flex-start',
    fontSize: 20,
    marginTop: 10,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#1596F3',
    backgroundColor: Theme.primary,
    padding: 7,
    marginBottom: 50,
    elevation: 3,
    width: '42%',
    color: '#1596F3',
  },
  cancelfirst: {
    alignSelf: 'flex-start',
    fontSize: 20,
    marginTop: 20,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#1596F3',
    backgroundColor: Theme.white,
    padding: 7,
    elevation: 3,
    // marginBottom: 20,
    width: '42%',
    color: '#1596F3',
  },
  capturingBtn: {
    alignSelf: 'flex-start',
    fontSize: 20,
    marginTop: 10,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#1596F3',
    backgroundColor: Theme.primary,
    padding: 7,
    marginBottom: 20,
    elevation: 3,
    width: '27%',
    color: '#1596F3',
  },
  option: {
    color: 'black',
    alignSelf: 'flex-start',
    fontSize: 17,
  },
  value: {
    fontSize: 17,
    color: 'red',
  },
  // row: {
  //   // flexDirection: 'row',
  //   // justifyContent: 'center',
  //   // alignItems: 'center',
  //   // width: '50%',
  // },
  markerFixed: {
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  marker: {
    height: 40,
    width: 40,
    alignSelf: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginVertical: 10,
  },
  iconContainer: {
    backgroundColor: '#a2a2a2',
    padding: 5,
    borderRadius: 50,
    marginRight: 15,
  },
  locationText: {},

  circle: {
    width: 5,
    height: 5,
    backgroundColor: 'black',
    position: 'absolute',
    top: '16%',
    left: 15,
    borderRadius: 5,
  },
  line: {
    width: 1,
    height: 50,
    backgroundColor: '#c4c4c4',
    position: 'absolute',
    top: '17.5%',
    left: 17,
  },
  square: {
    width: 5,
    height: 5,
    backgroundColor: 'black',
    position: 'absolute',
    top: '26%',
    left: 15,
  },
  doneButton: {},
  slide1: {
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  cancelMarkerButton: {
    alignSelf: 'center',
    fontSize: 15,
    color: Theme.primary,
    fontWeight: 'bold',
  },
  addPostMarkerButton: {
    alignSelf: 'center',
    fontSize: 15,
    color: Theme.white,
    fontWeight: 'bold',
  },
  photoBorder: {
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 1,
    height: Theme.hp('20%'),
    width: Theme.wp('70%'),
    borderColor: Theme.primary,
  },
  UploadBtnTxt: {
    color: Theme.primary,
    fontSize: 20,
    padding: 4,
  },
  UploadBtn: {
    height: 35,
    width: '85%',
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    // backgroundColor: Theme.primary,
    marginTop: 20,
    borderColor: Theme.primary,
    borderWidth: 1,
  },
  Between2Btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop: 20,
  },
  PFCBtnTxt: {
    color: Theme.primary,
    fontSize: 20,
    textAlign: 'center',
  },
  imgEdit: {
    height: Theme.hp('20%'),
    width: Theme.wp('70%'),
    resizeMode: 'cover',
    borderRadius: 20,
  },
  addPostBtnTxt: {
    alignSelf: 'center',
    fontSize: 15,
    color: Theme.white,
    fontWeight: 'bold',
  },
  cancelBtnTxt: {
    alignSelf: 'center',
    fontSize: 15,
    color: Theme.primary,
    fontWeight: 'bold',
  },
});

export default styles;