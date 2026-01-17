import { _decorator, Component, math, Node } from 'cc';
import { WorldECS } from './GameEntryWorldECS';
import { MonMoveECSSys } from './MonMoveECSSys';
const { ccclass, property } = _decorator;

@ccclass('Entry1')
export class Entry1 extends Component {

    private world = new WorldECS(1000);

    private moveSystem = new MonMoveECSSys(this.world);


    start() {
        for (let i = 0; i < 1000; i++) {
            const e = this.world.createEntity();
            this.world.pos.set(e, Math.random(), Math.random());
            this.world.vel.x[e] = Math.random();
            this.world.vel.y[e] = Math.random();
        }
    }

    update(dt: number) {
        this.moveSystem.update(dt);
    }
}


