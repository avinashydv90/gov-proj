// export const getNameById = (
//     id: number | string,
//     data: { id: number | string; name: string }[] = []
// ): string => {
//     const item = data.find(d => d.id === id);
//     return item?.name ?? "Unknown";
// };
export function getNameById(
    id: string | number | undefined,
    list: { id: string | number; name: string }[] | undefined
): string {
    if (!id || !list) return "-";
    const item = list.find((entry) => entry.id === id);
    return item ? item.name : "-";
}