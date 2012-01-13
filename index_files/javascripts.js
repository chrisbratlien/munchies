/*
function submitform(formName, buttonName) {
	document.forms[formName].elements['submitbuttonname'].value = buttonName;
	document.forms[formName].elements['submitbuttonname'].checked = true;
	document.forms[formName].submit();
}
*/

function DropDown_ShopBy_Price_onChange(element) {
	var selectedValue = element.options[element.selectedIndex].value;
	if (selectedValue != '') {
		window.location.href = '/SearchResults.asp?RefineBy_Price=' + selectedValue;
	}
}

function DropDown_ShopBy_Category_onChange(element) {
	var selectedValue = element.options[element.selectedIndex].value;
	if (selectedValue != '') {
		window.location.href = selectedValue;
	}
}

var function_protect_images2_msg = "Sorry, our images are copyrighted.";
function ClearForm()
{
	var FieldType;
	for (var i = 0; i < document.EditForm.length; i++) {
		FieldType = document.EditForm.elements[i].type
		if (FieldType == "text" || FieldType == "textarea") {
			document.EditForm.elements[i].value = ""
		}
		if (FieldType == "select-one") {
			document.EditForm.elements[i].options.selectedIndex = 0
		}
	}
}

function OpenNewWindow(url, width, height)
{
	var randomnumber=Math.floor(Math.random()*5001)
	window.open(url, randomnumber, "top=10,left=10,menubar=0,resizable=1,scrollbars=1,width=" + width + ",height=" + height)
}

function OpenWindowNoScroll(url, width, height) { 
	window.open(url, 'popup_noscroll',
	  "top=10,left=10,menubar=0,resizable=0,scrollbars=0,width=" + width + ",height=" + height)
}

function protect_images2(e) {
if (navigator.appName == 'Netscape' && e.which == 3) {
	alert(function_protect_images2_msg);
	return false;
}
if (navigator.appName == 'Microsoft Internet Explorer' && event.button==2) {
	alert(function_protect_images2_msg);
	return false;
}
else return true;
}

function protect_images1() {
	if(document.images) {
	    for(i=0;i<document.images.length;i++) {
			document.images[i].onmousedown = protect_images2;
			document.images[i].onmouseup = protect_images2;
		}
	}
}

function OpenSideWindow(url){
	rightwidth=300;
	if (document.all) {
		windowheight = screen.availHeight;		
		leftwidth=screen.availWidth-rightwidth-11;
		SideWindow=window.open(url,'SideWindow','width='+rightwidth+',height='+(windowheight-60)+',screenX='+leftwidth+',screenY=0,top=0,left=' +leftwidth+',toolbar=0,location=0,status=1,menubar=0,resizable=1');
		SideWindow.focus();
	} else {
		SideWindow=window.open(url,'','width=280,height=480,toolbar=0,location=0,status=1,menubar=0,resizable=1');
	}
}

function PageName() {
	var pageName = window.location.href.toLowerCase();
	if (pageName.indexOf('_p/') != -1 || pageName.indexOf('-p/') != -1) {
		pageName = 'productdetails.asp';
	}
	else if (pageName.indexOf('_s/') != -1 || pageName.indexOf('-s/') != -1) {
		pageName = 'searchresults.asp';
	}
	else {
		pageName = pageName.substr(pageName.lastIndexOf("/") + 1).replace(/\?[\s\S]*/, "");
	}
	return pageName;
}

function PagePath() {
	return window.location.href.toLowerCase().replace(/http[s]?:\/\/[^\/]*\/?/, "").replace(/\?[\s\S]*/, "");
}

function QueryString(name) {
	var qsRE = new RegExp("[?&]" + name + "=([^&]*)", "i");
	var value = qsRE.exec(location.href);
	return (value) ? decode(value[1]) : "";
}

function GetCookieArray() {
	if (document.cookie.length > 0) {
		var cookieRE = new RegExp("(?:^|;)[\\s]*([^=]*)=([^;]*)", "gi");
		var cookie, cookieArray = new Array();
		cookie = cookieRE.exec(unescape(document.cookie.toString()))
		while (cookie) {
			cookieArray[cookie[1]] = cookie[2];
			cookie = cookieRE.exec(unescape(document.cookie.toString()))
		}
		return cookieArray;
	}
	return "";
}

