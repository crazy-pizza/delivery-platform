const initialState = {
    orgs: null,
}

const reducer = ($$state = initialState, action) => {
  switch (action.type) {
    case "setOrgs":
      return { ...$$state, orgs: action.payload }
    default:
      return $$state
  }
}

export default reducer
