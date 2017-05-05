$(document).ready(function(){

	window.viewportUnitsBuggyfill.init();

	$(document).on('hidden', "#global-modal", function(){
		$("#global-modal").removeData("modal");
	});

	$(document).on('click', ".modal-link", function(){

		var target = $(this).attr("href");

		$.get(target, function(data){
			$("#global-modal .modal-content").html(data);
			$("#global-modal").modal("show");
		});

		return false;

	});
});
