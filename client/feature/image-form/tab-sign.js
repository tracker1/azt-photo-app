import mapRadio from './map-radio';

export default function SignInventory(props) {
  return <div>
    <br />
    <div className="row">
      <div className="col-xs-12">
        <input
          type="checkbox"
          onClick={props.actions.toggleIsSign}
          checked={!!props.image.isSign}
        />
        <span>
          Sign
        </span>
      </div>
    </div>
    {
      props.image.isSign ? <div className="row">
        <div className="col-sm-6">
          Sign Subject
          <ul className="radio-list">
            {mapRadio(props, 'signSubject', props.image.signSubject, [
              'Trailhead',
              'Junction',
              'Directional',
              'Interpretive Sign',
              'Historical Plaque',
              'AZT Emblem',
              'AZT Sticker',
              'USFS',
            ])}
          </ul>
        </div>
        <div className="col-sm-6">
          Sign Material
          <ul className="radio-list">
            {mapRadio(props, 'signMaterial', props.image.signMaterial, [
              'Carsonite Post with AZT Stickers',
              'AZT Metal Directional Markers on Wood Post',
              'Wood Sign with Wood Post',
              'Metal Sign with Metal Post',
              'Metal AZT Emblem with Metal Post',
              'Tri-fold Metal Encasement with Metal Posts',
              'Single Metal Encasement with Metal Posts',
              'AZT Sticker on Pre-existing Road Sign',
              'AZT Stickers on Gate Post',
            ])}
          </ul>
        </div>
      </div> : null
    }
  </div>;
}

