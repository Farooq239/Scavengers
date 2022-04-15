import database from '@react-native-firebase/database';
import authentication from '@react-native-firebase/auth';
import stor from '@react-native-firebase/storage';
import {firebase} from '@react-native-firebase/database';
const auth = authentication();
const db = database();
const storage = stor();
const timeStamp = firebase.database.ServerValue.TIMESTAMP;
export {db, auth, storage, timeStamp};
