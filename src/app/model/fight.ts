export interface Fight {
  id?: number;
  eventName: string;
  weightClass: string;
  numberRounds: number;
  titleBout: boolean;
  generatePBP: boolean;
  happened: boolean;
  fighter1: Fighter | null;
  fighter2: Fighter | null;
  pbp?: any[];
}

export interface Fighter {
  id?: number;
  firstName: string;
  lastName: string;
  nickname: string;
  name: string;
  age: number;
  win: number;
  loss: number;
  draw: number;
  weightClass: string;
  punching: number;
  kicking: number;
  clinchStriking: number;
  clinchGrappling: number;
  takedowns: number;
  gnp: number;
  submission: number;
  groundGame: number;
  dodging: number;
  subDefense: number;
  takedownsDef: number;
  aggressiveness: number;
  control: number;
  motivation: number;
  strength: number;
  agility: number;
  conditioning: number;
  koResistance: number;
  toughness: number;
  overall: number;
}

export interface Strats {
  id?: number;
  stratPunching: number;
  stratKicking: number;
  stratClinching: number;
  stratTakedowns: number;
  stratDirtyBoxing: number;
  stratThaiClinch: number;
  stratClinchTakedowns: number;
  stratAvoidClinch: number;
  stratGNP: number;
  stratSub: number;
  stratPositioning: number;
  stratLNP: number;
  stratStandUp: number;
  fancyPunches: number;
  fightingStyle: number;
  tacticalStyle: number;
  fancyKicks: number;
  fancySubmissions: number;
  dirtyFighting: number;
}
