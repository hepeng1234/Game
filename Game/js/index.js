$(function() {
	//游戏规则显示
	$("#di").click(function() {
		$("#time").stop(); //进度条暂停
		clearInterval(wolfAnimate);
		clearInterval(wolfTime);
		$(".wolfimg").remove();
		$(".guize").stop().fadeIn(100);
	})
	//游戏规则隐藏
	$(".guan").click(function() {
		$(".guize").fadeOut(100);
		var $a = $("#time").width();
		if ($a < 180 && $a > 0) {
			wolfAnimate();
			timer(); //进度条继续
		}
	})
	//点击开始游戏按钮
	$(".but").click(function() {
		$(this).stop().fadeOut(100);
		timer();
		wolfAnimate();
	})
	// 点击重新开始
	$(".over button").click(function() {
		$(".fen").html("0");
		$("#time").css({
			width: "180px"
		})
		$(".over").fadeOut(100);
		timer();
		wolfAnimate();
	})
	//进度条函数
	function timer() {
		$("#time").animate({
			width: "0px"
		}, 60000, "linear", function() {
			$(".wolfimg").remove();
			clearInterval(wolfTime);
			clearInterval(wolfAnimate);
			$(".over").fadeIn(100);
		})
	}
	var wolfTime;
	//灰太狼动画
	function wolfAnimate() {
		var wolf_1 = ['./images/h0.png', './images/h1.png', './images/h2.png', './images/h3.png', './images/h4.png',
			'./images/h5.png', './images/h6.png', './images/h7.png', './images/h8.png', './images/h9.png'
		];
		var wolf_2 = ['./images/x0.png', './images/x1.png', './images/x2.png', './images/x3.png', './images/x4.png',
			'./images/x5.png', './images/x6.png', './images/x7.png', './images/x8.png', './images/x9.png'
		];
		var arrPos = [{
				left: "735px",
				top: "165px"
			},
			{
				left: "655px",
				top: "210px"
			},
			{
				left: "825px",
				top: "192px"
			},
			{
				left: "740px",
				top: "242px"
			},
			{
				left: "654px",
				top: "272px"
			},
			{
				left: "837px",
				top: "262px"
			},
			{
				left: "755px",
				top: "324px"
			},
			{
				left: "665px",
				top: "344px"
			},
			{
				left: "844px",
				top: "340px"
			}
		];
		var $wolfimg = $("<img src='' class='wolfimg'>");
		//随机位置
		var posIndex = Math.floor(Math.random() * 8);
		$wolfimg.css({
			position: "absolute",
			left: arrPos[posIndex].left,
			top: arrPos[posIndex].top
		});
		window.wolfIndex = 0;
		window.wolfIndexEnd = 5;
		//随机人物
		var posWolf = Math.round(Math.random()) == 0 ? wolf_1 : wolf_2;
		wolfTime = setInterval(function() {
			if (wolfIndex > wolfIndexEnd) {
				$wolfimg.remove();
				clearInterval(wolfTime);
				wolfAnimate();
			}
			$wolfimg.attr("src", posWolf[wolfIndex])
			wolfIndex++
		}, 110);
		$("#zhu").append($wolfimg);
		//点击加分或减分
		guize1($wolfimg);
	}

	//加减分
	var fen
	function guize1($wolfimg) {
		$wolfimg.one("click", function() {
			window.wolfIndex = 5;
			window.wolfIndexEnd = 9;
			var $a = $(this).attr("src");
			fen = parseInt($(".fen").text());
			if ($a.match("h") == "h") {
				fen += 10;
				$(".fen").html(fen);
			} else {
				fen -= 10;
				$(".fen").html(fen);
			}
		});
	}
});
