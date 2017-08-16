const _element = Symbol('element');
const _type = Symbol('type');
const _handler= Symbol('handler');

class EventListener {
    constructor(element, type, handler) {
        this[_element] = document.querySelector(element);
        this[_handler] = handler;
        this[_type] = type;
        this.eventHandler = `on${this[_type]}${this[_handler]}`;
    }
    addEvent() {
        if (!!this[_element].addEventListener) {
            this[_element].addEventListener(this[_type], this[_handler], false);
        } else if (!!this[_element].attachEvent) {
            // 这里采用比上面更简单的方法来修正this指向问题，参考《Javascript.DOM高级程序设计》
            // 并且保证了可移除性
            //element.attachEvent("onClick", function(e)
            // {
            //      handler.call(element, e || window.event);
            // });
            // 则调用detachEvent("onClick", handler)无法移除该事件

            this[_element][this.eventHandler] = (event) => {
                this[_handler].call(this[_element], event || window.event);
            };
            this[_element].attachEvent(`on${this[_type]}`, this[_element][this.eventHandler]);
        } else {
            this[_element][`on${this[_type]}`] = this[_handler];
        }
    }
    removeEvent() {
        if (!!this[_element].removeEnentListener) {
            this[_element].removeEnentListener(this[_type], this[_handler], false);
        } else if (!!this[_element].datachEvent) {
            this[_element].detachEvent(`on${this[_type]}`, this[_element][this.eventHandler]);
        } else {
            this[_element][`on${this[_type]}`] = null;
        }
    }
    stopPropagation(event) {
        const evt = EventListener.getEvent(event);
        if (!!evt.stopPropagation) {
            evt.stopPropagation();
        } else {
            evt.cancelBubble = true;
        }
    }
    preventDefault(event) {
        const evt = EventListener.getEvent(event);
        if (!!evt.preventDefault) {
            evt.preventDefault();
        } else {
            evt.returnValue = false;
        }
    }
    getTarget(event) {
        const evt = EventListener.getEvent(event);
        let target = evt.target || evt.srcElement;
        //如果是Safari下的文本节点
        if (target.nodeType === 3) {
            target = target.parentNode;
        }
        return target;
    }
    getCharCode(event) {
        const evt = EventListener.getEvent(event);
        if (typeof evt.charCode === 'number') {
            return evt.charCode;
        } else {
            return evt.keyCode;
        }
    }
    getEvent(event = window.event) {
        if (!event) {
            const eventCaller = EventListener.getEvent.caller;
            while (!!eventCaller) {
                event = eventCaller.arguments[0];
                if (event && Event === event.constructor) {
                    break;
                }
                eventCaller = eventCaller.caller;
            }
        }
        return event;
    }
}

export default eventListener;


