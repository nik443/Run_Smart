$(document).ready(function(){    

                      /* слик-слайдер */
  $('.carousel__inner').slick({
      speed: 1200,
      adaptiveHeight: true,
      prevArrow: '<button type="button" class="slick-prev"><img src="../icons/prevArrow.png"></img></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="../icons/nextArrow.png"></img></button>',
      responsive: [          //адаптация
        {
          breakpoint: 992,    //на каком промежутке мы устанавливаем правила
          settings: {           //сами правила(объект)
            dots: true,        //точечки под слайдером
            arrows: false,      //стрелки переключения слайдера
            adaptiveHeight: true,
          }
        }
      ]
    });

                           /* табы */
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {      /* мы обращаемся к списку с классом catalog__tabs', при клике на класс у которого нет класса .catalog__tab_active, ему приписывается этот класс */           
    $(this)  /* ссылается на тот эл, на который мы нажали, если мы нажали на 1 кнопку(таб), то и ссылаемся на него */
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')  /* если мы нажали на 2 таб то нам надо добавить ему класс активности, далее у всех соседних табов, имеющих этот класс, необходимо его удалить */
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');  /* далее мы обращаемся к обертке, т.е к container, находим в нем catalog__content, далее у тех элементов, которые мы нашли, удаляется класс catalog__content_active; далее тот таб на который мы кликнули получает номер и этому номеру(табу) приписывается класс активности*/
  });
  
                          /* переворот картинок */
  $('.catalog-item__link').each(function(i){    /* происходит перебор всех .catalog-item__link */
    $(this).on('click', function(e){      /* при клике будет происходить */
      e.preventDefault();     /* отменяет правило браузера для ссылок с #: теперь при клике на них страница не перезагружаетя и тд */ 
      $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');  /*  уберает класс активности, если таковой имеется, и добавляет, если его нет (важно: перед классами активности не должны стоять точки) */
      $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');     /* .eq(i) позволяет присвоить определенный номер элементу, благодаря чему вся команда применяется именно к нему */
    })
  })
  $('.catalog-item__back').each(function(i){    
    $(this).on('click', function(e){      
      e.preventDefault();     
      $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');  
      $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');     
    })
  })

  /* Модальные окна */
  $('[data-modal=consultation]').on('click', function(){           /* пользователь кликает*/
    $('.overlay, #consultation').fadeIn('0.5s');     /* элементы появляются через 0.5 сек */
  });
  $('.modal__close').on('click', function(){
    $('.overlay, #consultation, #order, #thanks').fadeOut('0.5s');
  });

  $('.button_mini').each(function(i){    /* перебераем элементы с помощью аргумента i, дабы в модальном окне появлялось уведомление о выбранном товаре */
    $(this).on('click', function(){       /* this-та кнопка, на которую я нажал, на нее будет совершен клик */
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());        /* в #order есть .modal__descr в него я помещу текст из .catalog-item__subtitle: .eq(i) отвечает за то, чтобы в модальном окне появлялся подзаголовок согласно его порядковому номеру*/
      $('.overlay, #order').fadeIn('0.5s');   /* элементы появляются через 0.5 сек */
    });     
  });


  /* ВАЛИДАЦИЯ ФОРМ */
  function valideForms (form){   /* функция с правилами формы */
    $(form).validate({
      rules: {    /* если необходимо прописать более развернутые правила то используется такая запись: */
        name: {           /* имена imput-ов */
          required: true,
          minlength: 2
        },
        phone: "required",
        email: {          
          required: true,    
          email: true     /* плагин будет проверять: действительно ли я ввел имейл */
        }
      },
      messages: {
        name: {
          required: "Ваше имя",
          minlength: jQuery.validator.format("минимум {0} символа")
        },
        phone: "Ваш номер телефона",
        email: {
          required: "Введите вашу почту",   /* Подсказка */ 
          email: "неправильно введен адрес почты"   /* если почта введена неверно, то высветится... */
        }
      }
    });
  };
  valideForms('#consultation-form');  /* подставляем правила функции к id окон */
  valideForms('#consultation form');
  valideForms('#order form');

  $('input[name=phone]').mask('+7 (999) 999-9999');   /* маска ввода номера телефона */


  /* работа с якорем, возвращающим пользователя к первой секции сайта */
  $(window).scroll(function(){   /* window - все окно браузера, js следит за событием scroll*/
    if ($(this).scrollTop() > 1600) {     /* если пользователель пролистает 1600px вниз, то... */
      $('.pageup').fadeIn(); /* показать */
    } 
    else{
      $('.pageup').fadeOut();  /* скрыть */
    }
  });
      /* плавный скрол */
  $("a[href=#up]").click(function(){  
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });

  new WOW().init();
});