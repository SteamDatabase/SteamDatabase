var container = document.querySelector( '#profile_action_dropdown .popup_body' );

if( container )
{
	// Can't access g_rgProfileData inside sandbox
	var steamID = location.pathname.match( /^\/(?:id|profiles)\/([^\s/]+)\/?/ );
	
	var image = document.createElement( 'img' );
	image.src = GetLocalResource( 'icons/18.png' );
	
	var element = document.createElement( 'a' );
	element.href = GetHomepage() + 'calculator/?player=' + steamID[ 1 ];
	element.target = '_blank';
	element.className = 'popup_menu_item';
	element.appendChild( image );
	element.appendChild( document.createTextNode( ' SteamDB Calculator' ) );
	
	container.insertBefore( element, null );
}
else
{
	container = document.querySelector( '.profile_header_actions' );
	
	if( container )
	{
		// Dumb hack because some languages have very long "Edit profile" buttons
		var length = container.querySelector( '.btn_profile_action > span' ).textContent.length;
		
		// Can't access g_rgProfileData inside sandbox
		var steamID = location.pathname.match( /^\/(?:id|profiles)\/([^\s/]+)\/?/ );
		
		var text = document.createElement( 'span' );
		text.appendChild( document.createTextNode( length > 15 ? 'SDB' : 'SteamDB Calculator' ) );
		
		element = document.createElement( 'a' );
		element.className = 'btn_profile_action btn_medium steamdb_button' + ( length > 20 ? ' steamdb_button_small' : '' );
		element.target = '_blank';
		element.href = GetHomepage() + 'calculator/?player=' + steamID[ 1 ];
		element.appendChild( text );
		
		container.appendChild( element );
	}
}
