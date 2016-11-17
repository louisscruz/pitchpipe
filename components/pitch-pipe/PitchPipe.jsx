import React from 'react';
import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import ElementQueries from 'css-element-queries/src/ElementQueries';
import { frequencyToLetter } from '../../util/PlayerUtil';

class PitchPipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 100,
      pixelRatio: 1
    };
  }

  componentDidMount() {
    // set pixel ratio
    ElementQueries.init();
    this.setPixelRatio(function() {
      this.updateCanvas();
      new ResizeSensor(this.refs.canvasSection, () => {
        this.updateCanvas();
      });
    });
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

  setPixelRatio(cb) {
    const ctx = this.refs.canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const bsr = ctx.webkitBackingStorePixelRatio ||
                ctx.mozBackingStorePixelRatio ||
                ctx.msBackingStorePixelRatio ||
                ctx.oBackingStorePixelRatio ||
                ctx.backingStorePixelRatio || 1;
    const pixelRatio = dpr / bsr;
    this.setState({pixelRatio: pixelRatio}, cb);
  }

  updateCanvas() {
    const height = this.refs.canvasSection.offsetHeight;
    const width = this.refs.canvasSection.offsetWidth;
    const size = height <= width ? height * this.state.pixelRatio : width * this.state.pixelRatio;
    this.setState({size: size}, () => {
      this.renderCanvas(size);
    });
  }

  renderCanvas(size) {
    let canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    canvas.width = size;// * this.state.pixelRatio;
    canvas.height = size;// * this.state.pixelRatio;
    canvas.style.width = `${size / this.state.pixelRatio}px`;
    canvas.style.height = `${size / this.state.pixelRatio}px`;
    this.createOuterCircle(ctx, size);
    this.createInnerCircle(ctx, size);
    ctx.stroke();
    this.setCenterText(ctx, size, this.state.pixelRatio);
    ctx.setTransform(this.state.pixelRatio, 0, 0, this.state.pixelRatio, 0, 0);
  }

  createOuterCircle(ctx, size) {
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, 2*Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
  }

  createInnerCircle(ctx, size) {
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 4, 0, 2*Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
  }

  setCenterText(ctx, size, pixelRatio) {
    const text = 'A';
    const fontSize = `${size / 4}`;
    ctx.fillStyle='white';
    ctx.font=`${fontSize}px Titillium Web`;
    const xOffset = ctx.measureText(text).width / 4;
    const yOffset = fontSize;
    ctx.fillText(text, (size / 2) - xOffset, (size / 2) + (yOffset / pixelRatio));
  }

  handleCanvasClick(e) {
    console.log(e);
    this.soundPitch();
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
      <main ref="canvasSection">
        <canvas
          ref="canvas"
          onClick={this.handleCanvasClick.bind(this)}
          width={this.state.size / this.state.pixelRatio}
          height={this.state.size / this.state.pixelRatio} />
      </main>
    );
    // <button onClick={this.handlePitchPress()}>play</button>
    // <button onClick={this.handleUpdatePitch(-1)}>down</button>
    // <p>The current pitch is: {pitchDisplayValue}</p>
    // <button onClick={this.handleUpdatePitch(1)}>up</button>
  }
}

export default PitchPipe;
