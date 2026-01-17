
// SoA + 连续内存

export class VelocityECSCom {
    
    x: Float32Array;
    y: Float32Array;

    constructor(capacity: number) {
        this.x = new Float32Array(capacity);
        this.y = new Float32Array(capacity);
    }

}


