
// 实体筛选

import { EntityECS, WorldECS } from "../../scripts/GameEntryWorldECS";

export function QueryECS(
    world: WorldECS,
    hasA: (e: EntityECS) => boolean,
    hasB: (e: EntityECS) => boolean
): EntityECS[] {
    const result: EntityECS[] = [];
    for (const e of world.getEntities()) {
        if (hasA(e) && hasB(e)) {
            result.push(e);
        }
    }
    return result;
}