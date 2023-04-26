export type Type = 'cures' | 'supplements' | 'vaccines';
export type Order = "asc" | "desc";
export type Unit = "mg" | "ug"

export interface IMedicines {
    name: string;
    type: Type;
    manufactuer: string;
    activeSubstance: string;
}