/* eslint-disable no-sequences */
/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAP_KEY} from '../../Constants/GoogleMapKey';
import {db, auth} from '../../Utils/Exports';
import Theme from '../../Utils/Theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddressPickup = ({placheholderText, fetchAddress}) => {
  const [xyz, setXyz] = useState('');

  const onPressAddress = async (data, details) => {
    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    const cityVal = details.formatted_address;
    const cityVal1 = details.formatted_address;
    // await AsyncStorage.setItem('cityVal', cityVal);
    // await AsyncStorage.setItem('cityVal1', cityVal1);
    fetchAddress(lat, lng, cityVal);

    // console.log(cityVal);
    // streetAdress();

    let resLength = details.address_components;
    let zipCode = '';

    let filtersResCity = details.address_components.filter(val => {
      if (val.types.includes('locality') || val.types.includes('sublocality')) {
        return val;
      }
      if (val.types.includes('postal_code')) {
        let postalCode = val.long_name;
        zipCode = postalCode;
      }
      return false;
    });

    let dataTextCityObj =
      filtersResCity.length > 0
        ? filtersResCity[0]
        : details.address_components[
            resLength > 1 ? resLength - 2 : resLength - 1
          ];

    const cityText =
      dataTextCityObj.long_name && dataTextCityObj.long_name.length > 17
        ? dataTextCityObj.short_name
        : dataTextCityObj.long_name;
    setXyz(cityVal);

    // console.log("zip cod found", zipCode)
    // console.log('city namte', inputCity);

    // console.warn('CityVal:', xyz);

    // fetchAddress(lat, lng, zipCode, cityText);
  };
  const checkValid = () => {
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
      pickupCordss;
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
    // Alert.alert('Item saved successfully');
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <GooglePlacesAutocomplete
          placeholder={placheholderText}
          onPress={onPressAddress}
          fetchDetails={true}
          query={{
            key: GOOGLE_MAP_KEY,
            language: 'en',
          }}
          styles={{
            textInputContainer: styles.containerStyle,
            textInput: styles.textInputStyle,
            separator: styles.separator,
          }}
        />
      </View>
      <TouchableOpacity onPress={onDone}>
        <View style={{right: 10, flex: 1, marginTop: 10}}>
          <Ionicons name="search-outline" color="gray" size={30} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Theme.white,
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
  },
  containerStyle: {backgroundColor: 'transparent'},
  textInputStyle: {
    height: 50,
    color: 'black',
    fontSize: 16,
    // backgroundColor: 'black',
    backgroundColor: Theme.white,
    borderRadius: 7,
  },
  textInput: {
    height: 48,
    color: 'black',
    fontSize: 16,
    backgroundColor: '#8EC2E2',
    // marginLeft: 5,
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
});

export default AddressPickup;
