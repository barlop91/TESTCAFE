import { Selector } from 'testcafe';
import fetch from 'node-fetch';

export default class MethodsApi {
    constructor() {
      this.firstDeviceName = Selector('.device-name').nth(0);
      this.lastElement = Selector('.list-element').nth(-1);
    }
  
    async renameFirstDevice(newName) {
      // Make an API call to get the list of devices
      const response = await fetch('http://localhost:3001/devices');
      const devices = await response.json();

      // Get the first device in the list
      const firstDevice = devices[0];

      // Rename the first device
      firstDevice.name = newName;

      // Make an API call to update the device with the new name
      await fetch(`http://localhost:3001/devices/${firstDevice.id}`, {
        method: 'PUT',
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
        const response = await fetch('http://localhost:3001/devices');
        const elements = await response.json();

        // Get the ID of the last element in the list
        const lastElementId = elements[elements.length - 1].id;

        // Make an API call to delete the last element
        await fetch(`http://localhost:3001/devices/${lastElementId}`, {
          method: 'DELETE'
        });
      }
    
      async checkLastElementExists() {
        // Check that the last element is no longer visible and doesn't exist in the DOM
        await t.expect(this.lastElement.exists).notOk();
      }
    
    }
  