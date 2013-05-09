###
 * vibox - node.js cli helper for VirtualBox Management
 *
 * COFFEESCRIPT Document - /js/script.js
 * Screen & responsive styles
 * coded by leny@flatLand!
 * started at 09/05/13
###

$sampleSwitchLinks = document.querySelectorAll 'div.command div.samples nav a'

sampleLinkClicked = ( e ) ->
    e.preventDefault()
    $this = e.currentTarget
    for $sampleLink in $this.parentNode.querySelectorAll 'a.active'
        $sampleLink.className = ''
    for $sample in $this.parentNode.parentNode.querySelectorAll '.terminal'
        $sample.style.display = 'none'
    document.getElementById( $this.getAttribute( 'href' ).replace( '#', '' ) ).style.display = 'block'
    $this.className = 'active'

for $sampleLink in $sampleSwitchLinks
    $sampleLink.addEventListener 'click', sampleLinkClicked
