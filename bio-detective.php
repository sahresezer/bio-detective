<?php
/**
 * Plugin Name: Bio Detective
 * Plugin URI: https://github.com/sahresezer/bio-detective
 * Description: Advanced scientific article analysis plugin. Detect genes, p-values, and molecular entities.
 * Version: 1.4.0
 * Author: Open Source Community
 * Author URI: https://github.com/sahresezer/bio-detective
 * License: GPL v2 or later
 * Text Domain: bio-detective
 * Requires at least: 5.0
 * Requires PHP: 7.4
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'BIO_DETECTIVE_VERSION', '1.4.0' );
define( 'BIO_DETECTIVE_PATH', plugin_dir_path( __FILE__ ) );
define( 'BIO_DETECTIVE_URL', plugin_dir_url( __FILE__ ) );

class Bio_Detective {
    public function __construct() {
        add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_assets' ] );
        add_action( 'et_builder_ready', [ $this, 'load_divi_module' ] );
        add_shortcode( 'bio_detective_article', [ $this, 'render_shortcode' ] );
    }

    public function enqueue_assets() {
        wp_enqueue_script( 'wp-element' );
        wp_enqueue_script(
            'bio-detective-app',
            BIO_DETECTIVE_URL . 'dist/article-detective.min.js',
            [ 'wp-element' ],
            BIO_DETECTIVE_VERSION,
            true
        );
        wp_localize_script( 'bio-detective-app', 'BioDective', [
            'pluginUrl' => BIO_DETECTIVE_URL,
            'nonce'     => wp_create_nonce( 'bio_detective_nonce' ),
        ]);
    }

    public function load_divi_module() {
        $module_file = BIO_DETECTIVE_PATH . 'includes/modules/ArticleDetective/ArticleDetectiveModule.php';
        if ( file_exists( $module_file ) ) {
            require_once $module_file;
        }
    }

    public function render_shortcode() {
        return '<div id="bio-detective-root"></div>';
    }
}

new Bio_Detective();
