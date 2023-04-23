export type Type = 'cures' | 'supplements' | 'vaccines';

export interface IMedicines {
    name: string;
    type: Type;
    manufacturer: string;
    activeSubsrtance: string;
}