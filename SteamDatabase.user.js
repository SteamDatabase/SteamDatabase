// ==UserScript==
// @version        1.4
// @name           Steam Apps Database Integration
// @description    Adds Steam Database link across Steam Community and Store
// @namespace      http://steamdb.info/userscript/
// @icon           http://steamdb.info/static/logo_144px.png
// @match          http://store.steampowered.com/app/*
// @match          http://store.steampowered.com/sub/*
// @match          http://store.steampowered.com/video/*
// @match          http://steamcommunity.com/app/*
// @match          http://steamcommunity.com/games/*
// ==/UserScript==

var mainURL = 'http://steamdb.info',
	appid = location.pathname.match( /(\d)+/g ),
	element, container;

// Some game groups fancy custom urls
if( !appid )
{
	// Let's try to find game hub link, what possibly could go wrong?
	appid = document.querySelector( 'a[href*="http://steamcommunity.com/app/"]' );
	
	if( !appid )
	{
		// Well...
		
		return;
	}
	
	// I will be surprised if it's not broken at this point
	appid = appid.href.match( /(\d)+/g );
}

appid = appid[ 0 ];

if( location.hostname === 'steamcommunity.com' )
{
	if( location.pathname.match( /\/app\// ) )
	{
		// Game Hub
		
		container = document.querySelector( '.apphub_OtherSiteInfo' );
		
		if( !container )
		{
			return;
		}
		
		element = document.createElement( 'a' );
		element.className = 'btn_green_white_innerfade btn_medium';
		element.href = mainURL + '/app/' + appid + '/';
		element.target = '_blank';
		element.innerHTML = '<span>Steam Database</span>';
		
		container.insertBefore( element, container.firstChild );
	}
	else
	{
		// Game Group
		
		container = document.querySelector( '#rightActionBlock' );
		
		if( !container )
		{
			return;
		}
		
		element = document.createElement( 'div' );
		element.className = 'actionItem';
		element.innerHTML = '<div class="actionItemIcon"><img src="' + mainURL + '/static/userjs/group.png" width="16" height="16" alt=""></div><a class="linkActionMinor" target="_blank" href="' + mainURL + '/app/' + appid + '/">View in Steam Database</a>';
		
		//container.insertBefore( element, container.firstChild );
		container.insertBefore( element, null );
		
		// While we're here, let's fix this annoyance
		element = document.querySelector( '#oggLogo img' );
		
		if( element )
		{
			element.style.height = '208px';
		}
	}
}
else
{
	var isSubPage = location.pathname.match( /\/sub\// );
	var	isVideoPage = location.pathname.match( /\/video\// );
			
	container = document.querySelector( isVideoPage ? '.details_block' : ( isSubPage ? '.share' : '#demo_block .block_content_inner' ) );
	
	// Did we hit an error page?
	if( !container )
	{
		container = document.querySelector( '.error' );
	
		if( container )
		{
			container.innerHTML += '<br><br><a target="_blank" href="'+ mainURL + '/app/' + appid + '/">View in Steam Database</a>';
		}
		
		return;
	}
		
	element = document.createElement( 'div' );
	element.className = isVideoPage ? 'game_info_button' : 'demo_area_button';
	element.innerHTML = ( isVideoPage ? '<br>' : '' ) + '<a class="game_area_wishlist_btn" target="_blank" href="' + mainURL + ( isSubPage ? '/sub/' : '/app/' ) + appid + '/" style="background-image:url(' + mainURL + '/static/userjs/store.png)">View in Steam Database</a>';
	
	isVideoPage ? container.appendChild( element ) : container.insertBefore( element, container.firstChild );
}
