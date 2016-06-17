import { bindActionCreators } from 'redux'
import * as actionCreators from 'client/actions';
import { connect } from 'react-redux';

import SignInventory from './tab-sign';
import GateInventory from './tab-gate';
import RoadCrossingInventory from './tab-road';
import NotesTab from './tab-notes';

function getActiveTab(selected) {
  switch (selected) {
    case 'gate':
    case 'road':
    case 'sign':
    case 'notes':
      return selected;
    default:
      return 'sign';
  }
}

function getButton(name, sign, selected, actions) {
  return <li className="nav-item">
    <button
      className={`nav-link ${sign === selected ? 'active' : ''}`}
      onClick={(evt)=> actions.formTab(sign)}
    >
      {name}
    </button>
  </li>
}

function getTab(form, image, actions) {
  switch (form.tab) {
    case 'road':
      return <RoadCrossingInventory
        image={image}
        actions={actions}
      />;
    case 'gate':
      return <GateInventory
        image={image}
        actions={actions}
      />;
    case 'notes':
      return <NotesTab
        image={image}
        actions={actions}
      />;
    case 'sign':
    default:
      return <SignInventory
        image={image}
        actions={actions}
      />;
  }
}

export function FormTabs(props) {
  var selected = getActiveTab(props.form.tab);

  return <div className="container-fluid">
    <div className="row">
      <div className="col-xs-12">
        <br />
        <ul className="nav nav-tabs">
          {getButton('Sign Inventory', 'sign', selected, props.actions)}
          {getButton('Gate Inventory', 'gate', selected, props.actions)}
          {getButton('Road Crossing Inventory', 'road', selected, props.actions)}
          {getButton('Notes', 'notes', selected, props.actions)}
        </ul>
      </div>
    </div>
    {getTab(props.form, props.image, props.actions)}
  </div>
}

export default connect(
  state => state,
  dispatch => ({ actions:bindActionCreators(actionCreators, dispatch) })
)(FormTabs);