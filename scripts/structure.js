function addUnits(value, tag) 
{
	if(tag.match(/menu_width/i) && value.match(/\d+/i)) {
		value = value + "px";
	} 
	if(tag.match(/menu_font_size/i)) {
		value = value + "px";
	} 

	return value;
}

function removeUnits(value, tag)
{
	var val;
	var stringValue = String(value);
	if(val = stringValue.match(/(\d+)px/)) {
		stringValue = val[1];
	} 
	return stringValue;
}




function CSSMenuMaker (defaultData, previousData)
{
  this.findCSSTags = findCSSTags;
  this.renderCSS = renderCSS;
  this.renderJquery = renderJquery; 
  this.getAllSettings = getAllSettings;
  this.jqueryStatus = 0;
  this.depth = 0;
  this.customCSS = "";
    
  if(defaultData) {
    this.css = defaultData.css;
    this.jquery = defaultData.jquery;
    this.themeId = defaultData.id;
    this.depth = defaultData.depth;
    this.postId = defaultData.post_id;    
    this.currentSettings = {};
    this.currentSettings = this.findCSSTags();
    for(tag in this.currentSettings) {
      this.currentSettings[tag] = removeUnits(this.currentSettings[tag], tag);
    }    
    
  } else {

    data = JSON.parse(previousData);
    this.css = data.css;
    this.jquery = data.jquery;
    this.themeId = data.themeId;
    this.postId = data.postId;
    this.depth = data.depth;    
    this.customCSS = data.customCSS;
    this.currentSettings = {};
    this.currentSettings = data.currentSettings;
  }
}



/* 
 * Create array of all tags and their default values that are present in the CSS
 */
function findCSSTags() 
{
	var tagPattern = /\[\[.+?\]\]/gi;
	var tagsFound = {};

	while((n = tagPattern.exec(this.css)) != null) {
		var tag = n[0].match(/\[\[\s*(\w+)/i);
		var value = n[0].match(/:\s*([\w#]+)\s*\]\]/i);
		tag = tag[1];
		if(value) {
			value = value[1];
		}
		tagsFound[tag] = value;
	}
	if(this.css.match(/\.align-center/i)) {
			tagsFound['menu_align'] = "left";
			tagsFound['menu_align_center'] = "";
	}
	if(this.css.match(/\.align-right/i)) {
			tagsFound['menu_align'] = "left";
			tagsFound['menu_align_right'] = "";			
	}
	return tagsFound;
}


/*
params
-- menuClass   : name of class that will replace the #menu_class# tag in the css
-- includePath : path to include files that will replace #include_path# in the css
-- menu_width : 
*/

function renderCSS()
{
  var params = this.currentSettings;
  var output = unescape(this.css);	 
  var foundTags = this.findCSSTags();
  var replaceValue;

  /* Loop through tags present in CSS */
  for(tag in foundTags) {
    if(params.hasOwnProperty(tag)) {
      replaceValue = addUnits(params[tag], tag);
    } else {
      replaceValue = addUnits(foundTags[tag], tag);
    }

    var regex = new RegExp("\\[\\[" + tag + ".+?\\]\\]","gi"); 
    output = output.replace(regex, replaceValue);
  }

  output = output.replace(/#cssmenu/ig, params.menuClass);
  output = output.replace(/#menu_class#/ig, params.menuClass);
  output = output.replace(/\[\[menu_class\]\]/ig, params.menuClass);   
  output = output.replace(/#include_path#/ig, params.includePath);
  output = output.replace(/\[\[include_path\]\]/ig, params.includePath);   

  if(this.customCSS) {
    output += this.customCSS;
  }

  return output;
}



/*
params
-- menuClass   : name of class that will replace the #menu_class# tag in the css
*/
function renderJquery(params)
{
  var output = this.jquery;
  output = output.replace(/#cssmenu/ig, params.menuClass);   
  output = output.replace(/#menu_class#/ig, params.menuClass);
  output = output.replace(/\[\[menu_class\]\]/ig, params.menuClass);   
  
  return output;
}


/* Return array of every menu setting available */
function getAllSettings()
{
	var tags = Array();
	tags['main_color'] = '';
	tags['menu_width'] = '';
	tags['menu_align'] = '';
	tags['menu_font_size'] = '';
	tags['menu_text_color'] = '';
	tags['menu_text_hover_color'] = '';
	tags['menu_background_color'] = '';
	tags['menu_border_color'] = '';	
	tags['sub_menu_width'] = '';
	tags['sub_menu_font_size'] = '';
	tags['sub_menu_text_color'] = '';
	tags['sub_menu_text_hover_color'] = '';
	tags['sub_menu_background_color'] = '';
	tags['sub_menu_border_color'] = '';	
	
	return tags;
}
