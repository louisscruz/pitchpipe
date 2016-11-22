const ctx = window.AudioContext ? new window.AudioContext() : new window.webkitAudioContext();

const createOscillator = (freq) => {
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = freq;
  osc.detune.value = 0;
  osc.start(ctx.currentTime);
  return osc;
};

const createGainNode = () => {
  const gainNode = ctx.createGain();
  gainNode.gain.value = 0;
  gainNode.connect(ctx.destination);
  return gainNode;
};

class Pitch {
  constructor(freq) {
    this.iOsFix();
    this.oscillatorNode = createOscillator(freq);
    this.gainNode = createGainNode();
    this.oscillatorNode.connect(this.gainNode);
  }

  iOsFix(ctx) {
    window.addEventListener('touchend', function() {
      const buffer = ctx.createBuffer(1, 1, 22050);
    	let source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.noteOn(0);
    }, false);
  }

  start() {
    this.gainNode.gain.value = 0.3;
  }

  stop() {
    this.gainNode.gain.value = 0;
  }

  setFrequency(value) {
    this.oscillatorNode.frequency.value = value;
  }
}

export default Pitch;
