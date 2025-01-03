# QR Code Forge  
A sleek, responsive QR Code generator built using HTML, CSS and JavaScript. Enter any text or URL, generate a QR code instantly, and download it with a click!  

## 🛠️ Features  
- **Instant QR Code Generation** – Simply input text or URLs to create QR codes in real-time.  
- **Download Option** – Download QR codes as PNG images directly from the app.  
- **Responsive Design** – Optimized for both desktop and mobile devices.  
- **Minimal & Clean UI** – A simple, attractive design with smooth animations.  
---

## 📂 Project Structure  
```
QR Code Forge/  
│  
├── index.html   # Main HTML file  
├── style.css    # CSS for styling  
└── script.js    # JavaScript for functionality  
```  
---

## 🚀 Getting Started  

### 🔧 Installation  
1. Clone the repository:  
   ```bash
   git clone https://github.com/DevSphere/QR Code Forge.git
   ```  
2. Open the project folder:  
   ```bash
   cd QR Code Forge
   ```  
3. Launch the app by opening **index.html** in any web browser.  

---

## 🧑‍💻 Usage  
1. Enter text or a URL in the input field.  
2. Click **Generate QR**.  
3. The QR code will appear below.  
4. Click **Download QR Code** to save it as an image.  

---

## 🌐 API Reference  
This project uses the free [QR Code Generator API](https://goqr.me/api/).  

- API Endpoint:  
  ```bash
  https://api.qrserver.com/v1/create-qr-code/
  ```  
- Parameters:  
  - **data** – Text or URL to encode.  
  - **size** – Dimensions of the QR code (e.g., 200x200).  

Example:  
```bash
https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=example.com
```  

---

## 🙌 Acknowledgments  
- [QR Code Generator API](https://goqr.me/api/)  
- Open-source contributors and developers ❤️  

---
