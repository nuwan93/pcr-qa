export type conditionType = "YES" | "NO" | "NA" | undefined;

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
  items?: Item[];
}

export interface Item {
  id: string;
  title: string;
  type: string;
  comment: string;
  condition: {
    isClean?: conditionType;
    isUndamaged?: conditionType;
    isWorking?: conditionType;
  };
}
