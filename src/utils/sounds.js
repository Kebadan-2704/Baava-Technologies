class SoundSystem {
  constructor() {
    this.ctx = null;
    this.enabled = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
  }

  enable() {
    this.enabled = true;
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.playTone(600, 'sine', 0.05); // Activation chime
  }

  disable() {
    this.enabled = false;
  }

  toggle() {
    if (this.enabled) {
      this.disable();
    } else {
      this.enable();
    }
    return this.enabled;
  }

  playTone(frequency, type = 'sine', duration = 0.1, volume = 0.1) {
    if (!this.enabled || !this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

    // Envelope
    gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  // Specific UI Sounds
  hover() {
    // Soft click
    this.playTone(800, 'sine', 0.03, 0.02);
  }

  clickOpen() {
    // Satisfying mechanical 'thunk'
    this.playTone(300, 'triangle', 0.08, 0.05);
    setTimeout(() => this.playTone(450, 'sine', 0.1, 0.03), 20);
  }

  clickClose() {
    // Lower pitched closing sound
    this.playTone(200, 'triangle', 0.06, 0.04);
  }

  switchTheme() {
    // Futuristic sweep
    if (!this.enabled || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  success() {
    this.playTone(600, 'sine', 0.1, 0.05);
    setTimeout(() => this.playTone(800, 'sine', 0.15, 0.05), 100);
  }

  error() {
    this.playTone(200, 'sawtooth', 0.15, 0.05);
    setTimeout(() => this.playTone(150, 'sawtooth', 0.2, 0.05), 150);
  }
}

export const uiSounds = new SoundSystem();
