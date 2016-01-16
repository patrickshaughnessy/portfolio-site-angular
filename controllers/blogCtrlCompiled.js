'use strict';

angular
  .module('app')
  .controller('blogCtrl', function($scope, $location, $anchorScroll, $timeout){
    $scope.posts = posts;

    $timeout(function(){
      $scope.loaded = true;
    }, 1500)

    $scope.goToPost = function(id) {
       $location.hash(id);
       $anchorScroll();
    }

  });
var posts = [{"title":"Title 1","id":"title_1","date":"MM-DD-YYYY","tags":["cool","Angular","Javascript"],"body":"<h3 id=\"test-post-1\">Test Post 1</h3>\n<p>Cow meatloaf tongue spare ribs kevin turducken. Porchetta ball tip sausage turkey beef ribs beef andouille short loin. Prosciutto leberkas pork chop alcatra, pork belly rump fatback short loin ham pancetta ribeye turkey salami. Rump picanha short loin bacon pig beef. Jowl tri-tip sausage shoulder leberkas pork. Bacon frankfurter landjaeger, boudin kielbasa ham pork salami shankle beef pork loin.</p>\n<p>Short ribs pork chop shoulder hamburger, ribeye shank strip steak landjaeger t-bone. Short ribs fatback swine strip steak short loin pork loin brisket doner tail. Pork loin chicken shoulder filet mignon doner shank. Kevin picanha pork belly pork loin shoulder turducken brisket rump bresaola boudin meatloaf doner swine. Bresaola ham beef ribs jowl cow pork loin sirloin capicola pig. Ham hock meatball short ribs sirloin.</p>\n<p>Cupim chicken bacon fatback rump drumstick leberkas turducken shankle filet mignon. Chuck andouille turkey jerky pork chop shank short ribs shoulder fatback boudin. Kevin t-bone pork chop doner jowl ribeye meatloaf cupim shank spare ribs ball tip pig chuck ground round. Strip steak tongue spare ribs picanha, salami filet mignon bacon landjaeger pancetta capicola beef bresaola pork loin.</p>\n"},{"title":"Title 2","id":"title_2","date":"MM-DD-YYYY","tags":[],"body":"<h3 id=\"test-post-2\">Test Post 2</h3>\n<p>Meatloaf frankfurter strip steak ham short loin. Brisket drumstick rump tail meatball bresaola shoulder boudin pork chicken sirloin cupim doner tongue prosciutto. Beef frankfurter bacon, cow drumstick picanha jowl ribeye biltong. Cow pork chop ham hock pork meatball turducken swine brisket short ribs t-bone strip steak ground round.</p>\n<p>Cow meatloaf tongue spare ribs kevin turducken. Porchetta ball tip sausage turkey beef ribs beef andouille short loin. Prosciutto leberkas pork chop alcatra, pork belly rump fatback short loin ham pancetta ribeye turkey salami. Rump picanha short loin bacon pig beef. Jowl tri-tip sausage shoulder leberkas pork. Bacon frankfurter landjaeger, boudin kielbasa ham pork salami shankle beef pork loin.</p>\n<p>Short ribs pork chop shoulder hamburger, ribeye shank strip steak landjaeger t-bone. Short ribs fatback swine strip steak short loin pork loin brisket doner tail. Pork loin chicken shoulder filet mignon doner shank. Kevin picanha pork belly pork loin shoulder turducken brisket rump bresaola boudin meatloaf doner swine. Bresaola ham beef ribs jowl cow pork loin sirloin capicola pig. Ham hock meatball short ribs sirloin.</p>\n"},{"title":"Title 3","id":"title_3","date":"MM-DD-YYYY","tags":[],"body":"<p>Bacon ipsum dolor amet turducken kielbasa short ribs corned beef swine. Capicola pig venison prosciutto turducken chuck pastrami brisket biltong bacon doner pork chop shankle andouille. Cupim picanha pork andouille turducken rump pork loin short loin beef ribeye boudin pig frankfurter. Frankfurter short loin brisket picanha sausage swine. Fatback cupim pig, sirloin shankle prosciutto filet mignon doner short ribs. Shankle pig filet mignon spare ribs t-bone, flank chicken jerky sausage alcatra pancetta pork belly rump picanha.</p>\n<p>Meatloaf frankfurter strip steak ham short loin. Brisket drumstick rump tail meatball bresaola shoulder boudin pork chicken sirloin cupim doner tongue prosciutto. Beef frankfurter bacon, cow drumstick picanha jowl ribeye biltong. Cow pork chop ham hock pork meatball turducken swine brisket short ribs t-bone strip steak ground round.</p>\n<p>Cow meatloaf tongue spare ribs kevin turducken. Porchetta ball tip sausage turkey beef ribs beef andouille short loin. Prosciutto leberkas pork chop alcatra, pork belly rump fatback short loin ham pancetta ribeye turkey salami. Rump picanha short loin bacon pig beef. Jowl tri-tip sausage shoulder leberkas pork. Bacon frankfurter landjaeger, boudin kielbasa ham pork salami shankle beef pork loin.</p>\n"}]
