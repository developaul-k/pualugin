/*
** highlight.js Initialized
*/
hljs.initHighlightingOnLoad();

/* ==================================== */

/*
** 네비게이션 컨트롤
*/
$('[data-element=nav__anchor]').on('click', function(e) {
    e.preventDefault();

    var $this = $(this);
    var location = $this.attr('href');

    $('html, body').stop().animate({ scrollTop: $(location).offset().top }, 300);
    $this
        .closest('.pualugin__header')
        .removeClass('is-active');
});
$('.pualugin__menu-button').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).closest('.pualugin__header').toggleClass('is-active');
});

/* ==================================== */

/*
** 예재코드 클립보드 복사
*/
function appendClipboard() {
    var bindFunctionName = 'appendClipboard';
    var $clipboard = $('.code').append('<button class=code__clipboard> <i class="fa fa-clipboard"></i> </button>');
    var $tooltip = $('.code').append('<span class="code__tooltip">클릭시 클럽보드에 복사됩니다.</span>');

    $clipboard.on('click.' + bindFunctionName, function(e) {
        e.stopPropagation();
        e.preventDefault();

        var code = $.trim($(this).closest('.code').find('code').text());
        var _doc = document;

        var textarea = _doc.createElement("textarea");

        _doc.body.appendChild(textarea);
        textarea.value = code;
        textarea.select();
        _doc.execCommand('copy');
        _doc.body.removeChild(textarea);
    })
}

appendClipboard();

/* ==================================== */