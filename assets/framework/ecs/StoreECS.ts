
// 普通对象组件（低频）
// 用于：状态、配置、非高频逻辑

import { EntityECS } from "../../scripts/GameEntryWorldECS";


export class StoreECS<T> {
    private data = new Map<EntityECS, T>();

    set(e: EntityECS, value: T) {
        this.data.set(e, value);
    }

    get(e: EntityECS): T | undefined {
        return this.data.get(e);
    }

    has(e: EntityECS): boolean {
        return this.data.has(e);
    }

    remove(e: EntityECS) {
        this.data.delete(e);
    }

    entries() {
        return this.data.entries();
    }

}


