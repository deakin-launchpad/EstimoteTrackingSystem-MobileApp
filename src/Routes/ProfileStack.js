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
        headerLeft: (
          <Icon
            name="md-menu"
            size={30}
            style={{paddingLeft: 10}}
            onPress={() => navigation.openDrawer()}
          />
        ),
      };
    },
  }
);

export default ProfileStackNavigator;
