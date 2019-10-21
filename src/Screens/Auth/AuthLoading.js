import React, {useEffect} from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import {verifyAccessToken} from '../../Api/Auth';

const AuthLoading = props => {
  // Fetch the token from storage then navigate to our appropriate place
  const bootstrapAsync = async () => {
    const {navigation} = props;
    const accessToken = await AsyncStorage.getItem('@access_token');
    console.log(accessToken);

    let userDetails = await AsyncStorage.getItem('@userData');

    // Check if the user is Signed In or Not
    // If Signed In Verify the AccessToken and OTP
    if (accessToken) {
      const response = await verifyAccessToken({accessToken});
      if (response.message === 'Success') {
        userDetails = JSON.parse(userDetails);
        console.log('verify', userDetails);
        navigation.navigate(userDetails.emailVerified ? 'App' : 'OneTimePassword');
      } else {
        console.log('going in auth');
        navigation.navigate('Auth');
      }
    } else {
      console.log('going in auth again');
      navigation.navigate('Auth');
    }
  };

  useEffect(() => {
    bootstrapAsync();
  }, []);

  // Render any loading content that you like here

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};

AuthLoading.propTypes = {
  navigation: PropTypes.object,
};

export default AuthLoading;
