/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Theme from '../../../Utils/Theme';
import styles from './Style';

// import BidHistory from './BidHistoryFlatList';
import {db, auth} from '../../../Utils/Exports';
const HomePageFL = props => {
  const {navigation, HomePageFL, data, cityy} = props;
  const [city, setcity] = useState([]);
  const [loader, Setloader] = React.useState(false);

  const getCity = () => {
    const currentUid = auth.currentUser.uid;
    const ref1 = db.ref('Users/' + currentUid).child('/Coords');
    const list1 = [];
    Setloader(false);
    ref1.on('value', snapshot => {
      if (!snapshot.exists) {
        console.warn('no dataaa');
      } else {
        if (snapshot.val()) {
          const {City} = snapshot.val();
          const items = Object.values({City});
          console.log('Itesm', items);
          list1.push(items);
          console.log('List1==', list1);

          setcity(list1);
        } else {
        }
      }
      Setloader(true);
    });
  };
  useEffect(() => {
    getCity();
  }, []);

  return (
    <>
      {HomePageFL === true ? (
        <>
          {loader === true ? (
            <>
              <FlatList
                data={data}
                renderItem={({item, index}) => {
                  console.log('Ye ha=>', item);
                  // console.log('????', item.Name);
                  console.log('City...', item.City);

                  return (
                    <View style={styles.setWidth}>
                      <TouchableOpacity
                        style={styles.flexJustify1}
                        // onPress={() =>
                        //   navigation.navigate('userSide', {
                        //     // TutorName: item.TutorName,
                        //     // TutorLevels: item.TutorLevels,
                        //     // TutorPrice: item.TutorPrice,
                        //     // TutorTrainHour: item.TutorTrainHour,
                        //     // TutorPaymentMethod: item.TutorPaymentMethod,
                        //     // TutorDesc: item.TutorDesc,
                        //     // TutorImg: item.TutorImg,
                        //     // Time: item.Time,
                        //     // BusinessName: item.BusinessName,
                        //     // BusinessAddress: item.BusinessAddress,
                        //     // TutorCity: item.TutorCity,
                        //   })
                        // }>
                        onPress={() =>
                          navigation.navigate('UserSideMap', {
                            Mode: 'UserSideMap',
                            TutorName: item.Name,
                          })
                        }>
                        <View style={styles.alignFlexJustify}>
                          <View>
                            <Text style={styles.txtName}>
                              City :{' '}
                              <Text
                                style={{
                                  ...styles.txtName,
                                  fontStyle: 'italic',
                                  fontSize: 15,
                                }}>
                                {/* {item.TutorCity} */}
                                {city}
                              </Text>
                            </Text>
                            <Text style={{color: 'black', fontWeight: '100'}}>
                              Created By
                              <Text
                                style={[styles.txtName, {fontWeight: '100'}]}>
                                {' '}
                                {item.Name}
                              </Text>
                            </Text>

                            {/* <Text style={{...styles.txtName, fontWeight: '100'}}>
                          Street : {item.Street}
                        </Text> */}
                          </View>
                          <Text style={styles.txtTime}>{item.Time}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            </>
          ) : (
            <ActivityIndicator size="large" color={Theme.primary} />
          )}
        </>
      ) : null}
    </>
  );
};
export default HomePageFL;
