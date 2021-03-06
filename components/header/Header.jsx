import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import Add from 'material-ui/svg-icons/content/add';
import Remove from 'material-ui/svg-icons/content/remove';

let timeoutId = null;
let intervalId = null;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsOpen: true
    };
  }

  toggleOptions() {
    return () => {
      this.setState({optionsOpen: !this.state.optionsOpen});
    };
  }

  toggle(parameter) {
    return () => {
      const newValue = !this.props.player[parameter];
      if (parameter === 'drone' && this.props.player.isPlaying) {
        this.props.player.pitch.stop();
        this.props.updatePlayer('isPlaying', false);
      }
      this.props.updatePlayer(parameter, newValue);
    };
  }

  set(parameter) {
    return (e) => {
      const newValue = e.target.value;
      this.props.updatePlayer(parameter, newValue);
    };
  }

  baseFrequencyChange() {
    return e => this.props.updateBaseFrequency(Number(e.target.value));
  }

  baseFrequencyDown(polarity = 1) {
    return () => {
      timeoutId = setTimeout(() => {
        intervalId = setInterval(() => {
          const newValue = this.props.player.baseFrequency + polarity;
          this.props.updateBaseFrequency(newValue);
        }, 30);
      }, 300);
    };
  }

  baseFrequencyUp(polarity = 1) {
    return () => {
      const newValue = this.props.player.baseFrequency + polarity;
      this.props.updateBaseFrequency(newValue);
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      intervalId = null;
    };
  }

  render() {
    const styles = {
      checkbox: {
        marginRight: '4px',
        fill: 'white'
      },
      input: {
        color: 'white',
        width: '40px',
        textAlign: 'center'
      },
      textInput: {
        borderColor: 'red'
      }
    };
    const openClass = this.state.optionsOpen ? 'open' : '';
    return (
      <header>
        <h1>The Pitch Pipe</h1>
        <aside>
          <div className="options">
            <h3 style={{display: 'inline'}}>Options</h3>
            <IconButton onTouchTap={this.toggleOptions()}>
              <ExpandLess className={openClass} color="white"/>
            </IconButton>
          </div>
          <nav className={openClass}>
            <Checkbox label="Drone"
              iconStyle={styles.checkbox}
              onTouchTap={this.toggle('drone')}/>
            <Checkbox label="Hertz"
              iconStyle={styles.checkbox}
              inputStyle={styles.checkboxLabel}
              onTouchTap={this.toggle('hertz')}/>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <IconButton
                onMouseDown={this.baseFrequencyDown(-1)}
                onMouseUp={this.baseFrequencyUp(-1)}>
                <Remove color="white"/>
              </IconButton>
              <h4>A = {this.props.player.baseFrequency}</h4>
              <IconButton
                onMouseDown={this.baseFrequencyDown()}
                onMouseUp={this.baseFrequencyUp()}>
                <Add color="white"/>
              </IconButton>

            </div>
          </nav>
        </aside>
      </header>
    );
  }
}

// <TextField
//   floatingLabelText="A = "
//   value={this.props.player.baseFrequency}
//   onChange={this.baseFrequencyChange()}
//   underlineFocusStyle={styles.textInput}
//   inputStyle={styles.input}/>

export default Header;
