Object.defineProperties(Number.prototype, {
	toFloor: {
		value: function (size) {
			return Number(this.toFixed(size));
		}
	},
	toSeconds: {
		value: function (size) {
			return Number(this.toFixed.call(this / 1000, size));
		}
	}
});
export const AnimationFrame = new class {
	list = new Map;
	startTime = 0;
	state = true;
	constructor() {
		if (self.document) {
			if (document.readyState == 'complete') {
				this.Listener();
			} else {
				document.addEventListener('DOMContentLoaded', e => this.Listener());
			}
		}
	}
	Listener() {
		self.addEventListener('pagehide', e => this.stop());
		self.addEventListener('pageshow', e => this.resume());
		document.addEventListener('visibilitychange', e => document.visibilityState === "hidden" ? this.stop() : this.resume());
	}
	stop() {
		this.state = false;
	}
	resume() {
		this.state = true;
		this.run();
	}
	run(startTime) {
		const speedTime = this.startTime > 0 ? startTime - this.startTime : startTime > 0 ? startTime : 0;
		this.startTime = startTime;
		if (this.list.size && this.state) {
			this.list.keys().forEach(key => this.runLoop(key, speedTime));
		}
		this._run();
	}
	_run() {
		requestAnimationFrame(time => this.run(time));
	}
	setLoop(key, value) {
		value.startTime = 0;
		value.nowTime = 0;
		value.loopTime = 0;
		value.indexTime = 0;
		value.maxTime = value.maxTime || 0;
		if (value.canvas){
			value.canvas.isfocus = true;
		}
		value.initLoop = this.initLoop;
		this.list.set(key, value);
		if (!this.startTime) {
			this.run();
		}
	}
	removeLoop(key) {
		this.list.delete(key);
	}
	/**
	 * 
	 * @param {Number} speedTime 
	 * @param {Number} startTime 
	 */
	initLoop(speedTime, startTime) {
		if (!this.startTime) { this.startTime = startTime; }
		this.nowTime = startTime;
		if (!this.loopTime) { this.loopTime = 0; }
		if (this.canvas&&this.canvas.isfocus!=true) {
			 return;
		}
		this.loopTime += new Number(speedTime).toSeconds(3);
		this.indexTime += 1;
		if (this.maxTime && this.maxTime > 0) {
			if (this.maxTime < this.loopTime) {
				this.loopTime = 0;
				this.startTime = startTime;
				this.indexTime = 1;
			}
		}
	}
	runLoop(key, speedTime) {
		const value = this.list.get(key);
		if (value.progress instanceof Function) {
			//value.initLoop(speedTime, this.startTime);
			value.progress(speedTime, this.startTime);
		}
	}
};