import './image-list.scss';

import { bindActionCreators } from 'redux'
import * as actionCreators from 'client/actions';
import { connect } from 'react-redux';

function getList(actions, current, list) {
  if (!list) setTimeout(actions.loadImageList, 10);

  if (!(list && list.length)) return 'No Images Found';

  return list.map(i => {
    const id = i.trim().toLowerCase();
    const classes = ['btn'];
    if (id === current) classes.push('active');
    return <button key={id} className={classes.join(' ')} onClick={()=>actions.editImage(i)}>
      {i}
    </button>
  });
}

export function ImageList(props) {
  return <div id="image-list">
    {getList(props.actions, props.image && props.image.id, props.list)}
  </div>;
};

export default connect(
  state => state,
  dispatch => ({ actions:bindActionCreators(actionCreators, dispatch) })
)(ImageList);
