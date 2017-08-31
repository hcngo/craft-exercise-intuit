import { POST_NET_WORTH_URL } from '../../utils/consts';
import { filterFloat } from '../../utils/funcs';

const deepClone = state => (
  JSON.parse(JSON.stringify(state))
);

const findTheLine = (lineId, state) => {
  const layers = lineId.split('.');
  let theLine = { Sublines: state.dataStore.Items };
  let parent = null;
  layers.forEach((level) => {
    const nLevel = parseInt(level, 10);
    parent = theLine;
    theLine = theLine.Sublines[nLevel - 1];
  });
  return { item: theLine, parent };
};

const reIndex = (topItem) => {
  topItem.Sublines.forEach((eachLine, i) => {
    eachLine.Id = `${topItem.Id}.${i + 1}`;
    reIndex(eachLine);
  });
};

const homeReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case 'REPLACE':
      newState = deepClone(state);
      newState.dataStore = action.dataStore;
      newState.editMode = false;
      break;
    case 'ERROR':
      newState = deepClone(state);
      newState.dataStore.Result.Item1 = false;
      newState.dataStore.Result.Item2 = action.exception.toString();
      break;
    case 'EDIT':
      newState = deepClone(state);
      newState.editMode = true;
      action.component.snapShot = deepClone(state);
      break;
    case 'CANCEL':
      newState = action.component.snapShot;
      action.component.snapShot = null;
      break;
    case 'ADDLINE':
      newState = deepClone(state);
      const { item } = findTheLine(action.lineId, newState);
      const newLine = {
        Id: `${item.Id}.${item.Sublines.length + 1}`,
        AmountOperand: 1,
        Header: 'New Item',
        Footer: '',
        Amount: 0,
        IsAmountCalculated: false,
        AmountPos: 1,
        Sublines: [],
        Message: '',
      };
      item.Sublines.push(newLine);
      break;
    case 'REMOVEITEM': {
      newState = deepClone(state);
      const { item, parent } = findTheLine(action.lineId, newState);
      parent.Sublines.splice(parent.Sublines.indexOf(item), 1);
      reIndex(parent);
      break;
    }
    case 'LOCALSUBMIT': {
      newState = deepClone(state);
      const theLine = findTheLine(action.lineId, newState).item;
      const newVal = filterFloat(action.value);
      if (filterFloat(theLine.Amount) !== newVal) {
        theLine.Amount = newVal;
      }
      break;
    }
    default:
      newState = state;
      break;
  }
  return newState;
};

function dispatch(action) {
  const self = this;
  if (action.type === 'SUBMIT') {
    const newState = deepClone(this.state);
    const theLine = findTheLine(action.lineId, newState).item;
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
  } else if (action.type === 'SAVE') {
    fetch(POST_NET_WORTH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.component.state.dataStore),
    })
    .then(response => response.json())
    .then((json) => {
      self.setState(prevState => homeReducer(prevState, { type: 'REPLACE', dataStore: json }));
    }).catch((ex) => {
      self.setState(prevState => homeReducer(prevState, { type: 'ERROR', exception: ex }));
    });
  } else {
    self.setState(prevState => homeReducer(prevState, action));
  }
}

export default dispatch;

