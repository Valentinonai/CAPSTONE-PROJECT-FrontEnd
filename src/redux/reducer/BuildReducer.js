import {
  ADD_ALIMENTATORE,
  ADD_CASE,
  ADD_CPU,
  ADD_HARD_DISK,
  ADD_RAM,
  ADD_SCHEDA_GRAFICA,
  ADD_SCHEDA_MADRE,
  ADD_VENTOLE,
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
    default:
      return state;
  }
};

export default BuildReducer;
