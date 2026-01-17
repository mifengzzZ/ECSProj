
// SoA + 连续内存

import { EntityECS } from "db://assets/scripts/GameEntryWorldECS";


export class PositionECSCom {
    
    x: Float32Array;
    y: Float32Array;

    // 增加上一帧位置（解决抖动）
    prevX: Float32Array;
    prevY: Float32Array;

    // capacity 容量
    constructor(capacity: number) {
        // 普通 number[]
        // const arr: number[] = [1.1, 2.2, 3.3];
        // 内存本质（简化）：
            // arr
            // ├─ ptr → Number对象(1.1)
            // ├─ ptr → Number对象(2.2)
            // └─ ptr → Number对象(3.3)
        // ❌ 每个元素是对象
        // ❌ 分散在堆上
        // ❌ 有指针
        // ❌ 有 GC

        // Float32Array 一块连续内存，存放32位浮点数数组；不是对象数组，没有指针，没有GC
        // const arr = new Float32Array(3);
        // arr[0] = 1.1;
        // arr[1] = 2.2;
        // arr[2] = 3.3;
        // 内存本质：
            // | 1.1 | 2.2 | 3.3 |
            // |_____|_____|_____|
            // 连续内存（每个 4 字节）
        // ✅ 连续
        // ✅ 无对象
        // ✅ 无指针
        // ✅ 无 GC

        // Float32Array 是 TypedArray（类型化数组）的一种：
        //     元素类型：32 位 IEEE754 浮点数
        //     每个元素：固定 4 字节
        //     存储在 ArrayBuffer 中
        //     内存布局 和 C 语言数组几乎一样
        this.x = new Float32Array(capacity);
        this.y = new Float32Array(capacity);

        this.prevX = new Float32Array(capacity);
        this.prevX = new Float32Array(capacity);
    }

    /**
     * @param e 实体ID
     * @param x 
     * @param y 
     */
    set(e: EntityECS, x: number, y: number) {
        this.x[e] = x;
        this.y[e] = y;
    }

}


