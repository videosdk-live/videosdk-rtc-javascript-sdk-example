// Constants
const API_BASE_URL = "https://api.videosdk.live";


// Declaring variables
let videoContainer = document.getElementById("videoContainer");
let micButton = document.getElementById("micButton");
let camButton = document.getElementById("camButton");
let copy_meeting_id = document.getElementById("meetingid");
let contentRaiseHand = document.getElementById("contentRaiseHand");
let btnScreenShare = document.getElementById("btnScreenShare");
let videoScreenShare = document.getElementById("videoScreenShare");
let btnRaiseHand = document.getElementById("btnRaiseHand");
// let btnStopPresenting = document.getElementById("btnStopPresenting");
let btnSend = document.getElementById("btnSend");
let participantsList = document.getElementById("participantsList");
let videoCamOff = document.getElementById("main-pg-cam-off");
let videoCamOn = document.getElementById("main-pg-cam-on");

let micOn = document.getElementById("main-pg-unmute-mic");
let micOff = document.getElementById("main-pg-mute-mic");

//recording
let btnStartRecording = document.getElementById("btnStartRecording");
let btnStopRecording = document.getElementById("btnStopRecording");

//videoPlayback DIV
let videoPlayback = document.getElementById("videoPlayback");


// For PreCall
const cameraDeviceDropDown = document.getElementById('cameraDeviceDropDown');
const microphoneDeviceDropDown = document.getElementById('microphoneDeviceDropDown');
const playBackDeviceDropDown = document.getElementById('playBackDeviceDropDown');
const joinMeetingCode = document.getElementById("joinMeetingId");
const joiningName = document.getElementById("name");
const refreshButton = document.getElementById("refresh");
const networkErrorRefreshButton = document.querySelectorAll(".network-error-refresh");
const microphonePermission = document.getElementById("no-microphone-permission");
const cameraPermission = document.getElementById("no-camera-permission");

joinMeetingCode.addEventListener("input", handleInputChange);
joiningName.addEventListener("input", handleInputChange);


let joinMeetingCodeValue = "";
let joinNameValue = "";

let currentMic = null;
let currentCamera = null;
let currentPlayback = null;


let meeting = "";
// Local participants
let localParticipant;
let localParticipantAudio;
let createMeetingFlag = 0;
let joinMeetingFlag = 0;
let token = "";
let micEnable = false;
let webCamEnable = false;
let totalParticipants = 0;
let remoteParticipantId = "";
let participants = [];
// join page
let joinPageWebcam = document.getElementById("joinCam");
let meetingCode = "";
let screenShareOn = false;
let joinPageVideoStream = null;
let cameraPermissionAllowed = true;
let microphonePermissionAllowed = true;
let deviceChangeEventListener;

