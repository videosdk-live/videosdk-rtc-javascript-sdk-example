# 🚀 Video SDK for JS

[![Documentation](https://img.shields.io/badge/Read-Documentation-blue)](https://docs.videosdk.live/react/guide/video-and-audio-calling-api-sdk/concept-and-architecture)
[![Discord](https://img.shields.io/discord/876774498798551130?label=Join%20on%20Discord)](https://discord.gg/kgAvyxtTxv)
[![Register](https://img.shields.io/badge/Contact-Know%20More-blue)](https://app.videosdk.live/signup)

At Video SDK, we’re building tools to help companies create world-class collaborative products with capabilities of live audio/videos, compose cloud recordings/rtmp/hls and interaction APIs

### 🥳 Get **10,000 minutes free** every month! **[Try it now!](https://app.videosdk.live/signup)**

### ⚡️From Clone to Launch - Get Started with the Example in 5 mins!

[![JS](https://cdn.videosdk.live/docs/images/youtube/JS.png)](https://youtu.be/SeQ6d1efN5A?si=HepO1fEmK-qYKjwL "JS")

## 📚 **Table of Contents**

- [⚡ **Quick Setup**](#-quick-setup)
- [🔧 **Prerequisites**](#-prerequisites)
- [📦 **Running the Sample App**](#-running-the-sample-app)
- [🔥 **Meeting Features**](#-meeting-features)
- [🧠 **Key Concepts**](#-key-concepts)
- [🔑 **Token Generation**](#-token-generation)
- [📖 **Examples**](#-examples)
- [📝 **VideoSDK's Documentation**](#-documentation)
- [💬 **Join Our Community**](#-join-our-community)


## ⚡ Quick Setup

1. Sign up on [VideoSDK](https://app.videosdk.live/) to grab your API Key and Secret.
2. Familiarize yourself with [Token](https://docs.videosdk.live/javascript/guide/video-and-audio-calling-api-sdk/authentication-and-token)

## 🛠 Prerequisites

You must have the following installed:

- Node.js v12+
- NPM v6+ (comes pre-installed with newer Node versions)
- A valid [Video SDK Account](https://app.videosdk.live/signup)

## 📦 Running the Sample App

Follow these steps to get the sample app up and running:

### Step 1: Clone the Repository

```sh
git clone https://github.com/videosdk-live/videosdk-rtc-javascript-sdk-example.git
```

### Step 2: Set Up Environment Variables

Copy the example environment file:

```bash
cp config.example.js config.js
```

### Step 3: Configure Your `config.js` File

Generate a temporary token from your [**Video SDK Account**](https://app.videosdk.live/signup) and update the `config.js` file:

```
TOKEN="Your Token Here"
```

### Step 4: Run the app

```sh
npm install -g live-server
live-server --port=8000
```

## 🔥 Meeting Features

Unlock a suite of powerful features to enhance your meetings:

| Feature                        | Documentation                                                                                                                | Description                                                                                                      |
|--------------------------------|------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| 📋 **Precall Setup**           | [Setup Precall](https://docs.videosdk.live/javascript/guide/video-and-audio-calling-api-sdk/setup-call/precall)                   | Configure audio, video devices and other settings before joining the meeting.                                              |
| ⏳ **Waiting Lobby**           | [Waiting Lobby](https://docs.videosdk.live/javascript/guide/video-and-audio-calling-api-sdk/setup-call/waiting-lobby)             | Virtual space for participants to wait before joining the meeting.                                               |
| 🤝 **Join Meeting**            | [Join Meeting](https://docs.videosdk.live/javascript/guide/video-and-audio-calling-api-sdk/setup-call/join-meeting)                | Allows participants to join a meeting.                                                                 |
| 🎤 **Toggle Mic**         | [Mic Control](https://docs.videosdk.live/javascript/guide/video-and-audio-calling-api-sdk/handling-media/mute-unmute-mic)          | Toggle the microphone on or off during a meeting.                                                                  |
| 📷 **Toggle Camera**           | [Camera Control](https://docs.videosdk.live/javascript/guide/video-and-audio-calling-api-sdk/handling-media/on-off-camera)         | Turn the video camera on or off during a meeting.                                                                  |
| 🖥️ **Screen Share**            | [Screen Share](https://docs.videosdk.live/javascript/guide/video-and-audio-calling-api-sdk/handling-media/screen-share)          | Share your screen with other participants during the call.                                                      |
| 📸 **Image Capture**           | [Image Capturer](https://docs.videosdk.live/javascript/guide/video-and-audio-calling-api-sdk/handling-media/image-capturer)        | Capture images of other participant from their video stream, handy for Video KYC and identity verification scenarios.     |
| 🔌 **Change Input Device**     | [Switch Input Devices](https://docs.videosdk.live/javascript/guide/video-and-audio-calling-api-sdk/handling-media/change-input-device)   | Switch between different audio and video input devices.                                                         |
| 🔊 **Change Audio Output**     | [Switch Audio Output](https://docs.videosdk.live/javascript/guide/video-and-audio-calling-api-sdk/handling-media/change-audio-ouptut-device) | Select an output device for audio during a meeting.                                                                |
| ⚙️ **Optimize Video Track**         | [Video Track Optimization](https://docs.videosdk.live/javascript/guide/video-and-audio-calling-api-sdk/render-media/optimize-video-track)                                  | Enhance the quality and performance of media tracks.                                                            |
| ⚙️ **Optimize Audio Track**         | [Audio Track Optimization](https://docs.videosdk.live/javascript/guide/video-and-audio-calling-api-sdk/render-media/optimize-audio-track)                                       | Enhance the quality and performance of media tracks.                                                            |
| 💬 **Chat**                    | [In-Meeting Chat](https://docs.videosdk.live/javascript/guide/video-and-audio-calling-api-sdk/collaboration-in-meeting/pubsub)      | Exchange messages with participants through a Publish-Subscribe mechanism.                                                   |
| 📝 **Whiteboard**              | [Whiteboard](https://docs.videosdk.live/javascript/guide/video-and-audio-calling-api-sdk/collaboration-in-meeting/whiteboard)      | Collaborate visually by drawing and annotating on a shared whiteboard.                                           |
| 📁 **File Sharing**            | [File Sharing](https://docs.videosdk.live/javascript/guide/video-and-audio-calling-api-sdk/collaboration-in-meeting/upload-fetch-temporary-file) | Share files with participants during the meeting.                                                               |
| 📼 **Recording**               | [Recording](https://docs.videosdk.live/javascript/guide/video-and-audio-calling-api-sdk/recording/Overview)                | Record the meeting for future reference.                                                                        |
| 📡 **RTMP Livestream**         | [RTMP Livestream](https://docs.videosdk.live/javascript/guide/video-and-audio-calling-api-sdk/live-streaming/rtmp-livestream)        | Stream the meeting live to platforms like YouTube or Facebook.                                                  |
| 📝 **Real-time Transcription**           | [Real-time Transcription](https://docs.videosdk.live/javascript/guide/video-and-audio-calling-api-sdk/transcription-and-summary/realtime-transcribe-meeting) | Generate real-time transcriptions of the meeting.                                                               |
| 🔇 **Toggle Remote Media**     | [Remote Media Control](https://docs.videosdk.live/javascript/guide/video-and-audio-calling-api-sdk/control-remote-participant/remote-participant-media) | Control the microphone or camera of remote participants.                                                        |
| 🚫 **Mute All Participants**   | [Mute All](https://docs.videosdk.live/javascript/guide/video-and-audio-calling-api-sdk/control-remote-participant/mute-all-participants) | Mute all participants simultaneously during the call.                                                           |
| 🗑️ **Remove Participant**      | [Remove Participant](https://docs.videosdk.live/javascript/guide/video-and-audio-calling-api-sdk/control-remote-participant/remove-participant) | Eject a participant from the meeting. |

## 🧠 Key Concepts

Understand the core components of our SDK:

- `Meeting` - A Meeting represents Real-time audio and video communication.

  **` Note: Don't confuse the terms Room and Meeting; both mean the same thing 😃`**

- `Sessions` - A particular duration you spend in a given meeting is referred as a session, you can have multiple sessions of a specific meetingId.
- `Participant` - A participant refers to anyone attending the meeting session. The `local participant` represents yourself (You), while all other attendees are considered `remote participants`.
- `Stream` - A stream refers to video or audio media content that is published by either the `local participant` or `remote participants`.


## 🔐 Token Generation

The token is used to create and validate a meeting using API and also initialize a meeting.

🛠️ `Development Environment`:

- You can use a temporary token for development. To create one, go to the VideoSDK's [dashboard](https://app.videosdk.live/api-keys) .

🌐 `Production Environment`:

- You must set up an authentication server to authorize users for production. To set up an authentication server, please take a look at our official example repositories. [videosdk-rtc-api-server-examples](https://github.com/videosdk-live/videosdk-rtc-api-server-examples)

## 📖 Examples

- [**Prebuilt Examples**](https://github.com/videosdk-live/videosdk-rtc-prebuilt-examples)
- [**React SDK Example**](https://github.com/videosdk-live/videosdk-rtc-react-sdk-example.git)
- [**React Native SDK Example**](https://github.com/videosdk-live/videosdk-rtc-react-native-sdk-example)
- [**Flutter SDK Example**](https://github.com/videosdk-live/videosdk-rtc-flutter-sdk-example)
- [**Android Java SDK Example**](https://github.com/videosdk-live/videosdk-rtc-android-java-sdk-example)
- [**Android Kotlin SDK Example**](https://github.com/videosdk-live/videosdk-rtc-android-kotlin-sdk-example)
- [**iOS SDK Example**](https://github.com/videosdk-live/videosdk-rtc-ios-sdk-example)


## 📝 Documentation

Explore more and start building with our [**Documentation**](https://docs.videosdk.live/)

## 🤝 Join Our Community

- **[Discord](https://discord.gg/Gpmj6eCq5u)**: Engage with the Video SDK community, ask questions, and share insights.
- **[X](https://x.com/video_sdk)**: Stay updated with the latest news, updates, and tips from Video SDK.
