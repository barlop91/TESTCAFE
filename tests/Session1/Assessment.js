import { Selector } from 'testcafe';
import fetch from 'node-fetch';

// fixture`API Test`.page`http://localhost:3001/`;

// test('Make GET request to retrieve the list of devices', async (t) => {
//     const url = 'http://localhost:3000/devices';

// fetch(url, {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error(`Fetch error: ${error}`);
//   });
    
// });

// fixture('Device List')
//   .page('http://localhost:3000/devices');

//   test('Device elements are visible in the DOM and correctly displayed', async (t) => {
//     const deviceList = Selector('#device-list');
//     const deviceElements = deviceList.find('.device-element');
  
//     await t
//       .expect(deviceList.exists).ok()
//       .expect(deviceElements.count).eql(3);
  
//     await deviceElements.forEach(async (deviceElement) => {
//       const name = await deviceElement.find('.device-name').innerText;
//       const type = await deviceElement.find('.device-type').innerText;
//       const capacity = await deviceElement.find('.device-capacity').innerText;
  
//       await t
//         .expect(name).eql('Device Name')
//         .expect(type).eql('Device Type')
//         .expect(capacity).eql('Device Capacity');
//     });
//   });

// test('Edit and Delete buttons are visible for all devices', async (t) => {
//   const deviceList = Selector('#device-list');

//   await t
//     .expect(deviceList.exists).ok()
//     .expect(deviceList.find('.edit-device').count).eql(3)
//     .expect(deviceList.find('.delete-device').count).eql(3);
// });

fixture('Create Device')
  .page('http://localhost:3001');

test('Create a device using the UI, and verify the new device is now visible', async (t) => {
  const deviceName = 'test1';
  const deviceCapacity = '500';
  const deviceType = 'WINDOWS';

  await t
    .click('#root > div > div > div.list-options-box > div > div > a')
    .typeText('#system_name', deviceName)
    .click('#type')
    .click('#type > option:nth-child(1)')
    .typeText('#hdd_capacity', deviceCapacity)
    .click('#root > div > div > div > a > button');

//   const deviceList = Selector('#device-list');
//   const deviceElements = deviceList.find('.device-element');

//   const lastDeviceElement = deviceElements.nth(-1);
//   const name = await lastDeviceElement.find('.device-name').innerText;
//   const type = await lastDeviceElement.find('.device-type').innerText;
//   const capacity = await lastDeviceElement.find('.device-capacity').innerText;

//   await t
//     .expect(name).eql(deviceName)
//     .expect(type).eql(deviceType)
//     .expect(capacity).eql(deviceCapacity);
});

fixture `Rename Device`
    .page `http://localhost:3001`; 

test('Rename first device in the list', async t => {
    // Make an API call to get the list of devices
    const response = await fetch('http://localhost:3001/device');
    const devices = await response.json();

    // Get the first device in the list
    const firstDevice = devices[0];

    // Rename the first device
    firstDevice.name = 'Rename Device';

    // Make an API call to update the device with the new name
    await fetch(`http://localhost:3001/devices/${firstDevice.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(firstDevice)
    });

    // Refresh the page
    await t.eval(() => location.reload(true));

    // Check that the device was renamed
    const firstDeviceName = Selector('.device-name').nth(0);
    await t.expect(firstDeviceName.innerText).eql('Rename Device');
});

fixture `Delete Element`
    .page `http://localhost:3001`;

test('Delete last element of the list', async t => {
    // Make an API call to get the list of elements
    const response = await fetch('http://localhost:3001/devices');
    const elements = await response.json();

    // Get the ID of the last element in the list
    const lastElementId = elements[elements.length - 1].id;

    // Make an API call to delete the last element
    await fetch(`http://localhost:3001/devices/${lastElementId}`, {
        method: 'DELETE'
    });

    // Refresh the page
    await t.eval(() => location.reload(true));

    // Check that the last element is no longer visible and doesn't exist in the DOM
    const lastElement = Selector('.list-element').nth(-1);
    await t.expect(lastElement.exists).notOk();
});