/**
 * ASP.NET Core Starter Kit (https://dotnetreact.com)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import { AMOUNTLOCATION } from '../../utils/consts';

class PropertyDisplayLine extends React.Component {

  static propTypes = {
    Id: PropTypes.string,
    Text: PropTypes.string,
    DisplayAmountFlag: PropTypes.bool,
    Amount: PropTypes.number,
    IsAmountCalculated: PropTypes.bool,
    handleChange: PropTypes.func
  };

  render() {
    if (!(this.props.Text && this.props.Text.trim().length)){
      return (<span></span>);
    }
    if (this.props.DisplayAmountFlag){
      var amountElement = this.props.IsAmountCalculated ? (<span> {this.props.Amount} </span>) : (<input defaultValue={this.props.Amount} onBlur={(e) => this.props.handleChange(e, this.props.Id)}/>);
      return (<div> {this.props.Text} {amountElement} </div>);
    }
    return (<div> {this.props.Text} </div>);
  }
}

class PropertyLine extends React.Component {

  static propTypes = {
    Header: PropTypes.string,
    AmountPos: PropTypes.number,
    Amount: PropTypes.number,
    Footer: PropTypes.string,
    IsAmountCalculated: PropTypes.bool,
    handleChange: PropTypes.func
  };

  render() {
    return (
     <li>
      <PropertyDisplayLine Text={this.props.Header} DisplayAmountFlag={this.props.AmountPos == AMOUNTLOCATION.Header } {...this.props}></PropertyDisplayLine>
        <ul>
          {this.props.Sublines.map((subLine, i) =>
            <PropertyLine key={subLine.Id} {...subLine} handleChange={this.props.handleChange}></PropertyLine>
          )}
        </ul>
        <PropertyDisplayLine Text={this.props.Footer} DisplayAmountFlag={this.props.AmountPos == AMOUNTLOCATION.Footer } {...this.props}></PropertyDisplayLine>
      </li>
    );
  }
}

export default PropertyLine;
