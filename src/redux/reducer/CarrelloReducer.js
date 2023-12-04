import { ADD_CART, CLEAR_CART, MODIFY_QT, REMOVE_CART } from "../action/CarrelloActions";

const initialState = {
  items: [],
  builds: [],
};

const CarrelloReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART: {
      let existingItem;
      console.log(state.items);
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
                quantita: elem.quantita + action.payload.quantita,
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
    default:
      return state;
  }
};

export default CarrelloReducer;
