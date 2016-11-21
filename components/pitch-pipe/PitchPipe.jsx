import React from 'react';
import { red400, red700 } from 'material-ui/styles/colors';
import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import ElementQueries from 'css-element-queries/src/ElementQueries';
import { frequencyToLetter, getPitchNames } from '../../util/PlayerUtil';

class PitchPipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 100,
      pixelRatio: 1,
      shaking: false,
      pitchNum: 0,
      hover: false
    };
  }

  componentDidMount() {
    ElementQueries.init();
    this.setPixelRatio(function() {
      this.updateCanvas();
      new ResizeSensor(this.refs.canvasSection, () => {
        this.updateCanvas();
      });
    });
  }

  componentWillReceiveProps() {
    this.updateCanvas();
  }

  handlePitchPress() {
    if (this.props.player.drone) {
      this.props.player.isPlaying ? this.stopPitch() : this.startPitch();
    } else {
      this.soundPitch();
    }
  }

  soundPitch() {
    this.startPitch();
    setTimeout(() => {
      this.stopPitch();
    }, 2000);
  }

  startPitch() {
    this.props.updatePlayer('isPlaying', true);
    this.props.player.pitch.start();
    this.startPipeShake();
  }

  stopPitch() {
    this.props.updatePlayer('isPlaying', false);
    this.props.player.pitch.stop();
    this.stopPipeShake();
  }

  startPipeShake() {
    this.setState({shaking: true}, () => {
      const step = () => {
        const options = {
          xShakeOffset: (Math.random() * 200) - 100,
          yShakeOffset: (Math.random() * 200) - 100
        };
        this.renderCanvas(options);
        if (this.state.shaking && this.props.player.isPlaying) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    });
  }

  stopPipeShake() {
    this.setState({shaking: false}, () => {
      this.renderCanvas();
    });
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
      this.renderCanvas({size: size});
    });
  }

  renderCanvas(options = {}) {
    let canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    const size = options.size || this.state.size;
    if (!options.size) options.size = this.state.size;
    if (!options.middle) options.middle = this.state.size / 2;
    if (!options.slice) options.slice = 0.166667 * Math.PI;
    canvas.width = size;// * this.state.pixelRatio;
    canvas.height = size;// * this.state.pixelRatio;
    canvas.style.width = `${size / this.state.pixelRatio}px`;
    canvas.style.height = `${size / this.state.pixelRatio}px`;
    this.createOuterCircle(ctx, size);
    // if (this.state.shaking) this.createInnerCircleBackground(ctx, options);
    this.createSelector(ctx, options);
    this.setOuterText(ctx, options);
    this.createInnerCircle(ctx, options);
    this.createOuterCircle(ctx, options);
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

  setOuterText(ctx, options) {
    const fontSize = `${options.size / 14}`;
    ctx.font = `bold ${fontSize}px Titillium Web`;
    ctx.fillStyle = 'white';
    const numRadsPerLetter = 2 * Math.PI / 12;
    const pitchNames = getPitchNames();
    ctx.save();
    ctx.translate(options.middle, options.middle);
    ctx.textAlign = 'center';
    ctx.rotate(0);

    for (let i = 0; i < pitchNames.length; i++) {
      ctx.save();
      ctx.rotate(i * numRadsPerLetter);
      ctx.fillText(pitchNames[i], 0, -(options.size / 2.75));
      ctx.restore();
    }
    ctx.restore();
  }

  createSelector(ctx, options) {
    const pitchNum = this.state.pitchNum;
    const start = options.slice / 2 + (options.slice * (pitchNum - 4));
    const stop = options.slice / 2 + (options.slice * (pitchNum - 3));
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(options.middle, options.middle);
    ctx.arc(options.middle, options.middle, options.middle, start, stop, false);
    ctx.closePath();
    ctx.fillStyle = red700;
    ctx.fill();
    ctx.restore();
  }

  createInnerCircle(ctx, options) {
    ctx.beginPath();
    if (this.state.shaking) {
      const xSkew = 0.125 / options.xShakeOffset;
      const ySkew = 0.125 / options.yShakeOffset;
      ctx.transform(1, xSkew, ySkew, 1, 0, 0);
    }
    this.state.hover ? ctx.fillStyle = red400 : ctx.fillStyle = red700;
    ctx.arc(options.middle, options.middle, options.middle / 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  createInnerCircleBackground(ctx, options) {
    const size = options.size || this.state.size;
    const xShakeOffset = options.xShakeOffset || 0;
    const yShakeOffset = options.yShakeOffset || 0;
    const x = (size / 2) + xShakeOffset;
    const y = (size / 2) + yShakeOffset;
    ctx.beginPath();
    ctx.arc(x, y, size / 4, 0, 2 * Math.PI);
    ctx.fillStyle = 'grey';
    ctx.fill();
  }

  setCenterText(ctx, size) {
    let text;
    if (this.props.player.hertz) {
      text = String(Math.round(this.props.player.frequency * 100) / 100);
    } else {
      text = frequencyToLetter(this.props.player.baseFrequency, this.props.player.frequency);
    }
    let fontSize;
    if (text.length <= 3) {
      fontSize = `${size / 4}`;
    } else {
      fontSize = `${size / (text.length + 1.5)}`;
    }
    ctx.fillStyle='white';
    ctx.font=`${fontSize}px Titillium Web`;
    const xOffset = ctx.measureText(text).width / 2.1;
    const yOffset = fontSize / 3;
    ctx.fillText(text, (size / 2) - xOffset, (size / 2) + yOffset);
  }

  inside(e, widthFactor = 2) {
    const center = e.target.width / this.state.pixelRatio / 2;
    const xFromCenter = e.nativeEvent.offsetX - center;
    const yFromCenter = e.nativeEvent.offsetY - center;
    const distanceFromCenter = Math.sqrt(Math.pow(xFromCenter, 2) + Math.pow(yFromCenter, 2));
    const innerWidth = e.target.width / widthFactor / this.state.pixelRatio;
    return distanceFromCenter < innerWidth;
  }

  insidePipe(e) {
    return this.inside(e);
  }

  insideInnerCircle(e) {
    return this.inside(e, 4);
  }

  handleCanvasMouseMove(e) {
    if (this.insidePipe(e)) {
      this.refs.canvas.style.cursor = 'pointer';
      if (this.insideInnerCircle(e)) {
        this.setState({hover: true}, () => this.renderCanvas());
      } else {
        this.setState({hover: false}, () => this.renderCanvas());
      }
    } else {
      this.refs.canvas.style.cursor = 'auto';
    }
  }

  handleCanvasClick(e) {
    if (this.insideInnerCircle(e)) {
      this.handlePitchPress();
    } else if (this.insidePipe(e)) {
      this.handlePitchSelect(e);
    }
  }

  handlePitchSelect(e) {
    const center = e.target.width / this.state.pixelRatio / 2;
    const xFromCenter = e.nativeEvent.offsetX - center;
    const yFromCenter = e.nativeEvent.offsetY - center;
    const baseAngle = Math.atan(Math.abs(yFromCenter) / Math.abs(xFromCenter));
    const quadrantOffset = Math.PI / 2;
    let radians;
    if (xFromCenter > 0 && yFromCenter <= 0) {
      radians = quadrantOffset - baseAngle;
    } else if (xFromCenter > 0 && yFromCenter > 0) {
      radians = quadrantOffset + baseAngle;
    } else if (xFromCenter <= 0 && yFromCenter > 0) {
      radians = Math.PI + (quadrantOffset - baseAngle);
    } else if (xFromCenter <= 0 && yFromCenter <= 0) {
      radians = Math.PI + quadrantOffset + baseAngle;
    }
    const pitchNum = Math.round(radians / (Math.PI / 6)) % 12;
    if (this.state.pitchNum === pitchNum) return;
    const change = pitchNum - this.state.pitchNum;
    this.props.updatePitch(this.props.player.baseFrequency, this.props.player.frequency, change);
    this.setState({pitchNum: pitchNum}, () => {
      this.renderCanvas();
    });
  }

  render() {
    return (
      <main ref="canvasSection">
        <canvas
          ref="canvas"
          onClick={this.handleCanvasClick.bind(this)}
          onMouseMove={this.handleCanvasMouseMove.bind(this)}
          width={this.state.size / this.state.pixelRatio}
          height={this.state.size / this.state.pixelRatio} />
      </main>
    );
  }
}

export default PitchPipe;
