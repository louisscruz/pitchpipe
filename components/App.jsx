import React from 'react'; // eslint-disable-line no-unused-vars
import { Provider } from 'react-redux';
import HeaderContainer from './header/HeaderContainer';
import PitchPipeContainer from './pitch-pipe/PitchPipeContainer';
import FooterContainer from './footer/FooterContainer';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          <HeaderContainer />
          <PitchPipeContainer />
          <FooterContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
