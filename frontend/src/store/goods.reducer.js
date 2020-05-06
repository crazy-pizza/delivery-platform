const initialState = {
    goodsCategory: null,
}

const reducer = ($$state = initialState, action) => {
  switch (action.type) {
    case "setGoodsCategory":
      return { ...$$state, goodsCategory: action.payload }
    default:
      return $$state
  }
}

export default reducer
