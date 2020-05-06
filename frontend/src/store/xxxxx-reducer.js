const initialState = {
    accountList: [],
}

const reducer = ($$state = initialState, action) => {
  switch (action.type) {
    case "setAccount":
      return { ...$$state, accountList: action.payload }
    default:
      return $$state
  }
}

export default reducer
