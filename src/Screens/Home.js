/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {Text, DeviceEventEmitter, Image} from 'react-native';
import {Container, Header, Content, Footer, CardItem, Body, Card, Title, Right} from 'native-base';
import Beacons from 'react-native-beacons-manager';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';

// Beacons.detectIBeacons();

const Home = () => {
  const [counter, setCounter] = useState(0);
  const [room, setRoom] = useState('');
  const [uniqueId, setUniqueId] = useState('');
  const [deviceName, setDeviceName] = useState('');

  const getProfile = async () => {
    const profileData = await getUserProfile();
    setProfile(profileData);
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
        setBeacons(data.beacons);
        setCounter(0);
        if (
          data.beacons.sort((a, b) => a.distance - b.distance)[0].minor === 42714 &&
          data.beacons.sort((a, b) => a.distance - b.distance)[0].major === 8817
        ) {
          const currentRoom = 'Lab';
          if (room !== currentRoom) {
            setRoom('Lab');
            // setUserActivity({
            //   userId: uniqueId,
            //   roomId: 'Lab',
            // });
          }
        } else if (
          data.beacons.sort((a, b) => a.distance - b.distance)[0].minor === 49385 &&
          data.beacons.sort((a, b) => a.distance - b.distance)[0].major === 30174
        ) {
          const currentRoom = 'Kitchen';
          if (room !== currentRoom) {
            setRoom('Kitchen');
            // setUserActivity({
            //   userId: uniqueId,
            //   roomId: 'Kitchen',
            // });
          }
        }
      } else {
        const newCounter = counter + 1;
        setCounter(newCounter);
        if (counter > 15) {
          const currentRoom = 'No Room Assigned';
          if (room !== currentRoom) {
            console.log('Not in range of any room');
            setRoom('No Room Assigned');
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
        {room ? (
          <>
            <Card>
              <CardItem header>
                <Body>
                  <Text>Your Phone's Unique ID</Text>
                </Body>
              </CardItem>
              <CardItem>
                <Text>{uniqueId}</Text>
              </CardItem>
            </Card>
            <Card>
              <CardItem header>
                <Body>
                  <Text>Your Phone's Name</Text>
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
                    <Text>You are in:</Text>
                  </Body>
                  <CardItem>
                    <Body>
                      <Text>{room} Area</Text>
                    </Body>
                  </CardItem>
                </Body>
              </CardItem>
            </Card>
            <Card>
              <CardItem>
                <Body>
                  <Body>
                    <Text>Nearest Bacon</Text>
                  </Body>
                  <CardItem>
                    {room === 'Kitchen' ? (
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
                </Body>
              </CardItem>
            </Card>
          </>
        ) : (
          <>
            <Card>
              <CardItem header>
                <Body>
                  <Text>Your Phone's Unique ID</Text>
                </Body>
              </CardItem>
              <CardItem>
                <Text>{uniqueId}</Text>
              </CardItem>
            </Card>
            <Card>
              <CardItem header>
                <Body>
                  <Text>Your Phone's Name</Text>
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
                    <Text>Searching for Area</Text>
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
