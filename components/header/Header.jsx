import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header>
        <h1>The Pitch Pipe</h1>
        <aside>
          <h4>Options</h4>
          <nav>
            <ul>
              <li>
                <input type="checkbox" id="drone"/>
                <label htmlFor="drone">
                  Drone
                </label>
              </li>
              <li>
                <input type="checkbox" id="hertz"/>
                <label htmlFor="hertz">
                  Hertz
                </label>
              </li>
            </ul>
          </nav>
        </aside>
      </header>
    );
  }
}

export default Header;
