export default (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_SUGGESTIONS_PENDING':
      console.log('pending')
      return {
        isPending: true
      };

    case 'FETCH_SUGGESTIONS_FULFILLED':
      console.log('resulted', action.payload)
      return {
        body: action.payload.d,
        isPending: false
      };

    default:
      return state;
  };
}
