import mapRadio from './map-radio';

export default function SignInventory(props) {
  return <div>
    <br />
    <div className="row">
      <div className="col-xs-12">
        <input
          type="checkbox"
          onClick={props.actions.toggleIsRoad}
          checked={!!props.image.isRoad}
        />
        <span>
          Road Crossing
        </span>
      </div>
    </div>
    {
      props.image.isRoad ? <div>
        <br />
        <div className="row">
          <div className="col-sm-4">
            Road Type
            <ul className="radio-list">
              {mapRadio(props, 'roadType', props.image.roadType, [
                'Paved Road',
                'Dirt Road',
                'Primitive Road',
                'Trail Joins Road',
                'Trail Leaves Road',
              ])}
            </ul>
          </div>
          <div className="col-sm-4">
            Crossing
            <ul className="radio-list">
              {mapRadio(props, 'roadLevel', props.image.roadLevel, [
                'Flat',
                'Over',
                'Under',
              ])}
            </ul>
          </div>
          <div className="col-sm-4">
            Motorized Probability
            <ul className="radio-list">
              {mapRadio(props, 'roadMotorized', props.image.roadMotorized, [
                '5 - Extreme',
                '4 - High',
                '3 - Moderate',
                '2 - Low',
                '1 - Very Low',
              ])}
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="col-cs-12">
            <br />
            Safety Considerations:<br />
            <input type="text"
              style={{width: 200}}
              value={props.image.roadSafetyConsiderations}
              onChange={(evt) => setValue('roadSafetyConsiderations', evt.target.value)}
            />
          </div>
        </div>
      </div> : null
    }
  </div>;
}