function GetCookie(name, key, encoded) {
	var value = '', cookies = ';' + document.cookie;
	if (cookies.length > 1) {
		if (key) {
			var cookieRE = new RegExp(';[\\s]*' + name + '=[^;]*' + key + '=([^&;]*)[^;]*', 'i')
		}
		else {
			var cookieRE = new RegExp(';[\\s]*' + name + '=([^;]*)', 'i');
		}
		value = cookieRE.exec(cookies);
		value = (value) ? value[1] : '';
		if (!encoded) {
			value = decode(value);
		}
	}
	return value;
}

var c_minutes = 1, c_hours = 60, c_days = 1440, c_years = 525600;
function SetCookie(name, value, duration, key) {
	var cookie = '';
	if (key) {
		cookie = GetCookie(name, '', true);
		if (cookie != '') {
			cookie = '&' + cookie;
			var keyRE = new RegExp('([\\s\\S]*?)(&' + key + '=)[^&]*([\\s\\S]*)', 'i');
			if (keyRE.test(cookie)) {
				if (value == '') {
					cookie = cookie.replace(keyRE, '$1$3');
				}
				else {
					cookie = cookie.replace(keyRE, '$1$2' + encode(value) + '$3');
				}
			}
			else if (value != '') {
				cookie += '&' + key + '=' + encode(value);
			}
			cookie = cookie.substr(1);
		}
		else if (value == '') {
				cookie = '';
		}
		else {
			cookie = key + '=' + encode(value);
		}
	}
	else if (value != '') {
		cookie = encode(value);
	}
	if (cookie == '') {
		duration = -1000;
	}
	cookie = name + '=' + cookie + ';path=/';

	if (duration) {
		var expireDate = new Date();
		expireDate.setMinutes(expireDate.getMinutes() + parseInt(duration));
		cookie = cookie + ';expires=' + expireDate.toGMTString();
	}
	document.cookie = cookie;
	return value;
}

function encode(value) {
	value = escape(value);
	value = value.replace(/@/gi, "%40");
	value = value.replace(/\*/gi, "%2A");
	value = value.replace(/_/gi, "%5F");
	value = value.replace(/-/gi, "%2D");
	value = value.replace(/\+/gi, "%2B");
	value = value.replace(/\./gi, "%2E");
	value = value.replace(/\//gi, "%2F");
	value = value.replace(/%20/gi, "+");
	return value;
}

function decode(value) {
	value = value.replace(/\+/g, " ");
	value = unescape(value);
	return value;
}

function v$(id) {
	if (typeof(id) == 'string') {
		return document.getElementById(id);
	}
	else {
		return id;
	}
}

function FixEvent(event) {
	if (window.event) {
		var event = window.event;
		event.target = event.srcElement;
	}
	else {
		var event = event;
	}
	return event;
}

function AttachEvent(element, event, func) {
	if (element) {
        if (element.addEventListener) {
		    element.addEventListener(event.toLowerCase(), func, false);
	    }
	    else {
		    element.attachEvent('on' + event.toLowerCase(), func);
	    }
    }
}

function DetachEvent(element, event, func) {
    if (element) {
        if (element.removeEventListener) {
		    element.removeEventListener(event.toLowerCase(), func, false);
	    }
	    else {
		    element.detachEvent('on' + event.toLowerCase(), func);
	    }
    }
	
}

function ShowHide(Element_ID, Show) {
	var Element = v$(Element_ID);
	var elementDisplay = '';
	if (Element) {
		Show = eval(Show)
		elementDisplay = Element.style['display'];
		if (elementDisplay == '') {
			elementDisplay = computedStyle(Element, 'display', 'display');
		}
		if (typeof(Show) == 'undefined' && elementDisplay != 'none' || Show == false) {
			Element.style['display'] = 'none';
			return false;
		}
		else {
			Element.style['display'] = '';
			return true;
		}
	}
}

function vTrim(arg_value) {
	return arg_value.toString().replace(/^[\s]+|[\s]+$/g, '');
}
function addToDropdown(element,newText) {
	newText = vTrim(newText);
	if (newText != '') {
		//make sure it is not already in the list
		for (var i=0; i<element.options.length; i++) {
			if (element.options[i].value == newText) {
				element.selectedIndex = i;
				return;
			}
		}
		element.options[element.options.length] = new Option(newText);
		element.selectedIndex = element.options.length-1;
	}
}



																									//COORDINATES                                                                                                           
var Coordinates = {
	create : function(x, y) {
		return new Coordinate(x, y);
	},

	_offset : function(element) {
		return this.create(element.offsetLeft, element.offsetTop);
	},

	topLeftOffset : function(element) {
		var offset = this._offset(element);
		var parent = element.offsetParent;
		while (parent) {
			offset = offset.plus(this._offset(parent));
			parent = parent.offsetParent;
		}
		delete(parent);
		return offset;
	},

	bottomRightOffset : function(element, topLeftOffset) {
		if (topLeftOffset) return topLeftOffset.plus(this.create(element.offsetWidth, element.offsetHeight));
		return this.topLeftOffset(element).plus(this.create(element.offsetWidth, element.offsetHeight));
	},
	
	relativeOffset : function(element) {
		var x = parseInt(element.style["left"]);
		var y = parseInt(element.style["top"]);
		x = isNaN(x) ? 0 : x;
		y = isNaN(y) ? 0 : y;
		return this.create(x, y);
	},

	mouseOffset : function(event) {
		if (event.pageX >= 0 || event.pageX < 0) {
			return this.create(event.pageX, event.pageY);
		} else if (event.clientX >= 0 || event.clientX < 0) {
			return this.create(event.clientX, event.clientY).plus(this.scrollOffset());
		}
	},
	
	scrollOffset : function() {
		if (window.pageXOffset) {
			return this.create(window.pageXOffset, window.pageYOffset);
		} else if (document.documentElement) {
			return this.create(
					document.body.scrollLeft + document.documentElement.scrollLeft, 
					document.body.scrollTop + document.documentElement.scrollTop);
		} else if (document.body.scrollLeft >= 0) {
			return this.create(document.body.scrollLeft, document.body.scrollTop);
		} else {
			return this.create(0, 0);
		}
	}
}

function vPlacement(element) {
	var offset = jQuery(element).offset();
	var left = offset.left;
	var top = offset.top;
	
	return {'left':left, 'top':top, 'width':element.offsetWidth, 'height':element.offsetHeight}
}

function IEVersion() {
   var rv = 0;
   if (navigator.appName == 'Microsoft Internet Explorer')
   {
      var ua = navigator.userAgent;
      var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null)
         rv = parseFloat( RegExp.$1 );
   }
   return rv;
}


