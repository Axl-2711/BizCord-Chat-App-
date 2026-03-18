# 💬 BizCord (Real-Time Chat App)

A scalable, real-time chat application built with **Node.js**, **Express**, and **Socket.IO** that enables multiple users to join chat rooms and communicate instantly.

---

## 🚀 Features

* 🔌 Real-time bi-directional communication using WebSockets
* 🧑‍🤝‍🧑 Multiple chat rooms support
* 👥 Join/leave rooms dynamically
* 💬 Instant message broadcasting within rooms
* 🟢 User connection & disconnection handling
* 📡 Lightweight and fast server architecture

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express
* **Real-time Engine:** Socket.IO
* **Protocol:** WebSockets

---

## 📂 Project Structure

```
.
├── server.js          # Main server entry point
├── package.json       # Project metadata and dependencies
├── public/            # Frontend assets (HTML, CSS, JS)
└── utils/             # Helper functions (e.g., users, rooms)
```

---

## ⚙️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Axl-2711/BizCord-Chat-App-.git
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

4. Open your browser:

   ```
   http://localhost:3000
   ```

---

## 🧠 How It Works

* Users connect to the server via Socket.IO.
* Each user can join a specific chat room.
* Messages are emitted to the server and broadcasted only to users in the same room.
* Server tracks active users and handles join/leave events.

---

## 📌 Future Improvements

* 🔐 User authentication
* 💾 Message persistence (database integration)
* ✍️ Typing indicators
* 📱 Responsive UI enhancements
* 📎 Media/file sharing

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

---

## 📄 License

---
