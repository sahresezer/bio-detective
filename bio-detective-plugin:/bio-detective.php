<?php
/**
 * Plugin Name: Bio Detective
 * Plugin URI: https://bioinforange.com/bio-detective
 * Description: Advanced AI-powered scientific article analysis with Biyonaz guidance. Detect genes, p-values, and molecular entities with contextual feedback.
 * Version: 1.0.0
 * Author: BioInfoRange Team
 * Author URI: https://bioinforange.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: bio-detective
 * Domain Path: /languages
 * Requires at least: 5.0
 * Requires PHP: 7.4
 *
 * @package Bio_Detective
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * Define constants for the plugin
 */
define( 'BIO_DETECTIVE_VERSION', '1.0.0' );
define( 'BIO_DETECTIVE_PATH', plugin_dir_path( __FILE__ ) );
define( 'BIO_DETECTIVE_URL', plugin_dir_url( __FILE__ ) );
define( 'BIO_DETECTIVE_BASENAME', plugin_basename( __FILE__ ) );

/**
 * Main Plugin Class
 */
class Bio_Detective {

	/**
	 * Constructor
	 */
	public function __construct() {
		$this->load_dependencies();
		$this->setup_hooks();
	}

	/**
	 * Load plugin dependencies
	 */
	private function load_dependencies() {
		// Module registration
		if ( defined( 'ET_BUILDER_PLUGIN_ACTIVE' ) || defined( 'ET_BUILDER_THEME_ACTIVE' ) ) {
			require_once BIO_DETECTIVE_PATH . 'includes/modules/ArticleDetective/ArticleDetectiveModule.php';
		}
	}

	/**
	 * Setup WordPress hooks
	 */
	private function setup_hooks() {
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_assets' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_admin_assets' ] );
		add_action( 'plugins_loaded', [ $this, 'load_textdomain' ] );
		add_filter( 'plugin_action_links_' . BIO_DETECTIVE_BASENAME, [ $this, 'add_plugin_links' ] );
	}

	/**
	 * Enqueue front-end assets
	 */
	public function enqueue_assets() {
		// Enqueue styles
		wp_enqueue_style(
			'bio-detective-styles',
			BIO_DETECTIVE_URL . 'includes/modules/ArticleDetective/style.css',
			[],
			BIO_DETECTIVE_VERSION
		);

		// React component will be loaded via build process or CDN
		// For development, ensure React is available:
		wp_enqueue_script( 'react' );
		wp_enqueue_script( 'react-dom' );

		// Enqueue plugin's main JavaScript (compiled React)
		wp_enqueue_script(
			'bio-detective-app',
			BIO_DETECTIVE_URL . 'assets/js/app.min.js',
			[ 'react', 'react-dom' ],
			BIO_DETECTIVE_VERSION,
			true
		);

		// Pass data to JavaScript
		wp_localize_script(
			'bio-detective-app',
			'BioDective',
			[
				'pluginUrl' => BIO_DETECTIVE_URL,
				'apiUrl'    => rest_url( 'bio-detective/v1/' ),
				'nonce'     => wp_create_nonce( 'bio_detective_nonce' ),
			]
		);
	}

	/**
	 * Enqueue admin assets
	 */
	public function enqueue_admin_assets( $hook ) {
		// Only load on plugin admin pages
		if ( strpos( $hook, 'bio-detective' ) === false ) {
			return;
		}

		wp_enqueue_style(
			'bio-detective-admin-styles',
			BIO_DETECTIVE_URL . 'assets/css/admin.css',
			[],
			BIO_DETECTIVE_VERSION
		);
	}

	/**
	 * Load text domain for translations
	 */
	public function load_textdomain() {
		load_plugin_textdomain( 'bio-detective', false, dirname( BIO_DETECTIVE_BASENAME ) . '/languages' );
	}

	/**
	 * Add plugin action links
	 */
	public function add_plugin_links( $links ) {
		$settings_link = '<a href="' . admin_url( 'admin.php?page=bio-detective' ) . '">' . __( 'Settings', 'bio-detective' ) . '</a>';
		array_unshift( $links, $settings_link );

		$docs_link = '<a href="https://bioinforange.com/bio-detective-docs" target="_blank">' . __( 'Documentation', 'bio-detective' ) . '</a>';
		array_push( $links, $docs_link );

		return $links;
	}

	/**
	 * Register REST API endpoints
	 */
	public function register_rest_endpoints() {
		register_rest_route(
			'bio-detective/v1',
			'/analyze',
			[
				'methods'             => 'POST',
				'callback'            => [ $this, 'analyze_article' ],
				'permission_callback' => [ $this, 'check_api_permission' ],
			]
		);
	}

	/**
	 * Analyze article content
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response
	 */
	public function analyze_article( $request ) {
		$text = sanitize_textarea_field( $request->get_param( 'text' ) );

		if ( empty( $text ) ) {
			return new WP_REST_Response( [ 'error' => 'No text provided' ], 400 );
		}

		// Gene pattern matching
		$gene_pattern = '/\b[A-Z][A-Z0-9]{2,8}\b/';
		preg_match_all( $gene_pattern, $text, $matches );
		$genes = array_unique( $matches[0] ?? [] );

		// P-value pattern matching
		$pvalue_pattern = '/p\s*[<>=]\s*[0-9.]+/i';
		preg_match_all( $pvalue_pattern, $text, $pmatches );
		$pvalues = $pmatches[0] ?? [];

		return new WP_REST_Response(
			[
				'genes'    => array_values( $genes ),
				'pvalues'  => $pvalues,
				'timestamp' => current_time( 'mysql' ),
			]
		);
	}

	/**
	 * Check API permission
	 */
	public function check_api_permission() {
		return current_user_can( 'read' );
	}
}

// Initialize the plugin
add_action( 'init', function () {
	$bio_detective = new Bio_Detective();
	add_action( 'rest_api_init', [ $bio_detective, 'register_rest_endpoints' ] );
} );

/**
 * Activation hook
 */
register_activation_hook( __FILE__, function () {
	// Create plugin tables or initialize options
	update_option( 'bio_detective_version', BIO_DETECTIVE_VERSION );
	update_option( 'bio_detective_activated', current_time( 'mysql' ) );
} );

/**
 * Deactivation hook
 */
register_deactivation_hook( __FILE__, function () {
	// Cleanup on deactivation
	delete_option( 'bio_detective_activated' );
} );
?>
