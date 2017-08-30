/**
 * ASP.NET Core Starter Kit (https://dotnetreact.com)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import classnames from 'classnames';
import s from './PropertyLine.css';


class PropertyDisplayLine extends React.Component {

  static propTypes = {
    Id: PropTypes.string.isRequired,
    Text: PropTypes.string.isRequired,
    DisplayAmountFlag: PropTypes.bool.isRequired,
    Amount: PropTypes.number,
    IsAmountCalculated: PropTypes.bool.isRequired,
    Sublines: PropTypes.array,
    Message: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      inputValue: props.Amount,
      prevValue: props.Amount,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ inputValue: nextProps.Amount || this.state.prevValue });
  }

  handleOnChange(e) {
    this.setState({ inputValue: e.target.value, prevValue: e.target.value });
  }

  render() {
    if (!(this.props.Text && this.props.Text.trim().length)) {
      return (<table className={s.lineTable}>
        <tbody>
          <tr>
            <td className={s.tableData} />
            <td className={s.tableData} />
            <td className={s.tableData} />
          </tr>
        </tbody>
      </table>);
    }
    const nodeClass = this.props.Sublines.length !== 0 ? s.internalNode : s.leafNode;
    if (this.props.DisplayAmountFlag) {
      const amountElement = this.props.IsAmountCalculated ?
        (<span> {this.props.Amount} </span>) :
        (<input
          value={this.state.inputValue}
          onChange={this.handleOnChange}
          onBlur={(e) => { this.props.handleChange(e, this.props.Id); }}
        />);
      return (<table className={classnames(s.lineTableWithBottom, nodeClass)}>
        <tbody>
          <tr>
            <td className={s.tableData}>{this.props.Text}</td>
            <td className={s.tableData}>{amountElement}</td>
            <td className={s.tableData}><span className={s.error}>{this.props.Message}</span></td>
          </tr>
        </tbody>
      </table>);
    }
    return (<table className={classnames(s.lineTableWithBottom, nodeClass)}>
      <tbody>
        <tr>
          <td className={s.tableData}>{this.props.Text}</td>
          <td className={s.tableData} />
          <td className={s.tableData} />
        </tr>
      </tbody>
    </table>);
  }
}

export default PropertyDisplayLine;
