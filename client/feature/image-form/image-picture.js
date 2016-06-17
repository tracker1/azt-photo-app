import bind from 'autobind';

export default class ImagePicture extends Component {

  render() {
    const title = this.props.title;
    const url = this.props.url;

    return <a href={this.props.url} target="_blank">
      <img src={this.props.url} className="img-fluid" alt={this.props.title} />
    </a>
  }
}