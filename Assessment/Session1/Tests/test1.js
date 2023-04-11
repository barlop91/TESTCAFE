
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
// .skip
('Device elements are visible in the DOM and correctly displayed', async (t) => {
  await t.eval(() => {
    // Evaluar si la página ha terminado de cargar
    return document.readyState === 'complete';
  });
  
  // Obtener lista de devices de la API
  const dataFromAPI = await API.getListOfDevices();
  console.log(`API devices names ${dataFromAPI}`);

   // Obtener lista de devices de la UI
  const dataFromUI = await DeviceListPage.getDevicesFromUI();
  console.log(`UI devices names ${dataFromUI}`);


  const typeFromAPI = await API.getListOftype();
  console.log(`API devices types ${typeFromAPI}`);

  const typesFromUI = await DeviceListPage.getTypesFromUI();
  console.log(`UI devices names ${typesFromUI}`);

  const capFromAPI = await API.getListOfCapacity();
  console.log(`API devices capacity ${capFromAPI}`);

  const capFromUI = await DeviceListPage.getCapFromUI();
  console.log(`UI capacity ${capFromUI}`);
  

  // Comparar ambas listas para validar que existan los nombres, tipos y capacidades

      const compareLists = (arr1, arr2) => {
        for (let i = 0; i < arr1.length; i++) {
          if (!arr2.includes(arr1[i])) {
            return false;
          }
        }
        return true;
      };

      await t.expect(compareLists(dataFromAPI, dataFromUI)).ok();
      await t.expect(compareLists(typeFromAPI, typesFromUI)).ok();
      await t.expect(compareLists(capFromUI, capFromAPI)).ok;
      
  
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
