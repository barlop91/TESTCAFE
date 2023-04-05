import MethodsApi from '../Pages/MethodsApi';

fixture `Delete Device`
  .page `http://localhost:3001`;
  
  const methodsApi = new MethodsApi();

  test('Delete last element of the list, reload the page and verify', async t => {
    await methodsApi.deleteLastElement();
    await t.eval(() => location.reload(true));
    await methodsApi.checkLastElementExists();
  });