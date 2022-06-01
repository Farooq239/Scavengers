/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable curly */
/* eslint-disable no-sequences */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-undef */
/* eslint-disable no-lone-blocks */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Dimensions,
  LogBox,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  AnimatedRegion,
  Callout,
  Circle,
  Polyline,
} from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import {useNavigation} from '@react-navigation/native';
import MapViewDirections from 'react-native-maps-directions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as geolib from 'geolib';
import {getPreciseDistance} from 'geolib';
// import BottomSheet from 'reanimated-bottom-sheet';
import {GOOGLE_MAP_KEY} from '../../Constants/GoogleMapKey';
import imagePath from '../../Constants/imagePath';
import Theme from '../../Utils/Theme';
import {Rating, AirbnbRating} from 'react-native-ratings';
import Header from '../../Components/Headers/Headers';
import {db, auth} from '../../Utils/Exports';
import Modal from 'react-native-modal';
const screen = Dimensions.get('window');
const Aspect_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
import RBSheet from 'react-native-raw-bottom-sheet';

// import Polyline from 'react-native-maps';
const LONGITUDE_DELTA = LATITUDE_DELTA * Aspect_RATIO;
import styles from './Style';

const UserSideMap = ({props, route}) => {
  const {
    StartAddress,
    EndAddress,
    cityy,
    Startcordvalue,
    Endcoordsvalue,
    CoordValue,
    Coord,
  } = route.params;
  console.log('1111111111111222222', Coord);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalQuiz, setModalQuiz] = useState(false);
  const [StartingAddress, setStartingAddress] = useState([]);
  const [EndingAddress, setEndingAddress] = useState([]);
  const [lineVisible, setLineVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [city, setcity] = useState([]);
  const [pickupArrival, setpickupArrival] = useState('');
  const [description, setDescription] = useState('');
  const [state1, Setstate1] = useState({
    region: {
      latitude: Number(0),
      longitude: Number(0),
    },
  });
  const [newRegion, setNewRegion] = useState(null);

  const [copy, setcpoy] = useState(false);

  const [pickupCordss, SetpickCordss] = useState({
    latitude: Number(0),
    longitude: Number(0),
  });
  const [customMarkerCords, SetcustomMarkerCords] = useState(Coord);
  // console.log('Custom Point Code',customMarkerCords.CustomMarkerCords());
  const [newpoints, setnewpoints] = useState({});

  const [destinationCordss, SetdestinationCordss] = useState({
    // latitude: 31.4804642,
    // longitude: 74.3239342,
    // latitudeDelta: 0.0922,
    // longitudeDelta: 0.0421,
    latitude: Number(0),
    longitude: Number(0),
    latitudeDelta: Number(0),
    longitudeDelta: Number(0),
  });
  const [distance, setDistance] = useState('');
  const [range, setRange] = useState('');
  const [lat, setLat] = useState(0);
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [long, setLong] = useState(0);
  const [markerModel, setmarkerModel] = useState(false);
  const [remove, setremove] = useState(0);
  const [markerDistance, setmarkerDistance] = useState(null);
  const [namePost, setnamePost] = useState('');
  const [descPost, setdescPost] = useState('');
  const [indPost, setindPost] = useState('');
  // const [namePost, setnamePost] = useState('');
  const [markers, setMarkers] = useState([
    {
      pickupCords: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      destinationCords: {
        latitude: Number(0),
        longitude: Number(0),
        latitudeDelta: Number(0),
        longitudeDelta: Number(0),
      },
    },
  ]);
  const [CheckCoordsValue, setCheckCoordsValue] = useState([]);
  const mapRef = useRef();
  // const bs = React.useRef(null);
  const refRBSheet = useRef();
  // const bottomsheet2 = React.createRef();
  // const fall1 = new Animated.Value(1);
  // const fall = new Animated.Value(1);
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
  /////////////////////       Permissions-End        ///////////////////////

  const PickupAr = () => {
    setpickupArrival(Point);
    // console.log('PickupArrival===', pickupArrival);
  };

  let Point = geolib.isPointWithinRadius(
    {latitude: position.latitude, longitude: position.longitude},
    {
      latitude: pickupCordss.latitude,
      longitude: pickupCordss.longitude,
    },
    50,
  );
  {
    Point === true ? console.warn('Arrived At Location') : 'Yooo';
  }
  const getUserLocation = async () => {
    Geolocation.getCurrentPosition(
      //   async position => {
      //     setLat(position.coords.latitude);
      //     setLong(position.coords.longitude);
      //   },
      async pos => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },

      async error => {
        console.log('Geolocation Error' + error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 100},
    );
    // console.log('position.coords', position.coords.latitude);
  };

  const liveLocation = async () => {
    watchId = Geolocation.watchPosition(
      async pos => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },

      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 100, maximumAge: 100},
    );
  };
  const PointObject = () => {
    var arraypoints = [];
    customMarkerCords.map((item, index) => {
      console.log(2);
      const xyz = {
        latitude: item.CustomMarkerCords.latitude,
        longitude: item.CustomMarkerCords.longitude,
      };
      arraypoints.push(xyz);
      setnewpoints(arraypoints);
      console.warn('8888888888888', arraypoints);
    });
  };
  useEffect(async () => {
    PointObject();
    refRBSheet.current.open();
  }, []);

  useEffect(() => {
    const intervall = setInterval(() => {
      // closeModal();
      // destionAr();
      PickupAr();
    }, 1000);

    return () => clearInterval(intervall);
  });

  useEffect(() => {
    handleLocationPermission();
    getUserLocation();
    liveLocation();
    isWithinRange;
    c;
    // lastInd;
    customRange;
    custimL;
    LogBox.ignoreLogs([
      'MapViewDirections Error: Error on GMAPS route request: ZERO_RESULTS',
    ]);
  }, []);
  useEffect(async () => {
    await getCity();
    CustomPoints();
  }, []);

  const onMapReady = () => {
    getUserLocation();
    liveLocation();
  };

  const getCity = async () => {
    const currentUid = auth.currentUser.uid;
    const ref1 = db.ref('Users/' + currentUid).child('/Coords');
    const ref = db.ref('Users/' + currentUid).child('/Coords');
    const Stp = db.ref('Users/' + currentUid).child('/Coords');

    const list = [];
    const list1 = [];
    const cityy = [];
    const desc = [];
    const stp = [];
    ref.on('value', snapshot => {
      if (!snapshot.exists) {
        console.warn('no dataaa');
      } else {
        if (snapshot.val()) {
          const {StartingAddress, EndingAddress} = snapshot.val();
          const item1 = Object.values({StartingAddress});
          const item2 = Object.values({EndingAddress});

          // console.log('Coordsssss==>>>', item1);
          list.push(item1);
          list1.push(item2);
          // console.log('Item==', list);
          setStartingAddress(list);
          // console.log('startingAddress===', StartingAddress);
          setEndingAddress(list1);
        } else {
        }
      }
    });
    ref1.on('value', snapshot => {
      if (!snapshot.exists) {
        console.warn('no dataaa');
      } else {
        if (snapshot.val()) {
          const {City} = snapshot.val();
          const {Description} = snapshot.val();

          const items = Object.values({City});

          // console.log('---->', Description);
          setDescription(Description);
          //   console.log('Itesm', items);
          cityy.push(items);

          //   console.log('List1==', city);

          setcity(cityy);
        } else {
        }
      }
    });
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
          SetpickCordss(cord);
          SetdestinationCordss(cords);
          console.log('PickUp Coords  ', pickupCordss);
          console.log(' Destination coords', destinationCordss);
          setcpoy(true);
        } else {
        }
      }
    });

    const ref3 = db.ref('Users/' + currentUid).child('/Custom-Coords');
    ref3.on('value', async snapshot => {
      // let data = [];
      if (!snapshot.exists) {
        console.warn('no dataaa');
      } else {
        if (snapshot.val()) {
          ref3.once('value').then(function (snapshot1) {
            const data = [];
            snapshot1.forEach(async child => {});
          });
        } else {
        }
      }
    });
  };

  const getcord = async () => {
    var arraycords = []; // clear existing messages
    let keys = [];
    const currentUid = auth.currentUser.uid;
    let ref = db.ref('Users/' + currentUid).child('/Posts');
    ref.on('value', snapshot => {
      if (!snapshot.exists) {
      } else {
        if (snapshot.val()) {
          // console.log(2);
          snapshot.forEach(doc => {
            console.log(doc);
            const {CustomMarkerCords} = doc.val().Custom_Coords;
            console.log(CustomMarkerCords);
            //  SetcustomMarkerCords(doc);
            //  console.log('11111',customMarkerCords);
            //  doc.forEach(cordSnapshot => {
            //    log('1111122222',cordSnapshot)
            //   const CustomMarkerCords = cordSnapshot.val().CustomMarkerCords;
            //   var Ccord = CustomMarkerCords;
            //   keys.push(cordSnapshot.key);
            //   arraycords.push(cordSnapshot.val().CustomMarkerCords);
            // });
            // SetcustomMarkerCords(snapshot.val());
          });
        } else {
        }
      }
    });
    // .then(firstSnapShot => {
    //   firstSnapShot.forEach(cordSnapshot => {
    //   });
    // })
    // .then(async () => {
    //   // SetcustomMarkerCords(arraycords);
    // });
  };

  const getcords = async () => {
    var arraycords = []; // clear existing messages
    let keys = [];
    const currentUid = auth.currentUser.uid;
    let ref = db
      .ref('Users/' + currentUid)
      .child('/Coords')
      .child('/Custom-Coords');
    ref
      .orderByKey()
      .once('value', snapshot => {
        const {CustomMarkerCords} = snapshot.val();
        SetcustomMarkerCords(snapshot.val());
      })
      .then(firstSnapShot => {
        firstSnapShot.forEach(cordSnapshot => {
          const CustomMarkerCords = cordSnapshot.val().CustomMarkerCords;
          var Ccord = CustomMarkerCords;
          keys.push(cordSnapshot.key);
          arraycords.push(cordSnapshot.val().CustomMarkerCords);
        });
      })
      .then(async () => {
        // SetcustomMarkerCords(arraycords);
      });
  };

  const onChangeValue = region => {
    setNewRegion(region);
    Setstate1({
      region,
    });
    setDistance({
      // distance: dis / 1000,
      c,
      //   isWithinRange,
    });
    setRange({
      isWithinRange,
    });
  };
  const c = getPreciseDistance(
    {latitude: position.latitude, longitude: position.longitude},
    {
      latitude: pickupCordss.latitude,
      longitude: pickupCordss.longitude,
    },
  );

  const isWithinRange = customMarkerCords.map((i, ind) => {
    return getPreciseDistance(
      {latitude: position.latitude, longitude: position.longitude},
      {
        latitude: i.CustomMarkerCords.latitude,
        longitude: i.CustomMarkerCords.longitude,
      },
    );
  });

  const lastInd = isWithinRange;

  let customRange = customMarkerCords.map((i, ind) => {
    return geolib.isPointWithinRadius(
      {latitude: position.latitude, longitude: position.longitude},
      {
        latitude: i.CustomMarkerCords.latitude,
        longitude: i.CustomMarkerCords.longitude,
      },
      50,
    );
  });

  let custimL = customRange[customRange.length - 1];

  const markermodalcall = ind => {
    setmarkerModel(!markerModel);
    setremove(ind);
  };
  const postDetail = (i, ind) => {
    setnamePost(i.PostName);
    setdescPost(i.PostDesc);
    setindPost(ind + 1);
    console.log('indexccccccccc', ind);
  };
  const functionCombined = () => {
    mapRef.current.animateToRegion({
      latitude: Startcordvalue.latitude,
      longitude: Startcordvalue.longitude,

      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    // getcord();
  };
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
    const isValid = checkValid();
    if (isValid) {
      Startcordvalue,
        Endcoordsvalue,
        // }
        setLineVisible(true);
      console.log('line------->', pickupCordss);
      // setModalVisible(!modalVisible);
      setVisible(true);
    }

    addItem(
      pickupCordss,
      destinationCordss,
      city,
      inputcity,
      inputcity1,
      namehunt,
      description,
    );
  };
  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{flexDirection: 'row'}}>
        <View style={{width: '10%'}}>
          <Image
            source={require('../../Assets/mapPin.png')}
            style={styles.imgMarker}
          />
        </View>
        <View style={{width: '85%'}}>
          <Text style={styles.txtTitle}>{cityy}</Text>
          <View>
            <Text style={styles.txtCreatedBy}>
              created by{' '}
              <Text style={{...styles.txtCreatedBy, color: '#1596F3'}}>
                {/* {Username}{' '} */}
                Farooq
              </Text>
            </Text>
            <View style={{alignSelf: 'flex-start'}}>
              <AirbnbRating size={15} showRating={false} />
            </View>

            <View>
              <Text
                style={{
                  ...styles.txtCreatedBy,
                  color: '#959494',
                  marginTop: '3%',
                  width: '100%',
                }}>
                {description}
              </Text>
              {/* <Text style={styles.txtPosts}>3 POSTS</Text> */}
              <View style={styles.boxWrap}>
                <Text style={styles.txtStatus}>{StartAddress}</Text>
                <Image
                  source={require('../../Assets/mapPin.png')}
                  style={styles.ImgPin}
                />
              </View>
              <View style={{marginTop: '2%'}}></View>
              <View style={styles.boxWrap}>
                <Text style={styles.txtStatus}>{EndAddress}</Text>
                <Image
                  source={require('../../Assets/mapPin.png')}
                  style={styles.ImgPin}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.btnNavigate}
              onPress={() => {
                functionCombined();
                onDone();
              }}>
              <Text style={styles.txtNavigate}> Navigate to StartPoint</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
  const renderHeader = () => (
    <View style={{...styles.header, backgroundColor: '#fff'}}></View>
  );
  const renderInner1 = () => (
    <View style={styles.panel}>
      <View style={{flexDirection: 'row'}}>
        <View style={{width: '10%'}}>
          <Image
            source={require('../../Assets/mapPin.png')}
            style={styles.imgMarker}
          />
        </View>
        <View style={{width: '85%', backgroundColor}}>
          <Text>Yayy You have arrived at location</Text>
          <Text style={styles.txtTitle}>{city}</Text>
          <View>
            <Text style={styles.txtCreatedBy}>
              created by{' '}
              <Text style={{...styles.txtCreatedBy, color: '#1596F3'}}>
                {Username}{' '}
              </Text>
            </Text>

            <View>
              <Text
                style={{
                  ...styles.txtCreatedBy,
                  color: '#959494',
                  marginTop: '3%',
                  width: '100%',
                }}>
                {description}
              </Text>
              {/* <Text style={styles.txtPosts}>3 POSTS</Text> */}
            </View>
            <TouchableOpacity
              style={styles.btnNavigate}
              onPress={() => functionCombined()}>
              <Text style={styles.txtNavigate}> Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
  // if (!copy) return null;
  // console.log(CoordValue);

  return (
    <View style={{flex: 1}}>
      <Header
        label={'Where To Start & End Hunt?'}
        city={true}
        cityName={cityy}
        navigation={navigation}
      />
      <View style={{justifyContent: 'center', marginTop: 50}}>
        <MapView
          ref={mapRef}
          followsUserLocation={true}
          onRegionChangeComplete={txt => onChangeValue(txt)}
          onMapReady={() => onMapReady()}
          showsUserLocation={true}
          // followsUserLocation={true}
          loadingEnabled={true}
          showsMyLocationButton={false}
          zoomEnabled={true}
          pitchEnabled={true}
          // showsUserLocation={true}
          showsCompass={true}
          showsBuildings={true}
          showsIndoors={true}
          rotateEnabled={true}
          style={{height: '100%'}}
          // initialRegion={state.region}

          initialRegion={{
            ...Startcordvalue,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          <>
            <Marker coordinate={Startcordvalue} animation={true}>
              <Image
                source={imagePath.icCurLoc}
                style={{height: 30, width: 30}}
              />
              <Callout>
                <View style={{height: 100, width: 200}}>
                  <Text
                    style={{fontSize: 20, color: 'red', alignSelf: 'center'}}>
                    {c} Meter
                  </Text>
                  <Text>{Point}</Text>
                  <Text style={{fontSize: 20}}>
                    {' '}
                    Starting Location of game{' '}
                  </Text>
                </View>
              </Callout>
            </Marker>
            <Marker coordinate={Endcoordsvalue} animation={true}>
              <Image
                source={imagePath.icGreenMaker}
                style={{height: 30, width: 30}}
              />
              <Callout>
                <View style={{height: 100, width: 200}}>
                  <Text
                    style={{fontSize: 20, color: 'red', alignSelf: 'center'}}>
                    {c} Meter
                  </Text>
                  <Text>{Point}</Text>
                  <Text style={{fontSize: 20}}> Ending Destination </Text>
                </View>
              </Callout>
            </Marker>
            {customMarkerCords.map((i, ind) => (
              <MapView.Circle
                center={i.CustomMarkerCords}
                radius={50}
                strokeWidth={2.5}
                strokeColor="red"
                fillColor="#B9B9B9"
                key={ind}
              />
            ))}
            <MapView.Circle
              center={Startcordvalue}
              radius={50}
              strokeWidth={3.5}
              strokeColor="red"
              fillColor="#B9B9B9"
              animation={true}
            />
            <MapView.Circle
              center={Endcoordsvalue}
              radius={5}
              strokeWidth={2.5}
              strokeColor="red"
              fillColor="#B9B9B9"
              animation={true}
            />
          </>
          <MapViewDirections
            origin={Startcordvalue}
            destination={Endcoordsvalue}
            optimizeWaypoints={true}
            mode="DRIVING"
            precision="high"
            apikey={GOOGLE_MAP_KEY}
            strokeWidth={5}
            waypoints={newpoints}
            image={imagePath.icGreenMaker}
            strokeColor={Theme.primary}
            onReady={result => {
              mapRef.current.fitToCoordinates(result.coordinate, {
                edgepadding: {
                  right: 30,
                  bottom: 300,
                  left: 30,
                  top: 100,
                },
                animated: true,
              });
            }}
            onError={errorMessage => {}}
          />

          {customMarkerCords.map((i, ind) => (
            <MapViewDirections
              origin={position}
              // origin={origin}
              destination={(pickupCordss, i.customMarkerCords)}
              // destination={i.customMarkerCords}
              optimizeWaypoints={true}
              mode="WALKING"
              precision="high"
              apikey={GOOGLE_MAP_KEY}
              strokeWidth={3}
              waypoints={[
                {
                  latitude: position.latitude,
                  longitude: position.longitude,
                },
                {
                  latitude: i.CustomMarkerCords.latitude,
                  longitude: i.CustomMarkerCords.longitude,
                },
              ]}
              image={imagePath.icGreenMaker}
              strokeColor={Theme.primary}
              // optimizeWaypoints={true}
              key={ind}
              onReady={result => {
                mapRef.current.fitToCoordinates(result.coordinate, {
                  edgepadding: {
                    right: 0,
                    bottom: 0,
                    left: 0,
                    top: 0,
                  },
                  animated: true,
                });
              }}
              onError={errorMessage => {}}
            />
          ))}
          {customMarkerCords.map((i, ind) =>
            i.CustomMarkerCords === 0 ? null : (
              <>
                <Marker
                  coordinate={i.CustomMarkerCords}
                  // image={imagePath.icGreenMaker}
                  // style={{height:40,width:40}}
                  key={ind}
                  // animation={true}
                  // onPress={() => markers.pop(ind)}
                  // onPress={() => console.log(i.PostName)}>
                  onPress={() => {
                    markermodalcall(ind);
                    postDetail(i, ind);
                    // nameofpost();
                    // console.log(i);
                  }}>
                  <Image
                    source={require('../../Assets/images/destination.png')}
                    style={{height: 25, width: 25}}
                  />
                </Marker>
              </>
            ),
          )}
        </MapView>

        <TouchableOpacity
          onPress={() => {
            mapRef.current.animateToRegion({
              latitude: position.latitude,
              longitude: position.longitude,

              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          }}
          style={{
            backgroundColor: Theme.primary,
            width: Theme.wp('15%'),
            height: Theme.wp('15%'),
            borderRadius: 90,
            alignItems: Theme.align,
            justifyContent: Theme.align,
            position: 'absolute',
            bottom: '10%',
            right: '5%',
          }}>
          <MaterialIcons
            size={Theme.iconSize}
            color={Theme.white}
            name="my-location"
          />
        </TouchableOpacity>
        {/* <View style={{position: 'absolute', alignSelf: 'center'}}>
          <Image
            style={{height: 40, width: 40, alignSelf: 'center'}}
            source={require('../../Assets/marker1.png')}
          /> */}
        {/* <Text style={styles.geoAddress}>{address}</Text> */}
        {/* </View> */}
      </View>
      <RBSheet
        ref={refRBSheet}
        height={430}
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
        <View style={styles.panel}>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '10%'}}>
              <Image
                source={require('../../Assets/mapPin.png')}
                style={styles.imgMarker}
              />
            </View>
            <View style={{width: '85%'}}>
              <Text style={styles.txtTitle}>{cityy}</Text>
              <View>
                <Text style={styles.txtCreatedBy}>
                  created by{' '}
                  <Text style={{...styles.txtCreatedBy, color: '#1596F3'}}>
                    {/* {Username}{' '} */}
                    Farooq
                  </Text>
                </Text>
                <View style={{alignSelf: 'flex-start'}}>
                  <AirbnbRating size={15} showRating={false} />
                </View>

                <View>
                  <Text
                    style={{
                      ...styles.txtCreatedBy,
                      color: '#959494',
                      marginTop: '3%',
                      width: '100%',
                    }}>
                    {description}
                  </Text>
                  {/* <Text style={styles.txtPosts}>3 POSTS</Text> */}
                  <View style={styles.boxWrap}>
                    <View style={{width: '95%'}}>
                      <Text style={styles.txtStatus}>{StartAddress}</Text>
                    </View>

                    <Image
                      source={require('../../Assets/mapPin.png')}
                      style={styles.ImgPin}
                    />
                  </View>
                  <View style={{marginTop: '2%'}}></View>
                  <View style={styles.boxWrap}>
                    <View style={{width: '95%'}}>
                      <Text style={styles.txtStatus}>{EndAddress}</Text>
                    </View>
                    <Image
                      source={require('../../Assets/mapPin.png')}
                      style={styles.ImgPin}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.btnNavigate}
                  onPress={() => {
                    functionCombined();
                    // onDone();
                    refRBSheet.current.close();
                  }}>
                  <Text style={styles.txtNavigate}>
                    {' '}
                    Navigate to StartPoint
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </RBSheet>
      {customMarkerCords.map((i, ind) => (
        // console.log('i value of modal===', i),
        <Modal
          animationType="fade"
          onBackButtonPress={() => {
            setmarkerModel(!markerModel);
          }}
          onBackdropPress={() => setmarkerModel(!markerModel)}
          hasBackdrop={false}
          avoidKeyboard={false}
          isVisible={markerModel}
          animationIn="slideInUp"
          coverScreen={false}>
          <View style={styles.modalWrapper}>
            <View style={{width: '90%', alignSelf: 'center'}}>
              <Text style={styles.heading}>Details Of # Post {indPost} </Text>

              <ScrollView style={{}}>
                <View style={{paddingTop: 10}}>
                  <View style={{width: '100%', alignSelf: 'center'}}>
                    <Text style={styles.headingName}>Name Of Post </Text>
                    <TextInput
                      placeholderTextColor="#E5E8E8"
                      // onChangeText={Text => setnamePost(Text)}
                      value={namePost}
                      style={styles.markerTxin}
                      editable={true}
                      multiline
                    />
                    <Text style={styles.heading2}>
                      Description Of Post # Post {indPost}
                    </Text>
                    {/* <Text style={styles.heading2}>{indPost}</Text> */}
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
                        // onChangeText={Text => setdescPost(Text)}
                        value={descPost}
                        style={styles.markerin}
                        editable={false}
                        multiline
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-evenly',
                          width: 200,
                          bottom: 10,
                        }}>
                        <TouchableOpacity>
                          <Feather
                            size={20}
                            color={Theme.primary}
                            name="video"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity>
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
                    <Text style={styles.option}>
                      Distance From Your Location :
                    </Text>
                    {/* <Text style={styles.value}> {lastInd} Meters</Text> */}

                    <Text>{customRange}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.option}>Address: </Text>
                    <Text style={styles.value}>{i.PostAddress}</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <TouchableOpacity
                    // onPress={() => navigation.navigate('AddQuiz')}
                    onPress={() => navigation.navigate('enterquiz')}
                    style={styles.addquiz}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 15,
                        color: Theme.primary,
                        fontWeight: 'bold',
                        borderRadius: 1,
                        borderColor: Theme.primary,
                        borderWidth: 1,
                        padding: 10,
                      }}>
                      Press To Do Quiz
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
                      setmarkerModel(!markerModel);
                      //   setMarkers([...markers, {destinationCords: newRegion}]);
                      // setMarkersAddress([...markersAddress, {Location: address}]);
                      // addMarkers(newRegion, namePost, descPost, address);
                    }}
                    style={styles.addpostBtn}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 15,
                        color: Theme.white,
                        fontWeight: 'bold',
                      }}>
                      Finish
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      ))}

      <Modal
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
                  marginLeft: 35,
                  marginTop: 10,
                }}
              />
              <Text
                style={{
                  color: 'black',
                  marginLeft: 15,
                  fontSize: 20,
                  width: '80%',
                }}>
                {' '}
                {StartingAddress}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: 'black',
                  marginLeft: 50,
                  fontSize: 20,

                  marginTop: 20,
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
      </Modal>
    </View>
  );
};

export default UserSideMap;