window.addEventListener("load", async function () {
  /*

  const audioPermission = await window.VideoSDK.requestPermission(
    window.VideoSDK.Constants.permission.AUDIO,
  );

  console.log(
    "request Audio Permissions",
    audioPermission.get(window.VideoSDK.Constants.permission.AUDIO)
  );


  const videoPermission = await window.VideoSDK.requestPermission(
    window.VideoSDK.Constants.permission.VIDEO,
  );

  console.log(
    "request Video Permissions",
    videoPermission.get(window.VideoSDK.Constants.permission.VIDEO)
  );

  const audiovideoPermission = await window.VideoSDK.requestPermission(
    window.VideoSDK.Constants.permission.AUDIO_AND_VIDEO,
  );

  console.log(
    "request Audio and Video Permissions",
    audiovideoPermission.get(window.VideoSDK.Constants.permission.AUDIO),
    audiovideoPermission.get(window.VideoSDK.Constants.permission.VIDEO)
  );

  */

  /*

  try {
    const checkAudioPermission = await window.VideoSDK.checkPermissions(
      window.VideoSDK.Constants.permission.AUDIO,
    );
    console.log(
      "Check Audio Permissions",
      checkAudioPermission.get(window.VideoSDK.Constants.permission.AUDIO)
    );
  } catch (e) {
    console.error(e.message);
  }

  try {
    const checkVideoPermission = await window.VideoSDK.checkPermissions(
      window.VideoSDK.Constants.permission.VIDEO,
    );
    console.log(
      "Check Video Permissions",
      checkVideoPermission.get(window.VideoSDK.Constants.permission.VIDEO)
    );
  } catch (e) {
    console.error(e.message);
  }

  try {
    const checkAudioVideoPermission = await window.VideoSDK.checkPermissions(
      window.VideoSDK.Constants.permission.AUDIO_AND_VIDEO,
    );
    console.log(
      "Check Audio Video Permissions",
      checkAudioVideoPermission.get(window.VideoSDK.Constants.permission.VIDEO),
      checkAudioVideoPermission.get(window.VideoSDK.Constants.permission.AUDIO)
    );
  } catch (e) {
    console.error(e.message);
  }

  */

  let checkAudioVideoPermission;

  try {
    checkAudioVideoPermission = await VideoSDK.checkPermissions(
      VideoSDK.Constants.permission.AUDIO_AND_VIDEO,
    );
    console.log(
      "check Audio and Video Permissions",
      checkAudioVideoPermission.get(VideoSDK.Constants.permission.AUDIO),
      checkAudioVideoPermission.get(VideoSDK.Constants.permission.VIDEO)
    );
  } catch (ex) {
    console.log("Error in checkPermissions ", ex);
  }


  if (checkAudioVideoPermission.get(window.VideoSDK.Constants.permission.VIDEO) === false || checkAudioVideoPermission.get(window.VideoSDK.Constants.permission.AUDIO) === false) {
    checkAudioVideoPermission = await window.VideoSDK.requestPermission(
      window.VideoSDK.Constants.permission.AUDIO_AND_VIDEO,
    );
  }






  // if(requestPermission.get(window.VideoSDK.Constants.permission.AUDIO)){
  //   console.log("permission check called");

  //   var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  //   svg.setAttribute("width", "20");
  //   svg.setAttribute("height", "20");
  //   svg.setAttribute("viewBox", "0 0 20 20");
  //   svg.setAttribute("fill", "none");

  //   svg.innerHTML = `
  //   <g filter="url(#filter0_d_20_967)">
  //   <circle cx="10" cy="8" r="8" fill="#FF8A00"/>
  //   </g>
  //   <path d="M10.876 4.258V7.69C10.876 8.058 10.854 8.424 10.81 8.788C10.766 9.148 10.708 9.516 10.636 9.892H9.37605C9.30405 9.516 9.24605 9.148 9.20205 8.788C9.15805 8.424 9.13605 8.058 9.13605 7.69V4.258H10.876ZM8.93205 12.058C8.93205 11.914 8.95805 11.78 9.01005 11.656C9.06605 11.532 9.14005 11.424 9.23205 11.332C9.32805 11.24 9.44005 11.168 9.56805 11.116C9.69605 11.06 9.83605 11.032 9.98805 11.032C10.136 11.032 10.274 11.06 10.402 11.116C10.53 11.168 10.642 11.24 10.738 11.332C10.834 11.424 10.908 11.532 10.96 11.656C11.016 11.78 11.044 11.914 11.044 12.058C11.044 12.202 11.016 12.338 10.96 12.466C10.908 12.59 10.834 12.698 10.738 12.79C10.642 12.882 10.53 12.954 10.402 13.006C10.274 13.058 10.136 13.084 9.98805 13.084C9.83605 13.084 9.69605 13.058 9.56805 13.006C9.44005 12.954 9.32805 12.882 9.23205 12.79C9.14005 12.698 9.06605 12.59 9.01005 12.466C8.95805 12.338 8.93205 12.202 8.93205 12.058Z" fill="white"/>
  //   <defs>
  //   <filter id="filter0_d_20_967" x="0" y="0" width="20" height="20" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  //   <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  //   <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  //   <feOffset dy="2"/>
  //   <feGaussianBlur stdDeviation="1"/>
  //   <feComposite in2="hardAlpha" operator="out"/>
  //   <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
  //   <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_20_967"/>
  //   <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_20_967" result="shape"/>
  //   </filter>
  //   </defs>
  //   `
  //   document.querySelector(".video-content").appendChild(svg);
  // }

  console.log(
    "request Audio and Video Permissions",
    checkAudioVideoPermission.get(window.VideoSDK.Constants.permission.AUDIO),
    checkAudioVideoPermission.get(window.VideoSDK.Constants.permission.VIDEO)
  );

  if (checkAudioVideoPermission.get(window.VideoSDK.Constants.permission.AUDIO) === false) {
    this.document.getElementById("micButton").style.display = "none";
    this.document.getElementById("no-microphone-permission").style.display = "block";
  }

  if (checkAudioVideoPermission.get(window.VideoSDK.Constants.permission.VIDEO) === false) {
    this.document.getElementById("camButton").style.display = "none";
    this.document.getElementById("no-camera-permission").style.display = "block";
  }

  await updateDevices();
  await enableCam();
  await enableMic();

  // microphonePermission.addEventListener('click', async () => {
  //   console.log("microphone permission request called");
  //   try{
  //     requestPermission = await window.VideoSDK.requestPermission(
  //       window.VideoSDK.Constants.permission.AUDIO,
  //     );
  //     console.log("permission taken")
  //   }catch(e){
  //     console.log("Error while requesting microphone permission", e);
  //   }
  // })

  // cameraPermission.addEventListener('click', async () => {
  //   try{
  //     requestPermission = await window.VideoSDK.requestPermission(
  //       window.VideoSDK.Constants.permission.VIDEO,
  //     );
  //   }catch(e){
  //     console.log("Error while requesting camera permission", e);
  //   }
  // })
  deviceChangeEventListener = async (devices) => { // 
    await updateDevices();
    await enableCam();
  }
  window.VideoSDK.on("device-changed", deviceChangeEventListener);
  refreshButton.addEventListener('click', async () => {
    try {
      const refreshElement = document.getElementById("refresh");
      console.log(refreshElement);
      this.document.getElementById("download-speed-div").style.display = "none";
      this.document.getElementById("upload-speed-div").style.display = "none";
      this.document.getElementById("check-speed-div").style.display = "unset";
      this.document.getElementById("network-stats").style.marginLeft = "445px";
      refreshElement.firstElementChild.classList.remove("bi-arrow-cloclwise");
      refreshElement.firstElementChild.classList.add("bi-arrow-repeat");
      refreshElement.classList.add("spin")
      const result = await window.VideoSDK.getNetworkStats({ timeoutDuration: 120000 });
      this.document.getElementById("download-speed-div").style.display = "flex";
      this.document.getElementById("upload-speed-div").style.display = "flex";
      this.document.getElementById("check-speed-div").style.display = "none";
      this.document.getElementById("network-stats").style.marginLeft = "375px";
      refreshElement.firstElementChild.classList.add("bi-arrow-cloclwise");
      refreshElement.firstElementChild.classList.remove("bi-arrow-repeat");
      refreshElement.classList.remove("spin");
      document.getElementById("network-error-offline").style.display = "none";
      document.getElementById("network-error-online").style.display = "none";
      console.log("Network Stats : ", result);
      document.getElementById("download-speed").innerHTML = result["downloadSpeed"] + " MBPS";
      document.getElementById("upload-speed").innerHTML = result["uploadSpeed"] + " MBPS";
      document.getElementById("network-stats").style.display = "flex";
    } catch (error) {
      this.document.getElementById("network-stats").style.display = "none";
      console.log(error);
      if (error == "Not able to get NetworkStats due to no Network") {
        this.document.getElementById("network-error-offline").style.display = "flex"
        console.log("Error in Network Stats : ", error);
      } else if (error == "Not able to get NetworkStats due to timeout") {
        this.document.getElementById("network-error-online").style.display = "flex"
        console.log("Error in Network Stats : ", error);
      }
    }
  });

  networkErrorRefreshButton.forEach((refersh) => {
    refersh.addEventListener("click", async () => {
      try {
        const refreshElement = document.getElementById("refresh");
        console.log(refreshElement);  
        refreshElement.firstElementChild.classList.remove("bi-arrow-cloclwise");
        refreshElement.firstElementChild.classList.add("bi-arrow-repeat");
        refreshElement.classList.add("spin");
        this.document.getElementById("download-speed-div").style.display = "none";
        this.document.getElementById("upload-speed-div").style.display = "none";
        this.document.getElementById("check-speed-div").style.display = "unset";
        this.document.getElementById("network-stats").style.marginLeft = "445px";
        const result = await window.VideoSDK.getNetworkStats({ timeoutDuration: 120000 });
        // console.log("SUII");
        this.document.getElementById("download-speed-div").style.display = "flex";
        this.document.getElementById("upload-speed-div").style.display = "flex";
        this.document.getElementById("check-speed-div").style.display = "none";
        this.document.getElementById("network-stats").style.marginLeft = "375px";
        refreshElement.firstElementChild.classList.remove("bi-arrow-repeat");
        refreshElement.classList.remove("spin");
        refreshElement.firstElementChild.classList.add("bi-arrow-cloclwise");
        document.getElementById("network-error-offline").style.display = "none";
        document.getElementById("network-error-online").style.display = "none";
        console.log("Network Stats : ", result);
        document.getElementById("download-speed").innerHTML = result["downloadSpeed"] + " MBPS";
        document.getElementById("upload-speed").innerHTML = result["uploadSpeed"] + " MBPS";
        document.getElementById("network-stats").style.display = "flex";
      } catch (error) {
        this.document.getElementById("network-stats").style.display = "none";
        console.log(error);
        if (error == "Not able to get NetworkStats due to no Network") {
          this.document.getElementById("network-error-offline").style.display = "flex"
          console.log("Error in Network Stats : ", error);
        } else if (error == "Not able to get NetworkStats due to timeout") {
          this.document.getElementById("network-error-online").style.display = "flex"
          console.log("Error in Network Stats : ", error);
        }
      }
    })
  })

  await window.VideoSDK.getNetworkStats({ timeoutDuration: 120000 })
    .then((result) => {
      const refreshElement = document.getElementById("refresh");
      this.document.getElementById("download-speed-div").style.display = "flex";
      this.document.getElementById("upload-speed-div").style.display = "flex";
      this.document.getElementById("check-speed-div").style.display = "none";
      this.document.getElementById("network-stats").style.marginLeft = "375px";
      // console.log("repeat removed")
      refreshElement.classList.remove("spin");
      refreshElement.firstElementChild.classList.remove("bi-arrow-repeat");
      refreshElement.firstElementChild.classList.add("bi-arrow-clockwise");
      document.getElementById("network-error-offline").style.display = "none";
      document.getElementById("network-error-online").style.display = "none";
      console.log("Network Stats : ", result);
      document.getElementById("download-speed").innerHTML = result["downloadSpeed"] + " MBPS"
      document.getElementById("upload-speed").innerHTML = result["uploadSpeed"] + " MBPS"
      document.getElementById("network-stats").style.display = "flex";
    })
    .catch((error) => {
      console.log(error);
      if (error == "Not able to get NetworkStats due to no Network") {
        this.document.getElementById("network-error-offline").style.display = "flex"
        console.log("Error in Network Stats : ", error);
      } else if (error == "Not able to get NetworkStats due to timeout") {
        this.document.getElementById("network-error-online").style.display = "flex"
        console.log("Error in Network Stats : ", error);
      }
    });


});

