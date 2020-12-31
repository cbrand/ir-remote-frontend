/* eslint-disable @typescript-eslint/no-use-before-define */

import { RemoteCommand, RemoteStatus, Theater, DescriptiveScene, Function, RemoteScene, Instruction, ISCPCommand, RemoteRepeat, NECCommand, RC6Command, RemoteWait, Remote, ISCPStatus } from "./interface";
import * as definition from '../protocol/definition_pb';
import { v4 as uuid4 } from 'uuid'


export function convertDateFromString(dateString: string | null): Date | null {
    if(!dateString) {
        return null;
    }
    
    let dateItem: Date | null = null;
    const parsedDate = new Date(dateString);
    if(!isNaN(parsedDate.getDate())) {
        dateItem = parsedDate;
    }
    return dateItem;
}


export function convertRemote(remote: definition.Remote): Remote {
    return {
        id: remote.getId(),
        name: remote.getName()
    } as Remote
}

export function convertNECComand(command: definition.NECCommand): NECCommand {
    return {
        deviceId: command.getDeviceid(),
        command: command.getCommand()
    } as NECCommand;
}

export function convertRC6Command(command: definition.RC6Command): RC6Command {
    return {
        mode: command.getMode(),
        control: command.getControl(),
        information: command.getInformation()
    } as RC6Command;
}

export function convertIscpCommand(command: definition.ISCPCommand): ISCPCommand {
    return {
         identifier: command.getIdentifier(),
         command: command.getCommand(),
         argument: command.getArgument()
    } as ISCPCommand;
}

export function convertCommand(command: definition.Command): RemoteCommand {
    const subNECCommand = command.getCommand();
    const subRC6Command = command.getRc6Command();
    const subISCPCommand = command.getIscpCommand();
    if(!subNECCommand && !subRC6Command && !subISCPCommand) {
        throw new Error("A command must have a NECCommand, a RC6Command, or an ISCPCommand");
    }
    
    const remoteCommand = {
        type: "RemoteCommand",
        id: uuid4(),
        name: command.getName(),
        command: null,
        rc6Command: null,
        iscpCommand: null
    } as RemoteCommand;

    if(subNECCommand) {
        remoteCommand.command = convertNECComand(subNECCommand);
    }
    if(subRC6Command) {
        remoteCommand.rc6Command = convertRC6Command(subRC6Command);
    }
    if(subISCPCommand) {
        remoteCommand.iscpCommand = convertIscpCommand(subISCPCommand);
    }
    return remoteCommand;
}

export function convertOptionalCommand(command: definition.Command | undefined): RemoteCommand | null {
    if(!command) {
        return null;
    }

    return convertCommand(command);
}

export function convertRemoteStatus(status: definition.RemoteStatus): RemoteStatus {
    return {
        remoteId: status.getRemoteid(),
        lastCommand: convertOptionalCommand(status.getLastcommand()),
        lifesign: convertDateFromString(status.getLifesign()),
        online: status.getOnline()
    } as RemoteStatus
}

export function convertInstruction(instruction: definition.Instruction): Instruction {
    const scene = instruction.getScene();
    const repeat = instruction.getRepeat();
    const command = instruction.getCommand();
    const wait = instruction.getWait();
    if(scene) {
        return convertScene(scene);
    } else if(repeat) {
        return convertRepeat(repeat);
    } else if(command) {
        return convertCommand(command);
    } else if(wait) {
        return convertWait(wait);
    } else {
        throw new Error("Instruction must have scene, repeat, command or wait set");
    }
}

export function convertScene(scene: definition.Scene): RemoteScene {
    return {
        type: "RemoteScene",
        instructions: scene.getInstructionsList().map(convertInstruction)
    } as RemoteScene
}

export function convertOptionalScene(scene: definition.Scene | undefined): RemoteScene | null {
    if(!scene) {
        return null;
    }
    return convertScene(scene);
}

export function convertDescriptiveScene(descriptiveScene: definition.DescriptiveScene): DescriptiveScene {
    return {
        id: descriptiveScene.getId(),
        name: descriptiveScene.getName(),
        sortKey: descriptiveScene.getSortkey(),
        scene: convertOptionalScene(descriptiveScene.getScene()),
        function: descriptiveScene.getFunction() as Function,
    } as DescriptiveScene
}

export function convertTheater(theater: definition.Theater): Theater {
    const scenes = theater.getScenesList().map(convertDescriptiveScene);
    return {
        id: theater.getId(),
        name: theater.getName(),
        sortKey: theater.getSortkey(),
        icon: theater.getIcon(),
        scenes: scenes,
    } as Theater
}

export function convertRepeat(repeat: definition.Repeat): RemoteRepeat {
    const instruction = repeat.getInstruction();
    if(!instruction) {
        throw new Error("Instruction must be provided in repeat");
    }

    return {
        type: "RemoteRepeat",
        times: repeat.getTimes(),
        instruction: convertInstruction(instruction)
    } as RemoteRepeat;
}


export function convertWait(wait: definition.Wait): RemoteWait {
    return {
        type: "RemoteWait",
        id: uuid4(),
        milliseconds: wait.getMilliseconds(),
        seconds: wait.getSeconds()
    } as RemoteWait
}


export function convertIscpStatus(iscpStatus: definition.IscpStatus): ISCPStatus {
    return {
        identifier: iscpStatus.getIdentifier(),
        areaCode: iscpStatus.getAreacode(),
        modelName: iscpStatus.getModelname(),
        deviceCategory: iscpStatus.getDevicecategory(),
        iscpPort: iscpStatus.getIscpport()
    } as ISCPStatus;
}

/* eslint-enable @typescript-eslint/no-use-before-define */
