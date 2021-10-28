//get x, y of HTML element
function getElementPlacement(source) {
    let x = 0, y = 0, w = 0, h = 0;
    while(source && !isNaN( source.offsetLeft ) && !isNaN( source.offsetTop)){
        x += source.offsetLeft - source.scrollLeft;
        y += source.offsetTop - source.scrollTop;
        source = source.offsetParent;
    }
    return{
        top: y,
        left: x,
        width : w,
        height: h
    };
}

//simulate click
function click(x,y){
    var ev = document.createEvent("MouseEvent");
    var el = document.elementFromPoint(x,y);
    ev.initMouseEvent(
        "click",
        true, true,
        window, null,
        x, y, 0, 0,
        false, false, false, false,
        0, null
    );
    el.dispatchEvent(ev);
}

function scrollToPos(x, y){
    window.scrollTo(x, y);
}