function computedStyle(element, ieStyle, ffStyle) {
		if (element.currentStyle) {
			return element.currentStyle[ieStyle];
		}
		else if (document.defaultView && document.defaultView.getComputedStyle) {
            // fixes an issue with Firefox and iFrames
		    return (document.defaultView.getComputedStyle(element, null)) ? document.defaultView.getComputedStyle(element, null).getPropertyValue(ffStyle) : "";
		}
		else {
			return element.style[ieStyle];
		}
}


function this_AttachEvent(element, eventName, handlerName, handlerReference) {
	eventName = eventName.toLowerCase();
	element[handlerName] = handlerReference;

	if (element.addEventListener) {
		element.addEventListener(eventName, function(e) {element[handlerName](e);}, false);
	}
	else if (element.attachEvent) {
		element.attachEvent('on' + eventName, function(e) {element[handlerName](e);});
	}
	else { 
		var originalHandler = target['on' + eventName];
		if (originalHandler) { 
			element['on' + eventName] = function(e) {originalHandler(e); element[handlerName](e);}; 
		}
		else { 
			element['on' + eventName] = element[handlerName]; 
		} 
	} 
}

function uniquetoggleme(id, style) {
	if(v$(id)) {
		if (style) {
			v$(id).style.backgroundColor = '';
			//v$(id).className=style;
		}
		else {
			v$(id).style.backgroundColor = '#ececec';
			//v$(id).className+=' hover';
		}
	}
}

function Search_For_Products(element) {
	while (element && element.nodeName.toLowerCase() != 'form') {
		element = element.parentNode;
	}
	if (element) {
		if (element.nodeName.toLowerCase() == 'form') {
			element.submit();
		}
	}
}

function addbookmark() {
	var bookmarkurl=window.location.href.substr(0, window.location.href.indexOf('/', 8) + 1) + '';

	if (document.title) {
		var bookmarktitle=document.title;
	}
	else {
			var bookmarktitle="";
	}
	
	if (window.sidebar) {
		window.sidebar.addPanel(bookmarktitle, bookmarkurl, "");
	}
	else if (window.external) {
		window.external.AddFavorite(bookmarkurl, bookmarktitle);
	}
}

