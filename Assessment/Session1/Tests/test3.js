import MethodsApi from '../Pages/MethodsApi';

fixture `Rename Device`
  .page `http://localhost:3001`;
  
  const methodsApi = new MethodsApi();

  test('Rename first device in the list, reload the page and verify', async t => {
    await methodsApi.renameFirstDevice('Rename Device');
    await t.eval(() => location.reload(true));
    await methodsApi.checkFirstDeviceName('Rename Device');
  });

