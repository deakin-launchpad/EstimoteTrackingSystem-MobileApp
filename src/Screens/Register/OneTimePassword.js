import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Form, Item, Input, Label, Button, Text} from 'native-base';
import PropTypes from 'prop-types';
import {verifyOTP, resendOTP} from '../../Api/Auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  form: {
    justifyContent: 'center',
  },
  button: {
    justifyContent: 'center',
    textAlign: 'center',
    padding: 20,
    borderRadius: 1,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  resendText: {
    color: 'blue',
    textAlign: 'center',
  },
  error: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: 'red',
  },
  welcomeContainer: {
    padding: 10,
  },
  welcome: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

const OneTimePassword = props => {
  const [userOtp, setOTP] = useState('');
  const [otpError, setOTPError] = useState('');
  const [otp, showOTP] = useState('');

  const validateOTP = async () => {
    const {navigation} = props;
    const response = await verifyOTP({
      userOtp,
    });
    // await AsyncStorage.setItem('@userData', response.userDetails);
    console.log('User Data', response);
    if (!response.error) {
      navigation.navigate('SignIn');
    } else {
      setOTPError(response.message);
    }
  };

  const resendOTPAPI = async () => {
    setOTPError('');
    const accessToken = await AsyncStorage.getItem('@access_token');
    const response = await resendOTP(accessToken);
    console.log('User Data', response);
    showOTP(`OTP = ${response.OTPCode}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcome}>One Time Password,</Text>
          <Text>Enter OTP to continue</Text>
        </View>
        <View>
          <Label style={styles.error}>{otp}</Label>
        </View>
        <Form>
          <Item inlineLabel>
            <Label>OTP Code</Label>
            <Input
              autoFocus
              value={userOtp}
              onChangeText={e => {
                setOTP(e);
              }}
            />
          </Item>
          <View>
            <Label style={styles.error}>{otpError}</Label>
          </View>
          <View style={{alignItems: 'center'}}>
            <Button primary onPress={() => validateOTP()} style={styles.button}>
              <Text style={styles.buttonText}>Confirm!</Text>
            </Button>
            <Button transparent onPress={() => resendOTPAPI()} style={styles.button}>
              <Text style={styles.resendText}>Resend OTP</Text>
            </Button>
          </View>
        </Form>
      </View>
    </View>
  );
};

OneTimePassword.propTypes = {
  navigation: PropTypes.object,
};

export default OneTimePassword;
