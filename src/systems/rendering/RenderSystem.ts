import { IntrospectiveSystem } from "../system";
import { Renderer } from "../../Renderer";

export class RenderSystem<entitystate=any> extends IntrospectiveSystem<entitystate> {
    renderer: Renderer;

    constructor({ reads}) {
        super({
            reads,
            writes: [],
            deletes: false,
        })
    }
}