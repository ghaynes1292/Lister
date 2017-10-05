export default (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_SUGGESTIONS_PENDING':
      return {
        isPending: true
      };

    case 'FETCH_SUGGESTIONS_FULFILLED':
      return {
        body: action.payload.d,
        isPending: false
      };

    default:
      return state;
  };
}
