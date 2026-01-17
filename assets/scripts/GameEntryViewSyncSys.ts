
// 这个 System 只做一件事：
// 把 ECS 数据 → 写到 Node

// 📌 特点：
    // 不改 ECS
    // 不写逻辑
    // 不判断业务状态
    // 只做同步


import { StoreECS } from "../framework/ecs/StoreECS";
import { SystemECS } from "../framework/ecs/SystemECS";
import { WorldECS } from "./GameEntryWorldECS";

import { MonECSView } from "./MonECSView";

/** 0~1 可调 */
const alpha: number = 0.5;

export class GameEntryViewSyncSys extends SystemECS {
    
    views = new StoreECS<MonECSView>();

    constructor(
        private world: WorldECS,
    ) {
        super();
    }

    lerp(a: number, b: number, t: number) {
        return a + (b - a) * t;
    }

    // 📌 逻辑帧 ≠ 渲染帧
    // 📌 插值是“表现层的责任”
    update() {
        for (const e of this.world.getEntities()) {
            const view = this.views.get(e);
            if (!view) continue;

            if (this.world.dirty.pos[e]) {
                // 解决帧抖动，插值/平滑处理
                const x = this.lerp(this.world.pos.prevX[e], this.world.pos.x[e], alpha);
                const y = this.lerp(this.world.pos.prevY[e], this.world.pos.y[e], alpha);

                const node = view.node;
                node.setPosition(x, y);

                this.world.dirty.pos[e] = 0;
            }
            
            if (this.world.dirty.rot[e]) {
                const node = view.node;
                node.setRotationFromEuler(0, 0, this.world.rot.rotation[e] * 57.2958);
                
                this.world.dirty.rot[e] = 0;
            }

            if (this.world.dirty.scale[e]) {
                const node = view.node;
                node.setScale(this.world.scale.scaleX[e], this.world.scale.scaleY[e]);
                
                this.world.dirty.scale[e] = 0;
            }

        }
    }

}


