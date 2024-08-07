document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.querySelector('.btn-svg');

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        }
    }

    // Kullanıcının yerel depolama ayarını kontrol edin
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // Kullanıcının sistem temasını kontrol edin
        const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (systemPrefersDark) {
            applyTheme('dark');
        }
    }

    toggleButton.addEventListener('click', function () {
        if (document.body.classList.contains('dark-theme')) {
            applyTheme('light');
        } else {
            applyTheme('dark');
        }
    });





});



var stat = function(){
	//for each group of stats
    $('.stat-group').each(function(){

      //cache some stuff
      that = $(this);
      var svgObj = that.find('.svg');
      var perObj = that.find('.per');

      //establish dimentions
      var wide = that.width();
      var center = wide/2;
      var radius = wide*0.8/2;
      var start = center - radius;

      //gab the stats
      var per = perObj.text().replace("%","") / 100;

      //set up the shapes
      var svg = Snap(svgObj.get(0));
      var arc = svg.path("");
      var circle = svg.circle(wide/2, wide/2, radius);

      //initialize the circle pre-animation
      circle.attr({
        stroke: '#dbdbdb',
        fill: 'none',
        strokeWidth: 3
      });

      //empty the percentage
      perObj.text('');

      //gather everything together
      var stat = {
        center: center,
        radius: radius,
        start: start,
        svgObj: svgObj,
        per: per,
        svg: svg,
        arc: arc,
        circle: circle
      };

      //call the animation
      run(stat);

     });

    //animation function
    function run(stat) {

      //establish the animation end point
      var endpoint = stat.per*360;

      //set up animation (from, to, setter)
      Snap.animate(0, endpoint, function(val) {

        //remove the previous arc
        stat.arc.remove();

        //get the current percentage
        var curPer = Math.round(val/360*100);

        //if it's maxed out
        if(curPer == 100){

          //color the circle stroke instead of the arc
          stat.circle.attr({
            stroke: "#199dab"
          });

        //otherwise animate the arc
        } else {

          //calculate the arc
          var d = val;
          var dr = d-90;
          var radians = Math.PI*(dr)/180;
          var endx = stat.center + stat.radius*Math.cos(radians);
          var endy = stat.center + stat.radius * Math.sin(radians);
          var largeArc = d>180 ? 1 : 0;
          var path = "M"+stat.center+","+stat.start+" A"+stat.radius+","+stat.radius+" 0 "+largeArc+",1 "+endx+","+endy;

          //place the arc
          stat.arc = stat.svg.path(path);

          //style the arc
          stat.arc.attr({
            stroke: '#199dab',
            fill: 'none',
            strokeWidth: 3
          });

        }

        //grow the percentage text
        stat.svgObj.prev().html(curPer +'%');

        //animation speed and easing
      }, 1500, mina.easeinout);

    }
};

//call it on ready
$(function(){ stat(); });

//set up rerun
$('#rerun').click(function(){stat();});
