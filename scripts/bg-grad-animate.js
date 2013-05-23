$(document).ready(function() {




var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();

// Helper Functions

	// Convert integers to hex
    function toHex(num) {  // quick function for CSS colors
        var intNum = Math.floor(num);
        var outHex =   ['0', '1', '2', '3', '4', '5',
						'6', '7', '8', '9', 'A', 'B',
						'C', 'D', 'E', 'F'];
        return outHex[intNum];
    }
    
	
	// Get sin/cos values with an offset:   
	// var sineOut(x) == range * sin(x) + offset ==  (+/-)range * sineOut(x) + offset
    function sineOut(range, rad, offset) {  
       return ( Math.floor((range * Math.sin(rad)) + offset) );
    }
    function cosineOut(range, rad, offset) {
       return ( Math.floor((range * Math.cos(rad)) + offset) );
    }    
    
    // repeats a varying background linear-gradient animation 
    // -- using counter & clearInterval, animation can be a set time
    $('#bgAnim').click(function () {  
        $('h1').val('Hello World').css('color', '#fafafa');
        var gradDegree,
            startPercent,
            startGradColor,
            endGradColor;
        
        
        var counter = 75;
        var start = 0.05;
        var dir = 'down';
        
        // alter linear-gradient with 
        var gradInterval = setInterval(function() {
           
            // values for linear-gradient manipulation
            gradDegree     = sineOut(90, start, 90) + 'deg';
            startPercent   = sineOut(50, start, 50 ) + '%';
            startGradColor = '#' + toHex(sineOut(7,start,7)) + toHex(sineOut(7,start,7)) + 'FF00';
            endGradColor   = '#00' + toHex(cosineOut(7,start,7)) + toHex(cosineOut(7,start,7)) +'00';    
			
			
			// Cross-browser Gradient Compatibility
			// change up CSS property based on browser
			var cssBrowserGradientValue = '';
			var cssBrowserGradientProperty = 'background';
			switch (BrowserDetect.browser) {
				case "Firefox":
					cssBrowserGradientValue = '-moz-linear-gradient(' + gradDegree + ', ' + startGradColor + ' ' + startPercent + ', ' + endGradColor + ')';
					break;
				case "Chrome": 
				case "Safari":
					if ( (BrowserDetect.version < 10 && Browser.Detect.browser == "Chrome") ||
						 (BrowserDetect.version < 5.1 && Browser.Detect.browser == "Safari") ) { /* Chrome,Safari4+ */
						cssBrowserGradientValue =  '-webkit-gradient(linear, ' + gradDegree + ', color-stop('+startPercent+',' + startGradColor + '), color-stop( 100%,'+endGradColor + '))';
					} else { /* Chrome10+,Safari5.1+ */
						cssBrowserGradientValue = '-webkit-linear-gradient(' + gradDegree +  ', ' + startGradColor + ' ' + startPercent + ', ' + endGradColor + ')';
					}
					break;
				case "Opera":
					cssBrowserGradientValue = '-o-linear-gradient(' + gradDegree + ', ' + startGradColor + ' ' + startPercent + ', ' + endGradColor + ' 100%)'; /* Opera 11.10+ */
					break;
					break;
				case "Explorer": 
					if (BrowserDetect.version < 10) { /* IE6-9 */
						cssBrowserGradientProperty = 'filter';
						cssBrowserGradientValue = 'progid:DXImageTransform.Microsoft.gradient( startColorstr='+ startGradColor + ', endColorstr=' + endGradColor +',GradientType=0 )'; 
					} else { /* IE10+ */
						cssBrowserGradientValue = '-ms-linear-gradient(' + gradDegree + ', ' + startGradColor + ' ' + startPercent +', ' + endGradColor + '100%)'; 
					}
					break;
				case "": /* W3C */
					//background: linear-gradient(to bottom, rgba(254,191,1,1) 0%,rgba(22,0,33,1) 79%);
					break;
				default: 
					cssBrowserGradientValue = 'rgb(0,255,0);';
					break;
			}
			

            $('#bgAnim').css(cssBrowserGradientProperty, cssBrowserGradientValue );
            $('h1').css('text-shadow','2px 2px '+ sineOut(5,start,5)  + 'px #000');
   
            start += 0.05;

            // quick 'n dirty controls; counter can be used to trigger multiple events
            if(counter === 1)  { 
                dir = 'up';
                $('h1').fadeOut(500);
            }
            if(counter === 9) { dir = 'down'; } 
            if (dir === 'down') { counter--; } else { counter++ }
        }, 25);

    });

});