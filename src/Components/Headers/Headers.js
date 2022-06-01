/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Modal,
  Image,
  TouchableOpacity,
} from 'react-native';
import Theme from '../../Utils/Theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import styles from './Style';
import {db, auth} from '../../Utils/Exports';

const Headers = props => {
  const [City, setcity] = useState([]);
  const {
    headerLogin,
    label,
    headerThreeComp,
    drawerPress,
    searchPress,
    onPress,
    labelIcon,
    city,
    cityName,
    headerFourComp,
    navigation,
  } = props;
  return (
    <>
      {Platform.OS === 'ios' ? (
        <StatusBar barStyle="light-content" />
      ) : (
        <StatusBar barStyle="light-content" backgroundColor={Theme.primary} />
      )}
      {headerLogin === true ? (
        <View style={styles.headerWrap}>
          <Text style={styles.txtLabel}>{label}</Text>
        </View>
      ) : headerThreeComp === true ? (
        <View style={styles.headerWrap}>
          <View style={styles.flexJustify}>
            <AntDesign
              name="indent-right"
              color={Theme.white}
              size={Theme.iconSize}
              onPress={() => {
                alert('Working');
              }}
            />
            <Text style={styles.txtLabel}>{label}</Text>
            <FontAwesome5
              name="search-plus"
              color={Theme.white}
              size={Theme.iconSize}
              onPress={searchPress}
            />
          </View>
        </View>
      ) : headerFourComp === true ? (
        <View style={styles.headerWrap}>
          <View style={styles.flexJustify}>
            <AntDesign
              name="left"
              color={Theme.white}
              size={Theme.iconSize}
              onPress={() => navigation.replace('HomePage2')}
            />
            <Text style={styles.txtLabel}>{label}</Text>
            {/* <FontAwesome5
              name="search-plus"
              color={Theme.white}
              size={Theme.iconSize}
            /> */}
            <TouchableOpacity onPress={searchPress}>
              <Text style={{fontSize: Theme.hp('2.5%'), color: Theme.white}}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : labelIcon === true ? (
        <View style={styles.headerWrap}>
          <View style={styles.flexJustify}>
            <AntDesign
              name="arrowleft"
              color={Theme.white}
              size={Theme.iconSize}
              onPress={onPress}
            />
            <Text style={styles.txtLabel}>{label}</Text>
            <Text style={{color: Theme.primary}}>.</Text>
          </View>
        </View>
      ) : city === true ? (
        <View style={styles.headerWrap1}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '83%',
            }}>
            <View style={{width: '10%'}}>
              <Image
                source={require('../../Assets/mapPin.png')}
                style={{height: 30, width: 30}}
              />
            </View>
            <View style={{width: '80%'}}>
              <Text style={styles.cityText}>{cityName}</Text>
            </View>
          </View>
          <View
            style={{
              width: '20%',
              marginLeft: '1%',
            }}>
            <TouchableOpacity onPress={() => navigation.replace('HomePage2')}>
              <Text
                style={{
                  fontSize: 17,
                  color: Theme.black,
                }}>
                Back
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};
export default Headers;
