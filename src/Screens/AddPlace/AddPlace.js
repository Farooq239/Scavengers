/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Theme from '../../Utils/Theme';
import styles from './Style';
import Header from '../../Components/Headers/Headers';
const AddPlace = ({navigation}) => {
  const [addPost, SetAddPost] = useState(false);
  return (
    <View style={styles.MainView}>
      <Header
        label="Add Place Info"
        labelIcon={true}
        onPress={() => navigation.goBack()}
      />
      {addPost === false ? (
        <>
          <Image
            source={require('../../Assets/MapImg.jpg')}
            style={styles.imgMap}
          />
          <View style={styles.setWidth}>
            <View style={{borderBottomWidth: 0.3}}>
              <Text style={styles.txtAddQuiz}>Post Information</Text>
            </View>
            <View>
              <Text style={{...styles.txtAddQuiz, fontSize: Theme.txtSmall}}>
                Post Name:
              </Text>
              <TextInput
                placeholder="Input Place Name"
                style={styles.inputTxtPlace}
                maxLength={35}
              />
            </View>
            <View>
              <Text style={{...styles.txtAddQuiz, fontSize: Theme.txtSmall}}>
                Post Information:
              </Text>
              <View style={styles.inputTxtInfo}>
                <TextInput
                  placeholder="Input Post Information"
                  multiline={true}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.btnAddPost}
              onPress={() => SetAddPost(true)}>
              <Text style={styles.txtAddPost}>Add Post</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : addPost === true ? (
        <>
          <View style={{alignItems: Theme.align, marginTop: '20%'}}>
            <Image
              source={require('../../Assets/tick.jpg')}
              style={styles.imgTick}
            />
            <Text style={styles.txtPost}>Post Update Successfully</Text>
          </View>
          <View style={styles.flexJustify}>
            <TouchableOpacity
              style={styles.btnGoBack}
              onPress={() => navigation.navigate('HomePage')}>
              <Text style={styles.txtGoBack}>Exit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.btnGoBack, backgroundColor: Theme.primary}}
              onPress={() => navigation.navigate('AddQuiz')}>
              <Text style={{...styles.txtGoBack, color: Theme.txtWhite}}>
                Add Quiz
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : null}
    </View>
  );
};
export default AddPlace;
