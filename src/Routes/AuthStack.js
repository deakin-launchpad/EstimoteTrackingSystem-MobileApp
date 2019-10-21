import {createStackNavigator} from 'react-navigation';
// import AuthSelection from '../Screens/Auth/AuthSelection';
import SignIn from '../Screens/Auth/SignIn';
import SignUp from '../Screens/Register/SignUp';
import ForgotPass from '../Screens/Auth/ForgotPass';
import OneTimePassword from '../Screens/Register/OneTimePassword';

const AuthStackNavigator = createStackNavigator(
  {
    // AuthSelection,
    SignIn,
    SignUp,
    ForgotPass,
    OneTimePassword,
  },
  {
    defaultNavigationOptions: () => {
      return {
        header: null,
      };
    },
  }
);

export default AuthStackNavigator;
