// /* eslint-disable react-native/no-inline-styles */
// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable no-unused-vars */
// /* eslint-disable react-hooks/rules-of-hooks */
// import React, {useEffect, useState, useRef} from 'react';
// import {
//   View,
//   TouchableOpacity,
//   TextInput,
//   SafeAreaView,
//   StatusBar,
//   Text,
//   ScrollView,
//   StyleSheet,
//   Dimensions,
//   Image,
//   Alert,
//   LogBox,
//   FlatList,
// } from 'react-native';

// import styles from './Style';
// import Header from '../../Components/Headers/Headers';
// import {useNavigation} from '@react-navigation/native';
// import HomePageFL from '../../Components/FlatLists/userSideFlatList/HomePageFL';
// import {db, auth} from '../../Utils/Exports';
// const userChoosePlace = props => {
//   const navigation = useNavigation();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [masterDataSource, setMasterDataSource] = useState([]);
//   const [HomePageData, setHomePageData] = useState([
//     {
//       CreatedBy: 'Created By :',
//       TutorName: '',
//       Street: 'Azadi-Chownk',
//       TutorTrainHour: '6h',
//       Time: '08:00 pm',
//       TutorCity: 'Lahore    ',
//     },
//     {
//       CreatedBy: 'Created By:',
//       TutorName: '',
//       // Street: 'Azadi-Chownk',
//       TutorTrainHour: '9h',
//       Time: '09:00 am',
//       TutorCity: 'Karachi',
//     },
//     {
//       CreatedBy: 'Created By :',
//       TutorName: '',
//       // Street: 'Azadi-Chownk',
//       TutorTrainHour: '12h',
//       Time: '10:00 am',
//       TutorCity: 'Islamabad',
//     },
//     {
//       CreatedBy: 'Created By :',
//       TutorName: '',
//       // Street: 'Azadi-Chownk',
//       TutorTrainHour: '2h',
//       Time: '05:00 pm',
//       TutorCity: 'Islamabad',
//     },
//   ]);
//   const [city, setcity] = useState([]);

//   useEffect(() => {
//     const currentUid = auth.currentUser.uid;
//     const ref = db.ref('Users/' + currentUid);
//     const ref1 = db.ref('Users/' + currentUid).child('/Coords');
//     const list = [];
//     const list1 = [];
//     ref.on('value', snapshot => {
//       const userItem = snapshot.val();
//       const {Name} = snapshot.val();
//       list.push({
//         Name,
//       });
//       console.log('fucking===>', list);
//       console.log('List', list);
//       // console.log('Proper Values', userItem);
//       // const items = Object.values(userItem);
//       // console.log(items);
//       // setHomePageData(userItem);
//       setHomePageData(list);
//       // setHomePageData(Object.values(snapshot.val()));
//       // setHomePageData({TutorName: items});
//       // console.log('HomePageData=>', HomePageData);
//     });
//   }, []);

//   useEffect(() => {
//     setMasterDataSource(HomePageData);
//   }, []);
//   const searchFilterFunction = text => {
//     if (text) {
//       const newData = masterDataSource.filter(function (item) {
//         const itemData = item.TutorCity
//           ? item.TutorCity.toUpperCase()
//           : ''.toUpperCase();
//         const textData = text.toUpperCase();
//         return itemData.indexOf(textData) > -1;
//       });
//       setHomePageData(newData);
//       setSearchQuery(text);
//     } else {
//       // Inserted text is blank
//       // Update FilteredDataSource with masterDataSource
//       setHomePageData(masterDataSource);
//       setSearchQuery(text);
//     }
//   };

//   return (
//     <View style={styles.MainView}>
//       <Header
//         label={'Choose Place'}
//         labelIcon={true}
//         onPress={() => navigation.goBack()}
//       />
//       <View style={{margin: 10}}>
//         <TextInput
//           placeholder="Search Place"
//           style={styles.searchTxtInp}
//           maxLength={30}
//           autoCapitalize="none"
//           autoCorrect={false}
//           placeholderTextColor="gray"
//           // autoFocus={true}
//           value={searchQuery}
//           clearButtonMode="always"
//           onChangeText={text => searchFilterFunction(text)}
//           onClear={text => searchFilterFunction('')}
//         />
//       </View>

//       {/* FlatList */}
//       {/* <userSideFlatList
//         userSideFlatList={true}
//         data={HomePageData}
//         navigation={navigation}
//       /> */}
//       <HomePageFL
//         HomePageFL={true}
//         data={HomePageData}
//         cityy={city}
//         navigation={navigation}
//       />
//     </View>
//   );
// };

// export default userChoosePlace;
