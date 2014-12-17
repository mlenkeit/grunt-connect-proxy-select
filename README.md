# grunt-connect-proxy-select

> Select a proxy from a list of proxies and apply it to the grunt-connect-proxy plugin.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-connect-proxy-select --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-connect-proxy-select');
```

## Task "select-proxy"
_Run this task with the `grunt select-proxy` command._

### Options

#### append
Type: `Boolean`
Default: `true`

True to append the named proxy to `connect.proxies`, false to clear `connect.proxies` first.

#### proxy
Type: `String`

The name of the proxy.

### Usage examples

In the following example, the running `select-proxy:fwk-2.2.0` would add the respective proxy config from the json file to the proxy configuration under `connect.proxies`. Instead, running `select-proxy:fwk-2.1.8` would take the proxy config from the json file and apply this as the sole proxy to `connect.proxies`.

Gruntfile.js:
```js
'select-proxy': {
  options: {
    append: true
  },
  'fwk-2.2.0': {
	src: 'named-proxies.json',
	proxy: '2.2.0-online'
  },
  'fwk-2.1.8': {
    options: {
	  append: false
	},
	src: 'named-proxies.json',
	proxy: '2.1.8-internal-backup'
  }
}
```
named-proxies.json:
```js
{
	"2.2.0-online" : {
		"context" : "/vendor/name",
		"host" : "vendor.com",
		"rewrite" { "" : "/download" }
	},
	"2.1.8-backup" : {
		"context" : "/vendor/name",
		"host" : "localhost",
		"port" : "8089",
		"rewrite" { "" : "/libs/vendor/name/download" }
	}
}
```