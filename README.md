# Cloudy 🌥️ | Effortlessly Change Your DNS with Tauri + Next.js 🚀

Welcome to **Cloudy**, the ultimate DNS management app built with **Tauri v2** and **Next.js**! 🌐 Whether you're optimizing internet speed, enhancing privacy, or just exploring alternative DNS providers, Cloudy makes managing DNS settings easy and efficient.

This lightweight app allows you to seamlessly switch between trusted DNS providers like **Google DNS**, **Cloudflare**, **OpenDNS**, and many more. Ready to turbocharge your browsing experience? Let’s dive in! 💻✨

---

## 🌟 Why Choose Cloudy for DNS Management?

- 🚀 **Effortless DNS Switching:** Change DNS settings in just a few clicks.
- 🔒 **Enhanced Privacy & Speed:** Choose from a curated list of reliable DNS servers.
- ⚡ **Lightweight & Fast:** Built with Tauri v2 for optimal performance.
- 🎨 **Beautiful Interface:** Modern design powered by **Next.js** and **Tailwind CSS**.

---

## 📋 Key Features

- **DNS List with Trusted Providers:**  
  Select from popular DNS providers, including:

  - **Google DNS:** 8.8.8.8, 8.8.4.4
  - **Cloudflare DNS:** 1.1.1.1, 1.0.0.1
  - **AdGuard DNS:** 94.140.14.14, 94.140.15.15
  - And more (see the full list below).

- **Cross-Platform Compatibility:** Runs seamlessly on Windows, macOS, and Linux.
- **Custom DNS Settings:** Add your own DNS servers for flexibility.
- **Open Source:** Fully transparent and customizable.

---

## 📂 Project Structure

Cloudy’s modular structure makes it beginner-friendly and highly maintainable:

```plaintext
cloudy
  ├── app
  │   ├── favicon.ico       # App icon
  │   ├── globals.css       # Global styles
  │   ├── layout.tsx        # Root layout
  │   ├── page.tsx          # Main page
  ├── components            # Reusable components
  │   ├── Footer.tsx
  │   ├── Form.tsx
  │   ├── Spinner.tsx
  │   ├── TopBar.tsx
  ├── hooks
  │   ├── use-current-DNS.ts
  │   ├── use-toast.ts
  ├── lib
  │   ├── dnsMap.ts         # DNS mapping
  │   ├── fonts.ts
  │   ├── utils.ts
  ├── out/public            # Public assets (logo, fonts, etc.)
  │   ├── logo.svg
  │   ├── loading.gif
  ├── src-tauri             # Backend (Rust/Tauri)
  │   ├── src
  │   │   ├── lib.rs
  │   │   ├── main.rs
  ├── package.json          # Node.js configuration
  ├── README.md             # You’re reading this!
```

---

## 🚀 Installation Guide

### Step 1: Install Dependencies

Before we get started, make sure you have these installed on your machine:

#### 1.1 Node.js

Cloudy uses **Node.js** for the frontend (Next.js), so you’ll need to install it if you haven’t already.

- Go to the Node.js website and download the latest stable version.
- Install Node.js by following the instructions for your OS.

#### 1.2 Rust

Cloudy uses **Rust** via Tauri to build a native desktop app. You can install Rust by running the following command:

bash

`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`

Follow the prompts to complete the installation.

#### 1.3 Tauri v2

Now, let’s install **Tauri v2**. This is the core framework that enables the desktop capabilities of Cloudy.

bash

`cargo install tauri-cli`

This will install the latest version of Tauri CLI.

### Step 2: Clone the Cloudy Repo

Clone the Cloudy repository to your local machine:

bash

`git clone https://github.com/yourusername/cloudy.git cd cloudy`

### Step 3: Install Node.js Dependencies

Run the following command to install all the Node.js dependencies for the frontend (Next.js):

bash

`npm install`

### Step 4: Build the Tauri App

Next, let’s build the Tauri app:

bash

`npm run tauri dev`

This will start the app in development mode. You should now see Cloudy up and running! 🚀

## ⚙️ How Cloudy Works

Cloudy makes changing your DNS easy! Here’s how it works:

1.  **User Interface:** A simple form lets you select a DNS from the list.
2.  **Tauri Backend:** Cloudy communicates with Tauri to change your system’s DNS settings.
3.  **DNS List:** Cloudy uses the following DNS servers for users to choose from:

- **Radar:** 10.202.10.10, 10.202.10.11
- **Electro:** 78.157.42.100, 78.157.42.101
- **Shecan:** 178.22.122.100, 185.51.200.2
- **Yandex:** 77.88.8.8, 77.88.8.1
- **Google:** 8.8.8.8, 8.8.4.4
- **Cloudflare:** 1.1.1.1, 1.0.0.1
- **OpenDNS:** 208.67.222.222, 208.67.220.220
- **Quad9:** 9.9.9.9, 149.112.112.112
- **CleanBrowsing:** 185.228.168.168, 185.228.169.168
- **AdGuard:** 94.140.14.14, 94.140.15.15
- **DNSWatch:** 84.200.69.80, 84.200.70.40
- **Comodo:** 8.26.56.26, 8.20.247.20
- **Verisign:** 64.6.64.6, 64.6.65.6

## 🤖 Contributing

We welcome contributions! Feel free to submit issues, suggestions, or pull requests to improve Cloudy.

## 📜 License

Cloudy is open-source and available under the MIT License.

---

With this change, your README now mentions the DNS servers without going into the installation process for selecting them in the app. Let me know if you'd like any further modifications!

```

```
