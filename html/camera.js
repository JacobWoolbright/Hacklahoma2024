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

    pose = poses[0];

    console.log(pose)
}