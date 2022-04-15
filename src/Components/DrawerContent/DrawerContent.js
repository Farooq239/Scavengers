import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
// import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import userLogo from '../../Assets/Logo.png';
import {Avatar, Title, Caption, Drawer} from 'react-native-paper';
import Theme from '../../Utils/Theme';
export function DrawerContent({props, navigation}) {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image source={userLogo} size={50} />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '75%',
                  }}>
                  <Title style={styles.title}>Yasir Munir</Title>
                  <Icon
                    name="close"
                    color={Theme.iconGrey}
                    size={Theme.iconSize}
                    onPress={() => navigation.closeDrawer()}
                  />
                </View>
                <Caption style={styles.caption}>@itsyasir</Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-edit-outline" color={color} size={size} />
              )}
              label="Add Place"
              onPress={() => navigation.navigate('AddPlace')}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-circle-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => navigation.navigate('Profile')}
            />

            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Your Trips"
              onPress={() => navigation.navigate('YourTrip')}
            />

            <DrawerItem
              icon={({color, size}) => (
                <Icon
                  name="comment-multiple-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Term and Condition"
              onPress={() => navigation.navigate('TermAndCondtion')}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-check-outline" color={color} size={size} />
              )}
              label="Support"
              onPress={() => navigation.navigate('Support')}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Log-out"
          onPress={() => navigation.replace('LoginScreen')}
        />
      </Drawer.Section>
    </View>
  );
}
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {marginTop: 15},
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#1f65ff',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
