import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { MonECSView } from '../MonECSView';
import { CeshiMoveSystem } from './CeshiMoveSystem';
import { CeshiViewSyncSystem } from './CeshiViewSyncSystem';
import { CeshiWorld } from './CeshiWorld';
const { ccclass, property } = _decorator;


@ccclass('Ceshi')
export class Ceshi extends Component {

    @property(Prefab)
    prefab!: Prefab;

    // 创建一个世界
    private world = new CeshiWorld();

    ceshiMoveSystem = new CeshiMoveSystem(this.world);

    private ceshiViewSyncSystem = new CeshiViewSyncSystem(this.world);

    start() {
        // 创建x个实体
        for (let i = 0; i < 1000; i++) {
            this.spawn();
        }
    }

    spawn() {
        const e = this.world.createEntity();

        this.world.posMap.set(e, { x: Math.random() * 600 - 300, y: Math.random() * 400 - 200 });
        this.world.velMap.set(e, { vx: Math.random() * 100 - 50, vy: Math.random() * 100 - 50 });

        const node = instantiate(this.prefab);
        node.setParent(this.node);

        this.ceshiViewSyncSystem.views.set(e, new MonECSView(node));
    }

    update(dt: number) {
        this.ceshiMoveSystem.update(dt);
        this.ceshiViewSyncSystem.update(dt);
    }
}


