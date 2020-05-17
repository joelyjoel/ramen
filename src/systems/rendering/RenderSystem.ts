import { IntrospectiveSystem } from "../system";
import { Renderer } from "../../Renderer";

export class RenderSystem<entitystate> extends IntrospectiveSystem<entitystate> {
    renderer: Renderer;

    constructor({ reads}) {
        super({
            reads,
            writes: [],
            deletes: false,
        })
    }
}