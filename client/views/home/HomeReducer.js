import {POST_NET_WORTH_URL} from '../../utils/consts';

const homeReducer = (state, action) => {
  switch (action.type) {
    case 'REPLACE':
      var newState = Object.assign({}, state);
      newState.propertylines = action.lines;
      return newState;
    default:
      return state;
  }
}

function dispatch(action){
  var self = this;
  if (action.type == 'SUBMIT'){
    var layers = action.lineId.split(".");
    var newState = Object.assign({}, this.state);
    var theLine = { Sublines: newState.propertylines };
    layers.forEach(function(level) {
      var nLevel = parseInt(level);
      theLine = theLine.Sublines[nLevel - 1];
    });
    theLine.Amount = parseInt(action.value);
    
    fetch(POST_NET_WORTH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newState.propertylines)
    })
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log('parsed json', json)
      self.setState(prevState => homeReducer(prevState, {type: 'REPLACE', lines: json}));
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    });
    
    
  }
}

export {dispatch};

