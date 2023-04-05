import { Selector } from 'testcafe';
import DeviceListPage from '../Pages/DeviceListPage.js'; 

fixture('Create Device')
  .page('http://localhost:3001');

test('Create a device using the UI, and verify the new device is now visible', async (t) => {
  const createDevicePage = new DeviceListPage();
  const deviceName = 'test1';
  const deviceCapacity = '500';
  const deviceType = 'WINDOWS';

  await createDevicePage.createDevice(deviceName, deviceType, deviceCapacity);

  const deviceList = Selector('#device-list');
  const deviceElements = deviceList.find('.device-element');

  const lastDeviceElement = deviceElements.nth(-1);
  const name = await lastDeviceElement.find('.device-name').innerText;
  const type = await lastDeviceElement.find('.device-type').innerText;
  const capacity = await lastDeviceElement.find('.device-capacity').innerText;

  await t
    .expect(name).eql(deviceName)
    .expect(type).eql(deviceType)
    .expect(capacity).eql(deviceCapacity);
});