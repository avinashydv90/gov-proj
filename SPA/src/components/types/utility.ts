import { Division } from "./division";
import { ICasteType } from "./ICasteType";
import { IStandard } from "./standard";

export function getNameById(
    id: string | number | undefined,
    list: { id: string | number; name: string }[] | undefined
): string {
    if (!id || !list) return "-";
    const item = list.find((entry) => entry.id === id);
    return item ? item.name : "-";
}



export function getCasteTypeNameById(
    casteTypeId: string,
    casteTypeList: ICasteType[] | undefined
): string {
    if (!casteTypeId || !casteTypeList) return "-";
    const casteType = casteTypeList.find((entry) => entry.id === casteTypeId);
    return casteType ? casteType.casteName : "-";
}



export function getStandardNameById(
    id: string,
    list: IStandard[] | undefined
): string {
    if (!id || !list) return "-";
    const standard = list.find((entry) => entry.id === id);
    return standard ? standard.name : "-";
}
export function getDivisionNameById(
    id: string,
    list: Division[] | undefined
): string {
    if (!id || !list) return "-";
    const standard = list.find((entry) => entry.id === id);
    return standard ? standard.name : "-";
}