async function updateDevices() {
  try {
    const checkAudioVideoPermission = await window.VideoSDK.checkPermissions();

    cameraPermissionAllowed = checkAudioVideoPermission.get(window.VideoSDK.Constants.permission.VIDEO);
    microphonePermissionAllowed = checkAudioVideoPermission.get(window.VideoSDK.Constants.permission.AUDIO);

    if (cameraPermissionAllowed) {
      const cameras = await window.VideoSDK.getCameras();
      // console.log(cameraDeviceDropDown);
      cameraDeviceDropDown.innerHTML = "";
      cameras.forEach(item => {
        const li = document.createElement('li');
        // console.log(item)
        li.id = item.deviceId;
        li.textContent = item.label;
        // console.log(li);
        li.addEventListener("click", function () {
          document.getElementById(currentCamera.deviceId).innerHTML = `
            ${currentCamera.label}
          `
          currentCamera = item;
          console.log(currentCamera);
          document.getElementById("select-camera").innerHTML = `
          <i class="bi bi-camera-video" style="font-size: 16px;"></i>
          ${currentCamera.label}
          `

          document.getElementById(currentCamera.deviceId).innerHTML = `
        <i class="bi bi-check2"></i>
        ${currentCamera.label}
        `

          toggleWebCam();
          toggleWebCam();
        })
        // if(item.deviceId == "Default")
        // console.log(item);
        currentCamera = item;
        document.getElementById("select-camera").innerHTML = `
          <i class="bi bi-camera-video" style="font-size: 16px;"></i>
          ${currentCamera.label}
          `
        cameraDeviceDropDown.appendChild(li);
      });

      document.getElementById(currentCamera.deviceId).innerHTML = `
        <i class="bi bi-check2"></i>
        ${currentCamera.label}
        `

    } else {
      const option = document.createElement('option');
      option.value = "Permission needed";
      option.text = "Permission needed";
      cameraDeviceDropDown.appendChild(option);

      cameraDeviceDropDown.disabled = true;
      cameraDeviceDropDown.setAttribute("style", "cursor:not-allowed")
    }

    if (microphonePermissionAllowed) {
      const microphones = await window.VideoSDK.getMicrophones();
      // console.log(microphones)
      const playBackDevices = await window.VideoSDK.getPlaybackDevices();
      // console.log(playBackDevices)
      microphoneDeviceDropDown.innerHTML = "";
      playBackDeviceDropDown.innerHTML = "";
      // console.log("Before For Each",microphones)

      microphones.forEach((item) => {
        // const option = document.createElement('option');
        // option.value = item.deviceId;
        // option.text = item.label;
        // console.log(item);
        const li = document.createElement('li');
        // li.classList.add("microphone-type");
        li.id = item.deviceId;
        li.textContent = item.label;
        li.addEventListener("click", (e) => {
          if (currentMic.deviceId == "communications" || currentMic.deviceId == "default") {
            document.querySelector(`#microphoneDeviceDropDown #${currentMic.deviceId}`).innerHTML = `
            ${currentMic.label}
            `
          } else {
            document.getElementById(currentMic.deviceId).innerHTML = `
            ${currentMic.label}
            `
          }
          currentMic = item;
          console.log(currentMic);
          document.getElementById("select-microphone").innerHTML = `
          <i class="bi bi-mic" style="font-size: 14px;"></i>
          ${currentMic.label}
          `

          if (currentMic.deviceId == "communications" || currentMic.deviceId == "default") {
            document.querySelector(`#microphoneDeviceDropDown #${currentMic.deviceId}`).innerHTML = `
            <i class="bi bi-check2"></i>
            ${currentMic.label}
            `
          } else {
            document.getElementById(currentMic.deviceId).innerHTML = `
            <i class="bi bi-check2"></i>
            ${currentMic.label}
            `
          }
          enableMic();
        })
        if (item.deviceId == 'default') {
          currentMic = item;
          document.getElementById("select-microphone").innerHTML = `
          <i class="bi bi-mic" style="font-size: 14px;"></i>
          ${currentMic.label}
          `

        }

        // console.log(li);
        microphoneDeviceDropDown.appendChild(li);
      });


      playBackDevices.forEach(item => {
        const li = document.createElement('li');
        li.classList.add("playback-type");
        li.id = item.deviceId;
        li.textContent = item.label;
        li.addEventListener("click", () => {
          if (currentPlayback.deviceId == "communications" || currentPlayback.deviceId == "default") {
            document.querySelector(`#playBackDeviceDropDown #${currentPlayback.deviceId}`).innerHTML = `
              ${currentPlayback.label}
            `
          } else {
            document.getElementById(currentPlayback.deviceId).innerHTML = `
            ${currentPlayback.label}
            `
          }
          currentPlayback = item;
          console.log(currentPlayback);
          document.getElementById("select-speaker").innerHTML = `
        <i class="bi bi-volume-up" style="font-size: 17px;"></i>
        ${currentPlayback.label}
        `;
          // console.log("before tick ")
          // console.log(document.getElementById(currentPlayback.deviceId))
          setAudioOutputDevice(currentPlayback.deviceId);

          if (currentPlayback.deviceId == "communications" || currentPlayback.deviceId == "default") {
            document.querySelector(`#playBackDeviceDropDown #${currentPlayback.deviceId}`).innerHTML = `
          <i class="bi bi-check2"></i>
          ${currentPlayback.label}
          `
          } else {
            document.getElementById(currentPlayback.deviceId).innerHTML = `
          <i class="bi bi-check2"></i>
            ${currentPlayback.label}
            `
          }
        })
        if (item.deviceId == 'default') {
          currentPlayback = item;
          document.getElementById("select-speaker").innerHTML = `
          <i class="bi bi-volume-up" style="font-size: 17px;"></i>
          ${currentPlayback.label}
          `
        }
        playBackDeviceDropDown.appendChild(li);
      });

      document.querySelector(`#microphoneDeviceDropDown #${currentMic.deviceId}`).innerHTML = `
            <i class="bi bi-check2"></i>
            ${currentMic.label}
            `

      document.querySelector(`#playBackDeviceDropDown #${currentPlayback.deviceId}`).innerHTML = `
          <i class="bi bi-check2"></i>
          ${currentPlayback.label}
          `

    } else {
      const microphoneDeviceOption = document.createElement('option');
      microphoneDeviceOption.value = "Permission needed";
      microphoneDeviceOption.text = "Permission needed";
      microphoneDeviceDropDown.appendChild(microphoneDeviceOption);

      const playBackDeviceOption = document.createElement('option');
      playBackDeviceOption.value = "Permission needed";
      playBackDeviceOption.text = "Permission needed";
      playBackDeviceDropDown.appendChild(playBackDeviceOption);

      microphoneDeviceDropDown.disabled = true;
      playBackDeviceDropDown.disabled = true;
      microphoneDeviceDropDown.setAttribute("style", "cursor:not-allowed")
      playBackDeviceDropDown.setAttribute("style", "cursor:not-allowed")
    }
  } catch (Ex) {
    console.log("Error in check permission" + Ex);
  }


}

