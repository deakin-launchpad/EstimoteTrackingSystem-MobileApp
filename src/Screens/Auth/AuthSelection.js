import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Text} from 'native-base';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  heading: {
    fontSize: 24,
  },
  headerContainer: {
    padding: 10,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
  },
  error: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: 'red',
  },
});

const AuthSelection = props => {
  const signIn = async userType => {
    const {navigation} = props;
    await AsyncStorage.setItem('@user_type', userType);
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => signIn('owner')} style={styles.button}>
        <FontAwesome name="user-tie" style={{fontSize: 60}} />
        <Text style={styles.buttonText}>Owner</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => signIn('worker')} style={styles.button}>
        <FontAwesome name="user-ninja" style={{fontSize: 60}} />
        <Text style={styles.buttonText}>Worker</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

AuthSelection.propTypes = {
  navigation: PropTypes.object,
};

export default AuthSelection;
