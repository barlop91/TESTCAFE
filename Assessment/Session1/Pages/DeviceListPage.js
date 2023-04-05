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
    const deviceList = Selector('#device-list');

    return await deviceList.exists;
  }

  static async getDeviceElements() {
    const deviceList = Selector('#device-list');
    const deviceElements = deviceList.find('.device-element');

    return deviceElements;
  }

  static async getDeviceDetails(deviceElement) {
    const name = await deviceElement.find('.device-name').innerText;
    const type = await deviceElement.find('.device-type').innerText;
    const capacity = await deviceElement.find('.device-capacity').innerText;

    return {
      name,
      type,
      capacity,
    };
  }

  static async countEditButtons() {
    const deviceList = Selector('#device-list');
    const editButtons = deviceList.find('.edit-device');

    return editButtons.count;
  }

  static async countDeleteButtons() {
    const deviceList = Selector('#device-list');
    const deleteButtons = deviceList.find('.delete-device');

    return deleteButtons.count;
  }
}