function handleInputChange(event) {
  console.log("Event called")
  var input = event.target;
  var inputValue = input.value;

  if (input.id === "joinMeetingId") {

    joinMeetingCodeValue = inputValue;
  } else if (input.id === "name") {
    joinNameValue = inputValue;
  }

  if (joinMeetingCodeValue.length == 14 && joinNameValue.length >= 3) {
    console.log("Changes are called")
    console.log(document.querySelector(".inner-join-button"));
    document.querySelector(".inner-join-button").style.backgroundColor = "#5A6BFF";
    document.querySelector(".inner-join-button").style.border = "none";
  } else {
    document.querySelector(".inner-join-button").style.backgroundColor = "rgb(28, 28, 28)";
    document.querySelector(".inner-join-button").style.border = "0.1px solid rgb(122, 122, 122)";
  }


}


const setAudioOutputDevice = (deviceId) => {
  // console.log(deviceId);
  console.log(deviceId);
  const audioTags = document.getElementsByTagName("audio");
  for (let i = 0; i < audioTags.length; i++) {
    console.log(audioTags[i])
    audioTags.item(i).setSinkId(deviceId);
  }
};

function showInputFields() {
  const inputElement = document.querySelectorAll(".join-meeting-input");
  inputElement.forEach((element) => {
    element.style.display = "block"
  })

  document.querySelectorAll(".join-btn").forEach((btn => {
    btn.style.display = 'none'
  }))
}


