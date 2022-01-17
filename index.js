// Constants
const API_SERVER_URL = "http://localhost:9000";

// Declaring variables
let videoContainer = document.getElementById("videoContainer");
let micButton = document.getElementById("mic-btn");
let camButton = document.getElementById("cam-btn");
let ssButton = document.getElementById("ss-btn");
let screenShare = document.getElementById("screenShare");
let raiseHand = document.getElementById("raiseHand-btn");
let sendMessageBtn = document.getElementById("sendMessage-btn");
let participants = document.getElementById("participants");
let leaveMeetingBtn = document.getElementById("leaveMeeting-btn");
let endMeetingBtn = document.getElementById("endMeeting-btn");

//Video Elements
let startVideoBtn = document.getElementById("startVideo-btn");
let stopVideoBtn = document.getElementById("stopVideo-btn");
let resumeVideoBtn = document.getElementById("resumeVideo-btn");
let pauseVideoBtn = document.getElementById("pauseVideo-btn");
let seekVideoBtn = document.getElementById("seekVideo-btn");

//recording
let startRecordingBtn = document.getElementById("startRecording-btn");
let stopRecordingBtn = document.getElementById("stopRecording-btn");

//videoPlayback DIV
let videoPlayback = document.getElementById("videoPlayback");

let meeting;
// Local participants
let localParticipant;
let localParticipantAudio;

///////// join page

let joinPageWebcam = document.getElementById("joinCam");

navigator.mediaDevices
  .getUserMedia({
    video: true,
    // audio: true,
  })
  .then((stream) => {
    joinPageWebcam.srcObject = stream;
    joinPageWebcam.play();
  });

////////// rest of the code

function addParticipantToList({ id, displayName }) {
  let participantTemplate = `
      <div id="p-${id}">
          <span>${displayName}<span>
      </div>
    `;
  participants.insertAdjacentHTML("beforeend", participantTemplate);
}

function createLocalParticipant() {
  localParticipant = createVideoElement(meeting.localParticipant.id);
  localParticipantAudio = createAudioElement(meeting.localParticipant.id);
  videoContainer.appendChild(localParticipant);
}

