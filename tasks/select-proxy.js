/*
 * grunt-connect-proxy-select
 * https://github.com/mlenkeit/grunt-connect-proxy-select
 *
 * Copyright (c) 2014 Maximilian Lenkeit
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	grunt.registerMultiTask('select-proxy', 'Select a proxy from a list of proxies.', function (_proxyName) {
		// Options
		var options = this.options({
				appendProxy : true,
				proxyName :_proxyName
			}),
			appendProxy = options.appendProxy,
			proxyName = options.proxyName;

		if (!proxyName) {
			grunt.log.error('Proxy name missing for proxy selection');
			return false;
		}

		var namedProxies = {};
		this.files.forEach(function(file) {
			file.src.forEach(function(filepath) {
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} 

				var content = grunt.file.readJSON(filepath);
				Object.keys(content).forEach(function(key) {
					if (namedProxies[key]) {
						grunt.log.warn('Overwriting named proxy "' + key + '" from file "' + filepath + '"');
					}
					namedProxies[key] = content[key];
				});
			});
		});

		if (!namedProxies[proxyName]) {
			grunt.log.error('Proxy named "' + proxyName + '" not found in source files');
			return false;
		}

		var configuredProxies = grunt.config.get("connect.proxies") || [];
		if (configuredProxies.length > 0 && !appendProxy) {
			grunt.log.warn('Overwriting existing proxy configuration');
			configuredProxies = [];
		}
		configuredProxies.push(namedProxies[proxyName]);
		grunt.config.set("connect.proxies", configuredProxies);
		grunt.verbose.writeln('Active proxy configuration:');
		grunt.verbose.writeln(JSON.stringify(configuredProxies));
	});
};