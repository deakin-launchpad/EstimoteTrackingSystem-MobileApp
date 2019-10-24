import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Text, ScrollView} from 'react-native';
import {Label, Card, CardItem, Body} from 'native-base';
import getUserProfile from '../../Api/Profile';

const userImage = require('../../Assets/profile.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userImageContainer: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImage: {
    height: 90,
    width: 90,
    borderRadius: 60,
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
  },
  headerContainer: {
    backgroundColor: 'blue',
  },
  headerText: {
    fontWeight: 'bold',
    color: 'white',
  },
  infoContainer: {
    padding: 10,
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
            <Card>
              <CardItem header style={styles.headerContainer}>
                <Body style={styles.header}>
                  <Text style={styles.headerText}>Name</Text>
                </Body>
              </CardItem>
              <CardItem>
                <Text>{`${profile.firstName} ${profile.lastName}`}</Text>
              </CardItem>
            </Card>
            <Card>
              <CardItem header style={styles.headerContainer}>
                <Body style={styles.header}>
                  <Text style={styles.headerText}>Email</Text>
                </Body>
              </CardItem>
              <CardItem>
                <Text>{profile.emailId}</Text>
              </CardItem>
            </Card>
            <Card>
              <CardItem header style={styles.headerContainer}>
                <Body style={styles.header}>
                  <Text style={styles.headerText}>Phone Number</Text>
                </Body>
              </CardItem>
              <CardItem>
                <Text>{`${profile.countryCode}-${profile.phoneNumber}`}</Text>
              </CardItem>
            </Card>
            <Card>
              <CardItem header style={styles.headerContainer}>
                <Body style={styles.header}>
                  <Text style={styles.headerText}>Joined At</Text>
                </Body>
              </CardItem>
              <CardItem>
                <Text>{new Date(profile.registrationDate).toISOString().substring(0, 10)}</Text>
              </CardItem>
            </Card>
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
