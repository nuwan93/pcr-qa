export type conditionType = "YES" | "NO" | "NA" | undefined;
export type itemType = "FIXTURE" | "FURNITURE";

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
  id: string;
  title: string;
  altTitle?: string;
  comment?: string;
  condition?: {
    isClean?: conditionType;
    isUndamaged?: conditionType;
    isWorking?: conditionType;
  };
  items?: Item[];
}

export interface Item {
  id: string;
  title: string;
  type: itemType;
  comment: string;
  condition: {
    isClean?: conditionType;
    isUndamaged?: conditionType;
    isWorking?: conditionType;
  };
}
