// grab our DOM elements
const myVideoContainer = document.getElementById("myVideoContainer");
const myVideoElement = document.getElementById("myVideo");

let pc = null;
let offer = null;
let stats = null;
// define a click event listener to trigger a GUM (get user media) request
myVideoContainer.addEventListener("click", async () => {
    navigator.mediaDevices.getUserMedia({
        video: true,
    })
        .then(async stream => {
            myVideoElement.srcObject = stream; // add stream to our <video> element
            const config = {
                iceServers: [
                    {
                        urls: "stun:stun.l.google.com:19302",
                    },
                ],
            };
            pc = new RTCPeerConnection(config);
            pc.addEventListener("icegatheringstatechange", (e) => {
                console.log("icegatheringstatechange", e);
            });
            pc.addEventListener("iceconnectionstatechange", (e) => {
                console.log("iceconnectionstatechange", e);
            });
            pc.addEventListener("icecandidate", (e) => {
                console.log("icecandidate", e.candidate);
            });
            pc.addEventListener("negotiationneeded", onNegotiationNeeded);
            stream.getTracks().forEach(track => {
                console.log("trackAdded: ", track);
                pc.addTrack(track);
            });
        })
        .catch(err => {
            console.log("an error occurred trying to get user's video feed", err);
            getVideoIDs();
        })
});

async function onNegotiationNeeded(e) {
    console.log("negotiationneeded");
    offer = await pc.createOffer();
    console.log("offer", offer);
    stats = await pc.getStats();
    console.log("stats", stats);
    await pc.setLocalDescription(offer);
}

function getVideoIDs() {
    navigator.mediaDevices.enumerateDevices()
        .then(devicesArray => {
            devicesArray.forEach(device => {
                console.log(device)
            })
        })
}; // end getVideoIDs functionfa