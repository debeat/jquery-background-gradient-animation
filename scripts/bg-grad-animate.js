$(document).ready(function() {

    
    function toHex(num) {  // quick function for CSS colors
        var intNum = Math.floor(num);
        var outHex = ['0', '1', '2', '3', '4', '5',
                  '6', '7', '8', '9', 'A', 'B',
                  'C', 'D', 'E', 'F'];
        return outHex[intNum];
    }
    
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
            mozLG          = '-moz-linear-gradient(' + gradDegree + ', ' + startGradColor + ' ' + startPercent + ', ' + endGradColor + ')';
               
            $('#bgAnim').css('background', mozLG );
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