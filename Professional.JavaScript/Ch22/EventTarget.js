function EventTarget(){
    this.handlers = {};    
}

EventTarget.prototype = {
    constructor: EventTarget,

    addHandler: function(type, handler){
        if (typeof this.handlers[type] == "undefined"){
            this.handlers[type] = [];
        }

        this.handlers[type].push(handler);
    },
    
    fire: function(event){	//浏览器自带的触发事件自动填充event对象，而这里我们只能自己构造event对象
        if (!event.target){
            event.target = this;
        }
        if (this.handlers[event.type] instanceof Array){
            var handlers = this.handlers[event.type]; //获取该事件的所有handler
            for (var i=0, len=handlers.length; i < len; i++){ 
                handlers[i](event); //依次调用之
            }
        }            
    },

    removeHandler: function(type, handler){
        if (this.handlers[type] instanceof Array){
            var handlers = this.handlers[type];
            for (var i=0, len=handlers.length; i < len; i++){
                if (handlers[i] === handler){
                    break;
                }
            }
            
            handlers.splice(i, 1);
        }            
    }
};