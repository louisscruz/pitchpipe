import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less';

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
    return e => {
      // this.set('baseFrequency', e.target.value);
      // this.props.adjustToBaseFrequency(this.props.player.baseFrequency, this.props.player.frequency);
      this.props.updateBaseFrequency(e.target.value);
    };
  }

  render() {
    const styles = {
      checkbox: {
        fill: 'white'
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
            <TextField value={this.props.player.baseFrequency} onChange={this.baseFrequencyChange()}/>
          </nav>
        </aside>
      </header>
    );
  }
}

export default Header;
