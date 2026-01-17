import { StoreECS } from "../../framework/ecs/StoreECS";
import { SystemECS } from "../../framework/ecs/SystemECS";
import { MonECSView } from "../MonECSView";
import { CeshiWorld } from "./CeshiWorld";

/** 0~1 可调 */
const alpha: number = 0.5;

export class CeshiViewSyncSystem extends SystemECS {

    views = new StoreECS<MonECSView>();

    constructor(
        private world: CeshiWorld,
    ) {
        super();
    }

    lerp(a: number, b: number, t: number) {
        return a + (b - a) * t;
    }

    // 📌 逻辑帧 ≠ 渲染帧
    // 📌 插值是“表现层的责任”
    update(dt: number) {
        for (const e of this.world.getEntities()) {
            const view = this.views.get(e);
            if (!view) continue;

            const node = view.node;
            node.setPosition(this.world.posMap.get(e).x, this.world.posMap.get(e).y);
        }
    }
}


