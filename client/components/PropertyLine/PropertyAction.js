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


class PropertyAction extends React.Component {

  static propTypes = {
    Id: PropTypes.string.isRequired,
    handleRemove: PropTypes.func.isRequired,
    handleAdd: PropTypes.func.isRequired,
    IsAmountCalculated: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const addSectionBtn = (<Button disabled={!this.props.IsAmountCalculated} onClick={(e) => { this.props.handleAdd(e, this.props.Id, 'ADDSECTION'); }}>Add Section</Button>);
    const addLineBtn = (<Button disabled={!this.props.IsAmountCalculated} onClick={(e) => { this.props.handleAdd(e, this.props.Id, 'ADDLINE'); }}>Add Line</Button>);
    const removeBtn = (<Button onClick={(e) => { this.props.handleRemove(e, this.props.Id); }}>Remove</Button>);
    return <span>{addSectionBtn} {addLineBtn} {removeBtn} </span>;
  }
}

export default PropertyAction;
