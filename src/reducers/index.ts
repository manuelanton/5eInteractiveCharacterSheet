import {
  CHANGE_MOD,
  CHANGE_NAME,
  CHANGE_LEVEL,
  CHANGE_CLASS,
  ADD_ATTACK,
  ADD_SAVE,
  REMOVE_ATTACK,
  REMOVE_SAVE,
  CHANGE_BACKGROUND,
  CHANGE_AC,
  CHANGE_RACE
} from "../constants";

export enum classes {
  Artificer,
  Barbarian,
  Bard,
  Cleric,
  Druid,
  Fighter,
  Monk,
  Paladin,
  Ranger,
  Rogue,
  Sorcerer,
  Warlock,
  Wizard
}

export enum damageTypes {
  Acid,
  Bludgeoning,
  Cold,
  Fire,
  Force,
  Lightning,
  Necrotic,
  Piercing,
  Poison,
  Psychic,
  Radiant,
  Slashing,
  Thunder
}

export interface RootState {
  stats: {
    STR: number;
    DEX: number;
    CON: number;
    INT: number;
    WIS: number;
    CHA: number;
  };
  name: string;
  race: string;
  class: classes | "";
  background: string;
  level: number;
  profBonus: number;
  AC: number;
  saves: string[];
  attacks: [
    {
      name: string;
      stat: string;
      damage: {
        diceSides: number;
        diceAmount: number;
        damageType: damageTypes;
      };
    }
  ];
}

export const initialState: RootState = {
  stats: {
    STR: 10,
    DEX: 10,
    CON: 10,
    INT: 10,
    WIS: 10,
    CHA: 10
  },
  name: "",
  race: "",
  class: "",
  background: "",
  level: 1,
  profBonus: 2,
  AC: 10,
  saves: [],
  attacks: [
    {
      name: "Dagger",
      stat: "DEX",
      damage: {
        diceSides: 4,
        diceAmount: 1,
        damageType: damageTypes.Piercing
      }
    }
  ]
};

export function rootReducer(
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case CHANGE_MOD: {
      switch (action.payload.stat) {
        case "STR": {
          return {
            ...state,
            stats: { ...state.stats, STR: action.payload.value }
          };
        }
        case "DEX": {
          return {
            ...state,
            stats: { ...state.stats, DEX: action.payload.value }
          };
        }
        case "CON": {
          return {
            ...state,
            stats: { ...state.stats, CON: action.payload.value }
          };
        }
        case "INT": {
          return {
            ...state,
            stats: { ...state.stats, INT: action.payload.value }
          };
        }
        case "WIS": {
          return {
            ...state,
            stats: { ...state.stats, WIS: action.payload.value }
          };
        }
        case "CHA": {
          return {
            ...state,
            stats: { ...state.stats, CHA: action.payload.value }
          };
        }
      }
    }
    case CHANGE_NAME: {
      return { ...state, name: action.payload };
    }
    case CHANGE_RACE: {
      return { ...state, race: action.payload };
    }
    case CHANGE_LEVEL: {
      return {
        ...state,
        level: action.payload,
        profBonus: 1 + Math.ceil(action.payload / 4)
      };
    }
    case CHANGE_CLASS: {
      return { ...state, class: action.payload };
    }
    case CHANGE_AC: {
      return { ...state, AC: action.payload };
    }
    case ADD_SAVE: {
      return { ...state, saves: [...state.saves, action.payload] };
    }
    case REMOVE_SAVE: {
      return {
        ...state,
        saves: state.saves.filter(save => save !== action.payload)
      };
    }
    case CHANGE_BACKGROUND: {
      return { ...state, background: action.payload };
    }
    case ADD_ATTACK: {
      return { ...state, attacks: [...state.attacks, action.payload] };
    }
    case REMOVE_ATTACK: {
      return {
        ...state,
        attacks: state.attacks.filter(attack => attack.name !== action.payload)
      };
    }
    default:
      return state;
  }
}
