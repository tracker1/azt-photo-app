import bind from 'autobind';
import { bindActionCreators } from 'redux'
import * as actionCreators from 'client/actions';
import { connect } from 'react-redux';

import { default as FaSpinner } from "react-icons/lib/fa/spinner";
import GoogleAsyncLoader from 'react-google-maps/lib/async/ScriptjsLoader'
import { GoogleMap, Marker } from "react-google-maps";

export class MapDisplay extends Component {

  @bind
  onMapClick(evt) {
    const result = {
      latitude: evt.latLng.lat(),
      longitude: evt.latLng.lng(),
    }
    console.log('onMapClick', result);
  }

  render() {
    var props = this.props;

    return <div className="media-4-3">
      <GoogleAsyncLoader
        hostname={"maps.googleapis.com"}
        pathname={"/maps/api/js"}
        query={{ v: `3.22`, libraries: `geometry,drawing,places` }}
        loadingElement={
          <div>
            <FaSpinner
              style={{
                display: `block`,
                margin: `15% auto`,
                animation: `fa-spin 2s infinite linear`,
              }}
            />
          </div>
        }

        containerElement={
          <div />
        }

        googleMapElement={
          <GoogleMap
            ref={(map) => false && console.log(map)}
            defaultZoom={7}
            defaultCenter={{
              lat: 34.0489,
              lng: -111.0937
            }}
            zoom={props.zoom}
            center={{
              lat: props.latitude,
              lng: props.longitude
            }}
            onClick={this.onMapClick}
          >
            <Marker
              position={{ lat: props.latitude, lng: props.longitude }}
            />
          </GoogleMap>
        }
      />
    </div>;
   }
}

export default connect(
  state => {
    //console.log(state.image);
    let { image } = state;
    if (!(image && image.latitude && image.longitude)) {
      return {
        zoom: 6,
        latitude: 34.0489,
        longitude: -111.0937
      };
    }

    return {
      zoom: 15,
      longitude: +image.longitude,
      latitude: +image.latitude,
    };
  },
  dispatch => ({ actions:bindActionCreators(actionCreators, dispatch) })
)(MapDisplay);