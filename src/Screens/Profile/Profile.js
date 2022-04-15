import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import styles from './Style';
import Header from '../../Components/Headers/Headers';

const Profile = ({navigation}) => {
  const [img, SetImg] = useState('');
  const [name, SetName] = useState('Yasir Munir');
  const [email, SetEmail] = useState('yasir.official128@gmail.com');
  const [totalTrips, SetTotalTrips] = useState('20');
  const [totalAttempt, SetTotalAttempt] = useState('86');

  const pickImg = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      SetImg(image);
    });
  };
  return (
    <View style={styles.MainView}>
      <Header
        label="My Profile"
        labelIcon={true}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.setWidth}>
        {img === '' ? (
          <View style={styles.wrapImg}>
            {/* Set Image Here */}
            <TouchableOpacity
              style={styles.wrapAddImges}
              onPress={() => pickImg()}>
              {/* <Antdesign name="pluscircleo" color={Theme.primary} size={90} /> */}
              <Image
                source={require('../../Assets/avatar.png')}
                style={styles.imgProfile}
              />
              <Text style={styles.txtAddImg}>Add Profile</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.wrapImg}>
              <Image
                source={{
                  uri: img.path,
                }}
                style={styles.imgProfile}
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                }}
                onPress={() => pickImg()}>
                <Text style={styles.txtEdit}>Edit</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        <View style={styles.flexJustify}>
          <View style={styles.wrap40}>
            <Text style={styles.txtEmail}>User Name </Text>
          </View>
          <View style={styles.wrap60}>
            <Text style={{...styles.txtEmail, fontWeight: '100'}}>{name}</Text>
          </View>
        </View>
        <View style={styles.flexJustify}>
          <View style={styles.wrap40}>
            <Text style={styles.txtEmail}>Email </Text>
          </View>
          <View style={styles.wrap60}>
            <Text style={{...styles.txtEmail, fontWeight: '100'}}>{email}</Text>
          </View>
        </View>
        <View style={styles.flexJustify}>
          <View style={styles.wrap40}>
            <Text style={styles.txtEmail}>Total Trips </Text>
          </View>
          <View style={styles.wrap60}>
            <Text style={{...styles.txtEmail, fontWeight: '100'}}>
              {totalTrips}
            </Text>
          </View>
        </View>
        <View style={styles.flexJustify}>
          <View style={styles.wrap40}>
            <Text style={styles.txtEmail}>Total Quiz Attempt </Text>
          </View>
          <View style={styles.wrap60}>
            <Text style={{...styles.txtEmail, fontWeight: '100'}}>
              {totalAttempt}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Profile;
