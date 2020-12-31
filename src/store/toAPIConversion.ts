/* eslint-disable @typescript-eslint/no-use-before-define */

import {Theater, DescriptiveScene, RemoteScene, RemoteCommand, Instruction, NECCommand, RemoteRepeat, RemoteWait, RC6Command, ISCPCommand} from "./interface";
import * as definition from '../protocol/definition_pb';

export function toAPITheater(theater: Theater): definition.Theater {
    const apiTheater = new definition.Theater();
    apiTheater.setId(theater.id);
    apiTheater.setName(theater.name);
    apiTheater.setSortkey(theater.sortKey);
    apiTheater.setScenesList(theater.scenes.map(toAPIDescriptiveScene));
    apiTheater.setIcon(theater.icon || "");
    return apiTheater;
}

export function toAPIDescriptiveScene(descriptiveScene: DescriptiveScene): definition.DescriptiveScene {
    const apiScene = new definition.DescriptiveScene();
    apiScene.setId(descriptiveScene.id);
    apiScene.setName(descriptiveScene.name);
    apiScene.setDescription(descriptiveScene.description);
    apiScene.setSortkey(descriptiveScene.sortKey);
    apiScene.setFunction(descriptiveScene.function as definition.Function);
    apiScene.setScene(toAPIScene(descriptiveScene.scene));
    return apiScene;
}


export function toAPIScene(scene: RemoteScene): definition.Scene {
    const apiScene = new definition.Scene();
    apiScene.setInstructionsList(scene.instructions.map(toAPIInstruction));
    return apiScene;
}

export function toAPIInstruction(instruction: Instruction): definition.Instruction {
    const apiInstruction = new definition.Instruction();
    if(instruction.type == "RemoteCommand") {
        apiInstruction.setCommand(toAPICommand(instruction));
    } else if(instruction.type == "RemoteRepeat") {
        apiInstruction.setRepeat(toAPIRepeat(instruction));
    } else if(instruction.type == "RemoteScene") {
        apiInstruction.setScene(toAPIScene(instruction));
    } else if(instruction.type == "RemoteWait") {
        apiInstruction.setWait(toAPIWait(instruction));
    } else {
        throw new Error("Could not convert to instruction");
    }

    return apiInstruction;
}


export function toAPICommand(command: RemoteCommand): definition.Command {
    const apiCommand = new definition.Command();
    apiCommand.setName(command.name);
    if(command.command && command.name == "NEC") {
        apiCommand.setCommand(toAPINECCommand(command.command));
    }
    if(command.rc6Command && command.name == "RC6") {
        apiCommand.setRc6Command(toAPIRC6Command(command.rc6Command));
    }
    if(command.iscpCommand && command.name == "ISCP") {
        apiCommand.setIscpCommand(toAPIISCPCommand(command.iscpCommand));
    }
    return apiCommand;
}


export function toAPINECCommand(necCommand: NECCommand): definition.NECCommand {
    const apiNecCommand = new definition.NECCommand();
    apiNecCommand.setCommand(necCommand.command);
    apiNecCommand.setDeviceid(necCommand.deviceId);
    return apiNecCommand;
}

export function toAPIRC6Command(rc6Command: RC6Command): definition.RC6Command {
    const apiRC6Command = new definition.RC6Command();
    apiRC6Command.setMode(rc6Command.mode);
    apiRC6Command.setControl(rc6Command.control);
    apiRC6Command.setInformation(rc6Command.information);
    return apiRC6Command;
}

export function toAPIISCPCommand(iscpCommand: ISCPCommand): definition.ISCPCommand {
    const apiIscpCommand = new definition.ISCPCommand();
    apiIscpCommand.setIdentifier(iscpCommand.identifier);
    apiIscpCommand.setCommand(iscpCommand.command);
    apiIscpCommand.setArgument(iscpCommand.argument);
    return apiIscpCommand;
}

export function toAPIRepeat(repeat: RemoteRepeat): definition.Repeat {
    const apiRepeat = new definition.Repeat();
    apiRepeat.setInstruction(toAPIInstruction(repeat.instruction));
    apiRepeat.setTimes(repeat.times);
    return apiRepeat;
}

export function toAPIWait(wait: RemoteWait): definition.Wait {
    const apiWait = new definition.Wait();
    apiWait.setMilliseconds(wait.milliseconds);
    apiWait.setSeconds(wait.seconds);
    return apiWait;
}

/* eslint-enable @typescript-eslint/no-use-before-define */
