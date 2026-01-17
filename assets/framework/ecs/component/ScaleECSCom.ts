
export class ScaleECSCom {
    scaleX: Float32Array;
    scaleY: Float32Array;

    constructor(capacity: number) {
        this.scaleX = new Float32Array(capacity);
        this.scaleY = new Float32Array(capacity);
    }
}


