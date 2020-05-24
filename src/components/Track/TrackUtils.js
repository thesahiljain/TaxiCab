const actionHandlers = {
    
}

export function TrackReducer (state = {region: {}, showDriverFound: true}, action) {
    const handler = actionHandlers[action.type];
    return handler ? handler(state, action) : state;
}