function startMeeting(token, meetingId, name) {
  // Meeting config
  window.VideoSDK.config(token);

  // Meeting Init
  meeting = window.VideoSDK.initMeeting({
    meetingId: meetingId, // required
    name: name, // required
    micEnabled: true, // optional, default: true
    webcamEnabled: true, // optional, default: true
    maxResolution: "hd", // optional, default: "hd"
  });

  // Meeting Join
  meeting.join();

  //create Local Participant
  createLocalParticipant();

  //add yourself in participant list
  addParticipantToList({ id: meeting.localParticipant.id, displayName: "You" });

  // Setting local participant stream
  meeting.localParticipant.on("stream-enabled", (stream) => {
    setTrack(
      stream,
      localParticipant,
      localParticipantAudio,
      meeting.localParticipant.id
    );
  });

  // Other participants
  meeting.on("participant-joined", (participant) => {
    let videoElement = createVideoElement(participant.id);
    let audioElement = createAudioElement(participant.id);

    participant.on("stream-enabled", (stream) => {
      setTrack(stream, videoElement, audioElement, participant.id);
    });
    videoContainer.appendChild(videoElement);
    videoContainer.appendChild(audioElement);
    addParticipantToList(participant);
  });

  // participants left
  meeting.on("participant-left", (participant) => {
    let vElement = document.getElementById(`v-${participant.id}`);
    vElement.parentNode.removeChild(vElement);

    let aElement = document.getElementById(`a-${participant.id}`);
    aElement.parentNode.removeChild(aElement);
    //remove it from participant list participantId;
    document.getElementById(`p-${participant.id}`).remove();
  });
  //chat message event
  meeting.on("chat-message", (chatEvent) => {
    const { senderId, text, timestamp, senderName } = chatEvent;
    const parsedText = JSON.parse(text);
    if (
      parsedText?.type == "raiseHand" &&
      senderId != meeting.localParticipant.id //remove this for both parties
    ) {
      console.log(chatEvent.senderName + " RAISED HAND");
    }
    if (parsedText?.type == "chat") {
      const chatBox = document.getElementById("chats");
      const chatTemplate = `
      <div style="margin-bottom: 10px; ${
        meeting.localParticipant.id == senderId && "text-align : right"
      }">
        <span style="font-size:12px;">${senderName}</span>
        <div style="margin-top:5px">
          <span style="background:${
            meeting.localParticipant.id == senderId ? "grey" : "crimson"
          };color:white;padding:5px;border-radius:8px">${
        parsedText.message
      }<span>
        </div>
      </div>
      `;
      chatBox.insertAdjacentHTML("beforeend", chatTemplate);
    }
  });

  //video state changed
  meeting.on("video-state-changed", (videoEvent) => {
    const { status, link, currentTime } = videoEvent;

    switch (status) {
      case "started":
        videoPlayback.setAttribute("src", link);
        videoPlayback.play();
        break;
      case "stopped":
        console.log("stopped");
        videoPlayback.removeAttribute("src");
        videoPlayback.pause();
        videoPlayback.load();
        break;
      case "resumed":
        videoPlayback.play();
        break;
      case "paused":
        videoPlayback.currentTime = currentTime;
        videoPlayback.pause();
        break;

      case "seeked":
        break;

      default:
        break;
    }
  });
  //recording events
  meeting.on("recording-started", () => {
    console.log("RECORDING STARTED EVENT");
  });
  meeting.on("recording-stopped", () => {
    console.log("RECORDING STOPPED EVENT");
  });

  meeting.on("presenter-changed", (presenterId) => {
    if (presenterId) {
      ssButton.innerText = "Stop Sharing";
    } else {
      console.log(presenterId);
      screenShare.removeAttribute("src");
      screenShare.pause();
      screenShare.load();

      ssButton.innerText = "Share Entire Screen";
    }
  });

  meeting.on("meeting-left", () => {
    window.location.reload();
  });

  // //Entry Response
  // meeting.on("entry-requested", (requestEvent) => {
  //   console.log(requestEvent, "EVENT::entryRequested");
  // });

  // meeting.on("entry-responded", (respondEvent) => {
  //   console.log(respondEvent, "EVENT::entryResponded");
  // });
  //add DOM Events
  addDomEvents();
}

//get access token

// joinMeeting();

async function joinMeeting(newMeeting) {
  // let defaultMeeting = "qwrc-b9ho-7x3j";

  let name = document.getElementById("joinMeetingName").value || "JSSDK";
  let meetingId = document.getElementById("joinMeetingId").value;
  if (!meetingId && !newMeeting) {
    return alert("Please Provide a meetingId");
  }

  document.getElementById("joinPage").style.display = "none";

  //create New Token
  let token = await window
    .fetch(API_SERVER_URL + "/get-token")
    .then(async (response) => {
      const { token } = await response.json();
      return token;
    });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  };

  //validate meetingId;
  if (!newMeeting) {
    //validate meetingId if provided;
    meetingId = await fetch(
      API_SERVER_URL + "/validate-meeting/" + meetingId,
      options
    )
      .then(async (result) => {
        const { meetingId } = await result.json();
        console.log("meetingId", meetingId);
        return meetingId;
      })
      .catch(() => {
        alert("invalid Meeting Id");
        window.location.href = "/";
        return;
      });
  }

  //create New Meeting
  //get new meeting if new meeting requested;
  if (newMeeting) {
    meetingId = await fetch(API_SERVER_URL + "/create-meeting", options).then(
      async (result) => {
        const { meetingId } = await result.json();
        console.log("NEW MEETING meetingId", meetingId);
        return meetingId;
      }
    );
  }
  console.log("MEETING_ID::", meetingId);
  //set meetingId
  document.querySelector("#meetingid").innerHTML = meetingId;
  startMeeting(token, meetingId, name);
}

// creating video element
function createVideoElement(pId) {
  let videoElement = document.createElement("video");
  videoElement.classList.add("video-frame");
  videoElement.setAttribute("id", `v-${pId}`);
  return videoElement;
}

