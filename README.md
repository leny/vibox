# vibox

*Node.js cli helper for VirtualBox management*

vibox is a simple manager for your VirtualBoxes' VMs.

In facts, it's just a wrapper over `VBoxManage`, but simplier **and** with completion (if you enable it).

* * *

## Getting Started

Install the module with: `npm install vibox`

To take the benefits of completion, add the following line to your .profile, or .bash_rc, or *whatever* : `which vibox > /dev/null && . "$( vibox --initpath )"`

## Usage

	vibox [options] [command]

	Commands:

    	list [options]					list VMs
	    show [options] <uid|name> 		show information about specific VM
    	start [options] <uid|name> 		start VM
    	stop [options] <uid|name> 		stop VM (if ACPI support is enabled)
	    control <uid|name> <action> 	control VM (start|headless|pause|resume|stop|reset|poweroff)

  	Options:

    	-h, --help     output usage information
	    -V, --version  output the version number

## Next…

However it's functionnal, there still some work to do : error handler, some optimization.

In the future, i'll probably add support to more commands of VBoxManage.

## License
Copyright (c) 2013 Leny (http://flatland.be)  
Licensed under the MIT license.

* * *

**ps:** I am very sorry for my horrible english (*I came from Belgium, I speak french*). I will correct this document soon.
