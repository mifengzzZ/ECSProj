import { WorldECS } from "./GameEntryWorldECS";

export class MonRotationECSSys {
    
    constructor(
        private world: WorldECS
    ) {
        
    }

    update(dt: number) {
        for (const e of this.world.getEntities()) {
            let angle = Math.atan2(this.world.vel.y[e], this.world.vel.x[e]);
            
            this.world.rot.rotation[e] = angle;

            this.world.dirty.rot[e] = 1;
        }
    }

}


