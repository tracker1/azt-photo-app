import './heading.scss';
import {FaBars} from 'lib/glyphs';

export default function Heading(props) {
  return <div id="heading">
    AZT Photos

    <div className="buttons">
      <a  className='btn btn-secondary'
          href="/api/v1/list/sign"
          target="_blank"
      >
        Signs
      </a>

      <a  className='btn btn-secondary'
          href="/api/v1/list/gate"
          target="_blank"
      >
        Gates
      </a>

      <a  className='btn btn-secondary'
          href="/api/v1/list/road"
          target="_blank"
      >
        RoadX
      </a>

    </div>
  </div>;
}