// grab our DOM elements
const myVideoContainer = document.getElementById("myVideoContainer");
const myVideoElement = document.getElementById("myVideo");

let pc = null;
// define a click event listener to trigger a GUM (get user media) request
myVideoContainer.addEventListener("click", () => {
    navigator.mediaDevices.getUserMedia({
        video: true,
    })
        .then(stream => {
            myVideoElement.srcObject = stream; // add stream to our <video> element
            pc = new RTCPeerConnection();
            pc.addEventListener("icegatheringstatechange", (e) => {
                console.log("icegatheringstatechange", e);
            });
            pc.addEventListener("iceconnectionstatechange", (e) => {
                console.log("iceconnectionstatechange", e);
            });
            pc.addEventListener("icecandidate", (e) => {
                console.log("icecandidate", e);
            });
        })
        .catch(err => {
            console.log("an error occurred trying to get user's video feed", err);
            getVideoIDs();
        })
});

function getVideoIDs() {
    navigator.mediaDevices.enumerateDevices()
        .then(devicesArray => {
            devicesArray.forEach(device => {
                console.log(device)
            })
        })
}; // end getVideoIDs functionfa