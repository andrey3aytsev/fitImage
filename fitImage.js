var FitImage = function(element, options){
	this.$el = $(element);
	this.$img = $(element).find('img');
	this.options = jQuery.extend({}, jQuery.fn.fit.defaults, options);
	this.init();
	return this;
}	

FitImage.prototype.getContainerRatio = function(){
	var FitImage = this;
	return ( FitImage.$el.width()/FitImage.$el.height() );
}

FitImage.prototype.getImageRatio = function(){
	var FitImage = this;
	return ( FitImage.$img.width()/FitImage.$img.height() );
}

FitImage.prototype.getImageSrc = function(){
	var FitImage = this;
	return ( FitImage.$img.attr('src') );
}

FitImage.prototype.addSpecialClass = function(){
	var FitImage = this;

	$('<img/>').attr('src', FitImage.getImageSrc()).on('load', function(){
		if ( FitImage.getContainerRatio() < FitImage.getImageRatio() ) {
			FitImage.$img.addClass(FitImage.options.vertClass).removeClass(FitImage.options.horClass);
		} else {
			FitImage.$img.addClass(FitImage.options.horClass).removeClass(FitImage.options.vertClass);
		}
	})
}

FitImage.prototype.init = function(){

	var FitImage = this;

	FitImage.$el.css({
		'position': 'relative'
	})

	FitImage.addSpecialClass();
	$(document).on('resize', function(){
		FitImage.addSpecialClass();
	})
	
}

jQuery.fn.fit = function(options) {
    return new FitImage(this, options);
}

jQuery.fn.fit.Constructor = FitImage;

jQuery.fn.fit.defaults = {
    horClass: 'fit-hor',
    vertClass: 'fit-vert'
}
