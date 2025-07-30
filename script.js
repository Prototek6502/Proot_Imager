let port;
let writer;

document.getElementById('connect').addEventListener('click', async () => {
    try {
        // Request a serial port
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 115200 }); // Open the port with a specified baud rate

        document.getElementById('status').textContent = 'Connected to USB Device';
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
        writer = port.writable.getWriter(); // Get a writer for the port
        await writer.write(dataView); // Send data to the USB device
        document.getElementById('status').textContent = 'Flashing process initiated...';
    } catch (error) {
        document.getElementById('status').textContent = 'Error: ' + error;
    } finally {
        writer.releaseLock(); // Release the writer lock
    }
});
