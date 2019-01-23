$(function() {
  //禁止页面选择以及鼠标右键
  document.oncontextmenu = function() {
    return false;
  };
  document.onselectstart = function() {
    return false;
  };

  let x, y;
  let screenSizeWidth = $("body").width();
  let screenSizeHeight = $("body").height();
  let halfvmin =
    (screenSizeWidth > screenSizeHeight
      ? screenSizeHeight / 2
      : screenSizeWidth / 2) * 0.9;

  //点击水波
  $(".g-container").on("click", function(e) {
    x = e.pageX;
    y = e.pageY;

    if (
      ($(this).position().top > 0 &&
        y - $(this).position().top > halfvmin / 5) ||
      ($(this).position().top < 0 &&
        screenSizeHeight + $(this).position().top - y > halfvmin / 5)
    ) {
      waveMove(x, y, halfvmin);
    }
  });

  //隐藏header
  $("#box").scroll(function() {
    if ($(this).scrollTop() > halfvmin / 5) {
      $("header > ul > li").hide();
      $("header").hide("slow", "linear");
    } else {
      $("header").show("slow", "linear");
      setTimeout(function() {
        $("header > ul > li").show();
      }, 900);
    }
  });

  //一言
  $("section").each(function() {
    fetch("https://v1.hitokoto.cn/")
      .then(res => res.json())
      .then(data => {
        $(this).append(`
              <blockquote>
                ${data.hitokoto}
                <br>
                <span>From: ${data.from}</span>
              </blockquote>
          `);
      });
  });
});

//添加水波动画元素
function waveMove(x, y, halfvmin) {
  $(".g-container").append(`
            <div class="g-position" style="top:${y - halfvmin}px; left:${x -
    halfvmin}px;">
                <div class="g-center">
                    <div class="wave g-wave1"></div>
                    <div class="wave g-wave2"></div>
                    <div class="wave g-wave3"></div>
                    <div class="wave g-wave4"></div>
                </div>
            </div>
        `);

  setTimeout(function() {
    $(`.g-position`).remove();
  }, 1500);
}
