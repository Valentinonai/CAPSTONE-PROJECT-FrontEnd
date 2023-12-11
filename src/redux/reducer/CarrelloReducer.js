import {
  ADD_BUILD_CART,
  ADD_CART,
  CLEAR_CART,
  MODIFICA_TOT,
  MODIFY_QT,
  MODIFY_QT_BUILD,
  REMOVE_BUILD_CART,
  REMOVE_CART,
} from "../action/CarrelloActions";

const initialState = {
  items: [],
  builds: [],
  totale: 0,
};

const CarrelloReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART: {
      let existingItem;
      if (Array.isArray(state.items) && state.items.length > 0) {
        existingItem = state.items.find((elem) => elem.item.id === action.payload.item.id);
      }
      if (!existingItem) {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      } else {
        return {
          ...state,
          items: state.items.map((elem) => {
            if (elem.item.id === action.payload.item.id) {
              return {
                ...elem,
                quantita:
                  elem.quantita + action.payload.quantita > elem.item.quantità
                    ? elem.item.quantità
                    : elem.quantita + action.payload.quantita,
              };
            } else {
              return elem;
            }
          }),
        };
      }
    }
    case MODIFY_QT:
      return {
        ...state,
        items: state.items.map((elem) => {
          if (elem.item.id === action.payload.item.id) {
            return {
              ...elem,
              quantita: action.payload.quantita,
            };
          } else {
            return elem;
          }
        }),
      };
    case CLEAR_CART:
      return {
        items: [],
        builds: [],
      };
    case REMOVE_CART: {
      return {
        ...state,
        items: state.items.filter((elem) => elem.item.id !== action.payload.id),
      };
    }
    case ADD_BUILD_CART:
      let existingItem;
      if (Array.isArray(state.builds) && state.builds.length > 0) {
        existingItem = state.builds.find((elem) => elem.build.id === action.payload.build.id);
      }
      console.log(existingItem);
      if (!existingItem) {
        return {
          ...state,
          builds: [...state.builds, action.payload],
        };
      } else {
        return {
          ...state,
          builds: state.builds.map((elem) => {
            if (elem.build.id === action.payload.build.id) {
              return {
                ...elem,
                quantita: elem.quantita + action.payload.quantita,
              };
            } else {
              return elem;
            }
          }),
        };
      }
    case MODIFY_QT_BUILD:
      return {
        ...state,
        builds: state.builds.map((elem) => {
          console.log(elem.build.id, action.payload.build.id);
          if (elem.build.id === action.payload.build.id) {
            return {
              ...elem,
              quantita: action.payload.quantita,
            };
          } else {
            return elem;
          }
        }),
      };
    case REMOVE_BUILD_CART:
      return {
        ...state,
        builds: state.builds.filter((elem) => elem.build.id !== action.payload.id),
      };
    case MODIFICA_TOT:
      return {
        ...state,
        totale: action.payload,
      };
    default:
      return state;
  }
};

export default CarrelloReducer;
