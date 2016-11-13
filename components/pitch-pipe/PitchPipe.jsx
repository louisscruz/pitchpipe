import React from 'react';
import { frequencyToLetter } from '../../util/PlayerUtil';

class PitchPipe extends React.Component {
  constructor(props) {
    super(props);
  }

  handlePitchPress() {
    return () => {
      if (this.props.player.drone) {
        this.props.player.isPlaying ? this.stopPitch() : this.startPitch();
      } else {
        this.soundPitch();
      }
    };
  }

  soundPitch() {
    this.props.player.pitch.start();
    setTimeout(() => {
      this.props.player.pitch.stop();
    }, 2000);
  }

  startPitch() {
    this.props.updatePlayer('isPlaying', true);
    this.props.player.pitch.start();
  }

  stopPitch() {
    this.props.updatePlayer('isPlaying', false);
    this.props.player.pitch.stop();
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
        <button onClick={this.handlePitchPress()}>play</button>
        <button onClick={this.handleUpdatePitch(-1)}>down</button>
        <p>The current pitch is: {pitchDisplayValue}</p>
        <button onClick={this.handleUpdatePitch(1)}>up</button>
      </main>
    );
  }
}

export default PitchPipe;
