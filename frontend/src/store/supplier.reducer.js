const initialState = {
    supplierCategory: null,
}

const reducer = ($$state = initialState, action) => {
  switch (action.type) {
    case "setSupplierCategory":
      return { ...$$state, supplierCategory: action.payload }
    default:
      return $$state
  }
}

export default reducer
