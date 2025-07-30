const requestDeviceButton = document.getElementById('request-device-button');

requestDeviceButton.addEventListener('click', async () => {
  try {
    const device = await navigator.usb.requestDevice({ filters: [] });
    await device.open();
    console.log('Device opened:', device);
    // You can now read or write data to the device
  } catch (error) {
    console.error('Error:', error);
  }
});
