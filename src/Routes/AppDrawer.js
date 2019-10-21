import React from 'react';
import {createDrawerNavigator} from 'react-navigation';
import {Icon} from 'native-base';
import PropTypes from 'prop-types';
import MainStack from './MainStack';
import ProfileStack from './ProfileStack';
import DrawerMenu from '../Screens/Drawer/DrawerMenu';

const AppDrawer = createDrawerNavigator(
  {
    Home: {
      screen: MainStack,
      navigationOptions: () => ({
        drawerIcon: () => <Icon name="md-home" style={{fontSize: 24}} />,
      }),
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: () => ({
        drawerIcon: () => <Icon name="md-cog" style={{fontSize: 24}} />,
      }),
    },
  },
  {
    initialRouteName: 'Home',
    contentComponent: DrawerMenu,
    contentOptions: {
      activeTintColor: 'orange',
    },
  }
);

AppDrawer.propTypes = {
  tintColor: PropTypes.string,
};

export default AppDrawer;
