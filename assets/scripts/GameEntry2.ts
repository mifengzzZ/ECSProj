import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { GameEntryViewSyncSys } from './GameEntryViewSyncSys';
import { EntityECS, WorldECS } from './GameEntryWorldECS';
import { MonMoveECSSys } from './MonMoveECSSys';
import { MonECSView } from './MonECSView';
import { MonRotationECSSys } from './MonRotationECSSys';
const { ccclass, property } = _decorator;

// 八、Entity 销毁时如何同步 Node？
    // 销毁流程（必须成对）
    // 👉 永远先清 View，再销毁 Entity

// 九、为什么这个设计是“正确的”？
    // ✔ ECS 是唯一数据源
    // ✔ Node 没有“偷偷改状态”的机会
    // ✔ 表现层和逻辑层彻底解耦
    // ✔ ECS 可脱离 Cocos 单元测试
    // ✔ UI / 渲染 / 动画自由发挥

// 十、进阶（下一步你一定会想做的）
    // 等你把这个跑起来，你一定会想要这些：

    // 1️⃣ 插值 / 平滑（解决帧抖动）
    // 2️⃣ 只同步脏数据（Dirty Flag）
    // 3️⃣ 旋转 / 缩放 / 朝向
    // 4️⃣ 动画状态同步（ECS → Animator）

// 最重要的一句话（帮你避免大坑）
    // Node 永远不要反向写 ECS
    // 真要交互：
    // 👉 用 Event / Command / InputSystem

// 如果你愿意，下一步我可以直接给你写：
//     🔹 带插值的 ViewSyncSystem
//     🔹 只同步 Position 变更的优化版
//     🔹 动画 / Sprite 状态同步
//     🔹 输入系统（Node → ECS 的“唯一合法入口”）

@ccclass('GameEntry2')
export class GameEntry2 extends Component {

    @property(Prefab)
    prefab!: Prefab;

    // 创建一个世界
    private world = new WorldECS(1000);

    // 系统负责刷新Component数据
    // 每个系统分别对应着不同的Component
    private monMoveECSSys = new MonMoveECSSys(this.world);
    private monRotationECSSys = new MonRotationECSSys(this.world);

    // 该系统负责将ECS数据同步到Node
    private gameEntryViewSycnSys = new GameEntryViewSyncSys(this.world);

    start() {
        for (let i = 0; i < 1000; i++) {
            this.spawn();
        }
    }

    spawn() {
        const e = this.world.createEntity();

        // ECS 数据
        this.world.pos.x[e] = Math.random() * 600 - 300;
        this.world.pos.y[e] = Math.random() * 400 - 200;
        this.world.vel.x[e] = Math.random() * 100 - 50;
        this.world.vel.y[e] = Math.random() * 100 - 50;

        // Node
        const node = instantiate(this.prefab);
        node.setParent(this.node);

        // ViewStore保存着所有的绑定（Node）
        // key：Entity 实体ID
        this.gameEntryViewSycnSys.views.set(e, new MonECSView(node));
    }

    update(dt: number) {
        // 改数据
        this.monMoveECSSys.update(dt);
        this.monRotationECSSys.update(dt);
        // 刷表现
        this.gameEntryViewSycnSys.update();
    }

    /**
     * 销毁某个Entity实体
     * @param e 
     */
    destroyEntity(e: EntityECS) {
        const view = this.gameEntryViewSycnSys.views.get(e);
        if (view) {
            view.node.destroy();
            this.gameEntryViewSycnSys.views.remove(e);
        }
        this.world.destoryEntity(e);
    }
}