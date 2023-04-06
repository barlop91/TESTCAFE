import { Selector, t } from 'testcafe';
import fetch from 'node-fetch';

export default class MethodsApi {
    constructor() {
      this.firstDeviceName = Selector('.device-name').nth(-1);
      this.lastElement = Selector('.device-name').nth(-1);
    }
  
    async renameFirstDevice(newName) {
      // Make an API call to get the list of devices
      const response = await fetch('http://localhost:3000/devices');
      const devices = await response.json();

      // Get the first device in the list
      const firstDevice = devices[1];

      // Rename the first device
      firstDevice.system_name = newName;

      // Make an API call to update the device with the new name
      await fetch(`http://localhost:3000/devices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(firstDevice)
      });
      
    }
  
    async checkFirstDeviceName(expectedName) {
      // Check that the device was renamed
      await t.expect(this.firstDeviceName.innerText).eql(expectedName);
    }


    async deleteLastElement() {
      // Make an API call to get the list of elements
        const response = await fetch('http://localhost:3000/devices');
        const elements = await response.json();

        // Get the ID anda Name of the last element in the list
        const lastElementId = elements[elements.length - 1].id;
        const lastelementName = elements[elements.length - 1].system_name;
        

        // Make an API call to delete the last element
        await fetch(`http://localhost:3000/devices/${lastElementId}`, {
          method: 'DELETE'
        });
        return lastelementName;
        
      }
    
      async checkLastElementExists(expectedname) {
        // Check that the last element is no longer visible and doesn't exist in the DOM
        await t.expect(this.lastElement.withText(expectedname).exists).notOk();
      }

      async getNumDevices() {
        const response = await fetch('http://localhost:3000/devices');
        const devices = await response.json();
        const numDevices = devices.length;
        return numDevices;
      }
    

    }