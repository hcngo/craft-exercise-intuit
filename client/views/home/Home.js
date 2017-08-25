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

const title = 'Net Worth Tracker';
const link = 'https://drive.google.com/open?id=0B5oWb4G-F6rNQTNkSllHYjRNbEJhUjBYRkNEUGpqLXZEYUc0';

class Home extends React.Component {
  
  static propTypes = {
    propertylines: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      propertylines: props.propertylines
    };
  }

  componentDidMount() {
    document.title = title;
  }

  render() {
    return (
      <Layout>
        <h1 className="mdl-typography--title">Welcome to {title}!</h1>
        <p className="mdl-typography--body-1">
          For more information visit <a href={link} target='_blank'>{link}</a>
        </p>
        <h4 className="mdl-typography--title">Tracking your Networth</h4>
        <ul>
          {this.state.propertylines.map((propLine, i) =>
            <PropertyLine {...propLine}></PropertyLine>
          )}
        </ul>
      </Layout>
    );
  }
}

export default Home;
