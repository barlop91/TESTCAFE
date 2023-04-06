import MethodsApi from '../Pages/MethodsApi';

fixture `Delete Device`
  .page `http://localhost:3001`;
  
  const methodsApi = new MethodsApi();

  test('Delete last element of the list, reload the page and verify', async t => {
    //Obtener el numero de devices actuales
    const num_dev = await methodsApi.getNumDevices();
    console.log(`devices num: ${num_dev}`);

    //Eliminando el ultimo elemento
    const name = await methodsApi.deleteLastElement();
    console.log(`last device name: ${name}`);
    await t.eval(() => location.reload(true));
    await methodsApi.checkLastElementExists(name);

    //Validando que el numero actual de devices haya cambiado
    const New_num_dev = await methodsApi.getNumDevices();
    console.log(`devices num: ${New_num_dev}`);
    await t
    .expect(await New_num_dev).notEql(await num_dev, 
    'The last device was deleted successfully');
  });