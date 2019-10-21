import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import AppDrawer from './AppDrawer';
import AuthStack from './AuthStack';
import AuthLoading from '../Screens/Auth/AuthLoading';

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading,
    App: AppDrawer,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export default createAppContainer(AppNavigator);
