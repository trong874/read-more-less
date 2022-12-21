function ReadMore(selector,options = {}, lineNum = 5) {
    let READ_MORE_LABEL = !('text_more' in options) ? 'Xem thêm' : options.text_more;
    let HIDE_LABEL = !('text_less' in options) ? 'Ẩn bớt' : options.text_less;
    let class_button = !('class_button' in options) ? 'read-more' : options.class_button;
    let selector_wrap = !('selector_wrap' in options) ? '.hidden-text' : options.selector_wrap;
    let speed = !('speed' in options) ? '.3s' : options.speed;
    let jObj = $(selector);

    Array.from(jObj).forEach( elm => {
        let minHeight = parseInt($(elm).children(selector_wrap).css('line-height'),10)*lineNum;
        let textMinHeight = ''+ minHeight +'px';
        textMinHeight = isNaN(minHeight) ? '100px' : textMinHeight;
        let textMaxHeight = ''+$(elm).children(selector_wrap).css('height');
        $(elm).attr('data-min_height',textMinHeight);
        $(elm).attr('data-max_height',textMaxHeight);
        $(elm).children(selector_wrap).css('height', ''+ textMaxHeight);
        $(elm).children(selector_wrap).css( 'transition', 'height ' + speed);
        $(elm).children(selector_wrap).css('height', ''+ textMinHeight);
        $(elm).append(`<a href="javascript:;" class="toggle-content ${class_button}">${READ_MORE_LABEL}</a>`);
    });
    jObj.children('.toggle-content').on('click',function() {
        let elm = $(this).closest(selector)
        let textMinHeight = $(elm).data('min_height');
        let textMaxHeight = $(elm).data('max_height');
        if (elm.children(selector_wrap).css('height') === textMinHeight) {
            elm.children(selector_wrap).css('height', ''+textMaxHeight);
            elm.children('.toggle-content').html(HIDE_LABEL).addClass('active');
        } else {
            elm.children(selector_wrap).css('height', ''+textMinHeight);
            elm.children('.toggle-content').html(READ_MORE_LABEL).removeClass('active');
        }
    });
}