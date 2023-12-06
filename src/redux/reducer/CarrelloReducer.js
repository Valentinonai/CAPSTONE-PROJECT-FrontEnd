import {
  ADD_BUILD_CART,
  ADD_CART,
  CLEAR_CART,
  MODIFICA_TOT,
  MODIFY_QT,
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
      return {
        ...state,
        builds: [...state.builds, action.payload],
      };
    case REMOVE_BUILD_CART: {
      const indexToRemove = state.builds.findIndex((elem) => elem.id === action.payload.id);
      if (indexToRemove !== -1) {
        return {
          ...state,
          builds: [...state.builds.slice(0, indexToRemove), ...state.builds.slice(indexToRemove + 1)],
        };
      } else return state;
    }
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
