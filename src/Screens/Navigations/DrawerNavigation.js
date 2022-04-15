import * as React from 'react';
// import {createDrawerNavigator} from '@react-navigation/drawer';
import HomePage from '../HomePage/HomePage';
import Profile from '../Profile/Profile';
import Support from '../Support/Support';

import YourTrip from '../YourTrip/YourTrip';
import TermAndCondtion from '../TermAndCondtion/TermAndCondtion';
import {DrawerContent} from '../../Components/DrawerContent/DrawerContent';
// const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Drawer.Navigator
      initialRouteName="HomePage"
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="HomePage" component={HomePage} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="TermAndCondtion" component={TermAndCondtion} />
      <Drawer.Screen name="Support" component={Support} />
      <Drawer.Screen name="YourTrip" component={YourTrip} />
    </Drawer.Navigator>
  );
}
