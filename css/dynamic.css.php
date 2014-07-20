<?php

  header('Content-type: text/css');  
  $selected_menu = $_GET['selected'];
  $cssmenu_css = get_post_meta($selected_menu, "cssmenu_css", true);
  print $cssmenu_css;
?>
