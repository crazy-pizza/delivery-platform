const initialState = {
    userName: null,
    userID: null,
    currentShopUserID: null,
}

const reducer = ($$state = initialState, action) => {
  switch (action.type) {
    case "setUserInfo":
      return { ...$$state, ...action.payload }
    default:
      return $$state
  }
}

export default reducer
