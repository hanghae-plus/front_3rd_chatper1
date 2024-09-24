export class Subject {
    constructor() {
        this.observers = [];
    }

    static getInstance() {
        if (!Subject.instance) {
            Subject.instance = new Subject();
        }
        return Subject.instance;
    }

    addObserver(observer) {
        console.log(observer,'observer')
        this.observers.push(observer);
    }

    removeObserver(observer) {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    notifyObservers(data) {
        this.observers.forEach(observer => observer.update(data));
    }
}