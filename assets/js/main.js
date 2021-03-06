$(function() {
  //禁止页面选择以及鼠标右键
  document.oncontextmenu = function() {
    return false;
  };
  document.onselectstart = function() {
    return false;
  };

  let x, y;
  let screenSizeWidth = $("main").width() < $("body").width() ? $("main").width() : $("body").width();
  let screenSizeHeight = $("main").height() < $("body").height() ? $("main").height() : $("body").height();
  let halfvmin =
    (screenSizeWidth > screenSizeHeight
      ? screenSizeHeight / 2
      : screenSizeWidth / 2);

  //点击水波
  // $(".g-container").on("click", function(e) {
  //   x = e.pageX;
  //   y = e.pageY;

  //   if (
  //     ($(this).position().top > 0 &&
  //       y - $(this).position().top > halfvmin / 5) ||
  //     ($(this).position().top < 0 &&
  //       screenSizeHeight + $(this).position().top - y > halfvmin / 5)
  //   ) {
  //     waveMove(x, y, halfvmin);
  //   }
  // });

  //隐藏header
  $("main").scroll(function() {
    if ($(this).scrollTop() > halfvmin / 5) {
      $("header > ul > li").hide();
      $("header").hide("slow", "linear");
      $(".gotop").fadeIn();
    } else {
      $("header").show("slow", "linear");
      setTimeout(function() {
        $("header > ul > li").show();
      }, 900);
      $(".gotop").fadeOut();
    }
  });

  //一言
  $("main > section:even").each(function() {
    fetch("https://v1.hitokoto.cn/")
      .then(res => res.json())
      .then(data => {
        $(this).append(`
              <blockquote>
                ${data.hitokoto}
                <br>
                <br>
                <br>
                <span>From: ${data.from}</span>
              </blockquote>
          `);
      });
  });

  //回到顶部
  $(".gotop").on("click", function () {
    $("main").animate({ scrollTop: 0 }, 1000);
  });
  
  $(".load").on("click", function () {
    $("#load").animate({ height: 0 }, 1000);
  })

  if (window.addEventListener)//FF,火狐浏览器会识别该方法
    window.addEventListener('DOMMouseScroll', scrollWheel, false);
  window.onmousewheel = document.onmousewheel = scrollWheel;//W3C
});


// //添加水波动画元素
// function waveMove(x, y, halfvmin) {
//   $(".g-container").append(`
//             <div class="g-position" style="top:${y - halfvmin}px; left:${x - halfvmin}px;">
//                 <div class="g-center">
//                     <div class="wave g-wave1"></div>
//                     <div class="wave g-wave2"></div>
//                     <div class="wave g-wave3"></div>
//                     <div class="wave g-wave4"></div>
//                 </div>
//             </div>
//         `);

//   setTimeout(function () {
//     $(`.g-position`).fadeOut();    
//     $(`.g-position`).remove();
//   }, 2000);
// }

//首页收起
function scrollWheel(e) {
  e = e || window.event;
  if (e.wheelDelta && $("#load").height() != 0) {
    $("#load").animate({ height: 0 }, 1000);
  }
}