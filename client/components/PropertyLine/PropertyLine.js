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
    Text: PropTypes.string,
    DisplayAmountFlag: PropTypes.bool,
    Amount: PropTypes.number,
    IsAmountCalculated: PropTypes.bool
  };

  render() {
    if (!(this.props.Text && this.props.Text.trim().length)){
      return (<span></span>);
    }
    if (this.props.DisplayAmountFlag){
      var amountElement = this.props.IsAmountCalculated ? (<span> {this.props.Amount} </span>) : (<input defaultValue={this.props.Amount}/>);
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
    IsAmountCalculated: PropTypes.bool
  };

  render() {
    return (
     <li>
      <PropertyDisplayLine Text={this.props.Header} DisplayAmountFlag={this.props.AmountPos == 1} {...this.props}></PropertyDisplayLine>
        <ul>
          {this.props.Sublines.map((subLine, i) =>
            <PropertyLine key={subLine.Id} {...subLine}></PropertyLine>
          )}
        </ul>
        <PropertyDisplayLine Text={this.props.Footer} DisplayAmountFlag={this.props.AmountPos == 2} {...this.props}></PropertyDisplayLine>
      </li>
    );
  }
}

export default PropertyLine;
