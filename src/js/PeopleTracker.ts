import "@tensorflow/tfjs";

import * as three from 'three'
import * as cocoSsd from "@tensorflow-models/coco-ssd";

import { normalizeCoord } from "./utils";

type UpdatePositionCallback = (x: number, y: number, index: number) => void

export default class PeopleTracker {
  protected video: HTMLVideoElement;

  protected updatePosition: UpdatePositionCallback

  constructor(cb: UpdatePositionCallback) {
    this.updatePosition = cb
    
    this.video = document.querySelector("#webcam");

    const webcamPromise = navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          facingMode: "floor",
          frameRate: 60,
        },
      })
      .then((stream) => {
        this.video.srcObject = stream;
        this.video.onloadedmetadata = () => {
          this.video.play();
        };
      });
    const modelPromise = cocoSsd.load();

    Promise.all([modelPromise, webcamPromise])
      .then((values) => {
        this.detectFrame(this.video, values[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  private detectFrame = (video, model) => {
    model.detect(video).then((predictions) => {
      this.updatePredictions(predictions);
      requestAnimationFrame(() => {
        this.detectFrame(video, model);
      });
    });
  };

  private updatePredictions = (predictions) => {
    predictions.filter(
      (prediction) => prediction.class === "person" && prediction.score > 0.5
    ).map((person, i) => {
        const [bboxX, bboxY, width, height] = person.bbox
        const [x, y] = normalizeCoord(bboxX + width/2, bboxY + height/2)
        console.log(`(${bboxX}, ${bboxY}) => (${x}, ${y})`)
        this.updatePosition(x, y, i)
    });
  }
}

// bbox: Array(4)
// 0: 72.90525436401367
// 1: 105.05962371826172
// 2: 512.3225593566895
// 3: 372.7638244628906
