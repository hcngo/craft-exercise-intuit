import { POST_NET_WORTH_URL } from '../../utils/consts';
import { filterFloat } from '../../utils/funcs';

const homeReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case 'REPLACE':
      newState = Object.assign({}, state);
      newState.dataStore = action.dataStore;
      break;
    case 'ERROR':
      newState = Object.assign({}, state);
      newState.dataStore.Result.Item1 = false;
      newState.dataStore.Result.Item2 = action.exception.toString();
      break;
    default:
      newState = state;
      break;
  }
  return newState;
};

function dispatch(action) {
  const self = this;
  if (action.type === 'SUBMIT') {
    const layers = action.lineId.split('.');
    const newState = Object.assign({}, this.state);
    let theLine = { Sublines: newState.dataStore.Items };
    layers.forEach((level) => {
      const nLevel = parseInt(level, 10);
      theLine = theLine.Sublines[nLevel - 1];
    });
    const newVal = filterFloat(action.value);
    if (filterFloat(theLine.Amount) === newVal) {
      self.setState(prevState => homeReducer(prevState, { type: 'REPLACE', dataStore: prevState.dataStore }));
      return;
    }

    theLine.Amount = newVal;

    fetch(POST_NET_WORTH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newState.dataStore),
    })
    .then(response => response.json())
    .then((json) => {
      self.setState(prevState => homeReducer(prevState, { type: 'REPLACE', dataStore: json }));
    }).catch((ex) => {
      self.setState(prevState => homeReducer(prevState, { type: 'ERROR', exception: ex }));
    });
  }
}

export default dispatch;

