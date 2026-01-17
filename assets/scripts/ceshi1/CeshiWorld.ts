import { _decorator, Component, Node } from 'cc';
import { EntityECS } from '../GameEntryWorldECS';
const { ccclass, property } = _decorator;

interface Position {
    x: number;
    y: number;
}

interface Velocity {
    vx: number;
    vy: number;
}

@ccclass('CeshiWorld')
export class CeshiWorld extends Component {
    private nextEntity: EntityECS = 0;
    private alive = new Set<EntityECS>();

    posMap = new Map<EntityECS, Position>();
    velMap = new Map<EntityECS, Velocity>();

    constructor() {
        super();
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