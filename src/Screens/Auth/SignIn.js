import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Form, Item, Input, Label, Button, Text} from 'native-base';
import PropTypes from 'prop-types';
import {signInUserApi} from '../../Api/Auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    justifyContent: 'center',
    padding: 20,
    borderRadius: 1,
    width: '100%',
  },
  buttonText: {
    textAlign: 'center',
  },
  forgotPassText: {
    // color: 'blue',
    textAlign: 'right',
  },
  signinText: {
    color: 'white',
    textAlign: 'center',
  },
  signUp: {
    color: 'blue',
  },
  error: {
    paddingVertical: 10,
    paddingHorizontal: 15,
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

const SignIn = props => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const signInAsync = async () => {
    const {navigation} = props;
    setLoginError('');
    const response = await signInUserApi({
      emailId,
      password,
    });
    if (!response.error) {
      const {data} = response;
      await AsyncStorage.setItem('@access_token', data.accessToken);
      await AsyncStorage.setItem('@userData', JSON.stringify(data.userDetails));
      console.log('User Data', data.userDetails);
      navigation.navigate('App');
    } else {
      setLoginError(response.message);
    }
  };

  const signUp = () => {
    const {navigation} = props;
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcome}>Welcome,</Text>
          <Text>Sign in to continue</Text>
        </View>
        <Form>
          <Item inlineLabel last>
            <Label>Email</Label>
            <Input
              keyboardType="email-address"
              autoFocus
              value={emailId}
              onChangeText={e => setEmailId(e)}
            />
          </Item>
          <Item inlineLabel last>
            <Label>Password</Label>
            <Input secureTextEntry value={password} onChangeText={e => setPassword(e)} />
          </Item>
          <Text transparent onPress={() => signInAsync()} style={styles.button}>
            <Text style={styles.forgotPassText}>Forgot password?</Text>
          </Text>
          {loginError ? (
            <View>
              <Label style={styles.error}>{loginError}</Label>
            </View>
          ) : null}
        </Form>
        <View style={{padding: 10}}>
          <Button primary onPress={() => signInAsync()} style={styles.button}>
            <Text style={styles.signinText}>Sign in!</Text>
          </Button>
          <Text transparent style={styles.button}>
            <Text style={styles.buttonText}>
              New User?{' '}
              <Text style={styles.signUp} onPress={() => signUp()}>
                Sign Up
              </Text>
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

SignIn.propTypes = {
  navigation: PropTypes.object,
};

export default SignIn;
