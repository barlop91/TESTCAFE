import { Selector } from 'testcafe';
import fetch from 'node-fetch';

export default class API {
  static async getListOfDevices() {
  const baseUrl = 'http://localhost:3000';
  const devicesUrl = `${baseUrl}/devices`;

  try {
    const response = await fetch(devicesUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to retrieve list of devices: ${response.status}`);
    }

    const devices = await response.json();
    console.log('List of devices:');
    console.log(devices);
    const deviceNames = devices.map(device => device.system_name);
    const deviceNamesString = deviceNames.join(', '); // Converts the array to a string separated by commas
    const deviceNamesArray = deviceNamesString.split(', ');
    console.log('Device names array:', deviceNames);


   return deviceNames;
} catch (error) {
  console.error(`Failed to retrieve list of devices: ${error}`);
  return null;
}
  }


  static async getListOftype() {
    const baseUrl = 'http://localhost:3000';
    const devicesUrl = `${baseUrl}/devices`;
  
    try {
      const response = await fetch(devicesUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to retrieve list of types: ${response.status}`);
      }
  
      const devices = await response.json();
      const deviceNames = devices.map(device => device.type);
      const deviceNamesString = deviceNames.join(', '); // Converts the array to a string separated by commas
      const deviceNamesArray = deviceNamesString.split(', ');
      console.log('Type names array:', deviceNamesArray);
  
  
     return deviceNamesArray;
  } catch (error) {
    console.error(`Failed to retrieve list of types: ${error}`);
    return null;
  }
    }


    static async getListOfCapacity() {
      const baseUrl = 'http://localhost:3000';
      const devicesUrl = `${baseUrl}/devices`;
    
      try {
        const response = await fetch(devicesUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error(`Failed to retrieve list of types: ${response.status}`);
        }
    
        const devices = await response.json();
        
        const deviceNames = devices.map(device => device.hdd_capacity);
        const deviceNamesString = deviceNames.join(', '); // Converts the array to a string separated by commas
        const deviceNamesArray = deviceNamesString.split(', ');
        console.log('Capacity array:', deviceNamesArray);
    
    
       return deviceNamesArray;
    } catch (error) {
      console.error(`Failed to retrieve list of Capacity: ${error}`);
      return null;
    }
      }

}