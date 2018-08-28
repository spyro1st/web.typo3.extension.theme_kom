$(document).ready(function () {

	var moveOutWidth = document.body.clientWidth * 1.5;
	var moveOutHeight = document.body.clientHeight * 1.5;


	window.viewportUnitsBuggyfill.init();

	$(document).on('hidden', "#global-modal", function () {
		$("#global-modal").removeData("modal");
	});

	$(document).on('click', ".modal-link", function () {

		var target = $(this).attr("href");

		$.get(target, function (data) {
			$("#global-modal .modal-content").html(data);
			$("#global-modal").modal("show");
		});

		return false;

	});

	$('.thesis-collapse').on('hide.bs.collapse show.bs.collapse', function () {
		$(this).prev().toggleClass('active');
	})

	$('.emphasize-toggle input[type=checkbox]').on('change', function () {
		$(this).parents('.thesis-emphasize').toggleClass('emphasized');
	});

	$(".carousel .thesis-balloon").swipe(
		{
			swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
				if (direction == 'left') $(this).parents('.carousel').carousel('next');
				if (direction == 'right') $(this).parents('.carousel').carousel('prev');
			},
			allowPageScroll: "vertical"
		}
	);

	$('#theses-carousel').on('slid.bs.carousel', function () {
		currentIndex = $('div.active').index() + 1;
		$('.current-number', this).html(currentIndex);
		$('.thesis-detail-wrap').removeClass('active');
		$('#theses-detail-' + currentIndex).addClass('active');
	});

	if ($('.thesis-balloon').hammer().length > 0) {
		$('.thesis-balloon').hammer().data('hammer').get('pan').set({direction: Hammer.DIRECTION_ALL});
	}
	$('.thesis-balloon').hammer().on("pan", function (event) {
		if (event.gesture.deltaX === 0) return;
		if (event.gesture.center.x === 0 && event.gesture.center.y === 0) {
			return;
		}

		if (event.gesture.deltaX > 0) {
			$(event.target).removeClass(function (index, className) {
				return (className.match(/swipe-.*/g) || []).join(' ');
			}).addClass('swipe-agree');
		}
		if (event.gesture.deltaX < 0) {
			$(event.target).removeClass(function (index, className) {
				return (className.match(/swipe-.*/g) || []).join(' ');
			}).addClass('swipe-disagree');
		}
		if (event.gesture.deltaY > 50) {
			$(event.target).removeClass(function (index, className) {
				return (className.match(/swipe-.*/g) || []).join(' ');
			}).addClass('swipe-draw');
		}
		if (event.gesture.deltaY < -50) {
			$(event.target).removeClass(function (index, className) {
				return (className.match(/swipe-.*/g) || []).join(' ');
			}).addClass('swipe-skip');
		}

		var xMulti = event.gesture.deltaX * 0.03;
		var yMulti = event.gesture.deltaY / 80;
		var rotate = xMulti * yMulti;

		event.target.style.transform = 'translate(' + event.gesture.deltaX + 'px, ' + event.gesture.deltaY + 'px) rotate(' + rotate + 'deg)';
	});

	$('.thesis-balloon').on('panend', function (event) {

		var moveOutWidth = document.body.clientWidth;
		var keep = true;
		if (Math.abs(event.gesture.deltaX) > 80) {
			// if (Math.abs(event.gesture.velocityX) > 0.5) {
				keep = false;
			// }
		}

		if (Math.abs(event.gesture.deltaY) > 80) {
			// if (Math.abs(event.gesture.velocityY) > 0.5) {
				keep = false;
			// }
		}

		if (keep) {
			event.target.style.transform = '';
			$(event.target).removeClass(function (index, className) {
				return (className.match(/swipe-.*/g) || []).join(' ');
			});
		} else {
			var endX = Math.max(Math.abs(event.gesture.velocityX) * moveOutWidth, moveOutWidth);
			var toX = event.gesture.deltaX > 0 ? endX : -endX;
			var endY = Math.abs(event.gesture.velocityY) * moveOutWidth;
			var toY = event.gesture.deltaY > 0 ? endY : -endY;
			var xMulti = event.gesture.deltaX * 0.03;
			var yMulti = event.gesture.deltaY / 80;
			var rotate = xMulti * yMulti;

			event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.gesture.deltaY) + 'px) rotate(' + rotate + 'deg)';

			var action = ($(event.target).attr("class").match(/swipe-(.*)/)[1]);
			if (action != '') {
				$('#btn-' + action).click();
			}
		}
	});

	$('#btn-agree').on('click', function () {
		$('.thesis-balloon').addClass('swipe-agree').delay(800)
			.queue(function (next) {
				$(this).css('transition', 'transform .3s ease-in-out');
				$(this).css('transform', 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)');
				next();
			});
	});

	$('#btn-disagree').on('click', function () {
		$('.thesis-balloon').addClass('swipe-disagree').delay(800)
			.queue(function (next) {
				$(this).css('transition', 'transform .3s ease-in-out');
				$(this).css('transform', 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)');
				next();
			});
	});

	$('#btn-draw').on('click', function () {
		$('.thesis-balloon').addClass('swipe-draw').delay(800)
			.queue(function (next) {
				$(this).css('transition', 'transform .3s ease-in-out');
				$(this).css('transform', 'translate(-100px, ' + moveOutHeight + 'px) rotate(-10deg)');
				next();
			});
	});

	$('#btn-skip').on('click', function () {
		$('.thesis-balloon').addClass('swipe-skip').delay(800)
			.queue(function (next) {
				$(this).css('transition', 'transform .3s ease-in-out');
				$(this).css('transform', 'translate(-100px, -' + moveOutHeight + 'px) rotate(-10deg)');
				next();
			});
	});

	// setTimeout(function () {
	// 	$('.mobile-help').fadeOut();
	// }, 5000);

	$('.mobile-help').on('click', function () {
		$(this).fadeOut()
	});
});
