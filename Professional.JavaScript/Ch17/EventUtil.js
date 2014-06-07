var EventUtil = {

    addHandler: function(element, type, handler){
        if (element.addEventListener){ //现代浏览器
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){ //IE
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    
    getButton: function(event){	//触发当前事件的鼠标按键
        if (document.implementation.hasFeature("MouseEvents", "2.0")){
            return event.button;
        } else {
            switch(event.button){
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0; //鼠标左键
                case 2:
                case 6:
                    return 2; //鼠标右键
                case 4: return 1; //鼠标中键
            }
        }
    },
    
    getCharCode: function(event){ //获取按下的按键码，charCode,keyCode,which
        if (typeof event.charCode == "number"){
            return event.charCode;
        } else {
            return event.keyCode;
        }
    },
    
    getClipboardText: function(event){	//剪贴板
        var clipboardData =  (event.clipboardData || window.clipboardData);
        return clipboardData.getData("text");
    },
    
    getEvent: function(event){
        return event ? event : window.event;
    },
    
    getRelatedTarget: function(event){ //相关节点，如mouseover事件中鼠标指针离开的节点
        if (event.relatedTarget){
            return event.relatedTarget;
        } else if (event.toElement){
            return event.toElement;
        } else if (event.fromElement){
            return event.fromElement;
        } else {
            return null;
        }
    
    },
    
    getTarget: function(event){ //触发该事件的节点
        return event.target || event.srcElement;
    },
    
    getWheelDelta: function(event){ //鼠标滚动距离
        if (event.wheelDelta){
            return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
        } else {
            return -event.detail * 40;
        }
    },
    
    preventDefault: function(event){
        if (event.preventDefault){
            event.preventDefault();
        } else {
            event.returnValue = false; //IE
        }
    },

    removeHandler: function(element, type, handler){
        if (element.removeEventListener){
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent){
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
    
    setClipboardText: function(event, value){
        if (event.clipboardData){
            event.clipboardData.setData("text/plain", value);
        } else if (window.clipboardData){
            window.clipboardData.setData("text", value);
        }
    },
    
    stopPropagation: function(event){
        if (event.stopPropagation){
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }

};