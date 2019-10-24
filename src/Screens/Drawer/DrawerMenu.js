import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  DeviceEventEmitter,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {DrawerItems} from 'react-navigation';
import PropTypes from 'prop-types';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const userImage = require('../../Assets/profile.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  signOut: {
    flexDirection: 'row',
  },
  signOutText: {
    fontWeight: 'bold',
    margin: 16,
    color: 'red',
  },
  signOutIcon: {
    color: 'red',
    fontSize: 20,
    marginVertical: 16,
    marginLeft: 16,
    marginRight: 20,
  },
  userImageContainer: {
    height: 150,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImage: {
    height: 90,
    width: 90,
    borderRadius: 60,
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: 'white',
  },
});

const DrawerMenu = props => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userImageContainer}>
        <Image style={styles.userImage} source={userImage} />
      </View>
      <ScrollView>
        <DrawerItems {...props} />

        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              'Sign Out',
              'Are you sure?',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Sign Out',
                  onPress: async () => {
                    await AsyncStorage.clear();
                    DeviceEventEmitter.removeAllListeners();
                    props.navigation.navigate('Auth');
                  },
                },
              ],
              {cancelable: false}
            )
          }>
          <View style={styles.signOut}>
            <SimpleLineIcons name="logout" style={styles.signOutIcon} />
            <Text style={styles.signOutText}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DrawerMenu;

DrawerMenu.propTypes = {
  navigation: PropTypes.object,
};
