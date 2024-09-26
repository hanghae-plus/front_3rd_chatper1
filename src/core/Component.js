export default class Component {
    $target;
    props;
    state;

    constructor($target, props = null) {
        // $target에 Dependency Injection
        this.$target = $target;
        this.props = props; // props 할당
        this.setup();
        this.setEvent();
        this.render();
    }

    setTemplate() { }

    setup() { }

    mounted () {};

    template() {
        return '';
    }

    render() {
        this.$target.innerHTML = this.template();
        this.mounted();
    }

    setEvent() { }

    // 이벤트 등록 추상화
    addEvent(eventType, selector, callback) {
        this.$target.addEventListener(eventType, (event) => {
            // closest : event 발생 위치의 가장 가까운 것부터 찾기 위함
            // if (!event.target.closest(selector)) return false;
            callback(event);
        })
    }

    setState (newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }
}