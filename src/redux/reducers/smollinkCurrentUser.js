const smollinkCurrentUserReducer = (state = null, { type, payload }) => {
  switch (type) {
    case 'ADD_NEW_USER':
      return payload;
    default:
      return state;
  }
};

export default smollinkCurrentUserReducer;
