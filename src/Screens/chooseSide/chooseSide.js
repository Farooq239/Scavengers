// /* eslint-disable react-native/no-inline-styles */
// /* eslint-disable no-unused-vars */
// /* eslint-disable react-hooks/rules-of-hooks */
// import React from 'react';
// import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
// import styles from './style';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Theme from '../../Utils/Theme';
// import Header from '../../Components/Headers/Headers';
// import {useNavigation} from '@react-navigation/native';
// import imagePath from '../../Constants/imagePath';

// const chooseSide = () => {
//   const navigation = useNavigation();

//   // const name = await AsyncStorage.getItem('Username');
//   return (
//     <View style={{flex: 1}}>
//       <ScrollView>
//         <Header
//           label={'Choose Your Side'}
//           headerLogin={true}
//           onPress={() => navigation.goBack()}
//         />
//         <View style={styles.setWidth}>
//           <Text style={styles.txtPass}>Make a choice</Text>
//           {/* <Text>{name}</Text> */}
//           <Text style={styles.txtEnter}>
//             What option you want User Mode Or Creater Mode
//           </Text>
//           <TouchableOpacity
//             style={styles.wrapBtn}
//             onPress={() =>
//               navigation.navigate('userChoosePlace', {
//                 Mode: 'User',
//               })
//             }>
//             <MaterialIcons name="person-outline" size={Theme.iconSize} />
//             <Text style={styles.txtPhone}>User Mode</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.wrapBtn}
//             onPress={() =>
//               navigation.navigate('DrawerNavigation', {
//                 Mode: 'Creater',
//               })
//             }>
//             <MaterialIcons name="directions" size={Theme.iconSize} />
//             <Text style={styles.txtPhone}>Creator Mode</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.wrapBtn}
//             onPress={() => navigation.navigate('quizmodel')}>
//             <MaterialIcons name="person-outline" size={Theme.iconSize} />
//             <Text style={styles.txtPhone}>Quiz Model</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.wrapBtn}
//             onPress={() => navigation.navigate('enterquiz')}>
//             <MaterialIcons name="person-outline" size={Theme.iconSize} />
//             <Text style={styles.txtPhone}>User Quiz</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.wrapBtn}
//             onPress={() => navigation.navigate('home')}>
//             <MaterialIcons name="person-outline" size={Theme.iconSize} />
//             <Text style={styles.txtPhone}>Record</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default chooseSide;
