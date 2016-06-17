import './image-form.scss';

import { bindActionCreators } from 'redux'
import * as actionCreators from 'client/actions';
import { connect } from 'react-redux';

import DirectionGrid from './direction-grid';
import ImagePicture from './image-picture';
import MapDisplay from './map-display';
import FormTabs from './form-tabs';

export function ImageForm(props) {
  if (!props.image) return <div id="image-form">Select an image to the left to edit</div>;

  const img = props.image;
  const imgUrl = `/images/${encodeURIComponent(img.name)}`;

  return <div id="image-form">
    <h2>Editing {img.id}</h2>

    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-6">
          <ImagePicture url={imgUrl} title={`Image: ${img.id}`} />
        </div>
        <div className="col-sm-6">
           <MapDisplay />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          Facing:
          <DirectionGrid image={img} actions={props.actions} />
        </div>
        <div className="col-sm-6">
          <fieldset className="form-group">
            <label for="exampleInputEmail1">Latitude</label>
            <input type="number" min="-180" max="180" className="form-control" onChange={evt => props.actions.setLat(evt.target.value)} value={img.location.latitude} />
          </fieldset>
          <fieldset className="form-group">
            <label for="exampleInputEmail1">Longitude</label>
            <input type="number" min="-180" max="180" className="form-control" onChange={evt => props.actions.setLon(evt.target.value)} value={img.location.longitude} />
          </fieldset>
        </div>
      </div>
    </div>

    <FormTabs />

    <br /><br />
    <pre><code>{JSON.stringify(img, null, 4)}</code></pre>
  </div>;
}


export default connect(
  state => state,
  dispatch => ({ actions:bindActionCreators(actionCreators, dispatch) })
)(ImageForm);

