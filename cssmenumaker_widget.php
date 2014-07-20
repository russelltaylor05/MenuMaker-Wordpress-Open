<?php
  

add_action( 'widgets_init', 'cssmenumaker_create_widgets' );  
function cssmenumaker_create_widgets() {
  register_widget('CSS_MenuMaker');
}  


class CSS_MenuMaker extends WP_Widget {
  // Construction function
  function __construct ()  {  
    parent::__construct( 'cssmenu_widget', 'MenuMaker', array( 'description' => 'Display a Menu built with MenuMaker' ));            
  }
  
  function form($instance) {
    $selected_menu = ( !empty( $instance['selected_menu'] ) ? $instance['selected_menu'] : NULL );
    $available_menus = get_posts(array("post_type" => "cssmenu"));
    
    print "<label>Please select a Menu to display</label>";    
    print '<select name="'.$this->get_field_name( 'selected_menu').'" id="'.$this->get_field_id( 'selected_menu').'">';
    foreach($available_menus as $id => $available_menu) {
      print '<option value="'.$available_menu->ID.'"';
      print selected($available_menu->ID, $selected_menu ).'>';
      print $available_menu->post_title;
      print "</option>";
    }  
    print " </select>";
  }
  
  function widget($args, $instance) 
  {
    cssmenumaker_print_menu($instance['selected_menu']);      
  }  
}


  
?>