
    var source = [
    	{"name":"Portland Public Schools", "id":"https://arcgis.pps.net/arcgis/rest/services/"},
    	{"name":"City of Gresham, OR", "id":"http://maps.greshamoregon.gov/arcgis/rest/services"},
    	{"name":"Oregon Metro", "id":"http://gis.oregonmetro.gov/ArcGIS/rest/services/"},
    	{"name":"Clark County, WA",  "id":"http://gis.clark.wa.gov/arcgis/rest/services/"},
    	{"name":"City of Portland, OR"  ,"id":"https://www.portlandmaps.com/arcgis/rest/services/"},
    	{"name":"Multnomah County, OR"  ,"id":"http://www3.multco.us/arcgispublic/rest/services"},
    	{"name":"Washington County, OR"  ,"id":"http://mtbachelor.co.washington.or.us/arcgiswa2/rest/services/"},
    	{"name":"NOAA"  ,"id":"http://gis.srh.noaa.gov/ArcGIS/rest/services"},
    	{"name":"USGS - Geosciences"  ,"id":"http://rmgsc.cr.usgs.gov/ArcGIS/rest/services"},
    	{"name":"USGS - EROS"  ,"id":"http://isse.cr.usgs.gov/ArcGIS/rest/services"},
    	{"name":"Surdex Inc."  ,"id":"http://cpat.surdex.com/ArcGIS/rest/services"},
    	{"name":"Indiana State University"  ,"id":"http://129.79.145.13/ArcGIS/rest/services"},
    	{"name":"EPA"  ,"id":"http://geodata.epa.gov/arcgis/rest/services"},
    	{"name":"USDA"  ,"id":"http://gis.apfo.usda.gov/ArcGIS/rest/services"},
    	{"name":"State of Oregon"  ,"id":"http://navigator.state.or.us/ArcGIS/rest/services"},
    	{"name":"ESRI - ArcGIS Online"  ,"id":"http://sampleserver1.arcgisonline.com/ArcGIS/rest/services"},
    	{"name":"City of Lincoln, NE"  ,"id":"http://ags.lincoln.ne.gov/ArcGIS/rest/services"},
    	{"name":"Coeur d'Alene Tribe"  ,"id":"http://gis.cdatribe-nsn.gov/ArcGIS/rest/services"},
    	{"name":"US Fish and Wildlife Service"  ,"id":"http://gis.fws.gov/ArcGIS/rest/services"},
    	{"name":"State of Montana"  ,"id":"http://gisservice.mt.gov/arcgis/rest/services"},
    	{"name":"City of Washington DC"  ,"id":"http://maps.dcgis.dc.gov/DCGIS/rest/services"},
    	{"name":"Idaho Water Rights"  ,"id":"http://maps.idwr.idaho.gov/ArcGIS/rest/services"},
    	{"name":"City of New Braunfels, TX"  ,"id":"http://maps.nbtexas.org/ArcGIS/rest/services"},
    	{"name":"UCLA"  ,"id":"http://maps.ucla.edu/ArcGIS/rest/services"},
    	{"name":"ESRI - ArcGIS Online 2"  ,"id":"http://maps1.arcgisonline.com/ArcGIS/rest/services"},
    	{"name":"Outdoor Nebraska"  ,"id":"http://outdoornebraska.ne.gov/ArcGIS/rest/services"},
    	{"name":"Public Safety templates?"  ,"id":"http://publicsafetytemplates.esri.com/ArcGIS/rest/services"},
    	{"name":"ESRI - ArcGIS Online 3"  ,"id":"http://sampleserver3.arcgisonline.com/arcgis/rest/services"},
    	{"name":"ESRI - ArcGIS Online 4"  ,"id":"http://server.arcgisonline.com/ArcGIS/rest/services"},
    	{"name":"USDA SNAP/EBT Locator"  ,"id":"http://www.snapretailerlocator.com/ArcGIS/rest/services"},
    	{"name":"ESRI - ArcGIS Online 5"  ,"id":"http://tasks.arcgisonline.com/ArcGIS/rest/services"},
    	{"name":"National Map"  ,"id":"http://services.nationalmap.gov/ArcGIS/rest/services"},
    	{"name":"State of Texas"  ,"id":"http://tnmap.tn.gov/ArcGIS/rest/services"},
    	{"name":"NOAA Office for Coastal Management"  ,"id":"http://www.csc.noaa.gov/arcgis/rest/services"},
    	{"name":"Washington DC"  ,"id":"http://www.dcgis.org/arcgis/rest/services"},
    	{"name":"US BLM Geocommunicator"  ,"id":"http://www.geocommunicator.gov/ArcGIS/rest/services"},
    	{"name":"Kansas Applied Remote Sensing"  ,"id":"http://www.kars.ku.edu/ArcGIS/rest/services"},
    	{"name":"State of Nebraska"  ,"id":"http://www.nebraskamap.gov/ArcGIS/rest/services"},
    	{"name":"LA County, CA"  ,"id":"http://gis.lacounty.gov/ArcGIS/rest/services"},
    	{"name":"California Department of Fish and Game"  ,"id":"http://imaps.dfg.ca.gov/arcgis/rest/services"},
    	{"name":"California Sediment Database"  ,"id":"http://spatialservices.conservation.ca.gov/arcgis/rest/services"},
    	{"name":"San Diego Association of Governments, CA"  ,"id":"http://gis.sandag.org/GIS/rest/services"}
    ];

    var root_url = "";

    var tree = [];

    var validSelection = false;

    $(document).ready(function(){

    var $input = $('#ta'),
        $btnGetTokens = $('#btnGetTokens'),
        $username = $('#userName'),
        $pass = $('#password');

    $input.typeahead({source:source, 
                autoSelect: true,autoSelect: false,
                afterSelect: function(a){

                }}); 
    
    function proc(){
        var current = $input.typeahead("getActive");
        if (current) {
            if (current.name == $input.val()) {
                //$($($input.parent()).parent()).removeClass('has-warning')
                $('#tree').fadeOut(100);
                getToken(current.id).then(function(){
                    if($('#ags_token').val() != ''){
                        token = $('#ags_token').val();
                        go(current.id, token).then(function(tree){
                            update(format(tree, token));
                        })
                    } else{
                        go(current.id).then(function(tree){
                            update(format(tree));
                        }); 
                    }
                })
                // This means the exact match is found. Use toLowerCase() if you want case insensitive match.
            } else {
                // This means it is only a partial match, you can either add a new item 
                // or take the active if you don't want new items
                //we assume it is a URL here.
                if($input.val() == ''){ return;}
                //if(!validateURL($input.val())){
                    //$($($input.parent()).parent()).addClass('has-warning')
                    //return;
               // }

                getToken($input.val()).then(function(){
                    if($('#ags_token').val() != ''){
                        var url = $input.val().replace('rest', 'admin'),
                            token = $('#ags_token').val();

                        if(url.indexOf('localhost') > -1){
                            url.replace("localhost", 'localhost:6080')
                        }


                        go(url, token).then(function(atree){
                            go($input.val(), token).then(function(btree){
                                for (var a in atree) {
                                    for (var b in btree) {
                                        if (atree[a].text == btree[b].text) {//folder
                                            for(var anode in atree[a].nodes){
                                                for(var bnode in btree[b].nodes){
                                                    if (atree[a].nodes[anode].text == btree[b].nodes[bnode].text) {  //mapserver
                                                        atree[a].nodes[anode].nodes = btree[b].nodes[bnode].nodes;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

                                var htm = format(atree);
                                update(htm);
                            })
                        })
                    } else{
                        go($input.val()).then(function(tree){
                            update(format(tree, token));
                        }); 
                    }
                })
                
            }
        } else {
            // Nothing is active so it is a new value (or maybe empty value)
             if($input.val() == ''){ return;}

                //if(!validateURL($input.val())){
                  //  $($($input.parent()).parent()).addClass('has-warning')
                   // return;
                //}

                $('#tree').fadeOut(100);
                getToken($input.val()).then(function(){
                    if($('#ags_token').val() != ''){
                        var url = $input.val().replace('rest', 'admin'),
                            token = $('#ags_token').val();
                        go(url, token).then(function(atree){
                            go($input.val(), token).then(function(btree){
                                for (var a in atree) {
                                    for (var b in btree) {
                                        if (atree[a].text == btree[b].text) {//folder
                                            for(var anode in atree[a].nodes){
                                                for(var bnode in btree[b].nodes){
                                                    if (atree[a].nodes[anode].text == btree[b].nodes[bnode].text) {  //mapserver
                                                        atree[a].nodes[anode].nodes = btree[b].nodes[bnode].nodes;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

                                var htm = format(atree);
                                update(htm);
                            })
                        })
                    } else{
                        go($input.val()).then(function(tree){
                            update(format(tree, token));
                        }); 
                    }
                })
        }
    }

    $('#btnSearch').on('click', function(){
        proc();
    })

    $input.change(function() {
        proc();

    });

    $username.change(function(){
        $('#ags_token').val('');
    })

    $pass.change(function(){
        $('#ags_token').val('');
    });

    var getToken = function(url){

        var d = $.Deferred();

        //get user and password
        //if(validateURL(url)){

            //validate user and pass

            var username = $username.val();
            var password = $pass.val();

            if(username != '' && password != ''){

            var url = url.toUpperCase().replace('/REST/SERVICES', '');
            url = url.toLowerCase();
            
            $.post(url+'tokens/generateToken', 'username='+username+'&password='+password+'&expiration=10&f=pjson').then(function(token){
                    console.log(token)
                    $('#ags_token').val(token.token)
                    d.resolve();
                })
            } else {
                d.resolve();
            }
        //}
        return d.promise();

    }

    // $('body').on('click', '.collapsible', function(e){
    //     e.stopPropagation();
    // })

    $('body').on('show.bs.collapse', '.accordion',  function(e){

        var $target = $($(this).find('.panel-collapse > .panel-body')[0]);

        var url = $(this).attr('data-url')+'/?f=pjson&callback=?';

        if($('#ags_token').val()!=""){
            url += '&token='+$('#ags_token').val();
        }

        $.getJSON(url).then(function(data){

            //console.log($(this).attr('data-url'));
            //http://dev.gartrellgroup.com/arcgis/admin/services/CRA/TDPI_Texas_Base.MapServer?f=json

            var goo = data;

            if(goo.extensions !== undefined){

                for (var i=goo.extensions.length-1;i>-1;i--) {

                    if(goo.extensions[i].enabled=="false"){
                        goo.extensions.splice(i,1);
                    }
                }
            }

            $target.html("<pre>"+JSON.stringify(goo, null, 2)+"</pre>");
            // console.log($(that))
            // console.log(data)
            // $('#'+$(that).attr('id')+" > div.panel-body").html(JSON.stringify(data))
            // $('#'+$(that).attr('id')+" > div.panel > div.panel-body").html(JSON.stringify(data))
            // console.log('#'+$(that).attr('id')+" > div.panel > div.panel-collapse > div.panel-body")
            // $('#'+$(that).attr('id')+" > div.panel > div.panel-collapse > div.panel-body").html(JSON.stringify(data))
        });
    });

});

    function update(htm){
        $('#tree').empty().append(htm);

        $('.tree').prepend('<button class="btn btn-default" id="btnCollapseAll">Collapse All</button>');

        $("#btnCollapseAll").on('click', function() {
            var children = $('li.parent_li').find(' > ul > li');
            if (children.is(":visible")) {
                children.hide('fast');
            }
        });

        $('.tree li:has(ul)').addClass('parent_li').find(' > div').attr('title', 'Collapse this branch');
        $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');

        $('.tree li.parent_li > div').on('click', function(e) {
            var children = $(this).parent('li.parent_li').find(' > ul > li');
            if (children.is(":visible")) {
                children.hide('fast');
                $(this).attr('title', 'Expand this branch').removeClass('open');
            } else {
                children.show('fast');
                $(this).attr('title', 'Collapse this branch').addClass('open')
            }
            //e.stopPropagation();
        });

         $('.tree li.parent_li > span').on('click', function(e) {
            var children = $(this).parent('li.parent_li').find(' > ul > li');
            if (children.is(":visible")) {
                children.hide('fast');
                $(this).attr('title', 'Expand this branch').removeClass('open');
            } else {
                children.show('fast');
                $(this).attr('title', 'Collapse this branch').addClass('open')
            }
            //e.stopPropagation();
        });
        
        $('#tree').fadeIn(100);
        $('.wrap').fadeOut(200);
    }

    function format(tree, token){

        // if(promise===null){
        //     return {tree:tree};
        // }

      //recursive alphabetize
        function compare(a, b) {
            if (a.nodes === undefined && b.nodes !== undefined)
                return -1
            if (a.nodes !== undefined && b.nodes === undefined)
                return 1
            if((a.nodes !== undefined && b.nodes !== undefined)){
                if (a.text.toLowerCase() < b.text.toLowerCase())
                    return -1;
                if (a.text.toLowerCase() > b.text.toLowerCase())
                    return 1;
            }
            return 0;
        }

        tree.sort(compare);

        var htm = '<div class="tree well"><ul>';
        for (var i = 0; i < tree.length; i++) {

            if(tree[i].type !== undefined){
                htm += '<li><div class="' + tree[i].type + '"><div class="panel-group accordion" data-url="'+tree[i].url+'/" ><div class="panel panel-default" ><div class="panel-heading">'+ tree[i].text + "<a data-toggle='collapse' data-target='#"+tree[i].text.replace(/\s|\./g,'_')+"' class='collapsible'></a> </div><div id='"+tree[i].text.replace(/\s|\./g,'_')+"' class='panel-collapse collapse'><div class='panel-body'></div></div></div></div></div></li>";
            } else{
                htm += '<li><span class="folder open"><i class="icon-folder-open"></i>' + tree[i].text + '</span>';
                htm += makeTree(tree[i], token);
                htm += '</li>';
            }
        }

        htm += '</ul></div>';

        return htm;

    }

    function go(url, token) {
        var d = $.Deferred();

        $('.wrap').fadeIn(200);

        tree = [];

        root_url = url;
        //do we have a forward slash at the end of it?
        if (root_url.charAt(root_url.length - 1) != '/') {
            root_url += '/';
        }

        if (root_url.indexOf("?f=json") != -1) {
            root_url = root_url.replace('?f=pjson', '');
        }

        var url = root_url + '?f=pjson';

        if(token !== undefined && token != null && token!=""){
            url += '&token='+token;
        }

        $.ajax(url, {dataType: "jsonp"}).then(function(data) {

            var core = {
                text: 'root',
                nodes: []
            };

            var root_defs = [];

            if (typeof data.folders != 'undefined') {
                root_defs.push(processFolders(data.folders, token));
            }

            if (typeof data.services != 'undefined') {
                root_defs.push(processServices(data.services, core, token));
            }

            $.when.apply(null, root_defs).done(function() {
                d.resolve(tree)
            });
        });

        return d.promise();
    }

    function makeTree(branch, token) {

        if(branch.nodes == undefined){return;}

    	var html = "<ul>";

    	for (var j = 0; j < branch.nodes.length; j++) {

    		if (typeof branch.nodes[j].nodes != 'undefined') {
                //console.log(branch.nodes[j].type + ' :: ' + branch.nodes[j].text);
                //discern services from group layers
                //console.log(branch.nodes[j])

                if(branch.nodes[j].layer === undefined && branch.nodes[j].url !== undefined){
                    var url = branch.nodes[j].url;
                    html+= '<li><div class="' + branch.nodes[j].type + '"><div class="panel-group accordion" data-url="'+url+'" ><div class="panel panel-default" ><div class="panel-heading"><img src="img/service.png"> '+branch.nodes[j].text + "<a data-toggle='collapse' data-target='#"+url.replace(/\/|\:|\./g,'')+"' class='collapsible'></a> </div><div id='"+url.replace(/\/|\:|\./g,'')+"' class='panel-collapse collapse'><div class='panel-body'></div></div></div></div></div>";

                    html += makeTree(branch.nodes[j], token);
                    html += '</li>';

                } else {

        			html += '<li><div class="' + branch.nodes[j].type + '">' + branch.nodes[j].text + '</div>';
        			html += makeTree(branch.nodes[j], token);
        			html += '</li>';
                }
    		} else {
                var url = branch.nodes[j].url;
                if(branch.nodes[j].layer !== undefined){
                    url+='/'+branch.nodes[j].layer;
                }
    			html += '<li><div class="' + branch.nodes[j].type + '"><div class="panel-group accordion" data-url="'+url+'" ><div class="panel panel-default" ><div class="panel-heading">';

                if(branch.nodes[j].layer !== undefined){
                    html+='<img src="img/layers.png"> ';
                } else {
                    html+='<img src="img/service.png"> ';
                }

                html+= branch.nodes[j].text + "<a data-toggle='collapse' data-target='#"+url.replace(/\/|\:|\./g,'')+"' class='collapsible'></a> </div><div id='"+url.replace(/\/|\:|\./g,'')+"' class='panel-collapse collapse'><div class='panel-body'></div></div></div></div></div></li>";
    		}
    	}

    	html += '</ul>';

    	return html;
    }

    function processFolders(folders, token) {

    	var def = $.Deferred();

    	var deferreds = [];

    	$.each(folders, function(i, v) {

    		var _branch = {
    			text: v,
    			nodes: []
    		};

    		var promise = function() {

    			var nested_deferred = $.Deferred();
                var url = root_url + v + '/?f=pjson';

                if(token !== undefined && token != null && token !=""){
                    url += '&token='+token;
                }

                $.ajax(url, {dataType: "jsonp"}).then(function(data) {

    				var froot_defs = [
    					processServices(data.services, _branch, token)
    				];

                    if(data.folders !== undefined){
                        froot_defs.push(processFolders(data.folders, token));
                    }

    				$.when.apply(null, froot_defs).done(function() {
    					nested_deferred.resolve();
    				});
    			});

    			return nested_deferred.promise();
    		}();

    		promise.done(function() {});

    		deferreds.push(promise);

    	});

    	$.when.apply(null, deferreds).done(function() {
    		def.resolve();
    	});

    	return def.promise();
    }

    function processServices(services, branch, token) {

    	var def = $.Deferred();

    	var deferreds = [];

    	$.each(services, function(i, v) {

    		if (v.type == 'MapServer' || v.type== 'FeatureServer') {

    			var promise = function() {

    				var nested_deferred = $.Deferred(),
                        url;

                    if(v.name !== undefined){
                        url = root_url + v.name + '/' + v.type + '/?f=pjson';
                    } else {
                        url = root_url + v.folderName+'/'+v.serviceName+'.'+v.type + '/?f=pjson';
                    }

                    if(token !== undefined && token != null && token!=""){
                        url += '&token='+token;
                    }

    				$.ajax(url,{dataType: 'jsonp', success: function(data) {

    					if(v.name !== undefined){
                            url = root_url + v.name + '/' + v.type + '/';
                            var s = serviceHelper(v, data, url, branch.text);
                            nested_deferred.resolve(s);
                        } else {

                            var url = (v.folderName !== undefined) ? root_url + v.folderName+'/'+v.serviceName+'.'+v.type + '/' : root_url +v.serviceName+'.'+v.type + '/';

                            var bug={
                                text: v.serviceName,
                                type: v.type,
                                url: url
                            };

                            nested_deferred.resolve(bug)
                        }
    				}});

    				return nested_deferred.promise();
    			}();

    			deferreds.push(promise);
    		} else {
                if(v.name !== undefined){
        			branch.nodes.push({
        				text: v.name,
        				type: v.type,
        				url: root_url + v.name + '/' + v.type + '/'
        			});
                } else {

                    var url = (v.folderName !== undefined) ? root_url + v.folderName+'/'+v.serviceName+'.'+v.type + '/' : root_url +v.serviceName+'.'+v.type + '/';
                    var n = {
                        text: v.serviceName,
                        type: v.type,
                        url: url
                    };

                    if (branch.text == 'root') {
                        tree.push(n);
                    } else {
                        branch.nodes.push(n);
                    }
                }
    		}
    	});

    	$.when.apply(null, deferreds).done(function() {

    		$.each(arguments, function(i, v) {

    			if (branch.text == 'root') {
    				tree.push(v);
    			} else {
    				branch.nodes.push(v);
    			}
    		});
    		if (branch.text != 'root') {
    			tree.push(branch);
    		}
    		def.resolve();
    	});

    	return def.promise();
    }

    function serviceHelper(v, data, url, branch) {

        if(data.layers===undefined){
            return data;
        }

    	var cat = {
    		text: v.name.replace(branch + '/', ''),
    		type: (typeof data.tileInfo == 'undefined') ? v.type : "MapServer_Tiled",
    		nodes: []
    	};

    	$.each(data.layers, function(_i, _v) {

    		if (_v.subLayerIds != null) {
    			var group = {
    				text: _v.name,
    				type: v.type,
    				nodes: [],
                    layer: _v.id
    			};

    			$.each(_v.subLayerIds, function(__i, __v) {

    				try {

    					var lyr = $.grep(data.layers, function(a) {
    						return a.id == __v;
    					})[0];

    					group.nodes.push({
    						text: lyr.name,
    						url: url,
    						type: v.type,
    						layer: __v
    					});
    				} catch (ex) {
    					console.log('ouch');
    				}
    			});
    			cat.nodes.push(group);
    		}

    		if (_v.parentLayerId == -1 && _v.subLayerIds == null) {
    			cat.nodes.push({
    				text: _v.name,
    				layer: _i,
    				type: v.type,
    				url: url
    			});
    		}
    	});

    	return cat;
    }

