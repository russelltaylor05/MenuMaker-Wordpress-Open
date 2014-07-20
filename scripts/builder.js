(function ($) {



/*********************/
/*   Preview Menu    */
/*********************/


/* 
 * Update the visible menu for preview
 */ 
function previewMenu(builder)
{
  
	var currentTags = builder.findCSSTags();
	var menuSettings = Array();
	var jquerySettings = Array();
	var parser = new(less.Parser);
  var renderedJquery = undefined;
  
	/* Update build.currentSettings  */	  
  for(tag in currentTags) {
    builder.currentSettings[tag] = $("input[name='" + tag + "'], select[name='" + tag + "']").val();
    builder.currentSettings[tag] = builder.currentSettings[tag];
  }
  if (builder.currentSettings['menu_align'] == 'right' || builder.currentSettings['menu_align'] == 'center') {
    var menu_class = 'align-' + builder.currentSettings['menu_align'];
  } else {
    var menu_class = '';
  }  
  builder.currentSettings['menuClass'] = "#cssmenu-" + builder.postId;
  builder.currentSettings['includePath'] = cssmenu_global.root_url + "/wp-content/plugins/cssmenumaker/menus/" + builder.themeId + "/images/";            
  
	var renderedCSS = builder.renderCSS();
 	parser.parse(renderedCSS, function (err, tree) {
 	    if (err) { return console.error(err) }
			$("#menu-code").html("<style>" + tree.toCSS() + "</style>");          
			$("#menu-code").append("<style>" + tree.toCSS() + "</style>");              
      $("#cssmenu_css").val(tree.toCSS());
 	});
  
  /* jQuery */
  if(builder.jquery) {

    jquerySettings['menuClass'] = builder.currentSettings['menuClass'];    
    renderedJquery = builder.renderJquery(jquerySettings);      
    $("#cssmenu_js").html(renderedJquery);      
    
    if(!builder.jqueryStatus) {
      eval(renderedJquery);  
    }        
    builder.jqueryStatus = 1;    
    
  } else {
     $("#cssmenu_js").val("");  
  }


  $("#cssmenu_settings").val(JSON.stringify(builder));
  
}





/*****************/
/*   SETTINGS    */
/*****************/


/* 
 * Load Settings from DB
 */
function initSettings(callback, builder) 
{
	var availSettings = builder.findCSSTags(builder.css);
	var allSettings = getAllSettings();  

	/* Load menu settings from DB into inputs */
	for(setting in availSettings) {
		if(setting in allSettings) {
      $("input[name='" + setting + "'], select[name='" + setting + "']").val(builder.currentSettings[setting]);	
		}	
	}
  
	setSettings(availSettings, allSettings, builder);
	callback(builder);
}

/*
 * Hide, Show and Update settings forms
 */
function setSettings(availSettings, allSettings, builder)
{
	this.menu_settings_visible = 0;
	this.sub_menu_settings_visible = 0;
	var parentObject = this;
  
	
	/* Hide Auto/Pixel select for Vertical Menus */
	if(('menu_width' in availSettings) && availSettings['menu_width'].match(/px/i)) {
		$("#menu_width_element select").hide();
	}
	
	/* menu_width */
	if(availSettings['menu_width']) {		
		if($("input[name='menu_width']").val() == 'auto') {
			$("#menu_width_element select").val('auto');
			$("#menu_width_element .units").hide();
			$("#menu_width_element input").hide();			
		} else {
			$("#menu_width_element select").val('pixels');			
			$("#menu_width_element input").show();
		}
	}
	$("select[name='menu_width_unit']").change(function(){
		if($(this).val() == 'auto') {
			$("#menu_width_element input[type='text']").hide();
			$("#menu_width_element .units").hide();
			$("#menu_width_element input[type='text']").val('auto');
		}  else {
			$("#menu_width_element input[type='text']").show();
			$("#menu_width_element .units").show();
			$("#menu_width_element input[type='text']").val('');
		}
	});	
	
	/* Menu Align */
	if(!('menu_align_center' in availSettings)) {
		$("select[name='menu_align'] option[value='center']").remove();
	}
	if(!('menu_align_right' in availSettings)) {
		$("select[name='menu_align'] option[value='right']").remove();
	}
	
	/* Main Color */	
	if(availSettings['main_color']) {	
		var color = $("#menu-color input[name='main_color']").val();		
		$("#menu-color .trigger span").css('backgroundColor', color);				

    $("#menu-color .trigger").spectrum({
        color: color,
        showInput: true,
        showInitial: true,
        preferredFormat: "hex",
        move: function(color) {
            var hex = color.toHexString(); // #ff0000
            $("#menu-color .trigger span").css('backgroundColor', hex);
            $("#menu-color input").val(hex);  
            previewMenu(builder);
        },
        change: function(color) {
            var hex = color.toHexString(); // #ff0000
            $("#menu-color .trigger span").css('backgroundColor', hex);
            $("#menu-color input").val(hex);  
            previewMenu(builder);
        }
    });

	} else {
		$("#menu-color").hide();
	}
	
	/* Colors */
	$(".setting-item.color-picker").each(function(index){
		var options = new Object();
		var setting = $(this).children("input[type='text']").attr('name');
		var color = $(this).children("input[name='" + setting + "']").val();
		var preview =  $(this);
		
		$(this).find(".trigger span").css('backgroundColor', color);		

    $(this).children(".trigger").spectrum({
        color: color,
        showInput: true,
        showInitial: true,
        preferredFormat: "hex",
        move: function(color) {
            var hex = color.toHexString(); // #ff0000
            preview.find(".trigger span").css('backgroundColor', hex);
            preview.find("input").val(hex);  
        },
        change: function(color) {
            var hex = color.toHexString(); // #ff0000
            preview.find(".trigger span").css('backgroundColor', hex);
            preview.find("input").val(hex);
            previewMenu(builder);            
        }
    });    



    // $(this).children(".trigger").ColorPicker({
    //   color  : color,
    //       onChange: function (hsb, hex, rgb) {
    //         preview.find(".trigger span").css('backgroundColor', '#' + hex);
    //     preview.find("input").val("#" + hex);
    //       }
    // });


	});

	/* Hide inactive settings */
	for(tag in allSettings) {
		if(!availSettings[tag]) {
			$("#" + tag + "_element").addClass("inactive").hide();
		} else {			
		
		}
	}
	
	$("#menu-settings-overlay .setting-item").each(function(index){
		if(!$(this).hasClass("inactive")) {
			parentObject.menu_settings_visible = 1;
		}
	});
	if(!menu_settings_visible) {
		$("#menu-settings-trigger").hide();
	}
	$("#sub-menu-settings-overlay .setting-item").each(function(index){
		if(!$(this).hasClass("inactive")) {
			parentObject.sub_menu_settings_visible = 1;
		}
	});
	if(!sub_menu_settings_visible) {
		$("#sub-menu-settings-trigger").hide();
	}
	
	if(!menu_settings_visible && !sub_menu_settings_visible) {
		$("#menu-settings.panel").hide();
	}
}

function settingsFunctionality(builder) 
{
  
  
  /* Custom CSS */
  $("#custom-css-trigger").magnificPopup({
    type: 'inline',
    alignTop: 'true;',
    midClick: true
  });   
  $("#custom-css-overlay a.submit").click(function(e){
    builder.customCSS = $("#cssmenu_custom_css").val();
    e.preventDefault();
    $.magnificPopup.close();
    previewMenu(builder);
  });
  $("#custom-css-overlay a.cancel").click(function(e){
    e.preventDefault();
    $.magnificPopup.close();
  });
  
  
	/* Settings Overlays */
	$("#menu-settings-trigger").click(function(event){
		event.preventDefault();
		if(!$("#sub-menu-settings-overlay").is(":visible")){
			$("#menu-settings-overlay").show();
			var settings = grabCurrentSettings($("#menu-settings-overlay form"));
			cancelBehavior(settings, $("#menu-settings-overlay"));
		}
	});
	$("#sub-menu-settings-trigger").click(function(event){
		event.preventDefault();
		if(!$("#menu-settings-overlay").is(":visible")){
			$("#sub-menu-settings-overlay").show();		 	
			var settings = grabCurrentSettings($("#sub-menu-settings-overlay form"));
			cancelBehavior(settings, $("#sub-menu-settings-overlay"));
		}		 
	});
  
  $("#sub-menu-settings-overlay, #sub-menu-settings-trigger").click(function(e) {
    e.stopPropagation(); 
  });  
  $("#menu-settings-overlay, #menu-settings-trigger").click(function(e) {
    e.stopPropagation(); 
  });  
  $(document).click(function(){  
    $("#sub-menu-settings-overlay").hide();
    $("#menu-settings-overlay").hide();    
  }); 

	 $("a.cancel").click(function(event){
		 event.preventDefault();
		 $(".settings-overlay").hide();		 
	 });
	 
	 	 
	 $(".settings-overlay #menu-settings-form a.cssmenu-submit").click(function(event){
		 event.preventDefault();
		 $(".settings-overlay").hide();
		 previewMenu(builder);
		 return false;
	 });
}

function grabCurrentSettings(form)
{
	this.settings = new Array();
	var item = this;

	form.find("input[type='text'], select").each(function(index){
		var name = $(this).attr("name");
		item.settings[name] = $(this).val();		
	});	

	return this.settings;
}

function cancelBehavior(settings, overlay)
{
	
	overlay.find("a.cancel").click(function(event)
	{
		event.preventDefault();		
		for (index in settings) {
			var input = overlay.find("input[name='" + index + "'], select[name='" + index + "']");
			input.val(settings[index]);
		}
		if($("input[name='menu_width']").val() == 'auto') {
			$("#menu_width_element select").val('auto');
			$("#menu_width_element input").hide();			
		} else {
			$("#menu_width_element select").val('pixels');			
			$("#menu_width_element input").show();
		}
		
		overlay.find(".setting-item.color-picker").each(function(index){
			var color = $(this).find("input[type='text']").val();		
			$(this).find(".trigger span").css('backgroundColor', color);		
		});
		
	});
}




/***********************/
/*   Document READY    */
/***********************/

$(document).ready(function()
{  

  var theme_id = $("input[name='cssmenu_theme_id']").val();
  var post_id = $("input[name='post_ID']").val();
  var url = cssmenu_global.root_url + "/wp-admin/admin-ajax.php?action=get_menu_json&theme_id=" + theme_id;
  var previousData = $("textarea[name='cssmenu_settings']").val();

  if(previousData) {

    var builder = new CSSMenuMaker(null, previousData);      

    initSettings(previewMenu, builder); /* hide and show available settings */
    settingsFunctionality(builder);
    
        
  } else {

  	$.getJSON(url, function(data) {
      data.post_id = post_id;      
      var builder = new CSSMenuMaker(data, null);      
      initSettings(previewMenu, builder); /* hide and show available settings */
      settingsFunctionality(builder);      
  	});        
  }



  
  /**************************/
  /* Theme Selection/Change */
  /**************************/
  
  $('.theme-trigger-initial').magnificPopup({
    type: 'inline',
    alignTop: 'true;',
    midClick: true
  });  

  $('.theme-trigger').magnificPopup({
    type: 'inline',
    alignTop: 'true;',
    midClick: true 
  });    
  
  if(!theme_id) {
    $(".theme-trigger").hide();
  } else {
    $(".theme-trigger-initial").hide();
  }
  
  /* Theme select for Overlay */
  $("#theme-thumbs a").click(function(event){
    event.preventDefault();
    theme_id = $(this).attr('data-id');
    $("input[name='cssmenu_theme_id']").val(theme_id);
    var post_id = $("input[name='post_ID']").val();
  	var url = cssmenu_global.root_url + "/wp-admin/admin-ajax.php?action=get_menu_json&theme_id=" + theme_id;      
  	$.getJSON(url, function(data) {

      data.post_id = post_id;      
      var builder = new CSSMenuMaker(data, null);      
      $("#cssmenu_settings").val(JSON.stringify(builder));

      if($("input[name='cssmenu_step']").val() == 2) {
        $("#cssmenu_js").val("");  
        $("#cssmenu_css").val("");
        $("form#post").submit();
        
      } else {      
        var url = cssmenu_global.root_url + "/wp-admin/admin-ajax.php?action=get_menu_json&theme_id=" + theme_id
      	$.getJSON(url, function(data) {
          var img = "<img src='" + cssmenu_global.root_url + "/wp-content/plugins/cssmenumaker/menus/" + data.thumbnail + "' />";
          $(".theme-trigger span").html(img);
      	});
        $(".theme-trigger").show();
        $(".theme-trigger-initial").hide();
      }

    });      
    $.magnificPopup.close();
  });

  
  $("#filters .cats a").click(function(event){
    $("#filters .cats li").removeClass('active');   
    $(this).parent("li").addClass('active');
    var classes = $(this).attr('class');
    $("#theme-thumbs li").hide();
    $("#theme-thumbs li." + classes).show();    
  });
  
  
  $("#publish.step-1").click(function(event){
    event.preventDefault();
    if(!$("input[name='cssmenu_theme_id']").val()){
      alert("Please select a theme before continuing");
      return false;
    } else {
      $("form#post").submit();      
      return true;
    }
  });

  
  /***************/
  /* Menu Options */
  /***************/
  
  
  $(".cssmenumaker-menu a").click(function(event){
    event.preventDefault();
  });
  
  if($("#options-display").hasClass('step-2')) {
    $("#menu-options").hide();  
  }
  $('#option-toggle a').click(function(event){
    $('#option-toggle a').removeClass("active");
    $(this).addClass('active');
    if($(this).attr('href') == '#theme') {
      $("#theme-options").show();
      $("#menu-options").hide();      
    } else {
      $("#theme-options").hide();
      $("#menu-options").show();            
    }    
  });
      
  $("select[name='cssmenu_structure']").change(function() {
    if($("#options-display").hasClass('step-2')) {
      $("form#post").submit();
    }    
  });
  
  


});


})(jQuery);