import './image-list.scss';

import { bindActionCreators } from 'redux'
import * as actionCreators from 'client/actions';
import { connect } from 'react-redux';

import FaMapSigns from 'react-icons/lib/fa/map-signs';
import FaColumns from 'react-icons/lib/fa/columns';
import FaRoad from 'react-icons/lib/fa/road';

function getList(actions, current, list) {
  if (!list) setTimeout(actions.loadImageList, 10);

  if (!(list && list.length)) return 'No Images Found';

  return list.map(i => {
    const id = i.name.trim().toLowerCase();
    const isActive = (id === current);
    const classes = ['btn'];

    if (isActive) classes.push('active');
    return <button key={id} className={classes.join(' ')} onClick={()=>actions.editImage(i.name)}>
      {i.name}

      <span className="flags">
        {getSign(id, isActive, i)}
        {getGate(id, isActive, i)}
        {getRoad(id, isActive, i)}
      </span>
    </button>
  });
}

function getSign(id, isActive, i) {
  return <span>
    <FaMapSigns
      color={
          i.isSign ? (isActive ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)')
          : (isActive ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.06)') }
    />
  </span>;
}

function getGate(id, isActive, i) {
  return <span>
    <FaColumns
      color={
          i.isGate ? (isActive ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)')
          : (isActive ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.06)') }
    />
  </span>
}

function getRoad(id, isActive, i) {
  return <span>
    <FaRoad
      color={
          i.isRoad ? (isActive ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.9)')
          : (isActive ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.06)') }
    />
  </span>
}

export function ImageList(props) {
  return <div id="image-list">
    {getList(props.actions, props.image && props.image.id, props.list)}
  </div>;
};

export default connect(
  state => {
    console.log(state);
    return state
  },
  dispatch => ({ actions:bindActionCreators(actionCreators, dispatch) })
)(ImageList);
