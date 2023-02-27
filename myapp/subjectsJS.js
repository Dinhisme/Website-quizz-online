app.controller("subject-ctrl", function ($scope, $http, $rootScope) {
    $rootScope.quizz.Id = 0;
    $rootScope.quizz.QuestionNo = 0;
    $scope.subjects = [];


    $http.get("js/db/subjects.js").then(function (response) {
        $scope.subjects = response.data;
    }, function (response) {
        alert("Lỗi");
    });

    localStorage.setItem("subjects", JSON.stringify($scope.subjects));

    $scope.subjects = JSON.parse(localStorage.getItem("subjects"));

    $scope.quizzs = function (id, sjName) {
        $scope.exist = false;
        //mã môn học
        $rootScope.quizz.Name = id;
        localStorage.setItem("IdNameSubject", id);
        //tên fullname môn học
        $rootScope.quizz.Fullname = sjName;
        localStorage.setItem("IdFullNameSubject", sjName);
        //kiểm tra đăng nhập chưa
        if ($rootScope.user == null) {
            alert("Vui lòng đăng nhập để có thể làm bài!!!");
        } else {
            $rootScope.SubjectAlreadyDo.forEach(sjA => {
                if (sjA == id) {
                    $scope.exist = true;
                }
            });
            if ($scope.exist == false) {
                window.location.href = "#!quizzs";
            } else {
                alert("Bạn đã làm bài kiểm tra môn này rồi xin hãy làm môn khác!!!");
            }
        }
    }
});
