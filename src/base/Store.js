// Observer 패턴을 이용한 Store
class Store {
	constructor() {
		this.state = {}; // 전역 상태
		this.listeners = []; // 상태 변경을 구독하는 리스너들
	}

	// 전역 상태 설정
	setState(newState) {
		this.state = { ...this.state, ...newState };
		this.notify(); // 상태 변경 시 모든 리스너에게 알림
	}

	// 상태 변경 구독
	subscribe(listener) {
		this.listeners.push(listener);
	}

	// 상태 변경 시 모든 구독자에게 알림
	notify() {
		this.listeners.forEach((listener) => listener());
	}

	// 전역 상태 가져오기
	getState() {
		return this.state;
	}
}

export default Store;
