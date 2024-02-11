console.log("reading pose");
const imageScaleFactor = 0.50;
const flipHorizontal = false;
const outputStride = 16;
// get up to 5 poses
const maxPoseDetections = 2;
// minimum confidence of the root part of a pose
const scoreThreshold = 0.5;
// minimum distance in pixels between the root parts of poses
const nmsRadius = 20;

var net;


async function loadModel(){
    net = await posenet.load();
}

async function readPose(imageElement) {

    const poses = await net.estimateMultiplePoses(
        imageElement, imageScaleFactor, flipHorizontal, outputStride,
        maxPoseDetections, scoreThreshold, nmsRadius);

    rightWrist = poses[0].keypoints[10].position["y"];
    rightSholder = poses[0].keypoints[6].position["y"];
    leftWrist = poses[0].keypoints[9].position["y"];
    leftSholder = poses[0].keypoints[5].position["y"];
    leftEye = poses[0].keypoints[1].position["y"];
    rightEye = poses[0].keypoints[2].position["y"];

    sholderHeight = (rightSholder + leftSholder) / 2;

    upperBound = (leftEye + rightEye) / 2;
    lowerBound = upperBound + (sholderHeight-upperBound)*2.8;

    ratio = (rightWrist - lowerBound) / (upperBound - lowerBound);

    console.log(ratio);
}