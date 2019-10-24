/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect, useRef} from 'react';
import {Text, DeviceEventEmitter, Image, StyleSheet} from 'react-native';
import {Container, Content, CardItem, Body, Card} from 'native-base';
import Beacons from 'react-native-beacons-manager';
import DeviceInfo from 'react-native-device-info';
import createUserHistory from '../Api/UserHistory';
import getUserProfile from '../Api/Profile';

function useStateRef(initialValue) {
  const [value, setValue] = useState(initialValue);

  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return [value, setValue, ref];
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerContainer: {
    backgroundColor: 'blue',
  },
  headerText: {
    fontWeight: 'bold',
    color: 'white',
  },
});

const Home = () => {
  const [counter, setCounter] = useState(0);
  const [value, setValue, ref] = useStateRef('');
  const [uniqueId, setUniqueId] = useState('');
  const [deviceName, setDeviceName] = useState('');

  const getProfile = async () => {
    const profileData = await getUserProfile();
    console.log(profileData);
    setUniqueId(profileData.uniqueDeviceId);
    setDeviceName(await DeviceInfo.getDeviceName());
  };

  const addBeaconListeners = async () => {
    Beacons.detectEstimotes();
    Beacons.startMonitoringForRegion({
      identifier: 'Demo_region',
      uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
      minor: 2461,
      major: 51260,
    })
      .then(() => {
        console.log('Region was set');
      })
      .catch(error => console.log(`region monitoring not started, error: ${error}`));

    Beacons.startRangingBeaconsInRegion({
      identifier: 'Demo_region',
      uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
    })
      .then(() => {
        console.log('Beacons were found');
      })
      .catch(error => console.log(`Beacons monitoring not started, error: ${error}`));
    DeviceEventEmitter.addListener('beaconsDidRange', data => {
      console.log('found beacons!', data.beacons.sort((a, b) => a.distance - b.distance));
      if (data.beacons.length > 0) {
        const nearestBeacon = data.beacons.sort((a, b) => a.distance - b.distance)[0];
        setCounter(0);
        if (nearestBeacon.minor === 42714 && nearestBeacon.major === 8817) {
          const currentRoom = 'Conference';
          if (ref.current !== currentRoom) {
            setValue(currentRoom);
            createUserHistory(nearestBeacon);
          }
        } else if (nearestBeacon.minor === 49385 && nearestBeacon.major === 30174) {
          const currentRoom = 'Kitchen';
          if (ref.current !== currentRoom) {
            setValue(currentRoom);
            createUserHistory(nearestBeacon);
          }
        } else if (nearestBeacon.minor === 15000 && nearestBeacon.major === 11000) {
          const currentRoom = 'Lab';
          if (ref.current !== currentRoom) {
            console.log('whyyyyyy?');
            setValue(currentRoom);
            createUserHistory(nearestBeacon);
          }
        }
      } else {
        const newCounter = counter + 1;
        setCounter(newCounter);
        if (counter > 15) {
          const currentRoom = 'No Room Assigned';
          if (ref.current !== currentRoom) {
            setValue('No Room Assigned');
            // deleteUserActivity({
            //   userId: uniqueId,
            // });
          }
        }
      }
    });
  };

  useEffect(() => {
    getProfile();
    addBeaconListeners();
  }, []);

  return (
    <Container>
      <Content padder>
        {ref.current ? (
          <>
            <Card>
              <CardItem header style={styles.headerContainer}>
                <Body style={styles.header}>
                  <Text style={styles.headerText}>Your Phone's Unique ID</Text>
                </Body>
              </CardItem>
              <CardItem>
                <Text>{uniqueId}</Text>
              </CardItem>
            </Card>
            <Card>
              <CardItem header style={styles.headerContainer}>
                <Body style={styles.header}>
                  <Text style={styles.headerText}>Your Phone's Name</Text>
                </Body>
              </CardItem>
              <CardItem>
                <Text>{deviceName}</Text>
              </CardItem>
            </Card>
            <Card>
              <CardItem header style={styles.headerContainer}>
                <Body style={styles.header}>
                  <Text style={styles.headerText}>Current Room</Text>
                </Body>
              </CardItem>
              <CardItem>
                <Text>{ref.current}</Text>
              </CardItem>
            </Card>
            <Card>
              <CardItem header style={styles.headerContainer}>
                <Body style={styles.header}>
                  <Text style={styles.headerText}>Nearest Bacon</Text>
                </Body>
              </CardItem>
              <CardItem>
                {ref.current === 'Kitchen' ? (
                  <Image
                    style={{height: 300, width: null, flex: 1}}
                    source={require('../Assets/beacon_blue.png')}
                  />
                ) : (
                  <Image
                    style={{height: 300, width: null, flex: 1}}
                    source={require('../Assets/beacon_green.png')}
                  />
                )}
              </CardItem>
            </Card>
          </>
        ) : (
          <>
            <Card>
              <CardItem header style={styles.headerContainer}>
                <Body style={styles.header}>
                  <Text style={styles.headerText}>Your Phone's Unique ID</Text>
                </Body>
              </CardItem>
              <CardItem>
                <Text>{uniqueId}</Text>
              </CardItem>
            </Card>
            <Card>
              <CardItem header style={styles.headerContainer}>
                <Body style={styles.header}>
                  <Text style={styles.headerText}>Your Phone's Name</Text>
                </Body>
              </CardItem>
              <CardItem>
                <Text>{deviceName}</Text>
              </CardItem>
            </Card>
            <Card>
              <CardItem>
                <Body>
                  <Body>
                    <Text>Searching for Beacons</Text>
                  </Body>
                </Body>
              </CardItem>
            </Card>
          </>
        )}
      </Content>
    </Container>
  );
};

export default Home;
