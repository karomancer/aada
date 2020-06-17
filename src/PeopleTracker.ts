import "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

export default class PeopleTracker {
    protected video: HTMLVideoElement

    constructor() {
        this.video = document.querySelector('#webcam')

        const webcamPromise = navigator.mediaDevices
            .getUserMedia({
                audio: false,
                video: {
                    facingMode: "floor",
                    frameRate: 60
                }
            })
            .then(stream => {
                this.video.srcObject = stream
                this.video.onloadedmetadata = () => {
                    this.video.play()
                }
            })
        const modelPromise = cocoSsd.load()
        Promise.all([modelPromise, webcamPromise])
        .then(values => {
          this.detectFrame(this.video, values[0]);
        })
        .catch(error => {
          console.error(error);
        });
    }

    detectFrame = (video, model) => {
        model.detect(video).then(predictions => {
          this.renderPredictions(predictions);
          requestAnimationFrame(() => {
            this.detectFrame(video, model);
          });
        });
      };

    renderPredictions = predictions => {
        console.log({predictions})
      };
}