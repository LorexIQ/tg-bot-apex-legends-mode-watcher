export type ApexMapData = {
  start: number;
  end: number;
  readableDate_start: string;
  readableDate_end: string;
  map: string;
  code: string;
  DurationInSecs: number;
  DurationInMinutes: number;
  asset: string;
};

export type ApexCurrentMapData = ApexMapData & {
  remainingSecs: number;
  remainingMins: number;
  remainingTimer: string;
};

export type ApexLTMData = ApexMapData & {
  isActive: boolean;
  eventName: string;
};

export type ApexCurrentLTMData = ApexLTMData & ApexCurrentMapData;

export type ApexMapRotation = {
  battle_royale: {
    current: ApexCurrentMapData;
    next: ApexMapData;
  };
  ranked: {
    current: ApexCurrentMapData;
    next: ApexMapData;
  };
  ltm: {
    current: ApexCurrentLTMData;
    next: ApexLTMData;
  };
};
