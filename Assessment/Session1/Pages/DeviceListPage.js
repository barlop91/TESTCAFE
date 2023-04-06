import { Selector, t } from 'testcafe';

export default class DeviceListPage {
  constructor() {
    this.deviceNameInput = Selector('#system_name');
    this.deviceTypeSelect = Selector('#type');
    this.deviceCapacityInput = Selector('#hdd_capacity');
    this.saveButton = Selector('#root > div > div > div > a > button');
    this.addDevice = Selector('#root > div > div > div.list-options-box > div > div > a');
    
  }

  async createDevice(deviceName, deviceType, deviceCapacity) {
    await t
      .click(this.addDevice)
      .typeText(this.deviceNameInput, deviceName)
      .click(this.deviceTypeSelect)
      .click(this.deviceTypeSelect.find('option').withText(deviceType))
      .typeText(this.deviceCapacityInput, deviceCapacity)
      .click(this.saveButton);
  }

  static async isDeviceListVisible() {
    const deviceList = Selector('.list-devices');

    return await deviceList.exists;
  }

  static async getDeviceElements() {
    const deviceList = Selector('.device-name');
    const deviceElements = deviceList.find('.device-element');

    return deviceElements;
  }

  static async getDeviceDetails(deviceElement) {
    const name = await deviceElement.find('.device-#root > div > div > div.list-devices-main > div > div:nth-child(1) > div.device-info > span.device-name').innerText;
    const type = await deviceElement.find('.device-type').innerText;
    const capacity = await deviceElement.find('.device-capacity').innerText;

    return {
      name,
      type,
      capacity,
    };
  }

  static async countEditButtons() {
    const buttons = Selector('.device-edit').withText('EDIT').with({ visibilityCheck: true });;;
    const numButtons = await buttons.count;
    console.log(`Number of EDIT buttons: ${numButtons}`);

    if (numButtons === 0) {
      console.log("No EDIT buttons found. Retrying...");
      await t.wait(1000); // Wait for 1 second before retrying
      const numButtons = await buttons.count;
      console.log(`Number of EDIT buttons after retry: ${numButtons}`);
      return numButtons;
    }
    return numButtons;
  }


  static async countDeleteButtons() {
    const removebuttons = Selector('.device-remove').withText('REMOVE').with({ visibilityCheck: true });;

    const numRemoveButtons = await removebuttons.count;
    console.log(`Number of REMOVE buttons: ${numRemoveButtons}`);

    if (numRemoveButtons === 0) {
      console.log("No REMOVE buttons found. Retrying...");
      await t.wait(1000); // Wait for 1 second before retrying
      const numRemoveButtons = await removebuttons.count;
      console.log(`Number of REMOVE buttons after retry: ${numRemoveButtons}`);
      return numRemoveButtons;
    }



    return numRemoveButtons;
  }
}

