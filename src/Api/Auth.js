import AsyncStorage from '@react-native-community/async-storage';
import config from '../jsconfig';

export async function signUpUserApi(userData) {
  try {
    const response = await fetch(`${config.baseUrl}:${config.port}/api/user/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: userData.firstName,
        lastName: userData.lastName,
        emailId: userData.email,
        phoneNumber: userData.phNumber,
        countryCode: userData.ccode,
        password: userData.password,
        uniqueDeviceId: userData.uniqueDeviceId,
      }),
    });
    const responseJson = await response.json();
    console.log('responseAPI', responseJson);
    if (responseJson.statusCode === 200 || responseJson.statusCode === 201) {
      return {data: responseJson.data, error: false};
    }
    if (responseJson.statusCode === 400) {
      return {
        message: responseJson.message,
        error: true,
      };
    }
    return {
      message: 'Check your fields',
      error: true,
    };
  } catch (err) {
    console.error(err);
    return err;
  }
}

export async function signInUserApi(userData) {
  try {
    const response = await fetch(`${config.baseUrl}:${config.port}/api/user/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailId: userData.emailId,
        password: userData.password,
      }),
    });
    const responseJson = await response.json();
    console.log('responseAPI', responseJson);
    if (responseJson.statusCode === 200) {
      return {data: responseJson.data, error: false};
    }
    if (responseJson.statusCode === 400) {
      return {
        message: responseJson.message,
        error: true,
      };
    }
    return {
      message: 'Check your fields',
      error: true,
    };
  } catch (err) {
    console.error(err);
    return err;
  }
}

export async function verifyOTP(userData) {
  try {
    const accessToken = await AsyncStorage.getItem('@access_token');
    const response = await fetch(`${config.baseUrl}:${config.port}/api/user/verifyOTP`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        OTPCode: userData.userOtp,
      }),
    });
    const responseJson = await response.json();
    console.log('responseAPI', responseJson);
    if (responseJson.statusCode === 200 || responseJson.statusCode === 201) {
      return {error: false};
    }
    if (responseJson.statusCode === 400) {
      return {
        message: responseJson.message,
        error: true,
      };
    }
    return {
      message: 'Check your fields',
      error: true,
    };
  } catch (err) {
    console.error(err);
    return err;
  }
}

export async function verifyAccessToken(userData) {
  try {
    const response = await fetch(`${config.baseUrl}:${config.port}/api/user/accessTokenLogin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.accessToken}`,
      },
    });
    const responseJson = await response.json();
    console.log('responseAPI', responseJson);
    return responseJson;
  } catch (err) {
    console.error(err);
    return err;
  }
}

export async function resendOTP(accessToken) {
  try {
    const response = await fetch(`${config.baseUrl}:${config.port}/api/user/resendOTP`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const responseJson = await response.json();
    console.log('responseAPI', responseJson);
    return responseJson.data;
  } catch (err) {
    console.error(err);
    return err;
  }
}