function IsReturnKey(evt) {
	return (evt.which && evt.which == 13) || (evt.keyCode && evt.keyCode == 13);
}

function CancelEvent(evt)
{
	evt.cancelBubble = true;
	evt.returnResult = false;
	if (evt.preventDefault)
	{
		evt.preventDefault();
	}
	if (evt.stopPropagation)
	{
		evt.stopPropagation();
	}
	return false;
}

var textAreaContent = ""
function textAreaKeyDown(elem, limitNum){
	
    if (elem.value.length > limitNum) 
		elem.value = textAreaContent;
	else
		textAreaContent = elem.value;
}

function textAreaKeyUp(elem, limitNum){
	
    if (elem.value.length > limitNum) 
		elem.value = textAreaContent;
	else	
		textAreaContent = elem.value;	
}

// escape() will _not_ encode: @*/+
// encodeURI() will _not_ encode: ~!@#$&*()=:/,;?+'
// encodeURIComponent() will _not_ encode: ~!*()'

function serialize(form) {
	var serialString = '', serialObject = {}, name, element, type, options;

	var addValue = function(objName, objValue) {
	    //serialString += '&' + encodeURI(objName) + '=' + encodeURI(objValue);
	    serialString += '&' + escape(objName) + '=' + escape(objValue);
	}

	var elements = form.getElementsByTagName('input');
	for (var i = 0; i < elements.length; i++) {
		element = elements[i];
		name = element.name;
		if (name) {
			type = element.type;
			if (type != 'button' && type != 'submit' && type != 'image') {
				if ((type != 'checkbox' && type != 'radio') || element.checked === true) {
					addValue(name, element.value);
				}
			}
		}
	}

	var elements = form.getElementsByTagName('select');
	for (var i = 0; i < elements.length; i++) {
		element = elements[i];
		name = element.name;
		if (name) {
			var options = element.options;
			for (var x = 0; x < options.length; x++) {
				if (options[x].selected === true) {
					addValue(name, options[x].value);
				}
			}
		}
	}

	var elements = form.getElementsByTagName('textarea');
	for (var i = 0; i < elements.length; i++) {
		element = elements[i];
		name = element.name;
		if (name) {
			addValue(name, element.value);
		}
	}

  for (var i = 1; i < arguments.length; i += 2) {
		addValue(arguments[i], arguments[i + 1]);
	}

	addValue = null;
	addValue = null;

	serialString = serialString.substr(1);
	return serialString;
}

function getElementsByClassName(clsName) {
    var retVal = new Array();
    var elements = document.getElementsByTagName("*");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].className.indexOf(" ") >= 0) {
            var classes = elements[i].className.split(" ");
            for (var j = 0; j < classes.length; j++) {
                if (classes[j] == clsName)
                    retVal.push(elements[i]);
            }
        }
        else if (elements[i].className == clsName)
            retVal.push(elements[i]);
    }
    return retVal;
}

var agt = '';
if (navigator.userAgent) { agt=navigator.userAgent.toLowerCase(); }
var is_major = parseInt(navigator.appVersion); 
var is_minor = parseFloat(navigator.appVersion); 
var is_nav  = ((agt.indexOf('mozilla')!=-1) && (agt.indexOf('spoofer')==-1) 
			&& (agt.indexOf('compatible') == -1) && (agt.indexOf('opera')==-1) 
			&& (agt.indexOf('webtv')==-1)); 
var is_nav4 = (is_nav && (is_major == 4)); 
var is_nav4up = (is_nav && (is_major >= 4)); 
var is_navonly      = (is_nav && ((agt.indexOf(";nav") != -1) || 
					  (agt.indexOf("; nav") != -1)) ); 
var is_nav5 = (is_nav && (is_major == 5)); 
var is_nav5up = (is_nav && (is_major >= 5)); 
var is_ie   = (agt.indexOf("msie") != -1); 
var is_ie3  = (is_ie && (is_major < 4)); 
var is_ie4  = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.0")==-1) ); 
var is_ie4up  = (is_ie  && (is_major >= 4)); 
var is_ie5  = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.0")!=-1) ); 
var is_ie5up  = (is_ie  && !is_ie3 && !is_ie4);



//facebook like button