async function tokenGeneration() {
  if (TOKEN != "") {
    token = TOKEN;
    console.log(token);
  } else if (AUTH_URL != "") {
    token = await window
      .fetch(AUTH_URL + "/generateJWTToken")
      .then(async (response) => {
        const { token } = await response.json();
        console.log(token);
        return token;
      })
      .catch(async (e) => {
        console.log(await e);
        return;
      });
  } else if (AUTH_URL == "" && TOKEN == "") {
    alert("Set Your configuration details first ");
    window.location.href = "/";
    // window.location.reload();
  } else {
    alert("Check Your configuration once ");
    window.location.href = "/";
    // window.location.reload();
  }
}

async function validateMeeting(meetingId, joinMeetingName) {
  if (token != "") {
    const url = `${API_BASE_URL}/v2/rooms/validate/${meetingId}`;

    const options = {
      method: "GET",
      headers: { Authorization: token },
    };

    const result = await fetch(url, options)
      .then((response) => response.json()) //result will have meeting id
      .catch((error) => {
        console.error("error", error);
        alert("Invalid Meeting Id");
        window.location.href = "/";
        return;
      });
    if (result.roomId === meetingId) {
      document.getElementById("meetingid").value = meetingId;
      document.getElementById("joinPage").style.display = "none";
      document.getElementById("gridPpage").style.display = "flex";
      toggleControls();
      startMeeting(token, meetingId, joinMeetingName);
    }
  } else {
    await fetch(
      AUTH_URL + "/validatemeeting/" + meetingId,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (result) => {
        const { meetingId } = await result.json();
        console.log(meetingId);
        if (meetingId == undefined) {
          return alert("Invalid Meeting ID ");
        } else {
          document.getElementById("meetingid").value = meetingId;
          document.getElementById("joinPage").style.display = "none";
          document.getElementById("gridPpage").style.display = "flex";
          toggleControls();
          startMeeting(token, meetingId, joinMeetingName);
        }
      })
      .catch(async (e) => {
        alert("Meeting ID Invalid", await e);
        window.location.href = "/";
        return;
      });
  }
}

function addParticipantToList({ id, displayName }) {
  let participantTemplate = document.createElement("div");
  participantTemplate.className = "row";
  participantTemplate.style.padding = "4px";
  participantTemplate.style.marginTop = "1px";
  participantTemplate.style.marginLeft = "7px";
  participantTemplate.style.marginRight = "7px";
  participantTemplate.style.borderRadius = "3px";
  participantTemplate.style.border = "1px solid rgb(61, 60, 78)";
  participantTemplate.style.backgroundColor = "rgb(0, 0, 0)";

  //icon
  let colIcon = document.createElement("div");
  colIcon.className = "col-2";
  colIcon.innerHTML = "Icon";
  participantTemplate.appendChild(colIcon);

  //name
  let content = document.createElement("div");
  colIcon.className = "col-3";
  colIcon.innerHTML = `${displayName}`;
  participantTemplate.appendChild(content);
  // participants.push({ id, displayName });

  console.log(participants);

  participantsList.appendChild(participantTemplate);
  participantsList.appendChild(document.createElement("br"));
}

function createLocalParticipant() {
  totalParticipants++;
  localParticipant = createVideoElement(meeting.localParticipant.id);
  localParticipantAudio = createAudioElement(meeting.localParticipant.id);
  // console.log("localPartcipant.id : ", localParticipant.className);
  // console.log("meeting.localPartcipant.id : ", meeting.localParticipant.id);
  videoContainer.appendChild(localParticipant);
}

