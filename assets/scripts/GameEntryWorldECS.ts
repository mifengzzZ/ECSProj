import { _decorator, Component, Node } from 'cc';
import { PositionECSCom } from '../framework/ecs/component/PositionECSCom';
import { VelocityECSCom } from '../framework/ecs/component/VelocityECSCom';
import { TransformDirtyECSCom } from '../framework/ecs/component/TransformDirtyECSCom';
import { ScaleECSCom } from '../framework/ecs/component/ScaleECSCom';
import { RotationECSCom } from '../framework/ecs/component/RotationECSCom';
const { ccclass, property } = _decorator;

// 世界 & Entity 管理

// Entity = number 零开销
export type EntityECS = number;

export class WorldECS {
    
    private nextEntity: EntityECS = 0;
    private alive = new Set<EntityECS>();

    pos: PositionECSCom;
    vel: VelocityECSCom;
    rot: RotationECSCom;
    scale: ScaleECSCom;
    dirty: TransformDirtyECSCom;

    constructor(capacity: number) {
        // 创建连续存储数值的数组
        // x y 分别是Float32Array类型
        // x 或 y 的每个元素值都对应一个Entity实例
        this.pos = new PositionECSCom(capacity);
        this.vel = new VelocityECSCom(capacity);
        this.rot = new RotationECSCom(capacity);
        this.scale = new ScaleECSCom(capacity);
    
        // 脏数据标记
        this.dirty = new TransformDirtyECSCom(capacity);
    }

    createEntity(): EntityECS {
        const e = this.nextEntity++;
        this.alive.add(e);
        return e;
    }

    destoryEntity(e: EntityECS) {
        this.alive.delete(e);
    }

    isAlive(e: EntityECS): boolean {
        return this.alive.has(e);
    }

    getEntities(): Iterable<EntityECS> {
        return this.alive;
    }

}


