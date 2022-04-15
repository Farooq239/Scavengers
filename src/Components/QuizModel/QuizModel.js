/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Headers from '../Headers/Headers';
import Theme from '../../Utils/Theme';
import AntDesign from 'react-native-vector-icons/AntDesign';

const QuizModel = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{flex: 1}}>
      <Headers
        label={'Quiz Model'}
        headerLogin={true}
        onPress={() => navigation.goBack()}
      />
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => setModalVisible(!modalVisible)}>
        <Text style={{fontSize: 30}}>Check Model</Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.modalView}>
            <AntDesign
              name="closecircleo"
              color="red"
              style={{
                fontSize: Theme.hp('5%'),
                alignSelf: 'flex-end',
              }}
              onPress={() => setModalVisible(!modalVisible)}
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 35,
                // height: Theme.wp('30%'),
                // width: Theme.hp('20%'),
              }}>
              <Image
                source={require('../../Assets/placeholder.png')}
                style={{height: Theme.hp('15%'), width: Theme.wp('25%')}}
              />
              <Text style={{fontSize: 20, marginTop: 20, textAlign: 'center'}}>
                You can add your Quiz or Record
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: Theme.hp('5%'),
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('enterquiz');
                  setModalVisible(!modalVisible);
                }}>
                <View
                  style={{
                    backgroundColor: Theme.primary,
                    height: Theme.hp('7%'),
                    width: Theme.wp('25%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    borderWidth: 1,
                    marginRight: 45,
                  }}>
                  <Text style={{fontSize: 15, color: Theme.white}}>
                    Add Quiz
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('record');
                  setModalVisible(!modalVisible);
                }}>
                <View
                  style={{
                    backgroundColor: Theme.primary,
                    height: Theme.hp('7%'),
                    width: Theme.wp('25%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    borderWidth: 1,
                  }}>
                  <Text style={{fontSize: 15, color: Theme.white}}>
                    Add Record
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default QuizModel;

const styles = StyleSheet.create({
  modalView: {
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 40,
    // alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  height: Theme.hp('22%'),
});