async function startMeeting(token, meetingId, name) {
  if (joinPageVideoStream !== null) {
    const tracks = joinPageVideoStream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
    joinPageVideoStream = null;
    joinPageWebcam.srcObject = null;
  }

  window.VideoSDK.off("device-changed", deviceChangeEventListener);

  // Meeting config
  window.VideoSDK.config(token);
  let customVideoTrack, customAudioTrack;

  if (webCamEnable) {
    // console.log(cameraDeviceDropDown.value);
    customVideoTrack = await window.VideoSDK.createCameraVideoTrack({
      cameraId: currentCamera.deviceId ? currentCamera.deviceId : undefined,
      optimizationMode: "motion",
      multiStream: false,
    });
  }

  if (micEnable) {
    console.log("Hello microphone called");
    // console.log(microphoneDeviceDropDown.value);
    console.log(currentMic.deviceId);
    customAudioTrack = await window.VideoSDK.createMicrophoneAudioTrack({
      microphoneId: currentMic.deviceId ? currentMic.deviceId : undefined,
      encoderConfig: "high_quality",
      noiseConfig: {
        noiseSuppresion: true,
        echoCancellation: true,
        autoGainControl: true,
      },
    });
  }

  // Meeting Init
  meeting = window.VideoSDK.initMeeting({
    meetingId: meetingId, // required
    name: name, // required
    micEnabled: micEnable, // optional, default: true
    webcamEnabled: webCamEnable, // optional, default: true
    maxResolution: "hd", // optional, default: "hd"
    customCameraVideoTrack: customVideoTrack,
    customMicrophoneAudioTrack: customAudioTrack,
  });

  participants = meeting.participants;
  console.log("meeting obj : ", meeting);
  // Meeting Join
  meeting.join();

  //create Local Participant
  createLocalParticipant();

  //add yourself in participant list
  if (totalParticipants != 0)
    addParticipantToList({
      id: meeting.localParticipant.id,
      displayName: "You",
    });

  // Setting local participant stream
  meeting.localParticipant.on("stream-enabled", (stream) => {
    setTrack(
      stream,
      localParticipantAudio,
      meeting.localParticipant,
      (isLocal = true)
    );
    console.log("webcam used : ", meeting.selectedCameraDevice);
    console.log("microphone used : ", meeting.selectedMicrophoneDevice);
  });

  meeting.localParticipant.on("stream-disabled", (stream) => {
    if (stream.kind == "video") {
      videoCamOn.style.display = "none";
      videoCamOff.style.display = "inline-block";
    }
    if (stream.kind == "audio") {
      micOn.style.display = "none";
      micOff.style.display = "inline-block";
    }
    console.log("webcam used : ", meeting.selectedCameraDevice);
    console.log("microphone used : ", meeting.selectedMicrophoneDevice);
  });

  meeting.on("meeting-joined", () => {
    meeting.pubSub.subscribe("CHAT", (data) => {
      let { message, senderId, senderName, timestamp } = data;
      const chatBox = document.getElementById("chatArea");
      const chatTemplate = `
          <div style="margin-bottom: 10px; ${meeting.localParticipant.id == senderId && "text-align : right"
        }">
            <span style="font-size:12px;">${senderName}</span>
            <div style="margin-top:5px">
              <span style="background:${meeting.localParticipant.id == senderId ? "grey" : "crimson"
        };color:white;padding:5px;border-radius:8px">${message}<span>
            </div>
          </div>
          `;
      chatBox.insertAdjacentHTML("beforeend", chatTemplate);
    });

  });

  meeting.on("meeting-left", () => {
    window.location.reload();
    document.getElementById("join-page").style.display = "flex";
  });

  // Other participants
  meeting.on("participant-joined", (participant) => {
    totalParticipants++;
    let videoElement = createVideoElement(participant.id);
    console.log("Video Element Created");
    let resizeObserver = new ResizeObserver(() => {
      participant.setViewPort(
        videoElement.offsetWidth,
        videoElement.offsetHeight
      );
    });
    resizeObserver.observe(videoElement);
    let audioElement = createAudioElement(participant.id);
    remoteParticipantId = participant.id;

    participant.on("stream-enabled", (stream) => {
      setTrack(stream, audioElement, participant, (isLocal = false));
    });
    videoContainer.appendChild(videoElement);
    console.log("Video Element Appended");
    videoContainer.appendChild(audioElement);
    addParticipantToList(participant);
    setAudioOutputDevice(currentPlayback.deviceId);
  });

  // participants left
  meeting.on("participant-left", (participant) => {
    totalParticipants--;
    let vElement = document.getElementById(`v-${participant.id}`);
    vElement.parentNode.removeChild(vElement);

    let aElement = document.getElementById(`a-${participant.id}`);
    aElement.parentNode.removeChild(aElement);
    //remove it from participant list participantId;
    document.getElementById(`p-${participant.id}`).remove();
  });

  //recording events
  meeting.on("recording-started", () => {
    console.log("RECORDING STARTED EVENT");
    btnStartRecording.style.display = "none";
    btnStopRecording.style.display = "inline-block";
  });
  meeting.on("recording-stopped", () => {
    console.log("RECORDING STOPPED EVENT");
    btnStartRecording.style.display = "inline-block";
    btnStopRecording.style.display = "none";
  });

  meeting.on("presenter-changed", (presenterId) => {
    if (presenterId) {
      console.log(presenterId);
      //videoScreenShare.style.display = "inline-block";
    } else {
      console.log(presenterId);
      videoScreenShare.removeAttribute("src");
      videoScreenShare.pause();
      videoScreenShare.load();
      videoScreenShare.style.display = "none";

      btnScreenShare.style.color = "white";
      screenShareOn = false;
      console.log(`screen share on : ${screenShareOn}`);
    }
  });

  //add DOM Events
  addDomEvents();
}

