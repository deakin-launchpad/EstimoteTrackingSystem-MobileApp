import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Text, ScrollView} from 'react-native';
import {Label} from 'native-base';
import getUserProfile from '../../Api/Profile';

const userImage = require('../../Assets/profile.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userImageContainer: {
    height: 150,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImage: {
    height: 90,
    width: 90,
    borderRadius: 60,
  },
  infoContainer: {
    padding: 10,
  },
  info: {
    margin: 10,
  },
  infoLabel: {
    marginVertical: 5,
  },
  verified: {
    color: 'green',
  },
  notVerified: {
    color: 'green',
  },
});
const UserProfile = () => {
  const [profile, setProfile] = useState(null);

  const getProfile = async () => {
    const profileData = await getUserProfile();
    setProfile(profileData);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <View style={styles.container}>
      {profile ? (
        <ScrollView>
          <View style={styles.userImageContainer}>
            <Image style={styles.userImage} source={userImage} />
            {profile.emailVerified ? (
              <Label style={styles.verified}>Verified</Label>
            ) : (
              <Label style={styles.notVerified}>Not Verified</Label>
            )}
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.info}>
              <Label style={styles.infoLabel}>Name</Label>
              <Text>{`${profile.firstName} ${profile.lastName}`}</Text>
            </View>
            <View style={styles.info}>
              <Label style={styles.infoLabel}>Email</Label>
              <Text>{profile.emailId}</Text>
            </View>
            <View style={styles.info}>
              <Label style={styles.infoLabel}>Phone Number</Label>
              <Text>{`${profile.countryCode}-${profile.phoneNumber}`}</Text>
            </View>
            <View style={styles.info}>
              <Label style={styles.infoLabel}>Joined At</Label>
              <Text>{new Date(profile.registrationDate).toISOString().substring(0, 10)}</Text>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.userImageContainer}>
          <Text>Loading</Text>
        </View>
      )}
    </View>
  );
};

export default UserProfile;
