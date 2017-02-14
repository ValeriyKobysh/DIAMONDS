(function(ELEMENT) {
    ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
    ELEMENT.closest = ELEMENT.closest || function closest(selector) {
        if (!this) return null;
        if (this.matches(selector)) return this;
        if (!this.parentElement) {return null}
        else return this.parentElement.closest(selector)
      };
}(Element.prototype));

function timer(){
    var time = getCookie('time');
    if (typeof time !== 'undefined')
     time = JSON.parse(time);
    var min = $('.form-payment__timer-min');
    var sec = $('.form-payment__timer-sec');
    var timeM = minutes;
    var timeS = seconds;
    if (typeof time !== 'undefined') {
        timeM = time.m;
        timeS = time.s;
    }
    if (timeS > 0 || timeM > 0) {
        var timeInterval = setInterval(function(){
            if (timeS == 0){
                timeM--;
                timeS = 60;
            }
            if (timeM < 10){
                min.html('0' + timeM);
            } else
                min.html(timeM);
            timeS--;

            if (timeS < 10){
                sec.html("0" + timeS);
            } else
                sec.html(timeS);

            time = {
                m: timeM,
                s: timeS
            };
            setCookie('time', JSON.stringify(time), { expires: 60*60*24*1 });
            if (timeM == 0 && timeS == 0){
                deleteCookie("time");
                clearInterval(timeInterval);
            }
        }, 1000);
    }
    min.html('00');
    sec.html('00');
    deleteCookie("time");
}

// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// устанавливает cookie с именем name и значением value
// options - объект с свойствами cookie (expires, path, domain, secure)
function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

// удаляет cookie с именем name
function deleteCookie(name) {
  setCookie(name, "", {
    expires: -1
  })
}

//Function toggle contol/content tabs
    function toggleTabs(_search, _control, _content){
        var item = $(_search).closest('.' + _control),
            itemPosition = item.index(),
            contentItem = $('.' + _content);
        contentItem.eq(itemPosition)
            .addClass('' + _content + '_active')
            .siblings()
            .removeClass('' + _content + '_active');

        item.addClass('' + _control + '_active')
            .siblings()
            .removeClass('' + _control + '_active')
    };
//End function toggle control/content tabs

//Function show all popup
    function showPopup(_search){
        $('.'+ _search).closest('.popup').removeClass('popup_hide').addClass('popup_show');
    }
//End function show all popup

//Function hide all popup
    function hidePopup(_search){
        a = $('.'+ _search).closest('.popup');
        a.removeClass('popup_show').addClass('popup_hide');
    }
//End function hide all popup

//Change active main menu
$('.main-nav__link').click(function() {
    var item = $(this).closest('.main-nav__item');
    item.siblings().removeClass('main-nav__item_active');
    item.addClass('main-nav__item_active');
    })

//Change active button on filter tabs
$('.filter__content-btn').click(function() { 
    $(this).siblings().removeClass('filter__content-btn_active');
    $(this).addClass('filter__content-btn_active');
 })

//Use tabs filter
$('.filter__control-btn').click(function () {
    toggleTabs(this, 'filter__control-item','filter__content-item')
 })

$('.js__basket').click(function(){
    showPopup('js__no-reg');
})

$('.js__close').click(function(){
    hidePopup('js__close');
})

$('.sign__registration').click(function(){
    showPopup('js__registration');
})
$('.sign__enter').click(function(){
    showPopup('js__enter');
})

$('.main-nav__menu').click(function(){
    $('.main-nav__list').slideToggle('fast');
})

$('.js__to-enter').click(function(){
    hidePopup('js__no-reg');
    showPopup('js__enter');
})

$('.js__to-reg').click(function(){
    hidePopup('js__no-reg');
    showPopup('js__registration');
})

$('.no-reg__button').click(function(){
    hidePopup('js__no-reg');
    showPopup('js__form-payment');
})

//Use tabs popup form payment
$('.form-payment__control-btn').click(function () {
    var button = $('.form-payment__button');
    var inspection = $('.form-payment__inspection');
    var timerBlock = $('.form-payment__timer');
    toggleTabs(this, 'form-payment__control-item','form-payment__content-item');
    if (!$(timerBlock).hasClass('form-payment__timer_show')){
        timerBlock.addClass('form-payment__timer_show');
        timer();
    }
    if (!$(inspection).hasClass('form-payment__inspection_show')){
        button.addClass('form-payment__button_show');
    }
 })

$(".js__show-inspection").click(function () { 
    $('.form-payment__button').removeClass('form-payment__button_show');
    $('.form-payment__inspection').addClass('form-payment__inspection_show');
});

$('.form-payment__inspection-button').click(function (e) { 
    e.preventDefault();
    hidePopup('js__form-payment');
    //Если проверка успешна то
    showPopup('js__true-trans');
    //Если проверка на пройдена то
    //showPopup('js__false-trans');
});

$('.section-product__price-btn').click(function () { 
    showPopup('js__no-reg');
});