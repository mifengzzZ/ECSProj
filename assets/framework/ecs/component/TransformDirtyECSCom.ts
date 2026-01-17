
// 只同步脏数据（Dirty Flag）
// 1️⃣ 为什么要 Dirty？
    // 不是每帧都在动
    // 同步 Node.setPosition() 也有成本
    // 动画 / UI 越多越明显

// 定义 Dirty 标记（TypedArray）
export class TransformDirtyECSCom {
    
    pos: Uint8Array;
    rot: Uint8Array;
    scale: Uint8Array;

    constructor(capacity: number) {
        this.pos = new Uint8Array(capacity);
        this.rot = new Uint8Array(capacity);
        this.scale = new Uint8Array(capacity);
    }

}

// 0 = 干净
// 1 = 脏