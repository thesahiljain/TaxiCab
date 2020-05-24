const actionHandlers = {
    
}

export function HomeReducer (state = {region: {}, inputData: {}, resultTypes: {}, selectedAddress: {}}, action) {
    const handler = actionHandlers[action.type];
    return handler ? handler(state, action) : state;
}