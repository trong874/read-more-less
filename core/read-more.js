function ReadMore(selector,options = {}, lineNum = 5) {
    let READ_MORE_LABEL = !('text_more' in options) ? 'Xem thêm' : options.text_more;
    let HIDE_LABEL = !('text_less' in options) ? 'Ẩn bớt' : options.text_less;
    let class_button = !('class_button' in options) ? 'read-more' : options.class_button;
    let selector_wrap = !('selector_wrap' in options) ? '.hidden-text' : options.selector_wrap;
    let speed = !('speed' in options) ? '.3s' : options.speed;
    let jObj = document.querySelectorAll(selector);

    jObj.forEach( elm => {
        let minHeight = parseInt(getComputedStyle(elm.querySelector(selector_wrap)).lineHeight,10)*lineNum;
        let textMinHeight = ''+ minHeight +'px';
        textMinHeight = isNaN(minHeight) ? '100px' : textMinHeight;
        let textMaxHeight = ''+getComputedStyle(elm.querySelector(selector_wrap)).height;
        elm.dataset.min_height = textMinHeight;
        elm.dataset.max_height = textMaxHeight;
        elm.querySelector(selector_wrap).style.height = ''+ textMaxHeight;
        elm.querySelector(selector_wrap).style.transition = 'height ' + speed;
        elm.querySelector(selector_wrap).style.height = ''+ textMinHeight
        if (textMaxHeight > textMinHeight) {
            elm.innerHTML +=`<a href="javascript:;" class="toggle-content ${class_button}">${READ_MORE_LABEL}</a>`;
        }

        elm.querySelector('.toggle-content').addEventListener('click',function(e) {
            let elm = e.target.closest(selector);
            let textMinHeight = elm.dataset.min_height;
            let textMaxHeight = elm.dataset.max_height;
            let button = elm.querySelector('.toggle-content');
            if (getComputedStyle(elm.querySelector(selector_wrap)).height === textMinHeight) {
                elm.querySelector(selector_wrap).style.height = ''+textMaxHeight;
                button.classList.add('active');
                button.innerHTML = HIDE_LABEL;
            } else {
                elm.querySelector(selector_wrap).style.height = ''+textMinHeight;
                button.classList.remove('active');
                button.innerHTML = READ_MORE_LABEL;
            }
        });
    });
}