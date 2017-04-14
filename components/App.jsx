import React from 'react'; // eslint-disable-line no-unused-vars
import { Provider } from 'react-redux';
import HeaderContainer from './header/HeaderContainer';
import PitchPipeContainer from './pitch-pipe/PitchPipeContainer';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <MuiThemeProvider>
          <div>
            <HeaderContainer />
            <PitchPipeContainer />
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
