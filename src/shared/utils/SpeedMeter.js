class SpeedMeter {
  startTime
  endTime

  constructor() {
    this.startTime = 0;
    this.endTime = 0;
  }

  start() {
    this.startTime = new Date().getTime();
  }
  end() {
    this.endTime = new Date().getTime();
    
  }

}

export default SpeedMeter;
