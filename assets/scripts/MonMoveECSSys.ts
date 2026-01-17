// 这里是 ECS 性能核心
// 顺序访问
// 无对象
// cache 友好

import { SystemECS } from "../framework/ecs/SystemECS";
import { WorldECS } from "./GameEntryWorldECS";

export class MonMoveECSSys extends SystemECS {

    constructor(
        private world: WorldECS
    ) {
        super();
    }

    update(dt: number) {
        // 有多少个Entity就循环多少次，更新数据
        // 随时间越来越大
        for (const e of this.world.getEntities()) {
            this.world.pos.prevX[e] = this.world.pos.x[e];
            this.world.pos.prevY[e] = this.world.pos.y[e];

            this.world.pos.x[e] += this.world.vel.x[e] * dt;
            this.world.pos.y[e] += this.world.vel.y[e] * dt;

            // 打脏
            // “编号为 e 的实体，它的 Position 组件被改过了。”
            this.world.dirty.pos[e] = 1;
        }
    }

}


