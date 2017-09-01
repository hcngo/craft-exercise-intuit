/**
 * ASP.NET Core Starter Kit (https://dotnetreact.com)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import PropertyLine from '../../components/PropertyLine';
import dispatch from './HomeReducer';
import Button from '../../components/Button';
import s from './Home.css';

const title = 'Net Worth Tracker';
const link = 'https://drive.google.com/open?id=0B5oWb4G-F6rNQTNkSllHYjRNbEJhUjBYRkNEUGpqLXZEYUc0';

class Home extends React.Component {

  static propTypes = {
    dataStore: PropTypes.shape({
      Items: PropTypes.array.isRequired, Version: PropTypes.number.isRequired, Result: PropTypes.any
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.snapShot = null;
    this.state = {
      dataStore: props.dataStore,
      editMode: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentDidMount() {
    document.title = title;
  }

  handleAdd(e, lineId, actionType) {
    const action = { type: actionType, lineId };
    dispatch.call(this, action);
  }

  handleRemove(e, lineId) {
    const action = { type: 'REMOVEITEM', lineId };
    dispatch.call(this, action);
  }

  handleChange(e, lineId, changeType, textLocation) {
    const type = this.state.editMode ? 'LOCALSUBMIT' : 'SUBMIT';
    const action = { type, lineId, value: e.target.value, changeType, textLocation };
    dispatch.call(this, action);
  }

  handleButtonClick(e, type) {
    const action = { type, component: this };
    dispatch.call(this, action);
    e.preventDefault();
  }

  render() {
    return (
      <Layout>
        <p className="mdl-typography--body-1">
          <span className="mdl-typography--title">Welcome to {title}!</span>
          For more information visit <a href={link} target="_blank">{link}</a>
        </p>
        <h7 className={this.state.dataStore.Result.Item1 ? s.success : s.error}>
          {this.state.dataStore.Result.Item2}
        </h7>
        <div>
          { this.state.editMode ?
            (<span>
              <Button onClick={(e) => { this.handleButtonClick(e, 'SAVE'); }}>Save</Button>
              <Button onClick={(e) => { this.handleButtonClick(e, 'CANCEL'); }}>Cancel</Button>
            </span>) :
            (<Button
              onClick={(e) => { this.handleButtonClick(e, 'EDIT'); }}
            >
              Edit Layout
            </Button>)
          }
        </div>
        <table className={s.lineTable}>
          <tbody>
            {this.state.dataStore.Items.map(propLine =>
              <PropertyLine key={propLine.Id} editMode={this.state.editMode} {...propLine} handleChange={this.handleChange} handleRemove={this.handleRemove} handleAdd={this.handleAdd}/>,
            )}
          </tbody>
        </table>
      </Layout>
    );
  }
}

export default Home;
