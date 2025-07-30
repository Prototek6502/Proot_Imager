let usbDevice;
let writer;

document.getElementById('connect').addEventListener('click', async () => {
    try {
        usbDevice = await navigator.usb.requestDevice({ filters: [] });
        await usbDevice.open(); // Open the USB device
        await usbDevice.selectConfiguration(1); // Select configuration
        await usbDevice.claimInterface(0); // Claim interface
        document.getElementById('status').textContent = 'Connected to USB Drive';
        document.getElementById('flash').disabled = false;
    } catch (error) {
        document.getElementById('status').textContent = 'Error: ' + error;
    }
});

document.getElementById('flash').addEventListener('click', async () => {
    const fileInput = document.getElementById('disk-image');
    const file = fileInput.files[0];
    if (!file) {
        document.getElementById('status').textContent = 'Please select a disk image.';
        return;
    }

    const arrayBuffer = await file.arrayBuffer();
    const dataView = new Uint8Array(arrayBuffer);

    try {
        const result = await usbDevice.transferOut(1, dataView); // Send data to USB
        document.getElementById('status').textContent = 'Flashing process initiated...';
    } catch (error) {
        document.getElementById('status').textContent = 'Error: ' + error;
    }
});
