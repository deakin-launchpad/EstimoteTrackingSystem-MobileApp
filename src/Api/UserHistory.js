import AsyncStorage from '@react-native-community/async-storage';
import config from '../jsconfig';

export default async function createUserHistory(beaconData) {
  try {
    const accessToken = await AsyncStorage.getItem('@access_token');
    const response = await fetch(
      `${config.baseUrl}:${config.port}/api/userHistory/createUserHistory`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `bearer ${accessToken}`,
        },
        body: JSON.stringify({
          deviceMajor: beaconData.major.toString(),
          deviceMinor: beaconData.minor.toString(),
        }),
      }
    );
    const responseJson = await response.json();
    // console.log('responseAPI', responseJson);
    return responseJson;
  } catch (err) {
    console.error(err);
    return err;
  }
}
