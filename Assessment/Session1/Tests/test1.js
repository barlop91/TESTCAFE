
import DeviceListPage from '../Pages/DeviceListPage';
import API from '../Pages/API';

fixture('API Test').page`http://localhost:3001/`;

test('Make an API call to retrieve the list of devices', async (t) => {
  const data = await API.getListOfDevices();

  console.log(data);
});

fixture('Device List').page('http://localhost:3001/devices');

test('Device elements are visible in the DOM and correctly displayed', async (t) => {
  const deviceElements = await DeviceListPage.getDeviceElements();

  await t
    .expect(await DeviceListPage.isDeviceListVisible()).ok()
    .expect(deviceElements.count).eql(3);

  await deviceElements.forEach(async (deviceElement) => {
    const { name, type, capacity } = await DeviceListPage.getDeviceDetails(deviceElement);

    await t
      .expect(name).eql('Device Name')
      .expect(type).eql('Device Type')
      .expect(capacity).eql('Device Capacity');
  });
});

test('Verify that all devices contain the edit and delete buttons', async (t) => {
  await t
    .expect(await DeviceListPage.isDeviceListVisible()).ok()
    .expect(await DeviceListPage.countEditButtons()).eql(3)
    .expect(await DeviceListPage.countDeleteButtons()).eql(3);
});