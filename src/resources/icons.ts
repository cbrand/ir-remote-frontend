

interface Icon {
    id: string;
    name: string;
    icon: string | undefined;
}


export const icons: Array<Icon> = [
    {"name": "None", "id": "none", "icon": undefined},
    {"name": "Television", "id": "television", "icon": "mdi-television"},
    {"name": "Disk", "id": "disk", "icon": "mdi-album"},
    {"name": "Record Player", "id": "record", "icon": "mdi-record-player"},
    {"name": "Chromecast", "id": "chromecast", "icon": "mdi-cast"},
    {"name": "Television Box", "id": "tv-box", "icon": "mdi-television-box"},
    {"name": "Set Top Box", "id": "set-top-box", "icon": "mdi-set-top-box"}
];

export function getIconById(iconId: string): Icon | undefined {
    return icons.find((icon) => icon.id == iconId);
}

export function getIconImageById(iconId: string): string | undefined {
    const icon = getIconById(iconId);
    return icon && icon.icon || undefined;
}


export default {
    getIconById,
    getIconImageById
}
