import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ForgotPass = () => {
  return (
    <View style={styles.container}>
      <Text> ForgotPass </Text>
    </View>
  );
};

export default ForgotPass;