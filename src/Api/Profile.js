import AsyncStorage from '@react-native-community/async-storage';
import config from '../jsconfig';

export default async function getUserProfile() {
  try {
    const accessToken = await AsyncStorage.getItem('@access_token');
    const response = await fetch(`${config.baseUrl}:${config.port}/api/user/getProfile`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `bearer ${accessToken}`,
      },
    });
    const responseJson = await response.json();
    console.log('responseAPI', responseJson);
    return responseJson.data.customerData;
  } catch (err) {
    console.error(err);
    return err;
  }
}
