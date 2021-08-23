export type conditionType = "YES" | "NO" | "NA";

export interface Report {
  fileName: string | null;
  selectedRoom: number;
  entry: Entry;
}

export interface Entry {
  importMode: string;
  type: string;
  inspectedAt: number;
  rooms?: Room[];
}

export interface Room {
  title: string;
  altTitle?: string;
  comment?: string;
  items?: Item[];
}

export interface Item {
  title: string;
  type: string;
  comment: string;
  condition: {
    isClean: conditionType;
    isUndamaged: conditionType;
    isWorking: conditionType;
  };
}
