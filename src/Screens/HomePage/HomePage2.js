/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-sequences */
/* eslint-disable react/self-closing-comp */
/* eslint-disable eqeqeq */
/* eslint-disable no-dupe-keys */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable curly */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
  LogBox,
  Platform,
  PermissionsAndroid,
  FlatList,
  ToastAndroid,
} from 'react-native';
import {data} from './data';
import Modal from 'react-native-modal';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../../Components/Headers/Headers';
import Theme from '../../Utils/Theme';
import styles from './Style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Dialog from 'react-native-dialog';
import MapView, {
  PROVIDER_GOOGLE,
  AnimatedRegion,
  Callout,
  Circle,
  Polyline,
} from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import Geocode from 'react-geocode';
import {useNavigation} from '@react-navigation/native';
import MapViewDirections from 'react-native-maps-directions';
import SearchAddress from '../../Components/AddressPickUp/SearchAddress';
import CustomBtn from '../../Components/CustomBtn/CustomBtn';
import AddressPickup from '../../Components/AddressPickUp/AddressPickUp';
import {GOOGLE_MAP_KEY} from '../../Constants/GoogleMapKey';
import imagePath from '../../Constants/imagePath';
import database from '@react-native-firebase/database';
import RBSheet from 'react-native-raw-bottom-sheet';
import * as geolib from 'geolib';
import {db, auth} from '../../Utils/Exports';
import userId from '../../Constants/userId';
import {getPreciseDistance} from 'geolib';
import Navigation from '../Navigations/StackNavigation';
import Destination from '../../Components/AddressPickUp/Destination';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Swiper from 'react-native-swiper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import LottieView from 'lottie-react-native';
import storage from '@react-native-firebase/storage';
import { NativeScreenNavigationContainer } from 'react-native-screens';

const screen = Dimensions.get('window');
const Aspect_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * Aspect_RATIO;
Geocoder.init(GOOGLE_MAP_KEY);
Geocode.setApiKey(GOOGLE_MAP_KEY);

const addItem = (item, item2, item3, item4, item5, item6, item7) => {
  const currentUid = auth.currentUser.uid;
  db.ref('Users/' + currentUid)
    .child('/Coords')
    .update({
      StartingPoint: item,
      EndingPoint: item2,
      City: item3,
      Description: item7,
      StartingAddress: item4,
      EndingAddress: item5,
      NameOfHunt: item6,
    });
};
const addpost = (item, item2, item3, item4, item5, item6, item7) => {
  const currentUid = auth.currentUser.uid;
  db.ref('Users/' + currentUid)
    .child('/Posts')
    .push({
      StartingPoint: item,
      EndingPoint: item2,
      City: item3,
      Description: item7,
      StartingAddress: item4,
      EndingAddress: item5,
      NameOfHunt: item6,
    });
};


