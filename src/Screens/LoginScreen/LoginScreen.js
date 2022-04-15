import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-paper';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import Header from '../../Components/Headers/Headers';
import styles from './Style';
import Theme from '../../Utils/Theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import {Formik} from 'formik';
import * as yup from 'yup';
const reviewSchema = yup.object({
  Email: yup.string().email('Invalid email').required(),
  Password: yup.string().required('Password field not empty'),
});
const Login = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loader, Setloader] = React.useState(false);

  const loginFunc = (Email, Password) => {
    // alert(Email, Password);
    Setloader(true);
    auth()
      .signInWithEmailAndPassword(Email, Password)
      .then(() => {
        Setloader(false);
        navigation.replace('HomePage2');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Setloader(false);
          alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Setloader(false);
          alert('That email address is invalid!');
        }

        // console.error(error);
        Setloader(false);
        alert(error);
      });
  };

  return (
    <View style={styles.MainView}>
      <Header label={'Login'} headerLogin={true} />

      <Image
        source={require('../../Assets/Logo.png')}
        style={styles.imgSplash}
      />

      <Formik
        initialValues={{Email: email, Password: password}}
        validationSchema={reviewSchema} //check validation
        onSubmit={(values, actions) => {
          // action is use  for call reset form
          actions.resetForm();
          loginFunc(values.Email, values.Password);
        }}>
        {props => (
          <View style={styles.wrapEmailPass}>
            <TextInput
              // label="Input Email"
              placeholder="Input Email"
              placeholderTextColor={Theme.primary}
              value={props.values.Email}
              onChangeText={props.handleChange('Email')}
              style={styles.txtInput}
              selectionColor={Theme.primary}
              underlineColor={Theme.primary}
            />
            <Text style={styles.errorTxt}>
              {props.touched.Email && props.errors.Email}
            </Text>
            <TextInput
              // label="Input Password"
              placeholderTextColor={Theme.primary}
              placeholder="Input Password"
              value={props.values.Password}
              onChangeText={props.handleChange('Password')}
              secureTextEntry={true}
              style={styles.txtInput}
              selectionColor={Theme.primary}
              underlineColor={Theme.primary}
            />
            <Text style={styles.errorTxt}>
              {props.touched.Password && props.errors.Password}
            </Text>
            <TouchableOpacity
              style={styles.btnLogin}
              onPress={props.handleSubmit}
              // onPress={() => loginFunc()}
            >
              <Text style={styles.txtLogin}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.replace('SignupScreen')}>
              <Text style={styles.txtNotAccount}>
                Not have account?{' '}
                <Text style={{color: Theme.primary}}>SignUp</Text>
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <View style={styles.wrapSocial}>
        <TouchableOpacity
          style={{...styles.brnSocial, backgroundColor: '#4267B2'}}>
          <FontAwesome
            name="facebook"
            color={Theme.white}
            size={Theme.iconSize}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.brnSocial, backgroundColor: '#db3236'}}>
          <FontAwesome
            name="google"
            color={Theme.white}
            size={Theme.iconSize}
          />
        </TouchableOpacity>
      </View>

      <Modal visible={loader}>
        <View
          style={{
            flex: 1,
            alignItems: Theme.align,
            justifyContent: Theme.align,
            backgroundColor: Theme.white,
          }}>
          <Image
            source={require('../../Assets/Logo.png')}
            style={{...styles.imgSplash, bottom: '10%'}}
          />
          <ActivityIndicator size="large" color={Theme.primary} />
          <Text style={styles.txtLoading}>Loading please wait...</Text>
        </View>
      </Modal>
    </View>
  );
};

export default Login;
