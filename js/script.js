jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

    var topBtn = $('.pagetop');
    topBtn.hide();

    // ボタンの表示設定
    $(window).scroll(function () {
        if ($(this).scrollTop() > 70) {
            // 指定px以上のスクロールでボタンを表示
            topBtn.fadeIn();
        } else {
            // 画面が指定pxより上ならボタンを非表示
            topBtn.fadeOut();
        }
    });

    // ボタンをクリックしたらスクロールして上に戻る
    topBtn.click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 300, 'swing');
        return false;
    });

    // スムーススクロール (絶対パスのリンク先が現在のページであった場合でも作動)

    $(document).on('click', 'a[href*="#"]', function () {
        let time = 400;
        let header = $('header').innerHeight();
        // PC表示のみ、遷移先が下すぎないように少し多めにスクロールする
        let scrollMargin = window.matchMedia("(min-width: 768px)").matches ? 30 : 0;
        let target = $(this.hash);
        if (!target.length) return;
        let targetY = target.offset().top - header + scrollMargin;
        $('html,body').animate({
            scrollTop: targetY
        }, time, 'swing');
        return false;
    });

    // ハンバーガーメニュー
    $(function () {
        $(".js-hamburger").click(function () {
            $(this).toggleClass("is-open");
            if ($(this).hasClass("is-open")) {
                openDrawer();
            } else {
                closeDrawer();
            }
        });

        // backgroundまたはページ内リンクをクリックで閉じる
        $(".js-drawer a[href]").on("click", function () {
            closeDrawer();
        });

        // resizeイベント
        $(window).on('resize', function () {
            if (window.matchMedia("(min-width: 768px)").matches) {
                closeDrawer();
            }
        });
    });

    function openDrawer() {
        $(".js-drawer").addClass("is-open");
        $(".js-hamburger").addClass("is-open");
        $("html").addClass("is-fixed");
    }

    function closeDrawer() {
        $(".js-drawer").removeClass("is-open");
        $(".js-hamburger").removeClass("is-open");
        $("html").removeClass("is-fixed");
    }

    // ============================================================
    // FVスライダー（フェード切り替え）
    // ============================================================
    new Swiper('.mv__swiper', {
        effect: 'fade',
        fadeEffect: { crossFade: true },
        loop: true,
        speed: 1200,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        allowTouchMove: false,
    });

    // ============================================================
    // FV〜messageセクション：固定背景の暗さをスクロール量に応じて変化
    // FV表示中は暗くせず、messageセクションが画面に入るにつれて
    // 徐々に暗くなり、messageセクション到達後は現状と同じ暗さを維持する
    // ============================================================
    var $fvBg = $('.fv-message__bg');
    var $messageSection = $('#message');

    function updateFvTint() {
        if (!$messageSection.length) return;
        var winH = window.innerHeight;
        var rectTop = $messageSection[0].getBoundingClientRect().top;
        var progress = (winH - rectTop) / winH;
        progress = Math.min(Math.max(progress, 0), 1);
        $fvBg.css('--fv-tint', (progress * 0.3).toFixed(3));
    }

    $(window).on('scroll', updateFvTint);
    $(window).on('resize', updateFvTint);
    updateFvTint();

    // ============================================================
    // 店舗スライダー（各グループ）
    // ============================================================
    $('.store__swiper').each(function () {
        new Swiper(this, {
            loop: true,
            speed: 400,
            slidesPerView: 1,
            spaceBetween: 0,
            grabCursor: true,
            navigation: {
                nextEl: $(this).find('.store__swiper-button--next')[0],
                prevEl: $(this).find('.store__swiper-button--prev')[0],
            },
            pagination: {
                el: $(this).find('.swiper-pagination')[0],
                clickable: true,
            },
        });
    });

    // ============================================================
    // インタビューアコーディオン
    // ============================================================
    $('.js-accordion').on('click', function () {
        var $item = $(this).closest('.interview__item');
        var $body = $item.children('.interview__body');
        var isOpen = $item.hasClass('is-open');

        if (isOpen) {
            $item.removeClass('is-open');
            $(this).attr('aria-expanded', 'false');
            $body.slideUp(300);
        } else {
            $item.addClass('is-open');
            $(this).attr('aria-expanded', 'true');
            $body.slideDown(300);
        }
    });

    // 初期表示
    $('.interview__item.is-open').children('.interview__body').show();

    // modal
    $(".js-modal-open").each(function () {
        $(this).on("click", function (e) {
            e.preventDefault();
            var target = $(this).data("target");
            var modal = document.getElementById(target);
            $(modal).fadeIn();
            $("html,body").css("overflow", "hidden");
        });
    });
    $(".js-modal-close").on("click", function () {
        $(".js-modal").fadeOut();
        $("html,body").css("overflow", "initial");
    });
});
