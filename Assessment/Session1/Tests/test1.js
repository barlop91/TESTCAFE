
import DeviceListPage from '../Pages/DeviceListPage';
import { Selector } from 'testcafe';
import API from '../Pages/API';
import MethodsApi from '../Pages/MethodsApi';

fixture('API Test').page`http://localhost:3001/`;
const methodsApi = new MethodsApi();

test

('Make an API call to retrieve the list of devices', async (t) => {
  const data = await API.getListOfDevices();
  console.log(`devices names ${data}`);

});

fixture('Device List').page('http://localhost:3001/');

test

('Device elements are visible in the DOM and correctly displayed', async (t) => {
  const data = await API.getListOfDevices();
  console.log(`devices names: ${data}`);
  const data2 = await API.getListOftype();
  console.log(`types:  ${data2}`);
  const data3 = await API.getListOfCapacity();
  console.log(`Capacities: ${data3}`);
  const firstDeviceName = data[0];
  const element = Selector('#root > div > div > div.list-devices-main > div').withText(firstDeviceName);

  // Verificar que el texto está presente en la página
  await t.expect(element.exists).ok();
  
});

test

('Verify that all devices contain the edit and delete buttons', async (t) => {
  //Verificando que el numero de botones de EDIT Y REMOVE sea igual al numero de Devices
  
  const num_dev =  await methodsApi.getNumDevices();
  console.log(`devices names ${num_dev}`);
  await t
    .expect(await DeviceListPage.countDeleteButtons()).eql(await num_dev, 
    'Number of Remove buttons does not match number of Devices');
  await t
    .expect(await DeviceListPage.countEditButtons()).eql(await num_dev, 
    'Number of Edit buttons does not match number of Devices');

});