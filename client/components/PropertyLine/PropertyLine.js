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
import PropertyDisplayLine from './PropertyDisplayLine';

class PropertyLine extends React.Component {

  static propTypes = {
    Header: PropTypes.string.isRequired,
    AmountPos: PropTypes.number.isRequired,
    Amount: PropTypes.number.isRequired,
    Footer: PropTypes.string.isRequired,
    IsAmountCalculated: PropTypes.bool.isRequired,
    Sublines: PropTypes.arrayOf.isRequired,
    handleChange: PropTypes.func.isRequired,
  };

  render() {
    return (
      <li>
        <PropertyDisplayLine
          Text={this.props.Header}
          DisplayAmountFlag={this.props.AmountPos === AMOUNTLOCATION.Header}
          {...this.props}
        />
        <ul>
          {this.props.Sublines.map(subLine =>
            <PropertyLine key={subLine.Id} {...subLine} handleChange={this.props.handleChange} />,
          )}
        </ul>
        <PropertyDisplayLine
          Text={this.props.Footer}
          DisplayAmountFlag={this.props.AmountPos === AMOUNTLOCATION.Footer}
          {...this.props}
        />
      </li>
    );
  }
}

export default PropertyLine;
