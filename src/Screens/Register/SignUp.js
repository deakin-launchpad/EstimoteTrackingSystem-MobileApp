import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {Form, Item, Input, Label, Button, Text} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import PropTypes from 'prop-types';
import {signUpUserApi} from '../../Api/Auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  form: {
    flex: 1,
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
  signin: {
    color: 'blue',
  },
});

const SignUp = props => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phNumber, setNumber] = useState('');
  const [ccode, setCCode] = useState('');
  const [password, setPassword] = useState('');
  const [signupError, setSignUpError] = useState('');

  const signIn = async () => {
    const {navigation} = props;
    navigation.goBack();
  };

  const signUp = async () => {
    const {navigation} = props;
    let uniqueDeviceId = await AsyncStorage.getItem('uniqueId');
    if (!uniqueDeviceId) {
      uniqueDeviceId = await DeviceInfo.getUniqueId();
      AsyncStorage.setItem('uniqueId', uniqueDeviceId);
    }
    const response = await signUpUserApi({
      firstName,
      lastName,
      email,
      phNumber,
      ccode,
      password,
      uniqueDeviceId,
    });
    if (!response.error) {
      const {data} = response;
      await AsyncStorage.setItem('@access_token', data.accessToken);
      await AsyncStorage.setItem('@userData', JSON.stringify(data.userDetails));
      console.log('User Data', data.userDetails);

      navigation.navigate('OneTimePassword');
    } else {
      setSignUpError(response.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcome}>Register,</Text>
          <Text>Sign up to continue</Text>
        </View>
        <Form>
          <Item inlineLabel last>
            <Label>First Name</Label>
            <Input autoFocus value={firstName} onChangeText={e => setFirstName(e)} />
          </Item>
          <Item inlineLabel last>
            <Label>Last Name</Label>
            <Input value={lastName} onChangeText={e => setLastName(e)} />
          </Item>
          <Item inlineLabel last>
            <Label>Email</Label>
            <Input value={email} onChangeText={e => setEmail(e)} />
          </Item>
          <Item inlineLabel last>
            <Label>Phone Number</Label>
            <Input value={phNumber} onChangeText={e => setNumber(e)} />
          </Item>
          <Item inlineLabel last>
            <Label>Country Code</Label>
            <Input value={ccode} onChangeText={e => setCCode(e)} />
          </Item>
          <Item inlineLabel last>
            <Label>Password</Label>
            <Input value={password} onChangeText={e => setPassword(e)} />
          </Item>
          <View>
            <Label style={styles.error}>{signupError}</Label>
          </View>
        </Form>
        <View style={{padding: 10}}>
          <Button primary onPress={() => signUp()} style={styles.button}>
            <Text style={styles.buttonText}>Sign Up!</Text>
          </Button>
          <Text transparent style={styles.button}>
            <Text>
              Already User?{' '}
              <Text style={styles.signin} onPress={() => signIn()}>
                Sign In
              </Text>
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

SignUp.propTypes = {
  navigation: PropTypes.object,
};

export default SignUp;