// joinMeeting();
async function joinMeeting(newMeeting) {
  // get Token
  tokenGeneration();


  let joinMeetingName = document.getElementById("name");
  let meetingId = document.getElementById("joinMeetingId").value || "";
  if (!newMeeting) {
    if (validateMeeting(meetingId, joinNameValue)) {
      console.log("meeting Validated");
    }
    else {
      return alert("Please enter the Valid meetingId");
    }

  }
  if (!joinMeetingCodeValue && !newMeeting) {
    return alert("Please Provide a meetingId");
  }


  //create New Meeting
  //get new meeting if new meeting requested;
  if (newMeeting && TOKEN != "") {
    const url = `${API_BASE_URL}/v2/rooms`;
    const options = {
      method: "POST",
      headers: { Authorization: token, "Content-Type": "application/json" },
    };

    const { roomId } = await fetch(url, options)
      .then((response) => response.json())
      .catch((error) => alert("error", error));

    if (roomId) {
      document.getElementById("meetingid").value = roomId;
      document.getElementById("joinPage").style.display = "none";
      document.getElementById("gridPpage").style.display = "flex";
      toggleControls();
      startMeeting(token, roomId, 'Admin');
    }
  } else if (newMeeting && TOKEN == "") {
    const options = {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    };

    meetingId = await fetch(AUTH_URL + "/createMeeting", options).then(
      async (result) => {
        console.log("result of create meeting : ", result);
        const { meetingId } = await result.json();
        console.log("NEW MEETING meetingId", meetingId);
        return meetingId;
      }
    );
    if (meetingId) {
      document.getElementById("meetingid").value = meetingId;
      document.getElementById("joinPage").style.display = "none";
      document.getElementById("gridPpage").style.display = "flex";
      toggleControls();
      startMeeting(token, meetingId, joinMeetingName);
    }
  }
}

function validateMeetingId(meetingId) {
  const regex = /^[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}$/;

  return regex.test(meetingId);
}

