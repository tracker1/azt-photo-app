export default function mapRadio({actions}, name, value='', options) {
  var ret = [];
  var matched = false;
  for (var v of options) {
    let match = false;
    if (v.trim().toLowerCase() === value.trim().toLowerCase()) {
      match = matched = true;
    }
    ret.push(getItem(actions, name, v, match));
  }
  ret.push(<li>
    <label>
      <input
        type="radio"
        key={'other'}
        name={name}
        checked={!matched}
        onChange={() => actions.radioOption(name, '')}
      />
      <span>
        Other:
      </span>
    </label>
    <input
      type="text"
      value={matched ? '' : value}
      onChange={(evt) => actions.radioOption(name, evt.target.value)}
    />
  </li>);
  return ret;
}

function getItem(actions, name, v, match) {
  return <li>
    <label>
      <input
        type="radio"
        key={v}
        name={name}
        checked={match}
        onChange={() => actions.radioOption(name, v)}
      />
      <span>
        {v}
      </span>
    </label>
  </li>;
}