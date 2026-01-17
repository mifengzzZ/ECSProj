import { _decorator, Component, Node } from 'cc';
import { SystemECS } from '../../framework/ecs/SystemECS';
import { CeshiWorld } from './CeshiWorld';
const { ccclass, property } = _decorator;

export class CeshiMoveSystem extends SystemECS {

    constructor(
        private world: CeshiWorld
    ) {
        super();
    }

    update(dt: number) {
        for (const [e, pos] of this.world.posMap) {
            const vel = this.world.velMap.get(e);
            pos.x += vel.vx * dt;
            pos.y += vel.vy * dt;
        }
    }
}