if (document.namespaces) {
	var FacebookNS = 'http://www.facebook.com/2008/fbml';
	document.namespaces.add('fb', FacebookNS);
}

jQuery(document).ready(function() {
	var el = null;

	jQuery('*').filter(function(index) {
		return /like/i.test(this.nodeName);
	}).each(function() {
		el = this;
	});

	//facebook button found	- even if multiple instances, create only one instance of script element
	if (el) {

		if (el.parentNode && el.parentNode['id'] && el.parentNode['id'] == 'FacebookLikeButtonDiv') {
			el = el.parentNode;
		}

		var fbDiv = document.createElement('div');
		jQuery(fbDiv).attr('id', 'fb-root');
		jQuery(el).after(fbDiv);

		//original fb init code
		window.fbAsyncInit = function () {
            // TODO: move this code out of javascripts.js; we don't want to hardcode the below app ID everywhere.
		    FB.init({ appId: '183622035018280', status: true, cookie: true,
				xfbml: true
			});
		};
		(function() {
			var e = document.createElement('script'); e.async = true;
			e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
			document.getElementById('fb-root').appendChild(e);
		} ());

	}

});

//facebook like button - end



//predictive search


jQuery(document).ready(function() {

	if (!window['Config_Search_Auto_Complete']) {
		return;
	}

	jQuery('form[name="SearchBoxForm"] input[name="Search"]').each(function() {

		//remove click handler
		this.onclick = '';

		var value = this.value;
		jQuery(this).focus(function() {
			if (this.value == value) {
				this.value = '';
			}
		});
		jQuery(this).blur(function() {
			if (this.value == '') {
				this.value = value;
			}
		});

		//pass through {enter} to submit search
		jQuery(this).keydown(function(event) {
			if (event.keyCode == '13') {
				if (this.value == '') {
					event.preventDefault();
					return;
				}
				this.form.submit();
			}
		});

		jQuery(this).autocomplete({
			source: [],
			delay: 0,
			minLength: 0,
			select: function(event, ui) {
				window.setTimeout(function() {
					var url = '/ProductDetails.asp?ProductCode=' + ui.item.desc;
					location.href = url;
				}, 50);
			},
			search: function(event, ui) {

				if (this.value == '' || this.value.length < 3) {
					jQuery(this).autocomplete('close');
					predictiveSearch_Dispose();
					return false;
				}
				if (predictiveSearch_Initialized(this.value)) {
					return; //already initialized - no pre-search tasks
				}
				predictiveSearch_Init(this, this.value);
				return false; //cancel search - retrieve values then display with search = ''
			},
			open: function(event, ui) {
				//left align
				jQuery.fn.setEllipses = setEllipses;
				jQuery('ul.ui-autocomplete').css({ 'white-space': 'nowrap', 'max-width': '330px', 'overflow': 'hidden' });
				jQuery('ul.ui-autocomplete li.ui-menu-item').css({ 'text-align': 'left', 'white-space': 'nowrap', 'max-width': '330px', 'overflow': 'hidden' });
				jQuery('ul.ui-autocomplete li.ui-menu-item').setEllipses();
			}
		});
		
		jQuery(this).data("autocomplete")._renderItem = function(ul, item) {
			return $( "<li></li>" )
				.data( "item.autocomplete", item )
				.append( "<a>" + item.label + "</a>" )
				.appendTo( ul );
		};

	});
});



var predictiveSearch = null;

function predictiveSearch_Dispose() {
	if (predictiveSearch) {
		predictiveSearch.Disposed = true;
	}
}

function predictiveSearch_Init(source, search) {
	predictiveSearch_Dispose();
	predictiveSearch = new PredictiveSearch();
	predictiveSearch.source = source;
	predictiveSearch.search = search;
	predictiveSearch.Init();
}

function predictiveSearch_Initialized(search) {
	if (predictiveSearch) {
		//if search event for current search, return status
		if (predictiveSearch.search == search) {
			return predictiveSearch.Initialized;
		}
	}
	return false;
}

function PredictiveSearch() { }
PredictiveSearch.prototype.Initialized = false;
PredictiveSearch.prototype.Disposed = false;
PredictiveSearch.prototype.source = null;
PredictiveSearch.prototype.search = '';
PredictiveSearch.prototype.result = '';
PredictiveSearch.prototype.Init = function() {

	var instance = this;

	//get cached item
	if (window.sessionStorage && false) {
		var result = sessionStorage[this.search];
		if (result) {
			this.result = result;
			this.Complete();
			return;
		}
	}

	window.setTimeout(function() {
		//retrieve data
		instance.RetrieveData();
	}, 200);

}

