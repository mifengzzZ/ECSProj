
import { Animation, Node } from "cc";

// 👉 这是 ECS 世界里“唯一允许持有 Node 的地方”

export class MonECSView {
    
    node: Node;
    anim: Animation;

    constructor(node: Node) {
        this.node = node;
        this.anim = node.getComponent(Animation);
    }

}