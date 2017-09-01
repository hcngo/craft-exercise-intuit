/**
 * ASP.NET Core Starter Kit (https://dotnetreact.com)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Button from '../Button';


class ExpandCollapseAction extends React.Component {

  static propTypes = {
    Text: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const btn = (<Button onClick={this.props.handleClick}>{this.props.Text}</Button>);
    return <span>{btn}</span>;
  }
}

export default ExpandCollapseAction;