// creating video element
function createVideoElement(pId) {
  let division;
  division = document.createElement("div");
  division.setAttribute("id", "video-frame-container");
  division.className = `v-${pId}`;
  let videoElement = document.createElement("video");
  videoElement.classList.add("video-frame");
  videoElement.setAttribute("id", `v-${pId}`);
  videoElement.setAttribute("playsinline", true);
  //videoElement.setAttribute('height', '300');
  videoElement.setAttribute("width", "300");
  division.appendChild(videoElement);
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

function setTrack(stream, audioElement, participant, isLocal) {
  if (stream.kind == "video") {
    console.log("setTrack called...");
    if (isLocal) {
      videoCamOff.style.display = "none";
      videoCamOn.style.display = "inline-block";
    }
    const mediaStream = new MediaStream();
    mediaStream.addTrack(stream.track);
    let videoElm = document.getElementById(`v-${participant.id}`);
    videoElm.srcObject = mediaStream;
    videoElm
      .play()
      .catch((error) =>
        console.error("videoElem.current.play() failed", error)
      );
    participant.setViewPort(videoElm.offsetWidth, videoElm.offsetHeight);
  }
  if (stream.kind == "audio") {
    if (isLocal) {
      micOff.style.display = "none";
      micOn.style.display = "inline-block";
      return;
    }
    const mediaStream = new MediaStream();
    mediaStream.addTrack(stream.track);
    audioElement.srcObject = mediaStream;
    audioElement
      .play()
      .catch((error) => console.error("audioElem.play() failed", error));
  }
  if (stream.kind == "share" && !isLocal) {
    screenShareOn = true;
    const mediaStream = new MediaStream();
    mediaStream.addTrack(stream.track);
    videoScreenShare.srcObject = mediaStream;
    videoScreenShare
      .play()
      .catch((error) =>
        console.error("videoElem.current.play() failed", error)
      );
    videoScreenShare.style.display = "inline-block";
    btnScreenShare.style.color = "grey";
  }
}

//add button events once meeting is created
function addDomEvents() {
  // mic button event listener
  micOn.addEventListener("click", () => {
    console.log("Mic-on pressed");
    meeting.muteMic();
  });

  micOff.addEventListener("click", async () => {
    console.log("Mic-f pressed");
    if (microphonePermissionAllowed) {
      meeting.unmuteMic();
    } else {
      console.log("Audio : Permission not granted");
    }
  });

  videoCamOn.addEventListener("click", async () => {
    meeting.disableWebcam();
  });

  videoCamOff.addEventListener("click", async () => {
    if (cameraPermissionAllowed) {
      meeting.enableWebcam();
    } else {
      console.log("Camera : Permission not granted");
    }
  });

  // screen share button event listener
  btnScreenShare.addEventListener("click", async () => {
    if (btnScreenShare.style.color == "grey") {
      meeting.disableScreenShare();
    } else {
      meeting.enableScreenShare();
    }
  });

  //raise hand event
  $("#btnRaiseHand").click(function () {
    let participantId = localParticipant.className;
    if (participantId.split("-")[1] == meeting.localParticipant.id) {
      contentRaiseHand.innerHTML = "You Have Raised Your Hand";
    } else {
      contentRaiseHand.innerHTML = `<b>${remoteParticipantId}</b> Have Raised Their Hand`;
    }

    $("#contentRaiseHand").show();
    setTimeout(function () {
      $("#contentRaiseHand").hide();
    }, 2000);
  });

  //send chat message button
  btnSend.addEventListener("click", async () => {
    const message = document.getElementById("txtChat").value;
    console.log("publish : ", message);
    document.getElementById("txtChat").value = "";
    meeting.pubSub
      .publish("CHAT", message, { persist: true })
      .then((res) => console.log(`response of publish : ${res}`))
      .catch((err) => console.log(`error of publish : ${err}`));
    // meeting.sendChatMessage(JSON.stringify({ type: "chat", message }));
  });

  // //leave Meeting Button
  $("#leaveCall").click(async () => {
    participants = new Map(meeting.participants);
    meeting.leave();
  });

  //end meeting button
  $("#endCall").click(async () => {
    meeting.end();
  });

  // //startRecording
  btnStartRecording.addEventListener("click", async () => {
    console.log("btnRecording is clicked");
    meeting.startRecording();
  });
  // //Stop Recording
  btnStopRecording.addEventListener("click", async () => {
    meeting.stopRecording();
  });
}

async function toggleMic() {
  console.log("micEnable", micEnable);
  if (micEnable) {
    document.getElementById("micButton").style.backgroundColor = "#FF5D5D";
    document.getElementById("muteMic").style.display = "unset";
    document.getElementById("unmuteMic").style.display = "none";
    micEnable = false;
  } else {
    enableMic();
  }
}
async function toggleWebCam() {
  console.log("joinPageVideoStream", joinPageVideoStream);
  if (joinPageVideoStream) {
    document.getElementById("camera-status").style.display = "block";
    joinPageWebcam.style.backgroundColor = "#1C1C1C";
    joinPageWebcam.srcObject = null;
    document.getElementById("camButton").style.backgroundColor = "#FF5D5D";
    document.getElementById("offCamera").style.display = "unset";
    document.getElementById("onCamera").style.display = "none";
    webCamEnable = false;
    const tracks = joinPageVideoStream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
    joinPageVideoStream = null;
  } else {
    enableCam();
  }
}

async function enableCam() {
  if (joinPageVideoStream !== null) {
    const tracks = joinPageVideoStream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
    joinPageVideoStream = null;
    joinPageWebcam.srcObject = null;
  }

  if (cameraPermissionAllowed) {
    let mediaStream;
    console.log(currentCamera.deviceId);
    try {
      mediaStream = await window.VideoSDK.createCameraVideoTrack({
        cameraId: currentCamera.deviceId ? currentCamera.deviceId : undefined,
        optimizationMode: "motion",
        multiStream: false,
      });
    } catch (ex) {
      console.log("Exception in enableCam", ex);
    }

    if (mediaStream) {
      document.getElementById("camera-status").style.display = "none";
      joinPageVideoStream = mediaStream;
      joinPageWebcam.srcObject = mediaStream;
      joinPageWebcam.play().catch((error) =>
        console.log("videoElem.current.play() failed", error)
      );
      document.getElementById("camera-status").display = "none";
      document.getElementById("camButton").style.backgroundColor = "white";
      document.getElementById("offCamera").style.display = "none";
      document.getElementById("onCamera").style.display = "unset";
      webCamEnable = true;
    }

  }
}

async function enableMic() {
  if (microphonePermissionAllowed) {
    // console.log(currentMic);
    micEnable = true;

    document.getElementById("micButton").style.backgroundColor = "white";
    document.getElementById("muteMic").style.display = "none";
    document.getElementById("unmuteMic").style.display = "unset";

  }
}


function copyMeetingCode() {
  copy_meeting_id.select();
  document.execCommand("copy");
}

//open participant wrapper
function openParticipantWrapper() {
  document.getElementById("participants").style.width = "350px";
  document.getElementById("gridPpage").style.marginRight = "350px";
  document.getElementById("ParticipantsCloseBtn").style.visibility = "visible";
  document.getElementById("totalParticipants").style.visibility = "visible";
  document.getElementById(
    "totalParticipants"
  ).innerHTML = `Participants (${totalParticipants})`;
}

function closeParticipantWrapper() {
  document.getElementById("participants").style.width = "0";
  document.getElementById("gridPpage").style.marginRight = "0";
  document.getElementById("ParticipantsCloseBtn").style.visibility = "hidden";
  document.getElementById("totalParticipants").style.visibility = "hidden";
}

function openChatWrapper() {
  document.getElementById("chatModule").style.width = "350px";
  document.getElementById("gridPpage").style.marginRight = "350px";
  document.getElementById("chatCloseBtn").style.visibility = "visible";
  document.getElementById("chatHeading").style.visibility = "visible";
  document.getElementById("btnSend").style.display = "inline-block";
}

function closeChatWrapper() {
  document.getElementById("chatModule").style.width = "0";
  document.getElementById("gridPpage").style.marginRight = "0";
  document.getElementById("chatCloseBtn").style.visibility = "hidden";
  document.getElementById("btnSend").style.display = "none";
}

function toggleControls() {
  console.log("from toggleControls");
  if (micEnable) {
    console.log("micEnable True");
    micOn.style.display = "inline-block";
    micOff.style.display = "none";
  } else {
    console.log("micEnable False");
    micOn.style.display = "none";
    micOff.style.display = "inline-block";
  }

  if (webCamEnable) {
    console.log("webCamEnable True");
    videoCamOn.style.display = "inline-block";
    videoCamOff.style.display = "none";
  } else {
    console.log("webCamEnable False");
    videoCamOn.style.display = "none";
    videoCamOff.style.display = "inline-block";
  }
}
