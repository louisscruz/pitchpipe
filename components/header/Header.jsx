import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  toggle(parameter) {
    return () => {
      const newValue = !this.props.player[parameter];
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
    return (
      <header>
        <h1>The Pitch Pipe</h1>
        <aside>
          <h4>Options</h4>
          <nav>
            <ul>
              <li>
                <input type="checkbox" id="drone" onClick={this.toggle('drone')}/>
                <label htmlFor="drone">
                  Drone
                </label>
              </li>
              <li>
                <input type="checkbox" id="hertz" onClick={this.toggle('hertz')}/>
                <label htmlFor="hertz">
                  Hertz
                </label>
              </li>
              <li>
                <label htmlFor="baseFrequency">A = </label>
                <input type="number" id="baseFrequency" value={this.props.player.baseFrequency} onChange={this.baseFrequencyChange()} />
              </li>
            </ul>
          </nav>
        </aside>
      </header>
    );
  }
}

export default Header;
