<?php
/**
 * Plugin Name: AGP Font Awesome Collection
 * Plugin URI: https://wordpress.org/plugins/agp-font-awesome-collection/
 * Description: The latest Font Awesome icons with HTML and shortcodes usage, dynamic visualizer for TinyMCE, promotion widget and other features in the one plugin
 * Version: 2.6.0
 * Author: Alexey Golubnichenko
 * Author URI: http://www.profosbox.com/
 * License: GPL2
 * 
 * @package Fac
 * @category Core
 * @author Alexey Golubnichenko
 */
/*  Copyright 2015  Alexey Golubnichenko  (email : profosbox@gmail.com)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as 
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

include_once (dirname(__FILE__) . '/agp-core/agp-core-functions.php' );    

/**
 * Check for minimum required PHP version
 */
if ( Agp_GetCurrentPHPVersionId() < AGP_PHP_VERSION) {
    if ( is_admin()) {
        add_action( 'admin_notices', 'Fac_PHPVersion_AdminNotice' , 0 );
    }    
/**
 * Initialize
 */    
} else {
    include_once (dirname(__FILE__) . '/agp-font-awesome-collection-init.php' );    
}

function Fac_PHPVersion_AdminNotice() {
    $name = get_file_data( __FILE__, array ( 'Plugin Name' ), 'plugin' );
    $currentPHPVersion = Agp_GetPHPVersionById( Agp_GetCurrentPHPVersionId() );
    $requiredtPHPVersion = Agp_GetPHPVersionById( AGP_PHP_VERSION );

    printf(
        '<div class="error">
            <p><strong>%s</strong> plugin can\'t work properly. Your current PHP version is <strong>%s</strong>. Minimum required PHP version is <strong>%s</strong>.</p>
        </div>',
        $name[0],
        $currentPHPVersion,
        $requiredtPHPVersion
    );
}