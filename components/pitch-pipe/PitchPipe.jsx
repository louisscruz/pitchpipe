import React from 'react';
import { frequencyToLetter } from '../../util/PlayerUtil';

class PitchPipe extends React.Component {
  constructor(props) {
    super(props);
  }

  handleUpdatePitch(change) {
    return () => {
      this.props.updatePitch(this.props.player.baseFrequency, this.props.player.frequency, change);
    };
  }

  render() {
    let pitchDisplayValue;
    if (this.props.player.hertz) {
      pitchDisplayValue = Math.round(this.props.player.frequency * 100) / 100;
    } else {
      pitchDisplayValue = frequencyToLetter(
        this.props.player.frequency,
        this.props.player.baseFrequency
      );
    }
    return (
      <main>
        <button onClick={this.handleUpdatePitch(-1)}>down</button>
        <p>The current pitch is: {pitchDisplayValue}</p>
        <button onClick={this.handleUpdatePitch(1)}>up</button>
      </main>
    );
  }
}

export default PitchPipe;
