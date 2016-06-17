import { Provider } from 'react-redux';
import bind from 'autobind';
import Heading from 'feature/heading';
import ImageList from 'feature/image-list';
import ImageForm from 'feature/image-form';

export default function MainComponent(props) {
  return <Provider store={props.store}>
    <div id="app">
      <Heading />
      <ImageList />
      <ImageForm />
    </div>
  </Provider>;
}