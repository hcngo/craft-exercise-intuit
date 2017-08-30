/**
 * ASP.NET Core Starter Kit (https://dotnetreact.com)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import s from './PropertyLine.css';

class PropertyDisplayLine extends React.Component {

  static propTypes = {
    Id: PropTypes.string.isRequired,
    Text: PropTypes.string.isRequired,
    DisplayAmountFlag: PropTypes.bool.isRequired,
    Amount: PropTypes.number,
    IsAmountCalculated: PropTypes.bool.isRequired,
    Message: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      inputValue: props.Amount,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ inputValue: nextProps.Amount });
  }

  handleOnChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  render() {
    if (!(this.props.Text && this.props.Text.trim().length)) {
      return (<span />);
    }
    if (this.props.DisplayAmountFlag) {
      const amountElement = this.props.IsAmountCalculated ?
        (<span> {this.props.Amount} </span>) :
        (<input
          value={this.state.inputValue}
          onChange={this.handleOnChange}
          onBlur={(e) => { this.props.handleChange(e, this.props.Id); }}
        />);
      return (<div> {this.props.Text} {amountElement} <span className={s.error}>{this.props.Message}</span></div>);
    }
    return (<div> {this.props.Text} </div>);
  }
}

export default PropertyDisplayLine;
