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

  const deviceElements = Selector('.device-edit').withText('EDIT');
  await t.click(deviceElements.nth(-1));

  const name = Selector('#system_name').withText(deviceName);
  const type =  Selector('#type').withExactText(deviceType);
  const capacity =  Selector('#hdd_capacity').withText(deviceCapacity);
  
  await t.expect (name).exists;
  await t.expect (type).exists;
  await t.expect(capacity).exists;
    
  
  
  
});