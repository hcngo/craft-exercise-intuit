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
import s from './PropertyLine.css';

class PropertyLine extends React.Component {

  static propTypes = {
    Header: PropTypes.string.isRequired,
    AmountPos: PropTypes.number.isRequired,
    Amount: PropTypes.number,
    Footer: PropTypes.string.isRequired,
    IsAmountCalculated: PropTypes.bool.isRequired,
    Sublines: PropTypes.array.isRequired,
    Message: PropTypes.string.isRequired,
    editMode: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
    handleAdd: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      expansionMode: true,
    };
    this.handleExpandCollapseBtnClick = this.handleExpandCollapseBtnClick.bind(this);
  }

  handleExpandCollapseBtnClick(e) {
    this.setState({ expansionMode: !this.state.expansionMode });
    e.preventDefault();
  }

  render() {
    return (
      <tr>
        <td className={s.tableData}>
          <PropertyDisplayLine
            ExpansionMode={this.state.expansionMode}
            Text={this.props.Header}
            TextLocation={'HEADER'}
            DisplayAmountFlag={this.props.AmountPos === AMOUNTLOCATION.Header}
            handleExpandCollapseBtnClick={this.handleExpandCollapseBtnClick}
            {...this.props}
          />
          <table className={s.lineTable} style={{ display: this.state.expansionMode ? '' : 'none' }}>
            <tbody>
              {this.props.Sublines.map(subLine =>
                <PropertyLine editMode={this.props.editMode} key={subLine.Id} {...subLine} handleChange={this.props.handleChange} handleRemove={this.props.handleRemove} handleAdd={this.props.handleAdd}/>,
              )}
            </tbody>
          </table>
          <PropertyDisplayLine
            Text={this.props.Footer}
            TextLocation={'FOOTER'}
            DisplayAmountFlag={this.props.AmountPos === AMOUNTLOCATION.Footer}
            handleExpandCollapseBtnClick={this.handleExpandCollapseBtnClick}
            {...this.props}
          />
        </td>
      </tr>
    );
  }
}

export default PropertyLine;
