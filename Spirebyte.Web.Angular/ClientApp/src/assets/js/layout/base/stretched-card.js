/* eslint-disable */
"use strict";

import { KTUtil } from "./../../components/util.js";
import KTLayoutContent from "./content.js";

var KTLayoutStretchedCard = function() {
    // Private properties
	var _element;

	// Private functions
	var _init = function() {
		var header = KTUtil.getById('kt_header');
		var content = KTUtil.getById('kt_content');
		var footer = KTUtil.getById('kt_footer');

		var scroll = KTUtil.find(_element, '.card-scroll');
		var cardBody = KTUtil.find(_element, '.card-body');
		var cardHeader = KTUtil.find(_element, '.card-header');
		var cardFooter = KTUtil.find(_element, '.card-footer');

		var viewport = KTUtil.getViewPort();
		var height = viewport.height;

		height = height - parseInt(KTUtil.actualHeight(cardHeader));
		if(cardFooter != null)
		height = height - parseInt(KTUtil.actualHeight(cardFooter));

		if(header != null)
			height = height - parseInt(KTUtil.actualHeight(header));
		if(footer != null)
			height = height - parseInt(KTUtil.actualHeight(footer));

		height = height - parseInt(KTUtil.css(_element, 'marginTop')) - parseInt(KTUtil.css(_element, 'marginBottom'));
		height = height - parseInt(KTUtil.css(_element, 'paddingTop')) - parseInt(KTUtil.css(_element, 'paddingBottom'));

		height = height - parseInt(KTUtil.css(cardBody, 'paddingTop')) - parseInt(KTUtil.css(cardBody, 'paddingBottom'));
		height = height - parseInt(KTUtil.css(cardBody, 'marginTop')) - parseInt(KTUtil.css(cardBody, 'marginBottom'));

		
		height = height - parseInt(KTUtil.css(header, 'paddingTop')) - parseInt(KTUtil.css(header, 'paddingBottom'));
		height = height - parseInt(KTUtil.css(header, 'marginTop')) - parseInt(KTUtil.css(header, 'marginBottom'));

		height = height - parseInt(KTUtil.css(content, 'paddingTop')) - parseInt(KTUtil.css(content, 'paddingBottom'));
		height = height - parseInt(KTUtil.css(content, 'marginTop')) - parseInt(KTUtil.css(content, 'marginBottom'));


		height = height - 3;

		KTUtil.css(scroll, 'height', height + 'px');
	}

    // Public methods
	return {
		init: function(id) {
            _element = KTUtil.getById(id);

            if (!_element) {
                return;
            }

            // Initialize
			_init();

            // Re-calculate on window resize
            KTUtil.addResizeHandler(function() {
				_init();
			});
		},

		update: function() {
			_init();
			console.log("test update");
		}
	};
}();

// Webpack support
if (typeof module !== 'undefined') {
	// module.exports = KTLayoutStretchedCard;
}

export default KTLayoutStretchedCard;