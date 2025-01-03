 function generateQRCode() {
    const text = document.getElementById('textInput').value;
    const qrContainer = document.getElementById('qrContainer');
    const qrCodeImage = document.getElementById('qrCodeImage');
    const downloadLink = document.getElementById('downloadLink');
    
    if (text.trim() === "") {
        alert("Please enter text or URL.");
        return;
    }
    
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;

    // Display the QR code
    qrCodeImage.src = qrApiUrl;
    qrCodeImage.classList.remove('hidden');

    // Setup download link
    downloadLink.href = qrApiUrl;
    downloadLink.classList.remove('hidden');
}
