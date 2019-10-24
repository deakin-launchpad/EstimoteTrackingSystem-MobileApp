import React from 'react';
import {createStackNavigator} from 'react-navigation';
import {Icon} from 'native-base';
import UserProfile from '../Screens/Profile/UserProfile';

const ProfileStackNavigator = createStackNavigator(
  {
    Profile: UserProfile,
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      const {routeName} = navigation.state;
      return {
        title: routeName,
        headerStyle: {
          backgroundColor: 'blue',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: (
          <Icon
            name="md-menu"
            size={30}
            style={{paddingLeft: 10, color: 'white'}}
            onPress={() => navigation.openDrawer()}
          />
        ),
      };
    },
  }
);

export default ProfileStackNavigator;
