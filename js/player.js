class Player {
  static idle = 'idle';
  static jump = 'jump';
  static run = 'run';
  static die = 'die';
  
  constructor(context) {
    this.lastUpdate = 0;
    this.isDead = false;

    this.context = context;
    this.currentAnimationStep = 0;
    this.images = {
      [Player.idle]: {image: new Image(), steps: 4},
      [Player.jump]: {image: new Image(), steps: 8},
      [Player.run]: {image: new Image(), steps: 6},
    };

    this.sounds = {
      [Player.jump]: new Audio('audio/jump2.wav'),
      [Player.die]: new Audio('audio/drop.wav'),
    };

    this.currentState = Player.idle;
    
    this.x = 0;
    this.y = 0;
    this.sourceHeight = 464;
    this.sourceWidth = 325;
    this.height = this.sourceHeight / 3;
    this.width = this.sourceWidth / 3;
    this.updateEvery = 200;
  }

  init() {
    const images = Object.entries(this.images);

    this.images[Player.idle].image.src = 'assets/Black_Sheep_Idle.png';
    this.images[Player.jump].image.src = 'assets/Black_Sheep_Jump.png';
    this.images[Player.run].image.src = 'assets/Black_Sheep_Run.png';

    return Promise.all([
      new Promise((resolve) => this.images[Player.idle].image.addEventListener('load', () => resolve())),
      new Promise((resolve) => this.images[Player.jump].image.addEventListener('load', () => resolve())),
      new Promise((resolve) => this.images[Player.run].image.addEventListener('load', () => resolve())),
    ]);
  }

  advanceAnimationStep() {
    const maxStep = this.images[this.currentState].steps;
    this.currentAnimationStep = (this.currentAnimationStep + 1 < maxStep) ? this.currentAnimationStep + 1 : 0;
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
  }

  shouldUpdate(timestamp) {
    return (timestamp - this.lastUpdate >= this.updateEvery);
  }

  update(timestamp) {
    if (this.shouldUpdate(timestamp)) {
      this.advanceAnimationStep();

      if (this.currentState === Player.jump && this.currentAnimationStep === 0) {
        this.currentState = Player.run;
        this.y = this.y + 55;
      }

      if (this.isDead) {
        this.y = this.y * 1.0981;
        this.x = this.x + 3;
      }

      this.lastUpdate = timestamp;
    }
  }

  die() {
    this.isDead = true;
    this.updateEvery = 10;
    const sound = this.sounds[Player.die]
    sound.currentTime = 0;
    sound.play();
  }

  render() {
    const image = this.images[this.currentState];
    const sourceStartX = this.currentAnimationStep * this.sourceWidth;

    this.context.drawImage(image.image, sourceStartX, 0, this.sourceWidth, this.sourceHeight, this.x, this.y, this.width, this.height);
    // Hitbox visualization
    // this.context.strokeRect(this.x, this.y, this.width, this.height);
  }

  toggleMoving(isMoving) {
    this.currentAnimationStep = 0;
    if (isMoving) {
      this.currentState = Player.run;
      this.updateEvery = 100;
    } else {
      this.currentState = Player.idle;
      this.updateEvery = 200;
    }
  }

  jump() {
    if (this.currentState === Player.run) {
      this.currentState = Player.jump;
      this.updateEvery = 100;
      this.y = this.y - 55;
      this.currentAnimationStep = 0;
      const sound = this.sounds[Player.jump];
      sound.currentTime = 0;
      sound.play();
    }
  }

  toJSON() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      currentState: this.currentState
    }
  }

}