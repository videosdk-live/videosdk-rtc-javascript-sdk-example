const API_BASE_URL = "https://api.videosdk.live";

// let validateMeeting = async (meetingId, options) => {
//   return await fetch(API_SERVER_URL + "/validatemeeting/" + meetingId, options)
//     .then(async (result) => {
//       const { meetingId } = await result.json();
//       console.log("meetingId", meetingId);
//       return meetingId;
//     })
//     .catch(() => {
//       alert("invalid Meeting Id");
//       window.location.href = "/";
//       return;
//     });
// };

// let createMeeting = async () => {
//   return await fetch(API_SERVER_URL + "/create-meeting", options).then(
//     async (result) => {
//       const { meetingId } = await result.json();
//       console.log("NEW MEETING meetingId", meetingId);
//       return meetingId;
//     }
//   );
// };
