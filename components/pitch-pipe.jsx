import React from 'react'

class PitchPipe extends React.Component {

  componentDidMount() {
    // set pixel ratio
    this.setPixelRatio(function() {
      this.updateCanvas();
      const section = this.refs.section;
      window.addEventListener('resize', () => {
        this.updateCanvas();
      });
    });

  }

  constructor(props) {
    super(props);
    this.state = {
      size: 100,
      pixelRatio: 1
    }
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
    const height = this.refs.section.offsetHeight;
    const width = this.refs.section.offsetWidth;
    const size = height <= width ? height * this.state.pixelRatio : width * this.state.pixelRatio;
    this.setState({size: size}, () => {
      let canvas = this.refs.canvas;
      const ctx = canvas.getContext('2d');
      canvas.width = size// * this.state.pixelRatio;
      canvas.height = size// * this.state.pixelRatio;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      // ctx.fillRect(0,0, this.state.size, this.state.size);
      // ctx.beginPath();
      // ctx.arc(size / 2, size / 2, size / 2, 0, 2*Math.PI);
      // ctx.stroke();
      ctx.setTransform(this.state.pixelRatio, 0, 0, this.state.pixelRatio, 0, 0);
    });
  }

  render () {
    return (
      <section ref="section">
        <canvas ref="canvas" width={this.state.size / this.state.pixelRatio} height={this.state.size / this.state.pixelRatio} />
      </section>
    )
  }
}

export default PitchPipe;