const HomePage = ({props, navigation}) => {
  const [firstModal, setfirstModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [markerModel, setmarkerModel] = useState(false);
  const [markerPhotoModal, setmarkerPhotoModal] = useState(false);
  const [maapModal, setmaapModal] = useState(false);
  const [pickupArrival, setpickupArrival] = useState('');
  const [destinantionArrival, setdestinantionArrival] = useState('');
  const [Customlocation, setCustomlocation] = useState('');
  const [lineVisible, setLineVisible] = useState(false);
  const [markerBtn, setmarkerBtn] = useState(false);
  const [indexPost, setindexPost] = useState('');
  const [visible, setVisible] = useState(false);

  // const [newmarker, setnewmarker] = useState([]);
  const [city, setCity] = useState('');
  const [inputcity, setinputCity] = useState('');
  const [inputcity1, setinputCity1] = useState('');
  const [address, setAddress] = useState('');
  const [newRegion, setNewRegion] = useState();
  const [remove, setremove] = useState(0);
  const [namehunt, setNamehunt] = useState('');
  const [namePost, setnamePost] = useState('');
  const [descPost, setdescPost] = useState('');
  const [description, setDescription] = useState('');
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [loader, setloader] = useState(false);
  const [coordspoint, setcoordspoint] = useState({
    latitude: Number(0),
    longitude: Number(0),
    latitudeDelta: Number(0),
    longitudeDelta: Number(0),
  });
  const [destinatPoint, setdestinPoint] = useState({
    latitude: Number(0),
    longitude: Number(0),
    latitudeDelta: Number(0),
    longitudeDelta: Number(0),
  });

  {
    /*States for Image Upload*/
  }
  const [filePath, setFilePath] = useState({});
  const [img, SetImg] = useState('');
  const [ProfileImage, setProfileImage] = useState('');
  const [types, setType] = useState('');
  {
    /*States for Image Upload*/
  }

  const [state1, Setstate1] = useState({
    region: {
      latitude: Number(0),
      longitude: Number(0),
    },
  });
  const [StartingAddress, setStartingAddress] = useState();
  const [EndingAddress, setEndingAddress] = useState();
  const [startpointaddress, setstartpointaddress] = useState({
    latitude: Number(0),
    longitude: Number(0),
    latitudeDelta: Number(0),
    longitudeDelta: Number(0),
  });

  const [endpointaddress, setendpointaddress] = useState({
    latitude: Number(0),
    longitude: Number(0),
    latitudeDelta: Number(0),
    longitudeDelta: Number(0),
  });
  const [cities, setcities] = useState();
  // const [lineVisible, setLineVisible] = useState(false);
  // const [city, setcity] = useState([]);
  const [pickupCordss, SetpickCordss] = useState({
    latitude: Number(0),
    longitude: Number(0),
    latitudeDelta: Number(0),
    longitudeDelta: Number(0),
  });
  const [destinationCordss, SetdestinationCordss] = useState({
    latitude: Number(0),
    longitude: Number(0),
    latitudeDelta: Number(0),
    longitudeDelta: Number(0),
  });
  const [distance, setDistance] = useState('');
  // console.log('Descriptiion', description);
  const [markers, setMarkers] = useState([
    {
      pickupCords: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      destinationCords: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
    },
  ]);
  const [markersAddress, setMarkersAddress] = useState([
    {
      Location: '',
    },
  ]);

  const [post, setpost] = useState([]);
  const [alllatitude, setalllatitude] = useState({});
  const [allatitude, setallatitude] = useState({});
  const [locationbutton,setlocationbutton]=useState(false);
  const [hiding,sethiding]=useState(false);
  const [alldata, setalldata]=('');
  const [points,setpoints]=useState();
  handleMarkerPress = event => {
    const markerID = event.nativeEvent.identifier;
    alert(markerID);
  };
  const mapRef = useRef();
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();
  const [openView, setOpenView] = useState(false);

  const checkValid = () => {
    if (Object.keys(destinationCordss).length === 0) {
      showError('Please enter your destination location');
      return false;
    }
    if (Object.keys(pickupCordss).length === 0) {
      showError('Please enter your destination location');
      return false;
    }
    return true;
  };
  const onDone = async () => {
    //
    setOpenView(true);
    const isValid = checkValid();
    if (isValid) {
      pickupCordss,
        destinationCordss,
        // }
        setLineVisible(true);
      console.log(lineVisible);
      console.log('Pickupcords', pickupCordss);
      console.log('Destination ', destinationCordss);
      // setModalVisible(!modalVisible);
      setVisible(true);

      // navigation.navigate('userSide', {getCordinates: fetchValues});
    }
    // const cityVal1 = await AsyncStorage.getItem('cityVal1');
    // console.log('City1===>', cityVal1);
    // const cityVal1 = await AsyncStorage.getItem('cityVal1');

    addItem(
      pickupCordss,
      destinationCordss,
      city,
      inputcity,
      inputcity1,
      namehunt,
      description,
    );
    addpost(
      pickupCordss,
      destinationCordss,
      city,
      inputcity,
      inputcity1,
      namehunt,
      description,
    );
    // Alert.alert('Item saved successfully');
  };

  //////////////////////      Permissions      /////////////////////////////
  const handleLocationPermission = async () => {
    let permissionCheck = '';
    if (Platform.OS === 'ios') {
      permissionCheck = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (permissionCheck === RESULTS.DENIED) {
        const permissionRequest = await request(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        );
        permissionRequest === RESULTS.GRANTED
          ? 
          console.warn('Location permission granted.')
          : console.warn('Location perrmission denied.');
      }
    }

    if (Platform.OS === 'android') {
      permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (permissionCheck === RESULTS.DENIED) {
        const permissionRequest = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        permissionRequest === RESULTS.GRANTED
          ? console.warn('Location permission granted.')
          : console.warn('Location perrmission denied.');
      }
    }
  };
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };
  /////////////////////       Permissions-End        ///////////////////////

  const fetchAddressCords = (lat, lng, xyz) => {
    SetpickCordss({
      latitude: lat,
      longitude: lng,
    });

    // console.warn('City=>', xyz);
    setinputCity(xyz);
  };
  // console.warn('===>', pickupCordss);

  const fetchDestinationCords = (lat, lng, xyz1) => {
    SetdestinationCordss({
      latitude: lat,
      longitude: lng,
    });
    // console.warn('City1=====>', xyz1);
    setinputCity1(xyz1);
  };

  const postitem = () => {
    const ref = db.ref('Users/').child('/Coords');
    ref.on('value', snapshot => {
      const list = [];
      var customcoords=[];
      if (!snapshot.exists) {
        console.warn('no dataaa');
      } else {
        if (snapshot.val()) {
          snapshot.forEach(doc => {
            console.log('new marker',doc.val().newmarker);
            const xyz = {
              StartingAddress: doc.val().StartingAddress,
              EndingAddress: doc.val().EndingAddress,
              City: doc.val().City,
              EndingPoint: doc.val().EndingPoint,
              StartingPoint: doc.val().StartingPoint,
              Custom_Coords:doc.val().newmarker,
              // CustomMarkerCords:doc.val().Custom_Coords.CustomMarkerCords.latitude,
            };
            list.push(xyz);
          });
          setpost(list);
          if (post === null) {
            setOpenView(false);
          } else {
            setOpenView(true);
          }
        } else {
        }
      }
    });
  };
  // console.log(post);
  useEffect(() => {
    handleLocationPermission();
    getUserLocation();
    liveLocation();
    postitem();
    // allpostPoints();
    // setmarkerBtn(true);
    isWithinRange;
    DistancetoDestionation;
    DistancetoPickup;
    lastInd;
    customRange;

    LogBox.ignoreLogs([
      'MapViewDirections Error: Error on GMAPS route request: ZERO_RESULTS',
      ' [TypeError: undefined is not an object (evaluating json.results[5].formatted_address")]',
    ]);
  }, []);


  const onMapReady = () => {
    getUserLocation();
    liveLocation();
  };

  const getUserLocation = async () => {
    Geolocation.getCurrentPosition(
      async position => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      },

      async error => {
        console.log('Geolocation Error' + error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 10000},
    );
    // console.log('position.coords', position.coords.latitude);
  };

  const liveLocation = async () => {
    watchId = Geolocation.watchPosition(
      async position => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
        // console.log('Get Live Location after 3 sec ');
        // Setstate1({
        //   region: {
        //     latitude: position.coords.latitude,
        //     longitude: position.coords.longitude,
        //   },
        // });

        // console.log(
        //   'You are ',
        //   geolib.getDistance(position.coords, {
        //     // latitude: 31.480326,
        //     // longitude: 74.323998,
        //     latitude: destinationCordss.latitude,
        //     longitude: destinationCordss.longitude,
        //     // destinationCordss,
        //     // destinationCordss,
        //   }),
        //   'Meters away from Destination',
        // );
      },

      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 10000},
    );
  };
  useEffect(() => {
    const interval = setInterval(() => {
      liveLocation();
    }, 1000);

    return () => clearInterval(interval);
  });
  useEffect(() => {
    const intervall = setInterval(() => {
      closeModal();
      destionAr();
      PickupAr();
    }, 1000);

    return () => clearInterval(intervall);
  });
  // Geolocation.getCurrentPosition(info => console.log(info));
  // Geolocation.getCurrentPosition(position => console.log(position));
  // Geolocation.watchPosition(position => console.log(position));

  const mapModal = () => {
    setfirstModal(true);
  };
  const SearchValue = () => {
    setModalVisible(!modalVisible);
  };
  const markermodalcall = ind => {
    // setmarkerModel(!markerModel);
    refRBSheet2.current.open();
    // setremove(ind);
    // setmaapModal(!maapModal);
  };
  const postIndex = ind => {
    setindexPost(ind);
    // console.log('indexccccccccc', ind);
  };

  const markerPhoto = () => {
    setmarkerPhotoModal(!markerPhotoModal);
    //  setremove(ind);
  };
  const onChangeValue = region => {
    // alert(JSON.stringify(region));

    setNewRegion(region);
    Setstate1({
      region,
    });
    setDistance({
      // distance: dis / 1000,
      DistancetoDestionation,
      isWithinRange,
    });

    setTimeout(() => {
      Geocoder.from(state1.region.latitude, state1.region.longitude)
        .then(json => {
          let formatted_address = json.results[1].formatted_address;
          let city_address = json.results[5].formatted_address.split(',')[0];

          setAddress(formatted_address);
          setCity(city_address);
        })
        .catch(error => 
          console.log(error));
    }, 150);
    // console.warn('city==>', city);
    // console.warn('Address===', address);
  };
  setTimeout(() => {
    Geocoder.from(state1.region.latitude, state1.region.longitude)
      .then(json => {
        let formatted_address = json.results[1].formatted_address;
        let city_address = json.results[5].formatted_address.split(',')[0];

        setAddress(formatted_address);
        setCity(city_address);
      })
      .catch(error => console.log(error));
  }, 150);
  let DistancetoPickup = getPreciseDistance(
    {latitude: lat, longitude: long},
    {
      latitude: pickupCordss.latitude,
      longitude: pickupCordss.longitude,
    },
  );
  let DistancetoDestionation = getPreciseDistance(
    {latitude: lat, longitude: long},
    {
      latitude: destinationCordss.latitude,
      longitude: destinationCordss.longitude,
    },
  );

  // console.log('Working Distance:', c);

  let isWithinRange = markers.map((i, ind) => {
    return getPreciseDistance(
      {latitude: lat, longitude: long},
      {
        latitude: i.destinationCords.latitude,
        longitude: i.destinationCords.longitude,
      },
    );
  });
  let lastInd = isWithinRange[isWithinRange.length - 1];
  // console.log('Distance Custom:', isWithinRange);
  // console.log('Last Index', lastInd);

  let PointPickup = geolib.isPointWithinRadius(
    {latitude: lat, longitude: long},
    {
      latitude: pickupCordss.latitude,
      longitude: pickupCordss.longitude,
    },
    100,
  );
  // {
  //   PointPickup === true ? console.warn('Arrived At Location Pickup') : 'Yooo';
  // }

  let Point = geolib.isPointWithinRadius(
    {latitude: lat, longitude: long},
    {
      latitude: destinationCordss.latitude,
      longitude: destinationCordss.longitude,
    },
    100,
  );
  // {
  //   Point === true ? console.warn('Arrived At Location') : 'Yooo';
  // }

  let customRange = markers.map((i, ind) => {
    return geolib.isPointWithinRadius(
      {latitude: lat, longitude: long},
      {
        latitude: i.destinationCords.latitude,
        longitude: i.destinationCords.longitude,
      },
      100,
    );
  });

  const custimL = customRange[customRange.length - 1];
  // console.log(custimL);

  // {
  //   custimL === true ? console.warn('Arrived At Custom Location') : 'Yooo';
  // }

  const closeModal = () => {
    setCustomlocation(custimL);
    // console.log('CustomLocatioArrived', Customlocation);
  };

  const PickupAr = () => {
    setpickupArrival(PointPickup);
    // console.log('PickupArrival===', pickupArrival);
  };
  const destionAr = () => {
    setdestinantionArrival(Point);
    // console.log('DestinationArrival===', destinantionArrival);
  };

  // console.log('MarkerAddress--->', markersAddress);
  // let lastadd = markersAddress[markersAddress.length - 1];
  const output = Object.assign({}, ...markersAddress);
  // console.log('outPut---------', output);
  var string = JSON.stringify(output);
  // console.log('String.............', string);
  // console.log('lastadd--->', lastadd);
  // console.log('output--->', output);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    setVisible(false);
  };
  const onDeleteBTN = ind => {
    markers.pop(ind);
    const currentUid = auth.currentUser.uid;
    var indexString = ind.toString();
    db.ref('Users')
      .child(currentUid)
      .child('Custom-Coords')
      .child(indexString)
      .remove();
  };

  const pickPicture = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 400,
      cropping: true,
      // includeBase64: true,
    }).then(image => {
      console.log(image);
      SetImg(image.path);
      // setType(image.mime);
      setType({type: 'image/jpg'});
      Setpick({pick: true});
    });
  };

  {
    /* Taking Photo from Camera*/
  }

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        // console.log('base64 -> ', response.base64);
        // console.log('uri -> ', response.uri);
        // console.log('width -> ', response.width);
        // console.log('height -> ', response.height);
        // console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        // console.log('fileName -> ', response.fileName);
        setFilePath(response);
      });
    }
  };

  {
    /* Choose File from Gallery */
  }

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      // console.log('base64 -> ', response.base64);
      // console.log('uri -> ', response.uri);
      // console.log('width -> ', response.width);
      // console.log('height -> ', response.height);
      // console.log('fileSize -> ', response.fileSize);
      // console.log('type -> ', response.type);
      // console.log('fileName -> ', response.fileName);
      setFilePath(response);
    });
  };

  {
    /* Upload Image To Storage */
  }
  const uploadImage = async () => {
    const uploadUri = img;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    const storageRef = storage().ref(filename, auth.currentUser.uid);
    const task = storageRef.putFile(uploadUri);

    task.on('state_changed', snapshot => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      if (progress == 100) {
      }
      //  console.log('image uploaded')
    });

    try {
      await task;
      const url = await storageRef.getDownloadURL();
      SetImg(null);
      console.log('======URL==========>', url);
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const addMarkers = async (CustomMarkerCords, item2, item3, item4) => {
    const currentUid = auth.currentUser.uid;
    const ref = db
      .ref('Users/' + currentUid)
      .child('/Coords')
      .child('/Custom-Coords');
    let imgUrl = await uploadImage();
    var markerKey = db
      .ref('Users/' + currentUid)
      .child('/Coords')
      .child('/Custom-Coords')
      .push().key;
    ref.once('value', snapshot => {
      if (snapshot.val()) {
        let newmarker = [];
        newmarker = Object.values(snapshot.val());
        newmarker.push({
          CustomMarkerCords,
          PostName: item2,
          PostDesc: item3,
          PostAddress: item4,
          Image: imgUrl,
        });
        ref.set(newmarker);
        // ref.child(markerKey).set({
        //   Image: imgUrl,
        // });
        console.log('newMakrers', newmarker);
      } else {
        ref.child(markerKey).set({
          CustomMarkerCords,
          PostName: item2,
          PostDesc: item3,
          PostAddress: item4,
          Image: imgUrl,
        });

        // ref.child(markerKey).set(item2);
        console.log(CustomMarkerCords);
      }
    });

    // db.ref('Users/' + currentUid)
    //   .child('/Custom-Coords')
    //   .child('info')
    //   .set({
    //     Postname: item2,
    //   });
  };
  const addMarkerpost = async (CustomMarkerCords, item2, item3, item4) => {
    const currentUid = auth.currentUser.uid;
    const ref = db
      .ref('Users/' + currentUid)
      .child('/Posts')
      .child('/Custom-Coords');
    let imgUrl = await uploadImage();
    var markerKey = db
      .ref('Users/' + currentUid)
      .child('/Posts')
      .child('/Custom-Coords')
      .push().key;
    ref.once('value', snapshot => {
      if (snapshot.val()) {
        let newmarker = [];
        newmarker = Object.values(snapshot.val());
        newmarker.push({
          CustomMarkerCords,
          PostName: item2,
          PostDesc: item3,
          PostAddress: item4,
          Image: imgUrl,
        });
        ref.set(newmarker);
        // ref.child(markerKey).set({
        //   Image: imgUrl,
        // });
        console.log('newMakrers', newmarker);
      } else {
        ref.child(markerKey).set({
          CustomMarkerCords,
          PostName: item2,
          PostDesc: item3,
          PostAddress: item4,
          Image: imgUrl,
        });

        // ref.child(markerKey).set(item2);
        console.log(CustomMarkerCords);
      }
    });

    // db.ref('Users/' + currentUid)
    //   .child('/Custom-Coords')
    //   .child('info')
    //   .set({
    //     Postname: item2,
    //   });
  };
  const markerbubble = ind => {
    Alert.alert(
      'Post Marker',
      'Do You Want To Delete Marker Post?, Press Cancel To Not Delete And Press Ok To Delete',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
        {text: 'OK', onPress: () => onDeleteBTN(ind)},
      ],
      {cancelable: false},
    );
  };
  const showToast = () => {
    ToastAndroid.showWithGravity(
      'Point Added',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };
  const startpoint = (startlongitude, startlatitude) => {
    setloader(true);
    const cooords = {
      latitude: startlatitude,
      longitude: startlongitude,
    };
    SetpickCordss(cooords);
    setinputCity(address);
    console.log('Point Adress', cooords);
    refRBSheet2.current.close();
  };
  const endpoint = (endlongitude, endlatitude) => {
    const cooords = {
      latitude: endlatitude,
      longitude: endlongitude,
    };
    SetdestinationCordss(cooords);
    setinputCity1(address);
    console.log('Ending point', cooords);
    refRBSheet2.current.close();
  };
  useEffect(() => {
    // getcord();
  }, []);
  const getCity = async () => {
    const currentUid = auth.currentUser.uid;
    const Stp = db.ref('Users/' + currentUid).child('/Coords');
    Stp.on('value', snapshot => {
      if (!snapshot.exists) {
        console.warn('no dataaa');
      } else {
        if (snapshot.val()) {
          // console.log(snapshot.val());
          const {StartingPoint} = snapshot.val();
          const {EndingPoint} = snapshot.val();
          var cords = EndingPoint;
          var cord = StartingPoint;
          setcoordspoint(cord);
          setdestinPoint(cords);
          // console.log('PickUp Coords  ', coordspoint);
          // console.log(' Destination coords', destinatPoint);
        } else {
        }
      }
    });
  };
  const postitems = () => {
    const ref = db.ref('Users/' + auth.currentUser.uid).child('/Posts');
    ref.on('value', snapshot => {
      const list = [];
      if (!snapshot.exists) {
        console.warn('no dataaa');
      } else {
        if (snapshot.val()) {
          // snapshot.forEach(doc => {
          //   const Starting = {
          //     StartingAddress: doc.val().StartingAddress,
          //   };
          //   setStartingAddress(Starting);
          //   const Ending = {
          //     EndingAddress: doc.val().EndingAddress,
          //   };
          //   setEndingAddress(Ending);
          //   const Cities = {
          //     City: doc.val().City,
          //   };
          //   setcities(Cities);
          //   const StartPoint = {
          //     EndingAddress: doc.val().StartingPoint,
          //   };
          //   setstartpointaddress(StartPoint);
          //   const EndingPoint = {
          //     EndingAddress: doc.val().EndingPoint,
          //   };
          //   setendpointaddress(EndingPoint);
          //   console.log('Starting', StartingAddress);
          //   console.log('Ending', EndingAddress);
          //   console.log('Cities', cities);
          //   console.log('StartPoint', startpointaddress);
          //   console.log('End Point', endpointaddress);
          // });
          snapshot.forEach(doc => {
            const xyz = {
              StartingAddress: doc.val().StartingAddress,
              EndingAddress: doc.val().EndingAddress,
              City: doc.val().City,
              EndingPoint: doc.val().EndingPoint,
              StartingPoint: doc.val().StartingPoint,
            };
            list.push(xyz);
            setStartingAddress(list);
          });
          console.log(list);
        } else {
        }
      }
    });
  };

  const alldone =()=>{
    if (namehunt === ''){
      alert('Please Enter Name of Hunt');
    }
    else if(description === ''){
      alert('Please Enter Description');
    } 
    else{
      navigation.replace('HomePage',{
        Hunt:namehunt,
        Description1:description,
      });
    }
 }
//  console.log('aaaaaaa',Hunt);
//  console.log('ccccccc',des);

 const getcord = async () => {
  var customcoords =[];
  const currentUid = auth.currentUser.uid;
  const Stp = db.ref('Users/' + currentUid).child('/Posts');
  Stp.on('value', snapshot => {
    if (!snapshot.exists) {
      console.warn('no dataaa');
    } else {
      snapshot.forEach(coordsnap=>{
        coordsnap.val().Custom_Coords.forEach(i => {
         const data = {
          ref: coordsnap.ref.key,
          data: {
            latitude: i.CustomMarkerCords.latitude,
            longitude: i.CustomMarkerCords.longitude,
          }
        }
        // setallatitude(data);
        customcoords.push(data);
        customcoords.map((item,index)=>{
          // console.log('Allllllll',item);
         const pointsdata={
              latitude: item.data.latitude,
              longitude: item.data.longitude,
          }
          setallatitude(pointsdata);
        })
        })
        // setallatitude(customcoords);
        console.log('kkkkk',allatitude);
        // const data = {
        //   ref: coordsnap.ref.key,
        //   data: {
        //     latitude: coordsnap.val().CustomMarkerCords.latitude,
        //     longitude: coordsnap.val().CustomMarkerCords.longitude
        //   }
        // }
        // customcoords.push(data)
        // console.log(customcoords);
        // setalllatitude(customcoords);
      })
    }
        //  console.log('alll values coords==>',alllatitude);

  });
}

// console.log('Values1111111',item.Custom_Coords);

  return (
    <SafeAreaView style={styles.MainView}>
      <Header
        label={'Where To Start & End Hunt?'}
        headerThreeComp={true}
        searchPress={() => refRBSheet.current.open()}
        navigation={navigation}
      />
      <StatusBar barStyle="dark-content" />
      <View>
        <View style={{justifyContent: 'center'}}>
          <MapView
            ref={mapRef}
            followsUserLocation={true}
            onRegionChangeComplete={txt => onChangeValue(txt)}
            onMapReady={() => onMapReady()}
            showsUserLocation={true}
            loadingEnabled={true}
            // toolbarEnabled={true}
            showsMyLocationButton={false}
            zoomEnabled={true}
            pitchEnabled={true}
            showsCompass={true}
            // showsBuildings={true}
            // showsIndoors={true}
            rotateEnabled={true}
            style={{height: '100%'}}
            // initialRegion={state.region}
            // onPress={() => mapModal()}
            onPress={() => {
              // setModalVisible(!modalVisible);
              // refRBSheet2.current.open();
              // showDialog();
              // setmarkerBtn(true);
              // navigation.navigate('UserSideMap');
            }}
            initialRegion={{
              ...pickupCordss,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}>
            {lineVisible === true ? (
              <>
                {pickupCordss === 0 ? null : (
                  <>
                    <Marker
                      coordinate={{
                        ...pickupCordss,
                      }}
                      image={imagePath.icCurLoc}>
                      <Callout>
                        <View style={{height: 100, width: 200}}>
                          <Text
                            style={{
                              fontSize: 20,
                              color: 'red',
                              alignSelf: 'center',
                            }}>
                            {DistancetoPickup} Meter
                          </Text>
                          <Text>{PointPickup}</Text>
                          <Text
                            style={{
                              fontSize: 20,
                              color: 'black',
                              alignSelf: 'center',
                            }}>
                            {' '}
                            Start Point
                          </Text>
                        </View>
                      </Callout>
                    </Marker>
                  </>
                )}

                {destinationCordss === 0 ? null : (
                  <>
                    <Marker
                      coordinate={{
                        ...destinationCordss,
                      }}
                      image={imagePath.icGreenMaker}
                      animation={true}>
                      <Callout>
                        <View style={{height: 100, width: 200}}>
                          <Text
                            style={{
                              fontSize: 20,
                              color: 'red',
                              alignSelf: 'center',
                            }}>
                            {DistancetoDestionation} Meter
                          </Text>
                          <Text>{Point}</Text>
                          <Text
                            style={{
                              fontSize: 20,
                              color: 'black',
                              alignSelf: 'center',
                            }}>
                            {' '}
                            Destination Point
                          </Text>
                        </View>
                      </Callout>
                    </Marker>
                  </>
                )}

                {markers.map((i, ind) => (
                  <MapView.Circle
                    center={i.destinationCords}
                    radius={35}
                    strokeWidth={2.5}
                    strokeColor="red"
                    fillColor="#B9B9B9"
                    key={ind}
                  />
                ))}

                <MapView.Circle
                  center={destinationCordss}
                  radius={50}
                  strokeWidth={3.5}
                  strokeColor="red"
                  fillColor="#B9B9B9"
                  animation={true}
                />
              </>
            ) : null}

            <MapViewDirections
              origin={pickupCordss}
              destination={destinationCordss}
              optimizeWaypoints={true}
              mode="DRIVING"
              precision="high"
              apikey={GOOGLE_MAP_KEY}
              strokeWidth={3}
              waypoints={[
                {
                  latitude: pickupCordss.latitude,
                  longitude: pickupCordss.longitude,
                },
                {
                  latitude: destinationCordss.latitude,
                  longitude: destinationCordss.longitude,
                },
              ]}
            />

            {markers.map(
              (i, ind) => (
                // console.log('=================', ind),
                i.destinationCords.latitude,
                i.destinationCords.longitude,
                i.destinationCords.longitudeDelta,
                ind,
                i.destinationCords.latitudeDelta === 0 ? null : (
                  <>
                    <Marker
                      coordinate={i.destinationCords}
                      // image={imagePath.icGreenMaker}
                      key={ind}
                      tracksViewChanges={true}
                      tracksInfoWindowChanges={true}
                      animation={true}
                      ref={ref => {
                        markers[markers.ind] = ref;
                      }}
                      onPress={() => {
                        markermodalcall(ind);
                        postIndex(ind);
                      }}
                      onCalloutPress={() => {
                        navigation.navigate('AddQuiz', {});
                      }}>
                      <Image
                        source={imagePath.icGreenMaker}
                        style={{height: 25, width: 25}}
                      />
                      {/* // onCalloutPress={() => {
                    //   markers.hideCallout();
                    // }}> */}
                      {/* <Callout tooltip={true} /> */}

                      {/* <Callout>
                      <Text>{ind}</Text>
                    </Callout> */}
                      {/* <MapView.Marker onLongPress={() => markers.pop(ind)} /> */}
                    </Marker>
                  </>
                )
              ),
            )}
            {data.map((val, i) => {
              return <Marker coordinate={val.coords} />;
            })}
          </MapView>

          <View style={styles.markerFixed}>
            <Image
              style={styles.marker}
              source={require('../../Assets/marker1.png')}
            />
            <Text style={styles.geoAddress}>{address}</Text>
          </View>
        </View>

        {/* Search and Posts */}
        <View
          style={{
            position: 'absolute',
            width: Theme.wp('90%'),
            marginLeft: 20,
            marginTop: 20,
          }}>
          <SearchAddress
            placheholderText="Search Place"
            fetchAddress={fetchAddressCords}
          />
        </View>
        {openView === true ? (
          <>
            <View style={{position: 'absolute'}}>
              <View
                style={{
                  height: Theme.hp('17%'),
                  backgroundColor: Theme.white,
                  // height: Theme.hp('17%'),
                  width: Theme.wp('90%'),
                  marginLeft: 20,
                  marginTop: 80,
                  borderRadius: 10,
                }}>
                <FlatList
                  data={post}
                  renderItem={({item, index}) => {
                  // console.log(item.Custom_Coords);
                    return (
                      <>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('UserSideMap2', {
                              StartAddress: item.StartingAddress,
                              EndAddress: item.EndingAddress,
                              Startcordvalue: item.StartingPoint,
                              Endcoordsvalue: item.EndingPoint,
                              cityy: item.City,
                              Coord:item.Custom_Coords,
                            });
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginLeft: 30,
                              marginTop: 10,
                              width: 270,
                            }}>
                            <Text style={{fontSize: 18}}>
                              {item.City} (3 post)
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <View style={{width: 300}}>
                              <Text style={{marginLeft: 30, marginTop: 5}}>
                                {item.StartingAddress} {' To '}{' '}
                                {item.EndingAddress}
                              </Text>
                            </View>
                          </View>
                          <View style={{borderWidth: 0.5, marginTop: 10}} />
                        </TouchableOpacity>
                      </>
                    );
                  }}
                />
              </View>
            </View>
          </>
        ) : null }
      </View>

      {markerBtn === true ? (
        <>
          <TouchableOpacity
            onPress={() => {
              setMarkers([...markers, {destinationCords: newRegion}]);
              setMarkersAddress([...markersAddress, {Location: address}]);
              showToast();
              // refRBSheet2.current.open();

              // addMarkers(newRegion);
            }}
            style={styles.wrapPlusBtn2}>
            <Entypo size={Theme.iconSize} color={Theme.white} name="location" />
          </TouchableOpacity>
        </>
      ) : null}
      {/* Location button map */}
      { hiding === true ? <>

      </>:<>
      <TouchableOpacity
       onPress={() => {
          setlocationbutton(true);
          sethiding(true)
          mapRef.current.animateToRegion({
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }}
       style={{position:'absolute', bottom: '5%',right: '5%', width: Theme.wp('15%'),
          }}>
      <View style={{right: '15%',flex:1}}>
      <LottieView
          style={{height:70,width:50}}
          source={require('../../../dropdown.json')}
          autoPlay
          loop
        />
      </View>
       <View
        style={{
          backgroundColor: Theme.primary,
          width: Theme.wp('15%'),
          height: Theme.wp('15%'),
          borderRadius: 90,
          alignItems: Theme.align,
          justifyContent: Theme.align,
          // position: 'absolute',
          top: '0%',
          right: '5%',
        }}>
        <MaterialIcons name='my-location' color={Theme.white} size={Theme.iconSize}/>
      </View>
</TouchableOpacity>
      </>}
      { locationbutton === true ? (
        <TouchableOpacity
        onPress={() => {
          mapRef.current.animateToRegion({
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }}
        style={styles.wrapPlusBtn}>
        <MaterialIcons name='my-location' color={Theme.white} size={Theme.iconSize}/>
        {/* <Image source={require('../../Assets/pin.png')} style={{height:50, width:50}} /> */}
      </TouchableOpacity>
      ):
     null
      }

      {/*  First MOdal start */}
      <Modal
        animationType="fade"
        onBackButtonPress={() => {
          setModalVisible(!modalVisible);
        }}
        transparent
        hasBackdrop={false}
        avoidKeyboard={false}
        isVisible={modalVisible}
        animationIn="slideInUp"
        coverScreen={false}>
        <View style={styles.modalWrapper}>
          <Text style={styles.heading}>Enter Details</Text>
          <Text style={styles.bottomLine}></Text>

          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            style={{
              padding: 20,

              // width: '100%',
            }}>
            <TextInput
              placeholder="Enter Hunt Description"
              placeholderTextColor="#37709a"
              onChangeText={Text => setDescription(Text)}
              value={description}
              style={styles.descTxt}
              multiline
            />
            <Text style={styles.headingText}>
              Enter Address where to start hunt
            </Text>
            <AddressPickup
              placheholderText="Where To Start Hunt?"
              fetchAddress={fetchAddressCords}
            />
            <View style={{}}>
              <Text style={styles.headingText}>
                Enter address where to End hunt
              </Text>
              <Destination
                placheholderText="Where To End Hunt?"
                fetchAddress1={fetchDestinationCords}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  style={styles.cancelfirst}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: 15,
                      color: Theme.primary,
                      fontWeight: 'bold',
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <CustomBtn
                  btnText="Save"
                  onPress={onDone}
                  btnStyle={{marginTop: 20}}
                />
              </View>
            </View>
            {visible === true ? (
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                  showDialog();
                  setmarkerBtn(true);
                  navigation.navigate('UserSideMap');
                }}
                style={styles.markerBtn}>
                <Text style={styles.markerBtnText}>Add Posts on Map +</Text>
              </TouchableOpacity>
            ) : null}
          </KeyboardAwareScrollView>
        </View>
      </Modal>

      {/*  Marker MOdal  */}
      {/* <Modal
        animationType="fade"
        onBackButtonPress={() => {
          setmarkerModel(!markerModel);
        }}
        onBackdropPress={() => setmarkerModel(!markerModel)}
        hasBackdrop={true}
        avoidKeyboard={false}
        isVisible={markerModel}
        animationIn="slideInUp"
        coverScreen={false}>
        <View style={styles.modalWrapper}>
          <View style={{width: '90%', alignSelf: 'center'}}>
            <Text style={styles.heading}>Details Of # Post {indexPost} </Text>

            <ScrollView style={{}}>
              <View style={{paddingTop: 10}}>
                <View style={{width: '100%', alignSelf: 'center'}}>
                  <TextInput
                    placeholder="Name Of Post"
                    placeholderTextColor="#E5E8E8"
                    onChangeText={Text => setnamePost(Text)}
                    value={namePost}
                    style={styles.markerTxin}
                    multiline
                  />
                  <Text style={styles.heading2}>
                    Information about # Post {indexPost}{' '}
                  </Text>
                  <View
                    style={{
                      width: '100%',
                      height: 130,
                      borderRadius: 13,
                      borderWidth: 1,
                      borderColor: '#e1e1e1',

                      marginBottom: 17,
                    }}>
                    <TextInput
                      placeholder="Enter Post Description"
                      placeholderTextColor="#E5E8E8"
                      onChangeText={Text => setdescPost(Text)}
                      value={descPost}
                      style={styles.markerin}
                      multiline
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        width: 200,
                        bottom: 10,
                      }}>
                      <TouchableOpacity
                        // onPress={() =>
                        //   navigation.navigate('CreatorPhotoUpload')
                        // }>
                        onPress={() => markerPhoto()}>
                        <AntDesign
                          size={20}
                          color={Theme.primary}
                          name="picture"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('SoundHome')}>
                        <AntDesign
                          size={20}
                          color={Theme.primary}
                          name="sound"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Entypo
                          size={20}
                          color={Theme.primary}
                          name="dots-three-horizontal"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={{width: '95%'}}>
                    <Text style={styles.option}>
                      Distance From Your Location :
                    </Text>
                    <Text style={styles.value}> {lastInd} Meters</Text>
                    <Text>{customRange}</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={{width: '95%'}}>
                    <Text style={styles.option}>Address: </Text>
                    <Text style={styles.value}>{address}</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <TouchableOpacity
                  // onPress={() => navigation.navigate('AddQuiz')}
                  onPress={() => {
                    navigation.navigate('AddQuiz', {
                      MarkerIndex: indexPost,
                    });
                  }}
                  style={styles.addquiz}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: 15,
                      color: Theme.primary,
                      fontWeight: 'bold',
                    }}>
                    Add Quiz +
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    onDeleteBTN(remove);
                    setmarkerModel(!markerModel);
                  }}
                  style={styles.addquiz}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: 15,
                      color: Theme.red,
                      fontWeight: 'bold',
                    }}>
                    Delete Marker -
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <TouchableOpacity
                  onPress={() => setmarkerModel(!markerModel)}
                  style={styles.cancelBtn}>
                  <Text style={styles.cancelBtnTxt}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setmarkerModel(!markerModel);
                    addMarkers(newRegion, namePost, descPost, address);
                    addMarkerpost(newRegion, namePost, descPost, address);
                  }}
                  style={styles.addpostBtn}>
                  <Text style={styles.addPostBtnTxt}>Add Post</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal> */}

      {/*  Create Hunt MOdal  */}

      {/* <Modal
        animationType="fade"
        onBackButtonPress={() => {
          setfirstModal(!firstModal);
        }}
        transparent
        hasBackdrop={false}
        avoidKeyboard={false}
        isVisible={firstModal}
        animationIn="slideInUp"
        coverScreen={false}>
        <View style={styles.modalWrapper}>
          <Text style={styles.heading}>Create Hunt</Text>

          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            style={{
              padding: 20,

              // width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                  // showDialog();
                  // setmarkerBtn(true);
                  navigation.replace('UserSideMap');
                }}
                style={styles.capturingBtn}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 15,
                    color: Theme.white,
                    fontWeight: 'bold',
                  }}>
                  Start The Journey
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </Modal> */}

      {/* map press model */}

      {/* <Modal
        animationType="fade"
        onBackButtonPress={() => {
          setmaapModal(!maapModal);
        }}
        transparent
        hasBackdrop={false}
        avoidKeyboard={false}
        isVisible={firstModal}
        animationIn="slideInUp"
        coverScreen={false}>
        <View style={styles.modalWrapper}>
          <Text style={styles.heading}>Create Hunt</Text>

          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            style={{
              padding: 20,

              // width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <TouchableOpacity
                onPress={() => {
                  // setModalVisible(!modalVisible);
                  // showDialog();
                  // setmarkerBtn(true);
                  // navigation.replace('UserSideMap');
                }}
                style={styles.capturingBtn}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 15,
                    color: Theme.white,
                    fontWeight: 'bold',
                  }}>
                  Start Point
                </Text>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 15,
                    color: Theme.white,
                    fontWeight: 'bold',
                  }}>
                  Custom Point
                </Text>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 15,
                    color: Theme.white,
                    fontWeight: 'bold',
                  }}>
                  End Point
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </Modal> */}

      {/*  Arrived Marker At  Custom Destination  MOdal  */}
      {/* <Modal
        animationType="fade"
        transparent
        hasBackdrop={false}
        avoidKeyboard={false}
        isVisible={Customlocation}
        onBackButtonPress={() => {
          setCustomlocation(!Customlocation);
          console.log('Whenback pressed', Customlocation);
        }}
        // onModalShow={setarrivedModel(false)}
        animationIn="slideInUp"
        coverScreen={false}>
        <View style={styles.modalWrapper}>
          <View style={{}}>
            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'center',
                // width: 200,
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 35,
                  width: 35,
                  borderRadius: 35,
                  borderWidth: 1,
                  borderColor: 'white',
                  margin: 10,
                  alignItems: 'center',
                  backgroundColor: '#2ECC71',
                }}>
                <Entypo
                  size={15}
                  color={Theme.white}
                  name="check"
                  style={{padding: 10}}
                />
              </View>

              <Text style={{padding: 10, fontSize: 20}}>
                Yay! You have arrived
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../Assets/flag.png')}
                style={{
                  height: 30,
                  width: 30,
                  marginLeft: 50,
                  marginTop: 10,
                }}
              />
              <View style={{width: '80%', marginLeft: 10}}>
                <Text style={{color: 'black', marginLeft: 5, fontSize: 20}}>
                  {address}
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={{
                  color: 'black',
                  marginLeft: 5,
                  fontSize: 20,
                  marginLeft: 50,
                  marginTop: 10,
                }}>
                {' '}
                City : {city}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('AddQuiz')}
                style={styles.arrivedBtn}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 17,
                    color: Theme.white,
                    fontWeight: 'bold',
                  }}>
                  You can post quiz here
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> */}

      {/*  Marker Start Point MOdal  */}
      {/* <Modal
        animationType="fade"
        transparent
        hasBackdrop={false}
        avoidKeyboard={false}
        isVisible={pickupArrival}
        onBackButtonPress={() => {
          setpickupArrival(!pickupArrival);
        }}
        // onModalShow={setarrivedModel(false)}
        animationIn="slideInUp"
        coverScreen={false}>
        <View style={styles.modalWrapper}>
          <View style={{}}>
            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'center',
                // width: 200,
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 35,
                  width: 35,
                  borderRadius: 35,
                  borderWidth: 1,
                  borderColor: 'white',
                  margin: 10,
                  alignItems: 'center',
                  backgroundColor: '#2ECC71',
                }}>
                <Entypo
                  size={15}
                  color={Theme.white}
                  name="check"
                  style={{padding: 10}}
                />
              </View>

              <Text style={{padding: 10, fontSize: 20}}>
                Yay! You at Starting point
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',
              }}>
              <Image
                source={require('../../Assets/flag.png')}
                style={{
                  height: 30,
                  width: 30,
                  marginLeft: 50,
                  marginTop: 10,
                }}
              />
              <Text style={{color: 'black', marginLeft: 5, fontSize: 20}}>
                {' '}
                {address}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: 'black',
                  marginLeft: 5,
                  fontSize: 20,
                  marginLeft: 50,
                  marginTop: 10,
                }}>
                {' '}
                City : {city}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setpickupArrival(!pickupArrival);
                  console.log('BackPressPickup = ', pickupArrival);
                }}
                style={styles.arrivedBtn}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 17,
                    color: Theme.white,
                    fontWeight: 'bold',
                  }}>
                  Finish
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> */}

      {/* Destination Marker Modal */}
      {/* <Modal
        animationType="fade"
        transparent
        hasBackdrop={false}
        avoidKeyboard={false}
        isVisible={destinantionArrival}
        onBackButtonPress={() => {
          setdestinantionArrival(!destinantionArrival);
          console.log('DestinationBackButton= ', destinantionArrival);
        }}
        // onModalShow={setarrivedModel(false)}
        animationIn="slideInUp"
        coverScreen={false}>
        <View style={styles.modalWrapper}>
          <View style={{}}>
            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'center',
                // width: 200,
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 35,
                  width: 35,
                  borderRadius: 35,
                  borderWidth: 1,
                  borderColor: 'white',
                  margin: 10,
                  alignItems: 'center',
                  backgroundColor: '#2ECC71',
                }}>
                <Entypo
                  size={15}
                  color={Theme.white}
                  name="check"
                  style={{padding: 10}}
                />
              </View>

              <Text style={{padding: 10, fontSize: 20}}>
                Yay! You at destination point
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',
              }}>
              <Image
                source={require('../../Assets/flag.png')}
                style={{
                  height: 30,
                  width: 30,
                  marginLeft: 50,
                  marginTop: 10,
                }}
              />
              <Text style={{color: 'black', marginLeft: 5, fontSize: 20}}>
                {' '}
                {address}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: 'black',
                  marginLeft: 5,
                  fontSize: 20,
                  marginLeft: 50,
                  marginTop: 10,
                }}>
                {' '}
                City : {city}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setdestinantionArrival(!destinantionArrival);
                  console.log('BackPressDestination = ', destinantionArrival);
                }}
                style={styles.arrivedBtn}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 17,
                    color: Theme.white,
                    fontWeight: 'bold',
                  }}>
                  Finish
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> */}

      {/* Marker Photo Modal */}

      {/* <Modal
        animationType="fade"
        onBackButtonPress={() => {
          setmarkerPhotoModal(!markerPhotoModal);
        }}
        onBackdropPress={() => setmarkerPhotoModal(!markerPhotoModal)}
        hasBackdrop={true}
        avoidKeyboard={false}
        isVisible={markerPhotoModal}
        animationIn="slideInUp"
        coverScreen={false}>
        <View style={styles.modalWrapper}>
          <View style={{width: '90%', alignSelf: 'center'}}>
            <Text style={styles.heading}>
              {' '}
              Add Photo on # Post {indexPost}{' '}
            </Text>

            <ScrollView style={{paddingTop: 10}}>
              <View style={{paddingVertical: '15%'}}>
                <View style={styles.photoBorder}>
                  {img == '' ? (
                    <>
                      <Entypo
                        name={'camera'}
                        size={45}
                        color={'gray'}
                        style={{paddingTop: '17%'}}
                      />
                    </>
                  ) : (
                    <>
                      <Image
                        style={styles.imgEdit}
                        source={{
                          uri: img,
                        }}
                      />
                    </>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.UploadBtn}
                  onPress={() => captureImage('photo')}>
                  <Text style={styles.PFCBtnTxt}>Take Photo From Camera</Text>
                </TouchableOpacity>
                <View>
                  <TouchableOpacity
                    style={styles.UploadBtn}
                    onPress={() => pickPicture()}>
                    <Text style={styles.UploadBtnTxt}>Choose From Gallery</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.Between2Btn}>
                <TouchableOpacity
                  onPress={() => setmarkerPhotoModal(!markerPhotoModal)}
                  style={styles.cancelBtn}>
                  <Text style={styles.cancelMarkerButton}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  // onPress={() => {
                  //   setmarkerPhotoModal(!markerPhotoModal),
                  //     addMarkers(newRegion, namePost, descPost, address);
                  // }}
                  onPress={() => {
                    setmarkerPhotoModal(!markerPhotoModal);
                  }}
                  style={styles.addpostBtn}>
                  <Text style={styles.addPostMarkerButton}>Save</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal> */}

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
        }}>
        <RBSheet
          ref={refRBSheet}
          height={300}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <Text style={styles.heading}>Create Hunt</Text>

          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            style={{
              padding: 20,

              // width: '100%',
            }}>
            <TextInput
              placeholder="Write Name Of Hunt"
              placeholderTextColor="#37709a"
              onChangeText={Text => setNamehunt(Text)}
              value={namehunt}
              style={styles.descTxt}
              multiline
            />
            <TextInput
              placeholder="Enter Hunt Description"
              placeholderTextColor="#37709a"
              onChangeText={Text => setDescription(Text)}
              value={description}
              style={styles.descTxt}
              multiline
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                marginBottom: 30,
              }}>
              <TouchableOpacity
                onPress={() => refRBSheet.current.close()}
                style={{
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
                  width: '42%',
                  color: '#1596F3',
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 15,
                    color: Theme.primary,
                    fontWeight: 'bold',
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  alldone();
                }}
                style={{
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
                  width: '42%',
                  color: '#1596F3',
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 15,
                    color: Theme.white,
                    fontWeight: 'bold',
                  }}>
                  Start Capturing
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </RBSheet>
        <RBSheet
          ref={refRBSheet2}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <Text style={styles.heading}>Choose Point</Text>

          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            style={{
              padding: 20,
              // width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <TouchableOpacity
                onPress={() => {
                  startpoint(newRegion.latitude, newRegion.longitude);
                  // onDone();
                  // addMarkers(newRegion, address);

                  // mapRef.current.animateToRegion({
                  //   latitude: lat,
                  //   longitude: long,
                  //   latitudeDelta: 0.0922,
                  //   longitudeDelta: 0.0421,
                  // });
                }}
                style={styles.cancelBtn}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 15,
                    color: Theme.primary,
                    fontWeight: 'bold',
                  }}>
                  Start Point
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // setModalVisible(!modalVisible);
                  // setfirstModal(!firstModal);
                  // refRBSheet1.current.open();
                  setmarkerModel(!markerModel);
                  refRBSheet2.current.close();
                }}
                style={styles.capturingBtn}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 15,
                    color: Theme.white,
                    fontWeight: 'bold',
                  }}>
                  Post
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  endpoint(newRegion.latitude, newRegion.longitude);
                  // onDone();
                  // addMarkers(newRegion, address);

                  // setModalVisible(!modalVisible);
                  // setfirstModal(!firstModal);
                  // refRBSheet1.current.open();
                  // endpoint(
                  //   destinationCordss.latitude,
                  //   destinationCordss.longitude,
                  // );
                }}
                style={{
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
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 15,
                    color: Theme.white,
                    fontWeight: 'bold',
                    color: '#1596F3',
                  }}>
                  End Point
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </RBSheet>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
        }}>
        <RBSheet
          ref={refRBSheet1}
          height={450}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <Text style={styles.heading}>Enter Details</Text>
          <Text style={styles.bottomLine}></Text>

          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            style={{
              padding: 20,

              // width: '100%',
            }}>
            <TextInput
              placeholder="Enter Hunt Description"
              placeholderTextColor="#37709a"
              onChangeText={Text => setDescription(Text)}
              value={description}
              style={styles.descTxt}
              multiline
            />
            <Text style={styles.headingText}>
              Enter Address where to start hunt
            </Text>
            <AddressPickup
              placheholderText="Where To Start Hunt?"
              fetchAddress={fetchAddressCords}
            />
            <View style={{}}>
              <Text style={styles.headingText}>
                Enter address where to End hunt
              </Text>
              <Destination
                placheholderText="Where To End Hunt?"
                fetchAddress1={fetchDestinationCords}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  style={styles.cancelfirst}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: 15,
                      color: Theme.primary,
                      fontWeight: 'bold',
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <CustomBtn
                  btnText="Save"
                  onPress={() => {
                    onDone();
                    setfirstModal(!firstModal);
                    refRBSheet1.current.close();
                    refRBSheet.current.close();
                  }}
                  btnStyle={{marginTop: 20}}
                />
              </View>
            </View>
            {visible === true ? (
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                  showDialog();
                  setmarkerBtn(true);
                  navigation.replace('UserSideMap');
                }}
                style={styles.markerBtn}>
                <Text style={styles.markerBtnText}>Add Posts on Map +</Text>
              </TouchableOpacity>
            ) : null}
          </KeyboardAwareScrollView>
        </RBSheet>
      </View>

      {/*  Inside Ph  */}

      {/* <Dialog.Container visible={visible}>
        <Dialog.Title>Your Details</Dialog.Title>
        <Dialog.Description>
          Return Back And Press Done Button To Save
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Ok" onPress={handleDelete} />
      </Dialog.Container> */}
    </SafeAreaView>
  );
};
export default HomePage;
