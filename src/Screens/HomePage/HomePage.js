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
import LottieView from 'lottie-react-native';
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
import storage from '@react-native-firebase/storage';
const screen = Dimensions.get('window');
const Aspect_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * Aspect_RATIO;
Geocoder.init(GOOGLE_MAP_KEY);
Geocode.setApiKey(GOOGLE_MAP_KEY);
const HomePage = ({props, navigation}) => {
  const [firstModal, setfirstModal] = useState(false);
  const [morepost, setmorepost] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [markerModel, setmarkerModel] = useState(false);
  const [markerPhotoModal, setmarkerPhotoModal] = useState(false);
  const [maapModal, setmaapModal] = useState(false);
  const [pickupArrival, setpickupArrival] = useState('');
  const [destinantionArrival, setdestinantionArrival] = useState('');
  const [Customlocation, setCustomlocation] = useState(false);
  const [lineVisible, setLineVisible] = useState(false);
  const [markerBtn, setmarkerBtn] = useState(false);
  const [endBtn, setendBtn] = useState(false);
  const [indexPost, setindexPost] = useState('');
  const [visible, setVisible] = useState(false);
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
  const [filePath, setFilePath] = useState({});
  const [img, SetImg] = useState('');
  const [types, setType] = useState('');
  const [state1, Setstate1] = useState({
    region: {
      latitude: Number(0),
      longitude: Number(0),
    },
  });
  const values = {
    latitude: Number(0),
    longitude: Number(0),
  };
  const [pickupCordss, SetpickCordss] = useState(values);
  const [destinationCordss, SetdestinationCordss] = useState(values);
  const [distance, setDistance] = useState('');
  const [markers, setMarkers] = useState([
    {
      pickupCords: {
        latitude: 0,
        longitude: 0,
      },
      destinationCords: {
        latitude: 0,
        longitude: 0,
      },
    },
  ]);
  const [markersAddress, setMarkersAddress] = useState([
    {
      Location: '',
    },
  ]);
  const [alllatitude, setalllatitude] = useState([]);
  const [button, setbutton] = useState(false);
  const [locationbutton, setlocationbutton] = useState(false);
  const [hiding, sethiding] = useState(false);
  const [newmarker, setnewmarker] = useState([]);
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
    if (pickupCordss.latitude === 0) {
      alert('Please Enter Starting and Ending Point');
    } else if (destinationCordss.latitude === 0) {
      alert('Please Enter Ending Point');
    } else {
      setOpenView(true);
      const isValid = checkValid();
      if (isValid) {
        pickupCordss, destinationCordss, setLineVisible(true);
        setVisible(true);
        const ref = db.ref('Users/').child('/Coords');
        const Custom_Coords = {
          newmarker,
          StartingPoint: pickupCordss,
          EndingPoint: destinationCordss,
          City: city,
          Description: description,
          StartingAddress: inputcity,
          EndingAddress: inputcity1,
          NameOfHunt: namehunt,
        };
        ref.push(Custom_Coords);
        setmorepost(true);
      }
    }
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
          ? console.warn('Location permission granted.')
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
  const fetchDestinationCords = (lat, lng, xyz1) => {
    SetdestinationCordss({
      latitude: lat,
      longitude: lng,
    });
    // console.warn('City1=====>', xyz1);
    setinputCity1(xyz1);
  };
  useEffect(() => {
    handleLocationPermission();
    getUserLocation();
    liveLocation();
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
      destionAr();
      PickupAr();
    }, 1000);

    return () => clearInterval(intervall);
  });
  const markermodalcall = ind => {
    refRBSheet2.current.open();
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
        .catch(error => console.warn(error));
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
      .catch(error => console.warn(error));
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
  let PointPickup = geolib.isPointWithinRadius(
    {latitude: lat, longitude: long},
    {
      latitude: pickupCordss.latitude,
      longitude: pickupCordss.longitude,
    },
    100,
  );
  {
    PointPickup === true ? console.warn('Arrived At Location Pickup') : 'Yooo';
  }

  let Point = geolib.isPointWithinRadius(
    {latitude: lat, longitude: long},
    {
      latitude: destinationCordss.latitude,
      longitude: destinationCordss.longitude,
    },
    100,
  );
  {
    Point === true ? console.warn('Arrived At Location') : 'Yooo';
  }

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
  const PickupAr = () => {
    setpickupArrival(PointPickup);
  };
  const destionAr = () => {
    setdestinantionArrival(Point);
  };
  const output = Object.assign({}, ...markersAddress);
  var string = JSON.stringify(output);
  const showDialog = () => {
    setVisible(true);
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
    try {
      newmarker.push({
        CustomMarkerCords: CustomMarkerCords,
        PostName: item2,
        PostDesc: item3,
        PostAddress: item4,
      });
      newmarker.forEach(snapshot => {
        alllatitude.push({
          latitude: snapshot.CustomMarkerCords.latitude,
          longitude: snapshot.CustomMarkerCords.longitude,
        });
      });
      // console.log(alll);
    } catch (error) {
      console.log(error);
    }
  };
  const showToast = () => {
    ToastAndroid.showWithGravity(
      'Please Click the Post',
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
    // setEndingAddress(address);
    SetdestinationCordss(cooords);
    setinputCity1(address);
    console.log('Ending point', cooords);
    refRBSheet2.current.close();
  };
  const allmarkers = () => {
    setMarkers([...markers, {destinationCords: newRegion}]);
    setMarkersAddress([...markersAddress, {Location: address}]);
    showToast();
    refRBSheet2.current.open();
    if (markers.length === 1) {
      startpoint(newRegion.longitude, newRegion.latitude);
      alert('Your First Point is Done');
    }
  };
  console.log(newmarker);
  return (
    <SafeAreaView style={styles.MainView}>
      <Header
        label={'Where To Start & End Hunt?'}
        headerFourComp={true}
        searchPress={() => {
          onDone();
        }}
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
            showsMyLocationButton={false}
            zoomEnabled={true}
            pitchEnabled={true}
            showsCompass={true}
            rotateEnabled={true}
            style={{height: '100%'}}
            onPress={() => {
              allmarkers();
              setbutton(true);
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

            {pickupCordss !== values && destinationCordss !== values && (
              <MapViewDirections
                origin={pickupCordss}
                destination={destinationCordss}
                optimizeWaypoints={true}
                mode="DRIVING"
                precision="high"
                apikey={GOOGLE_MAP_KEY}
                strokeWidth={5}
                waypoints={alllatitude}
              />
            )}

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
                        style={{height: 40, width: 40}}
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
          </MapView>

          <View style={styles.markerFixed}>
            <Image
              style={styles.marker}
              source={require('../../Assets/marker1.png')}
            />
            {/* <Text style={styles.geoAddress}>{address}</Text> */}
          </View>
        </View>

        {/* Search and Posts */}
      </View>

      {button === true ? (
        <>
          <View></View>
        </>
      ) : (
        <View
          style={{
            position: 'absolute',
            width: Theme.wp('90%'),
            height: Theme.hp('8%'),
            backgroundColor: Theme.white,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 20,
            marginTop: Theme.hp('12%'),
            flexDirection: 'row',
          }}>
          <Text style={{fontSize: 17}}> Click </Text>
          <Image
            source={require('../../Assets/marker1.png')}
            style={{height: 20, width: 20}}
          />
          <Text style={{fontSize: 17}}> For the First Post </Text>
        </View>
      )}

      {markerBtn === true ? (
        <>
          <TouchableOpacity
            onPress={() => {
              allmarkers();
            }}
            style={styles.wrapPlusBtn2}>
            <Entypo size={Theme.iconSize} color={Theme.white} name="location" />
          </TouchableOpacity>
        </>
      ) : null}
      {endBtn === true ? (
        <>
          <TouchableOpacity
            onPress={() => {
              onDone();
            }}
            style={{
              backgroundColor: Theme.primary,
              width: Theme.wp('15%'),
              height: Theme.wp('15%'),
              borderRadius: 90,
              alignItems: Theme.align,
              justifyContent: Theme.align,
              position: 'absolute',
              bottom: '5%',
              right: '5%',
            }}>
            {/* <Entypo size={Theme.iconSize} color={Theme.white} name="location" /> */}
            <Text style={{fontSize: Theme.hp('2.5%'), color: Theme.white}}>
              End
            </Text>
          </TouchableOpacity>
        </>
      ) : null}

      {/* Location button map */}
      {hiding === true ? (
        <></>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => {
              setlocationbutton(true);
              sethiding(true);
              mapRef.current.animateToRegion({
                latitude: lat,
                longitude: long,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
            }}
            style={{
              position: 'absolute',
              bottom: '5%',
              right: '5%',
              width: Theme.wp('15%'),
            }}>
            <View style={{right: '15%', flex: 1}}>
              <LottieView
                style={{height: 70, width: 50}}
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
              <MaterialIcons
                name="my-location"
                color={Theme.white}
                size={Theme.iconSize}
              />
            </View>
          </TouchableOpacity>
        </>
      )}
      {locationbutton === true ? (
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
          <MaterialIcons
            name="my-location"
            color={Theme.white}
            size={Theme.iconSize}
          />
          {/* <Image source={require('../../Assets/pin.png')} style={{height:50, width:50}} /> */}
        </TouchableOpacity>
      ) : null}

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
      <Modal
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
                      {/* <TouchableOpacity>
                        <Entypo
                          size={20}
                          color={Theme.primary}
                          name="dots-three-horizontal"
                        />
                      </TouchableOpacity> */}
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
                    //  allpostdone();
                  }}
                  style={styles.addpostBtn}>
                  <Text style={styles.addPostBtnTxt}>Add Post</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/*  Create Hunt MOdal  */}

      <Modal
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
      </Modal>

      <Modal
        animationType="fade"
        onBackButtonPress={() => {
          setmorepost(!morepost);
        }}
        transparent
        hasBackdrop={false}
        avoidKeyboard={false}
        isVisible={morepost}
        animationIn="slideInUp"
        coverScreen={false}>
        <View style={styles.modalWrapper}>
          <Text style={styles.heading}>Data Updated Go To Main</Text>

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
              {/* <Text style={{color: Theme.white}}>Add more post or not</Text> */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setmorepost(!morepost);
                    navigation.replace('HomePage2');
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
                    width: '60%',
                    color: '#1596F3',
                  }}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: 15,
                      color: Theme.white,
                      fontWeight: 'bold',
                    }}>
                    Main
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </Modal>

      {/* map press model */}

      <Modal
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
      </Modal>

      {/*  Arrived Marker At  Custom Destination  MOdal  */}
      <Modal
        animationType="fade"
        transparent
        hasBackdrop={false}
        avoidKeyboard={false}
        isVisible={Customlocation}
        onBackButtonPress={() => {
          setCustomlocation(!Customlocation);
          // console.log('Whenback pressed', Customlocation);
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
                onPress={() => {
                  setCustomlocation(!Customlocation);
                }}
                style={styles.arrivedBtn}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 17,
                    color: Theme.white,
                    fontWeight: 'bold',
                  }}>
                  close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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

      <Modal
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
      </Modal>

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
                  // setModalVisible(!modalVisible);
                  // setfirstModal(!firstModal);
                  refRBSheet.current.close();
                  showDialog();
                  setmarkerBtn(true);
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
          height={350}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          {/* <Text style={styles.heading}>Choose Point</Text> */}

          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            style={{
              padding: 20,
            }}>
            <View style={{backgroundColor: 'white'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  elevation: 3,
                  backgroundColor: 'white',
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    fontSize: 20,
                    marginTop: 10,
                    // borderRadius: 7,
                    // borderWidth: 1,
                    // borderColor: '#1596F3',
                    backgroundColor: Theme.white,
                    padding: 7,
                    marginBottom: 20,
                    // elevation: 3,
                    width: '60%',
                    // justifyContent:'center',
                    // alignItems:'center'
                  }}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: 15,
                      color: '#1596F3',
                      fontWeight: 'bold',
                    }}>
                    Add Post
                  </Text>
                </View>
                <View
                  style={{
                    width: '40%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setmarkerModel(!markerModel);
                      refRBSheet2.current.close();
                    }}>
                    <AntDesign
                      name="pluscircleo"
                      size={Theme.iconSizee}
                      color={Theme.primary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  elevation: 3,
                  backgroundColor: 'white',
                  marginBottom: 5,
                }}>
                <View
                  style={{
                    fontSize: 20,
                    marginTop: 10,
                    // borderRadius: 7,
                    // borderWidth: 1,
                    // borderColor: '#1596F3',
                    backgroundColor: Theme.white,
                    padding: 7,
                    marginBottom: 20,
                    // elevation: 3,
                    width: '60%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: 15,
                      color: '#1596F3',
                      fontWeight: 'bold',
                    }}>
                    Remove Post
                  </Text>
                </View>
                <View
                  style={{
                    width: '40%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      onDeleteBTN(remove);
                      refRBSheet2.current.close();
                    }}>
                    <AntDesign
                      name="minuscircleo"
                      color={Theme.red}
                      size={Theme.iconSizee}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  elevation: 3,
                  backgroundColor: 'white',
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    fontSize: 20,
                    marginTop: 10,
                    // borderRadius: 7,
                    // borderWidth: 1,
                    // borderColor: '#1596F3',
                    backgroundColor: Theme.white,
                    padding: 7,
                    marginBottom: 20,
                    // elevation: 3,
                    width: '60%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: 15,
                      color: '#1596F3',
                      fontWeight: 'bold',
                    }}>
                    End Point
                  </Text>
                </View>
                <View
                  style={{
                    width: '40%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      endpoint(newRegion.longitude, newRegion.latitude);
                    }}>
                    <MaterialIcons
                      name="file-download-done"
                      color={Theme.green}
                      size={Theme.iconSizee}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity onPress={() => refRBSheet2.current.close()}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 15,
                      backgroundColor: 'red',
                      height: 40,
                      width: '50%',
                      borderRadius: 15,
                      elevation: 5,
                    }}>
                    <Text style={{color: Theme.white}}>Cancel</Text>
                  </View>
                </View>
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
    </SafeAreaView>
  );
};
export default HomePage;