// creating audio element
function createAudioElement(pId) {
  let audioElement = document.createElement("audio");
  audioElement.setAttribute("autoPlay", "false");
  audioElement.setAttribute("playsInline", "true");
  audioElement.setAttribute("controls", "false");
  audioElement.setAttribute("id", `a-${pId}`);
  return audioElement;
}

//setting up tracks
function setTrack(stream, videoElem, audioElement, id) {
  if (stream.kind == "video") {
    const mediaStream = new MediaStream();
    mediaStream.addTrack(stream.track);
    videoElem.srcObject = mediaStream;
    videoElem
      .play()
      .catch((error) =>
        console.error("videoElem.current.play() failed", error)
      );
  }
  if (stream.kind == "audio") {
    if (id == meeting.localParticipant.id) return;
    const mediaStream = new MediaStream();
    mediaStream.addTrack(stream.track);
    audioElement.srcObject = mediaStream;
    audioElement
      .play()
      .catch((error) => console.error("audioElem.play() failed", error));
  }
  if (stream.kind == "share") {
    console.log("SHARE EVENT ");
    const mediaStream = new MediaStream();
    mediaStream.addTrack(stream.track);
    screenShare.srcObject = mediaStream;
    screenShare
      .play()
      .catch((error) =>
        console.error("videoElem.current.play() failed", error)
      );
  }
}

//add button events once meeting is created
function addDomEvents() {
  // mic button event listener
  micButton.addEventListener("click", () => {
    if (micButton.innerText == "Unmute Mic") {
      meeting.unmuteMic();
      micButton.innerText = "Mute Mic";
    } else {
      meeting.muteMic();
      micButton.innerText = "Unmute Mic";
    }
  });

  // cam button event listener
  camButton.addEventListener("click", () => {
    if (camButton.innerText == "Disable Cam") {
      meeting.disableWebcam();
      camButton.innerText = "Enable Cam";
    } else {
      meeting.enableWebcam();
      camButton.innerText = "Disable Cam";
    }
  });

  // screen share button event listener
  ssButton.addEventListener("click", async () => {
    if (ssButton.innerText == "Share Entire Screen") {
      // let source = await showSources();
      meeting.enableScreenShare();
      // ssButton.innerText = "Stop Sharing";
    } else {
      meeting.disableScreenShare();
      // ssButton.innerText = "Share Entire Screen";
    }
  });

  //raiseHand button
  raiseHand.addEventListener("click", async () => {
    meeting.sendChatMessage(JSON.stringify({ type: "raiseHand" }));
  });

  //send chat message button
  sendMessageBtn.addEventListener("click", async () => {
    const message = document.getElementById("inputMessage").value;
    meeting.sendChatMessage(JSON.stringify({ type: "chat", message }));
  });

  //leave Meeting Button
  leaveMeetingBtn.addEventListener("click", async () => {
    // leavemeeting
    meeting.leave();
    //reload page
    window.location.reload();
    document.querySelector("#joinPage").style.display = "flex";
  });

  //end meeting button
  endMeetingBtn.addEventListener("click", async () => {
    //end meeting
    meeting.end();
    //reload page
    window.location.reload();
  });
  //startVideo button events [playing VIDEO.MP4]
  startVideoBtn.addEventListener("click", async () => {
    meeting.startVideo({ link: "/video.mp4" });
  });

  //end video playback
  stopVideoBtn.addEventListener("click", async () => {
    meeting.stopVideo();
  });
  //resume paused video
  resumeVideoBtn.addEventListener("click", async () => {
    meeting.resumeVideo();
  });
  //pause playing video
  pauseVideoBtn.addEventListener("click", async () => {
    meeting.pauseVideo({ currentTime: videoPlayback.currentTime });
  });
  //seek playing video
  seekVideoBtn.addEventListener("click", async () => {
    meeting.seekVideo({ currentTime: 40 });
  });
  //startRecording
  startRecordingBtn.addEventListener("click", async () => {
    meeting.startRecording();
  });
  //Stop Recording
  stopRecordingBtn.addEventListener("click", async () => {
    meeting.stopRecording();
  });
}
