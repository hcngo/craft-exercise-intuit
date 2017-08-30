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
    this.state = {
      dataStore: props.dataStore,
      editMode: false,
      snapShot: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditClick = this.handleButtonClick.bind(this);
  }

  componentDidMount() {
    document.title = title;
  }

  handleChange(e, lineId) {
    const action = { type: 'SUBMIT', lineId, value: e.target.value };
    dispatch.call(this, action);
  }

  handleButtonClick(e, type) {
    const action = { type };
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
              <Button onClick={(e) => { this.handleEditClick(e, 'SAVE'); }}>Save</Button>
              <Button onClick={(e) => { this.handleEditClick(e, 'CANCEL'); }}>Cancel</Button>
            </span>) :
            (<Button
              onClick={(e) => { this.handleEditClick(e, 'EDIT'); }}
            >
              Edit
            </Button>)
          }
        </div>
        <table className={s.lineTable}>
          <tbody>
            {this.state.dataStore.Items.map(propLine =>
              <PropertyLine key={propLine.Id} {...propLine} handleChange={this.handleChange} />,
            )}
          </tbody>
        </table>
      </Layout>
    );
  }
}

export default Home;
