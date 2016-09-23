/**
 * Created by kaushik on 9/18/16.
 */
(function(){
    angular
        .module("MeanBlogApp", [])
        .controller("BlogController", BlogController);

    function BlogController($scope,$http){
        $scope.hello = "Hello from Blog Controller";
        $http.get("/api/post")
             .then(setallposts);

        $scope.createpost = function(newtitle,newbody){
            console.log([newtitle,newbody]);
            var newpost = {
                title : newtitle,
                body  : newbody
            }
            //$scope.posts.push(newpost);
            $http.post("/api/post",newpost)
                 .then(setallposts);
        }
        $scope.removepost = function (id) {
            //$scope.posts.splice(index,1);
            console.log(id);
            $http.delete("/api/post/"+id)
                 .then(setallposts);
        }

        function setallposts(res){
            console.log(res.data);
            $scope.posts = res.data;
        }
    }
})();