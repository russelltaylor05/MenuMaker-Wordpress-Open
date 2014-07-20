	<div id='builder-settings-panel' class='clearfix builder-panel'>
		<div class='panel' id='menu-color'>
			<h4>Color</h4>
			<div class='color-picker clearfix' id='main_color_element'>
				<a href="#" class='trigger clearfix'><span></span><div class='cssmenu-arrow'></div></a>
				<input class='units' type='text' name='main_color' value='' disabled/>				
			</div>
		</div><!-- /.panel -->			
		<div class='panel' id='menu-settings' />
			<h4>Settings</h4>
			<a id='menu-settings-trigger' class="fancy-select" href='#'><span>Main Menu<span></a>
			<div id='menu-settings-overlay' class='settings-overlay'><div>
				<div class="arrow-up"></div>
				<h4>Menu Settings</h4>
				<div id='menu-settings-form'>
					<div class='setting-item clearfix' id='menu_width_element'>
						<label for='menu_width_unit'>Width</label>
						<input type='text' name='menu_width' value='auto' />
						<p class='units'>px</p>
						<select name='menu_width_unit'>
							<option value='auto'>Auto</option>
							<option value='pixels'>Pixels</options>
						</select>							
					</div>
					<div class='setting-item clearfix' id='menu_align_element'>
						<label for='menu_align'>Align</label>
						<select name='menu_align'>
							<option value='left'>Left</option>
							<option value='center'>Center</options>
							<option value='right'>Right</options>
						</select>
					</div>
					<div class='setting-item clearfix' id='menu_font_size_element'>
						<label for='menu_font_size'>Font Size</label>
						<input type='text' name='menu_font_size' value='' />
						<p class='units'>px</p>
					</div>
					<div class='setting-item color-picker clearfix' id='menu_background_color_element'>
						<label>Background</label>
						<a href="#" class='trigger'><div class='cssmenu-arrow'><span></span></div></a>
						<input class='units' type='text' name='menu_background_color' value='' disabled/>
					</div>						
					<div class='setting-item color-picker clearfix' id='menu_text_color_element'>
						<label>Text</label>
						<a href="#" class='trigger'><div class='cssmenu-arrow'><span></span></div></a>
						<input class='units' type='text' name='menu_text_color' value='' disabled/>
					</div>
					<div class='setting-item color-picker clearfix' id='menu_text_hover_color_element'>
						<label>Text Hover</label>
						<a href="#" class='trigger'><div class='cssmenu-arrow'><span></span></div></a>
						<input class='units' type='text' name='menu_text_hover_color' value='' disabled/>
					</div>
					<div class='setting-item color-picker clearfix' id='menu_border_color_element'>
						<label>Border</label>
						<a href="#" class='trigger'><div class='cssmenu-arrow'><span></span></div></a>
						<input class='units' type='text' name='menu_border_color' value='' disabled/>
					</div>

					<a href="#" class='blue-button cssmenu-submit'>Apply</a>
					<a href='#' class='cancel'>Cancel</a>
				</div><!-- /#menu-setting-form -->
			</div></div><!-- /settings-overlay -->			
			<a id='sub-menu-settings-trigger' class="fancy-select" href='#'><span>Sub Menu</span></a>
			<div id='sub-menu-settings-overlay' class='settings-overlay'><div>
				<div class="arrow-up"></div>
				<h4>Sub Menu Settings</h4>
				<div id='menu-settings-form'>
					<div class='setting-item clearfix' id='sub_menu_width_element'>
						<label for='sub_menu_width_unit'>Width</label>
						<input type='text' name='sub_menu_width' value='auto' />
						<p class='units'>px</p>							
					</div>
					<div class='setting-item clearfix' id='sub_menu_font_size_element'>
						<label for='sub_menu_font_size'>Font Size</label>
						<input type='text' name='sub_menu_font_size' value='' />
						<p class='units'>px</p>
					</div>
					<div class='setting-item color-picker clearfix' id='sub_menu_text_color_element'>
						<label>Text</label>
						<a href="#" class='trigger'><div class='cssmenu-arrow'><span></span></div></a>
						<input class='units' type='text' name='sub_menu_text_color' value='' disabled/>
					</div>
					<div class='setting-item color-picker clearfix' id='sub_menu_text_hover_color_element'>
						<label>Text Hover</label>
						<a href="#" class='trigger'><div class='cssmenu-arrow'><span></span></div></a>
						<input class='units' type='text' name='sub_menu_text_hover_color' value='' disabled/>
					</div>
					<div class='setting-item color-picker clearfix' id='sub_menu_background_color_element'>
						<label>Background</label>
						<a href="#" class='trigger'><div class='cssmenu-arrow'><span></span></div></a>
						<input class='units' type='text' name='sub_menu_background_color' value='' disabled/>
					</div>
					<div class='setting-item color-picker clearfix' id='sub_menu_border_color_element'>
						<label>Border</label>
						<a href="#" class='trigger'><div class='cssmenu-arrow'><span></span></div></a>
						<input class='units' type='text' name='sub_menu_border_color' value='' disabled/>
					</div>

					<a href="#" class='blue-button cssmenu-submit'>Apply</a>
					<a href='#' class='cancel'>Cancel</a>
				</div><!-- /#menu-setting-form -->
			</div></div><!-- /sub-menu-settings -->
		</div><!-- /.panel -->
    <div class='panel' id='custom-css' />
      <h4>Custom CSS</h4>
      <a id='custom-css-trigger' class="fancy-select" href='#custom-css-overlay'><span>Edit CSS</span></a>
    </div><!-- /.panel -->
	<div class='panel' id='panel-save-download'></div><!-- /.panel -->
</div><!-- /#builder-settings-panel -->
