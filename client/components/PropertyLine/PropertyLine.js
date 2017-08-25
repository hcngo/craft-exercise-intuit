/**
 * ASP.NET Core Starter Kit (https://dotnetreact.com)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';

class PropertyLine extends React.Component {

  render() {
    return (
     <li key={this.props.Id}>
      { this.props.Header ?  ( <div> {this.props.Header} - { this.props.ShowAmountInHeader ? this.props.Amount : ""} </div> ) : "" }
        <ul>
          {this.props.Sublines.map((subLine, i) =>
            <PropertyLine {...subLine}></PropertyLine>
          )}
        </ul>
      { this.props.Footer ? ( <div>{this.props.Footer} - { this.props.ShowAmountInHeader ? "" : this.props.Amount} </div>) : ""  }
      </li>
    );
  }
}

export default PropertyLine;
