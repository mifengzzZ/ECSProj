
export class RotationECSCom {
    // Z 轴角度（2D）
    rotation: Float32Array;

    constructor(capacity: number) {
        this.rotation = new Float32Array(capacity);
    }
}
