import mapRadio from './map-radio';

export default function SignInventory(props) {
  return <div>
    <br />
    <div className="row">
      <div className="col-xs-12">
        <input
          type="checkbox"
          onClick={props.actions.toggleIsGate}
          checked={!!props.image.isGate}
        />
        <span>
          Gate
        </span>
      </div>
    </div>
    {
      props.image.isGate ? <div className="row">
        <div className="col-sm-4">
          Sign Subject
          <ul className="radio-list">
            {mapRadio(props, 'gateType', props.image.gateType, [
              'Barbed Wire Gate',
              'Metal Gate (6ft)',
              'Metal Gate (5ft)',
              'Metal Gate (10ft)',
              'AZT Metal Gate',
              'Cattle Guard/Metal Fence',
            ])}
          </ul>
        </div>
      </div> : null
    }
  </div>;
}