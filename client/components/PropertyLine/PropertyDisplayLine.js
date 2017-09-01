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
import PropertyAction from './PropertyAction';


class PropertyDisplayLine extends React.Component {

  static propTypes = {
    Id: PropTypes.string.isRequired,
    Text: PropTypes.string.isRequired,
    TextLocation: PropTypes.string.isRequired,
    DisplayAmountFlag: PropTypes.bool.isRequired,
    Amount: PropTypes.number,
    IsAmountCalculated: PropTypes.bool.isRequired,
    Sublines: PropTypes.array,
    Message: PropTypes.string.isRequired,
    editMode: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
    handleAdd: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      inputValue: props.Amount,
      inputText: props.Text,
      prevValue: props.Amount,
    };
    this.handleOnChangeValue = this.handleOnChangeValue.bind(this);
    this.handleOnChangeText = this.handleOnChangeText.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ inputValue: nextProps.Amount || this.state.prevValue, inputText: nextProps.Text });
  }

  handleOnChangeValue(e) {
    this.setState({ inputValue: e.target.value, prevValue: e.target.value });
  }

  handleOnChangeText(e) {
    this.setState({ inputText: e.target.value });
  }

  render() {
    if (!(this.props.Text && this.props.Text.trim().length)) {
      return null;
    }

    const nodeClass = this.props.IsAmountCalculated ? s.internalNode : s.leafNode;
    const textElement = this.props.editMode ?
    (<input
      value={this.state.inputText}
      onChange={this.handleOnChangeText}
      onBlur={(e) => { this.props.handleChange(e, this.props.Id, 'TEXT', this.props.TextLocation); }}
    />) :
    (<span> {this.state.inputText} </span>);

    if (!this.props.DisplayAmountFlag) {
      return (<table className={classnames(s.lineTableWithBottom, nodeClass)}>
        <tbody>
          <tr>
            {this.props.editMode && <td className={s.tableData}><PropertyAction {...this.props} /></td>}
            <td className={classnames(s.tableData, nodeClass)}>{textElement}</td>
            <td className={s.tableData} />
            <td className={s.tableData} />
          </tr>
        </tbody>
      </table>);
    }

    const amountElement = this.props.IsAmountCalculated || this.props.editMode ?
      (<span> {this.props.Amount} </span>) :
      (<input
        value={this.state.inputValue}
        onChange={this.handleOnChangeValue}
        onBlur={(e) => { this.props.handleChange(e, this.props.Id, 'VALUE'); }}
      />);
    return (<table className={classnames(s.lineTableWithBottom, nodeClass)}>
      <tbody>
        <tr>
        {this.props.editMode && <td className={s.tableData}><PropertyAction {...this.props} /></td>}
          <td className={s.tableData}>{textElement}</td>
          <td className={s.tableData}>{amountElement}</td>
          <td className={s.tableData}><span className={s.error}>{this.props.Message}</span></td>
        </tr>
      </tbody>
    </table>);
  }
}

export default PropertyDisplayLine;