PredictiveSearch.prototype.RetrieveData = function() {

	if (this.Disposed) {
		return;
	}

	var instance = this;
	var url = '/searchsuggest.asp?s=' + encodeURIComponent(this.search);
	
	jQuery.ajax({
		url: url,
		dataType: 'text',
		success: function(data, textStatus, XMLHttpRequest) {
			jQuery(instance.source).autocomplete('close');
			if (/^\{[\w\W]*\}$/m.test(data)) {
				instance.result = data;
				instance.Continue();
			}
		},
		error: function() {
			jQuery(instance.source).autocomplete('close');
			return false;
		}
	});
}


PredictiveSearch.prototype.Continue = function() {

	//set cached item
	if (window.sessionStorage) {
		sessionStorage[this.search] = this.result;
	}

	if (this.Disposed) {
		return;
	}

	this.Complete();

}

PredictiveSearch.prototype.Complete = function() {

	var json = eval('(' + this.result + ')');

	var s = [];
	var t = '';

	if (json['s']) {
		for (var i = 0, l = json['s'].length; (i < l && i < 10); i++) {
			s[i] = {};
			t = json['s'][i]['ProductName'].replace(/<[^>]*>/g, '');
			s[i].value = s[i].label = jQuery('<div>').html(t).text();
			s[i].label = highlightSearchText(this.search, s[i].value);
			s[i].desc = json['s'][i]['ProductCode'];
		}

		//initialized
		this.Initialized = true;
		jQuery(this.source).autocomplete('option', 'source', s);
		jQuery(this.source).autocomplete('search', '');
	}
}

// Function that returns the result with the search text highlighted using html tags.
// Input Params - search text, result text.
// Output       - result with search text highlighted wherever it occurs.
function highlightSearchText(search, result) {
	
	var regex = new RegExp(search,"gi");
	var startIndex, startIndices = [];
	
	// Find all the start indices of the search text in the result
	while ( (startIndex = regex.exec(result)) ) 
	{
		startIndices.push(startIndex.index);
	}

	var originalResultLength = result.length; 
	
	for (var i = 0; i < startIndices.length; i++) 
	{
		result = result.substring(0, startIndices[i]) +
		         "<b>" + result.substring(startIndices[i], (startIndices[i] + search.length)) + "</b>" +  // Text to be highlighted
		         result.substring(startIndices[i] + search.length);

		// Find out the number of characters (in html tags) that has been added to the result.
		// This value need only be calculated once.
		if (i == 0)
			htmlStylingTagsLength = result.length - originalResultLength;
			
		// In each iteration, the length of result text increases because of the insertion of the html tags. 
		// So, the subsequent start indices must also be updated.
		if (i < (startIndices.length - 1))
			startIndices[i + 1] += htmlStylingTagsLength + (htmlStylingTagsLength * i);
	}
	return result;	
}

function setEllipses() {
	this.each(function(index, Element) {
		var li = jQuery(Element);

		var width = li.width();
		var text = jQuery(Element).text();

		var el = document.getElementById('ellipses_div');
		if (!el) {
			var fontSize = li.css('font-size');
			var fontFamily = li.css('font-family');
			el = document.createElement('div');
			jQuery(el).css({ 'visibility': 'hidden', 'float': 'left', 'font-size': fontSize, 'font-family': fontFamily }).attr('id', 'ellipses_div');
			jQuery('body').append(el);
		}
		var hidden_div = jQuery(el);
		hidden_div.text(text);

		while (text.length > 0 && hidden_div.width() >= width) {
			text2 = text.substr(0, text.length - 4) + '...';
			text2 = text2.replace(' ...', '...')
			li.html(li.html().replace(text, text2));
			hidden_div.text(text);
			text = text2;
		}
	});
}

jQuery.fn.setEllipses = setEllipses;



//predictive search - end


function DisplayLocalDate(value, ServerUTCOffset) {
	var d = new Date();
	var o = ServerUTCOffset - d.getTimezoneOffset();
	d = new Date(value);
	d.setMinutes(d.getMinutes() + o);
	return d.toString();
}