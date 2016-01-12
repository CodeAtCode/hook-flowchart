<?php

/**
 * The WordPress Plugin Boilerplate.
 *
 * A foundation off of which to build well-documented WordPress plugins that
 * also follow WordPress Coding Standards and PHP best practices.
 *
 * @package   Hook_Flowchart
 * @author    Mte90 <daniele@codeat.it>
 * @license   GPL-2.0+
 * @link      http://codeat.it
 * @copyright 2015 GPL
 *
 * @wordpress-plugin
 * Plugin Name:       Hook Flowchart
 * Plugin URI:        @TODO
 * Description:       @TODO
 * Version:           1.0.0
 * Author:            Mte90
 * Author URI:        http://codeat.it
 * Text Domain:       hook-flowchart
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Domain Path:       /languages
 * WordPress-Plugin-Boilerplate-Powered: v1.1.5
 */

// If this file is called directly, abort.
if ( !defined( 'WPINC' ) ) {
	die;
}

/*
 * ------------------------------------------------------------------------------
 * Public-Facing Functionality
 * ------------------------------------------------------------------------------
 */
require_once( plugin_dir_path( __FILE__ ) . 'includes/load_textdomain.php' );

/*
 * Load library for simple and fast creation of Taxonomy 
 */
require_once( plugin_dir_path( __FILE__ ) . 'public/class-hook-flowchart.php' );

/*
 * Register hooks that are fired when the plugin is activated or deactivated.
 * When the plugin is deleted, the uninstall.php file is loaded.
 */
add_action( 'plugins_loaded', array( 'Hook_Flowchart', 'get_instance' ), 9999 );
