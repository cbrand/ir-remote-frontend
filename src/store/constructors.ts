import { v4 as uuid4 } from "uuid"
import { DescriptiveScene, NECCommand, RemoteCommand, RemoteScene, RemoteWait } from "./interface";

export function newCommand(): RemoteCommand {
    return {
        id: uuid4(),
        name: "NEC",
        type: "RemoteCommand",
        command: {
            command: 0,
            deviceId: 0
        } as NECCommand
    }
}

export function newWait(): RemoteWait {
    return {
        id: uuid4(),
        milliseconds: 0,
        seconds: 0,
        type: "RemoteWait"
    }
}

export function newDescriptiveScene(): DescriptiveScene {
    return {
        id: uuid4(),
        description: "",
        function: null,
        name: "",
        sortKey: 0,
        scene: {
            type: "RemoteScene",
            instructions: []
        } as RemoteScene
    }
}
