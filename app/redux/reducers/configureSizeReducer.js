const initialState = {
  // ... (other state properties)
  mirrorMaterialHeight: 0,
  // ... (other state properties)
};

const configGlassReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'setMMHeight':
      return {
        ...state,
        mirrorMaterialHeight: action.payload,
      };
    // ... (other cases)
    default:
      return state;
  }
};

export default configGlassReducer;
