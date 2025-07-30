document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const messageDiv = document.getElementById('message');

    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        // Here you would typically send the file to a backend server
        // For example, using fetch:
        // fetch('/upload', {
        //     method: 'POST',
        //     body: formData
        // }).then(response => response.text())
        //   .then(data => {
        //       messageDiv.textContent = data;
        //   }).catch(error => {
        //       messageDiv.textContent = 'Error uploading file';
        //   });

        // Since we can't actually upload to a backend in this example, we'll just simulate it
        messageDiv.textContent = 'File uploaded successfully!';
    } else {
        messageDiv.textContent = 'Please select a file to upload.';
    }
});

document.getElementById('connectButton').addEventListener('click', async () => {
    try {
        const device = await navigator.usb.requestDevice({ filters: [{ vendorId: 0x1d6b, productId: 0x0104 }] });
        await device.open();
        await device.selectConfiguration(1);
        await device.claimInterface(0);

        const messageDiv = document.getElementById('message');
        messageDiv.textContent = 'USB device connected successfully!';

        // Here you would add the code to write the ISO file to the USB device
        // This is a complex process and may require additional libraries
        document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const messageDiv = document.getElementById('message');

    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        // Here you would typically send the file to a backend server
        // For example, using fetch:
        // fetch('/upload', {
        //     method: 'POST',
        //     body: formData
        // }).then(response => response.text())
        //   .then(data => {
        //       messageDiv.textContent = data;
        //   }).catch(error => {
        //       messageDiv.textContent = 'Error uploading file';
        //   });

        // Since we can't actually upload to a backend in this example, we'll just simulate it
        messageDiv.textContent = 'File uploaded successfully!';
    } else {
        messageDiv.textContent = 'Please select a file to upload.';
    }
});

document.getElementById('connectButton').addEventListener('click', async () => {
    try {
        const device = await navigator.usb.requestDevice({ filters: [{ vendorId: 0x1d6b, productId: 0x0104 }] });
        await device.open();
        await device.selectConfiguration(1);
        await device.claimInterface(0);

        const messageDiv = document.getElementById('message');
        messageDiv.textContent = 'USB device connected successfully!';

        // Example: Read from the USB device
        const result = await device.transferIn(1, 64);
        const data = new Uint8Array(result.data.buffer);
        messageDiv.textContent = 'Data read from USB device: ' + data;

        // Example: Write to the USB device
        const writeData = new Uint8Array([0x01, 0x02, 0x03, 0x04]);
        await device.transferOut(1, writeData);
        messageDiv.textContent += '\nData written to USB device: ' + writeData;

    } catch (error) {
        const messageDiv = document.getElementById('message');
        messageDiv.textContent = 'Error connecting to USB device: ' + error.message;
    }})};