app.controller("QA-Ctrl", function ($scope) {
    //dialog hỏi đáp
    $scope.QAQuestions = [];
    $scope.addQA = function () {
        if ($scope.addQAQuestion != null) {
            $scope.QAQuestions.push($scope.addQAQuestion);
            $scope.addQAQuestion = "";
        }
        else {
            $scope.addQAQuestion = "";
        }
    }
});
