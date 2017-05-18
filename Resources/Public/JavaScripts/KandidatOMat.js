$(document).ready(function () {

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
});
