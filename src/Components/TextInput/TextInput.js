//import liraries
import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, TextInput, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

// create a component
const TextInputs = props => {
  const [search, setSearch] = useState('')
  const [filterData, setfilterData] = useState([])
  const [masterData, setmasterData] = useState([])
  const [users, setUsers] = useState([]);
  const getChatlist = async () => {
    const uid = auth.currentUser.uid
    db
        .ref('/Posts/' + uid)
        .on('value', snapshot => {
            // se.log('User data: ', Object.values(snapshot.val()));
            if (snapshot.val() != null) {
                setUsers(Object.values(snapshot.val()))
                setfilterData(Object.values(snapshot.val()))
                setmasterData(Object.values(snapshot.val()))
            }
        });
}
const searchFilterFunction = text => {
  if (text) {
      const newData = masterData.filter(function (item) {
          const itemData = item.name
              ? item.name.toUpperCase()
              : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      setfilterData(newData);
      setSearch(text);
  } else {
      setfilterData(users);
      setSearch(text);
  }
};

useEffect(() => {
  getChatlist();
}, []);
  const {
    onChange,
    value,
    flatlistdata,
    whenPressed,
    keyExtractor,
    textPress,
    inputRef,
    onSubmitEditing,
  } = props;
  const ref_input = useRef();
  const billingFirstNameInput = useRef(null);
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={flatlistdata}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',
              }}>
              <TextInput
                // placeholder={'hello'}
                value={value}
                ref={inputRef}
                returnKeyType="next"
                autoFocus={true}
                onChangeText={text => searchFilterFunction(text)}
                onClear={text => searchFilterFunction('')}
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="always"
                onSubmitEditing={onSubmitEditing}
                style={{
                  borderWidth: 1,
                  marginTop: '5%',
                  borderColor: '#66B5EB',
                  borderRadius: 7,
                  width: '80%',
                  backgroundColor: '#66B5EB',
                }}
                editable={true}
                onPressIn={whenPressed}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descTxt: {
    width: '100%',

    color: 'black',
    fontSize: 16,
    borderRadius: 5,
    backgroundColor: '#8EC2E2',
    marginBottom: 17,
  },
});

export default TextInputs;
