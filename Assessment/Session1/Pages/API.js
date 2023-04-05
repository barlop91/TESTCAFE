import { Selector } from 'testcafe';
import fetch from 'node-fetch';

class API {
  static async getListOfDevices() {
    // Make an API call to get the list of devices
    const url = 'http://localhost:3000/devices';

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  }
}
