// grab our DOM elements
const myVideoContainer = document.getElementById("myVideoContainer");
const myVideoElement = document.getElementById("myVideo");

// define a click event listener to trigger a GUM (get user media) request
myVideoContainer.addEventListener("click", () => {
    navigator.mediaDevices.getUserMedia({
        video: true,
    })
        .then(stream => {
            myVideoElement.srcObject = stream; // add stream to our <video> element
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
}; // end getVideoIDs function
