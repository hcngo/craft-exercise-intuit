/**
 * ASP.NET Core Starter Kit (https://dotnetreact.com)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';

class PropertyDisplayLine extends React.Component {

  static propTypes = {
    Id: PropTypes.string.isRequired,
    Text: PropTypes.string.isRequired,
    DisplayAmountFlag: PropTypes.bool.isRequired,
    Amount: PropTypes.number.isRequired,
    IsAmountCalculated: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
  };

  render() {
    if (!(this.props.Text && this.props.Text.trim().length)) {
      return (<span />);
    }
    if (this.props.DisplayAmountFlag) {
      const amountElement = this.props.IsAmountCalculated ?
        (<span> {this.props.Amount} </span>) :
        (<input
          defaultValue={this.props.Amount}
          onBlur={(e) => { this.props.handleChange(e, this.props.Id); }}
        />);
      return (<div> {this.props.Text} {amountElement} </div>);
    }
    return (<div> {this.props.Text} </div>);
  }
}

export default PropertyDisplayLine;
