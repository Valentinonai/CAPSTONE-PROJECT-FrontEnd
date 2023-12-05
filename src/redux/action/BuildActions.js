export const ADD_SCHEDA_MADRE = "ADD_SCHEDA_MADRE";
export const ADD_CPU = "ADD_CPU";
export const ADD_RAM = "ADD_RAM";
export const ADD_CASE = "ADD_CASE";
export const ADD_SCHEDA_GRAFICA = "ADD_SCHEDA_GRAFICA";
export const ADD_ALIMENTATORE = "ADD_ALIMENTATORE";
export const ADD_HARD_DISK = "ADD_HARD_DISK";
export const ADD_VENTOLE = "ADD_VENTOLE";

export const CLEAR_ALL = "CLEAR_ALL";

export const CLEAR_SCHEDA_MADRE = "CLEAR_SCHEDA_MADRE";
export const CLEAR_CPU = "CLEAR_CPU";
export const CLEAR_RAM = "CLEAR_RAM";
export const CLEAR_CASE = "CLEAR_CASE";
export const CLEAR_SCHEDA_GRAFICA = "CLEAR_SCHEDA_GRAFICA";
export const CLEAR_ALIMENTATORE = "CLEAR_ALIMENTATORE";
export const CLEAR_HARD_DISK = "CLEAR_HARD_DISK";
export const CLEAR_VENTOLE = "CLEAR_VENTOLE";

export const addSchedaMadre = (data) => ({ type: ADD_SCHEDA_MADRE, payload: data });
export const addCpu = (data) => ({ type: ADD_CPU, payload: data });
export const addRam = (data) => ({ type: ADD_RAM, payload: data });
export const addCase = (data) => ({ type: ADD_CASE, payload: data });
export const addSchedaGrafica = (data) => ({ type: ADD_SCHEDA_GRAFICA, payload: data });
export const addAlimentatore = (data) => ({ type: ADD_ALIMENTATORE, payload: data });
export const addHardDisk = (data) => ({ type: ADD_HARD_DISK, payload: data });
export const addVentole = (data) => ({ type: ADD_VENTOLE, payload: data });

export const clearAll = () => ({ type: CLEAR_ALL, payload: null });

export const clearSchedaMadre = () => ({ type: ADD_SCHEDA_MADRE, payload: null });
export const clearCpu = () => ({ type: CLEAR_CPU, payload: null });
export const clearRam = () => ({ type: CLEAR_RAM, payload: null });
export const clearCase = () => ({ type: CLEAR_CASE, payload: null });
export const clearSchedaGrafica = () => ({ type: CLEAR_SCHEDA_GRAFICA, payload: null });
export const clearAlimentatore = () => ({ type: CLEAR_ALIMENTATORE, payload: null });
export const clearHardDisk = () => ({ type: CLEAR_HARD_DISK, payload: null });
export const clearVentole = () => ({ type: CLEAR_VENTOLE, payload: null });
