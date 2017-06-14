export default function (state = [], action) {
  switch (action.type) {
    case 'FETCH_POST_SUCCESS':
      return [...state, action.payload];
    case 'FETCH_POST_ERROR':
      console.log('Error fetching post');
      return state;
    default: return state;
  }
}
