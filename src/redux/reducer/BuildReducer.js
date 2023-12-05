import {
  ADD_ALIMENTATORE,
  ADD_CASE,
  ADD_CPU,
  ADD_HARD_DISK,
  ADD_RAM,
  ADD_SCHEDA_GRAFICA,
  ADD_SCHEDA_MADRE,
  ADD_VENTOLE,
  CLEAR_ALIMENTATORE,
  CLEAR_ALL,
  CLEAR_CASE,
  CLEAR_CPU,
  CLEAR_HARD_DISK,
  CLEAR_RAM,
  CLEAR_SCHEDA_GRAFICA,
  CLEAR_SCHEDA_MADRE,
  CLEAR_VENTOLE,
} from "../action/BuildActions";

const initialState = {
  scheda_madre: null,
  cpu: null,
  ram: null,
  case: null,
  scheda_grafica: null,
  alimentatore: null,
  hard_disk: null,
  ventole: null,
};

const BuildReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SCHEDA_MADRE:
      return {
        ...state,
        scheda_madre: action.payload,
      };
    case ADD_CPU:
      return {
        ...state,
        cpu: action.payload,
      };
    case ADD_RAM:
      return {
        ...state,
        ram: action.payload,
      };
    case ADD_CASE:
      return {
        ...state,
        case: action.payload,
      };
    case ADD_SCHEDA_GRAFICA:
      return {
        ...state,
        scheda_grafica: action.payload,
      };
    case ADD_ALIMENTATORE:
      return {
        ...state,
        alimentatore: action.payload,
      };
    case ADD_HARD_DISK:
      return {
        ...state,
        hard_disk: action.payload,
      };
    case ADD_VENTOLE:
      return {
        ...state,
        ventole: action.payload,
      };
    case CLEAR_ALL:
      return {
        ...state,
        scheda_madre: null,
        cpu: null,
        ram: null,
        case: null,
        scheda_grafica: null,
        alimentatore: null,
        hard_disk: null,
        ventole: null,
      };
    case CLEAR_SCHEDA_MADRE:
      return {
        ...state,
        scheda_madre: null,
      };
    case CLEAR_CPU:
      return {
        ...state,
        cpu: null,
      };
    case CLEAR_RAM:
      return {
        ...state,
        ram: null,
      };
    case CLEAR_CASE:
      return {
        ...state,
        case: null,
      };
    case CLEAR_SCHEDA_GRAFICA:
      return {
        ...state,
        scheda_grafica: null,
      };
    case CLEAR_ALIMENTATORE:
      return {
        ...state,
        alimentatore: null,
      };
    case CLEAR_HARD_DISK:
      return {
        ...state,
        hard_disk: null,
      };
    case CLEAR_VENTOLE:
      return {
        ...state,
        ventole: null,
      };
    default:
      return state;
  }
};

export default BuildReducer;
