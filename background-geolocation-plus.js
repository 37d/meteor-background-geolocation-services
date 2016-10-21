var _options = {
    fetchLocationOnStart : true
};

BackgroundLocation = {
    tag : 'BackgroundLocation',
    plugin : null,
    started : false,
    hasLocationCallback : false,
    options : _options,
    config : {
        desiredAccuracy: 1,
        distanceFilter: 1,
        debug: false,
        interval: 1000,
        //Android Only
        notificationTitle: 'BG Plugin',
        notificationText: 'Tracking',
        fastestInterval: 5000,
        useActivityDetection: false
    },
    getPlugin: function() {
        this.plugin = window.plugins.backgroundLocationServices;
    },
    hasPluginFunction: function (name) {
        //console.log(this.tag, 'hasPluginFunction', name);
        return this.hasPlugin() && typeof this.plugin[name] === 'function';
    },
    hasPlugin: function() {
        if(!this.plugin) {
            console.log(this.tag + ' Could not find plugin, please run BackgroundLocation.getPlugin');
            return false;
        }
        return true;
    },
    configure: function(config) {
        if(!this.hasPluginFunction(arguments.callee.name)) return;

        if(_.isObject(config)) {
            this.config = config;
            this.plugin.configure && this.plugin.configure(this.config);
        } else {
            throw new Meteor.Error(this.tag, 'Config parameter must be a object')
        }
    },
    registerForLocationUpdates: function(success, failure){
        if(!this.hasPluginFunction(arguments.callee.name)) return;

        this.hasLocationCallback = true;
        this.plugin.registerForLocationUpdates(success, failure);
    },
    registerForActivityUpdates: function(success, failure){
        if(!this.hasPluginFunction(arguments.callee.name)) return;

        this.plugin.registerForActivityUpdates(success, failure);
    },
    start: function() {
        if(!this.hasPluginFunction(arguments.callee.name)) return;

        if(!this.hasLocationCallback) {
            throw new Meteor.Error(this.tag, 'You must register for location updates before starting background location updates');
        }

        this.plugin.start();
    },
    stop: function() {
        if(!this.hasPluginFunction(arguments.callee.name)) return;

        this.plugin.stop();
    }
};

if(Meteor.isCordova) {
    Meteor.startup(function () {
        BackgroundLocation.getPlugin();

        if(BackgroundLocation.options.fetchLocationOnStart) {
            navigator.geolocation.getCurrentPosition(function (location) {
            }, function (err) {
            });
        }
    });
}