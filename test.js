// simple test program for cesium

// Shamelessly stolen from https://stackoverflow.com/a/15292190
function loadscripts ( async ) {
    if( async === undefined ) {
        async = false;
    }

    var scripts = [];
    var _scripts = ['node_modules/cesium/Build/Cesium/Cesium.js', 'scripts/three.min.js', 'scripts/jquery-1.11.3.min.js', 'scripts/main.js'];
    for(var s in _scripts) {
        scripts[s] = document.createElement('script');
        scripts[s].type = 'text/javascript';
        scripts[s].src = _scripts[s];
        scripts[s].charset = "utf-8"
        scripts[s].async = async;
    }
    var loadNextScript = function() {
        var script = scripts.shift();
        var loaded = false;
        document.head.appendChild( script );
        script.onload = script.onreadystatechange = function() {
            var rs = this.readyState;
            if (rs && rs != 'complete' && rs != 'loaded') return;
            if (loaded) return;
            loaded = true;
            if (scripts.length) {
                loadNextScript();
            } else {
                // done
            }
        };
    };
    loadNextScript();
}

// function for adding css into the head
function addCSS(url, callback) {
	var fileref = document.createElement("link");

	if (callback) {
		fileref.onload = callback;
	}

	fileref.setAttribute("rel", "stylesheet");
	fileref.setAttribute("type", "text/css");
	fileref.setAttribute("href", url);
	document.head.appendChild(fileref);
}

// function for adding javascript into the body
function addScript(url, callback) {
	var script = document.createElement('script');
	if (callback) {
		script.onload = callback;
	}
  script.charset = "utf-8"
	script.type = 'text/javascript';
	script.src  = url;
	document.body.appendChild(script);
}

// make tags for adding the cesium into the document
var cesiumDiv = document.createElement("div");
cesiumDiv.id = 'cesiumContainer';
document.body.appendChild(cesiumDiv);

var simulationDiv = document.createElement("div");
simulationDiv.id = 'simulation';
var containerCanvas = document.createElement("canvas");
containerCanvas.id = 'container';
simulationDiv.appendChild(containerCanvas);
document.body.appendChild(simulationDiv);

var self = this;

addCSS("node_modules/cesium/Build/Cesium/Widgets/widgets.css");

// due to the async loading scheme of nodejs the below will not work
//addScript("node_modules/cesium/Build/Cesium/Cesium.js");
//addScript("scripts/three.min.js");
//addScript("scripts/jquery-1.11.3.min.js");
//addScript("scripts/main.js", function(){
//  init(self);
//});

// load the scripts one after the other
loadscripts();

// load function once the window has finished loading
// this very well could have been a callback function
window.onload = function() {
  init(self);
};

console.log(document);
