define([
	"../core"
], function( jQuery ) {

	jQuery.parseXML = function(data) {
		var xml, tmp;
		if(!data || typeof data !== "string") {
			return null;
		}

		try{
			// IE9 以下不支持
			tmp = new DOMParser();
			// http://www.w3school.com.cn/xmldom/dom_domparser.asp
			xml = tmp.parseFromString(data, "text/xml");
		}catch(e) {
			xml = undefined;
		}

		if(!xml || xml.getElementsByTagName("parsererror").length) {
			jQuery.error("Invalid XML: " + data);
		}
		return xml;
	};

	return jQuery.parseXML;
});