const priceCalculationMiddleware = (store) => (next) => (action) => {
  // Perform size validation for setMMWidth and setMMHeight actions
  if (action.type === 'setMMWidth' || action.type === 'setMMHeight') {
    const state = store.getState();
    const mirrorMaterial = state.configGlass.mirrorMaterial;
    const mirrorMaterialGauge = state.configGlass.mirrorMaterialGauge;

    let minSize = 0;
    let maxSize = Number.MAX_SAFE_INTEGER;

    if (mirrorMaterial === 'glass' && mirrorMaterialGauge === 4) {
      minSize = 100;
      maxSize = 2700;
    }

    // Clamp the value to the min and max size
    action.payload = Math.min(Math.max(action.payload, minSize), maxSize);
  }
  // Let the action pass through to the next middleware or reducer
  const result = next(action);

  // Access the current state of the store after the action was processed
  const currentState = store.getState();

  // Depending on your action naming conventions and structure, you might need to adjust the following
  const propertyName = action.type.split('/').pop().replace('set', '');

  // console.log(
  //  `Price being Calculated after ${propertyName} was changed to ${action.payload}`,
  //  ' : maximum size for this confiuration',
  // );

  return result;
};

export default priceCalculationMiddleware;
