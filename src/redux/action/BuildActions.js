export const ADD_SCHEDA_MADRE = "ADD_SCHEDA_MADRE";
export const ADD_CPU = "ADD_CPU";
export const ADD_RAM = "ADD_RAM";
export const ADD_CASE = "ADD_CASE";
export const ADD_SCHEDA_GRAFICA = "ADD_SCHEDA_GRAFICA";
export const ADD_ALIMENTATORE = "ADD_ALIMENTATORE";
export const ADD_HARD_DISK = "ADD_HARD_DISK";
export const ADD_VENTOLE = "ADD_VENTOLE";

export const addSchedaMadre = (data) => ({ type: ADD_SCHEDA_MADRE, payload: data });
export const addCpu = (data) => ({ type: ADD_CPU, payload: data });
export const addRam = (data) => ({ type: ADD_RAM, payload: data });
export const addCase = (data) => ({ type: ADD_CASE, payload: data });
export const addSchedaGrafica = (data) => ({ type: ADD_SCHEDA_GRAFICA, payload: data });
export const addAlimentatore = (data) => ({ type: ADD_ALIMENTATORE, payload: data });
export const addHardDisk = (data) => ({ type: ADD_HARD_DISK, payload: data });
export const addVentole = (data) => ({ type: ADD_VENTOLE, payload: data });
