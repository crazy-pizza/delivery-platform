const initialState = {
    userName: null,
}

const reducer = ($$state = initialState, action) => {
  switch (action.type) {
    case "setUserName":
      return { ...$$state, userName: action.payload }
    default:
      return $$state
  }
}

export default reducer
