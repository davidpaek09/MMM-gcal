Module.register("MMM-Dynamic-Modules",{
    
    notificationReceived: function(notification, payload){

        if(notification === 'CHANGE_URL'){
            this.setURL(payload, config);
        }

        if(notification === 'CHANGE_POSITIONS_DEFAULTS'){
            this.setDefaults();
        }

    },
    
    getid: function(mname) {
        var id;
        MM.getModules().enumerate(function(module) {
            if (mname == module.name){
                id = module.identifier;
            }
        });
        return id;
    },

    // the object passed into this function is the module payload (e.g: modules = {'clock':{position: 'top_right'}})
    // the function parameters are: (url, core config)
    setURL: function(string, object) {
        //get data with:
        // The .keys() gets the objects labels/names (e.g. 'clock', 'calendar')
        // var modulenames = Object.keys(object);
        // The .values() gets the objects data associated with that key so long as they are in the same order (e.g. 'top_right', 'http:...')
        var values = Object.values(object);

        // This is the access to the calendar url value
        values[12][3].config.calendars[0].gcal_url = string;
        Log.log(values[12][3].config.calendars[0].gcal_url);

    },

    setDefaults: function() {
        MM.getModules().enumerate(function(module) {
            if (module.data.position) {
                var split_position = module.data.position.split("_");
                var selected_module = document.getElementById(module.identifier);
                var region = document.querySelector('div.region.' + split_position[0] + '.' + split_position[1] + ' div.container');

                // Make sure the region is visible
                if (region.style.display === 'none') {
                    region.style.display = 'block';
                }
                
                // Move module to its original position
                region.appendChild(selected_module);
                
                // Show module
                module.show(1000, function() {});
            }
        });
        
    },

});