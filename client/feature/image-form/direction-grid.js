import './direction-grid.scss';

function createRadio(image, direction, actions) {
  return <td>
    <input type="radio" name="direction" checked={direction === image.direction} onChange={() => actions.imageDirection(direction)} />
  </td>
}

export default function(props) {
  var img = props.image;
  var facing = img && img.direction;

  return <table className="direction-grid">
    <tbody>
      <tr>
        <td>NW</td>
        <td></td>
        <td></td>
        <td>N</td>
        <td></td>
        <td></td>
        <td>NE</td>
      </tr>
      <tr>
        <td></td>
        {createRadio(img, 'NW', props.actions)}
        {createRadio(img, 'NNW', props.actions)}
        {createRadio(img, 'N', props.actions)}
        {createRadio(img, 'NN@', props.actions)}
        {createRadio(img, 'NE', props.actions)}
        <td></td>
      </tr>
      <tr>
        <td></td>
        {createRadio(img, 'NWW', props.actions)}
        <td></td>
        <td></td>
        <td></td>
        {createRadio(img, 'NEE', props.actions)}
        <td></td>
      </tr>
      <tr>
        <td>W</td>
        {createRadio(img, 'W', props.actions)}
        <td></td>
        <td></td>
        <td></td>
        {createRadio(img, 'E', props.actions)}
        <td>E</td>
      </tr>
      <tr>
        <td></td>
        {createRadio(img, 'SWW', props.actions)}
        <td></td>
        <td></td>
        <td></td>
        {createRadio(img, 'SEE', props.actions)}
        <td></td>
      </tr>
      <tr>
        <td></td>
        {createRadio(img, 'SW', props.actions)}
        {createRadio(img, 'SSW', props.actions)}
        {createRadio(img, 'S', props.actions)}
        {createRadio(img, 'SSE', props.actions)}
        {createRadio(img, 'SE', props.actions)}
        <td></td>
      </tr>
      <tr>
        <td>SW</td>
        <td></td>
        <td></td>
        <td>S</td>
        <td></td>
        <td></td>
        <td>SE</td>
      </tr>
    </tbody>
  </table>
}