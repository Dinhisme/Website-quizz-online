app.controller("quizzs-ctrl", function ($scope, $rootScope, $http, $interval) {
    //mảng chứa toàn bộ câu hỏi quizzs
    $scope.quizzs = [];
    //mảng chứa chi tiết 10 câu hỏi quizzs
    $scope.quizzsDetail = [];
    //mảng chứa id câu trả lời của người dùng
    $rootScope.UserAnswers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    //mảng chứa id câu trả lời của hệ thống
    $rootScope.SystemAnswers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    //mảng chứa câu trả lời của người dùng
    $scope.quizzsDetailUserAnswerText = [];
    //mảng chứa câu trả lời của hệ thống
    $scope.quizzsDetailSystemAnswerText = [];
    $rootScope.quizz.Name = localStorage.getItem("IdNameSubject");
    $rootScope.quizz.Fullname = localStorage.getItem("IdFullNameSubject");
    //đẩy toàn bộ dữ liệu môn học vào mảng quizzs
    $http.get('js/db/Quizs/' + $rootScope.quizz.Name + '.js').then(function (response) {
        $scope.quizzs = response.data;
    }, function (response) {
        // alert("Lỗi");
    });

    $scope.tempUserAnswer = "";
    $scope.tempDetailAnswer = "";
    $scope.checkFinish = false;
    // $scope.timeleft = 900;
    $scope.timeleft = 300;

    //hàm đếm ngược thời gian làm bài (5 phút)
    var timelimit = $interval(function () {
        $scope.timeleft--;
        if ($scope.timeleft == 0) {
            $scope.yourSubmit();
            alert("out of time");
        }
    }, 1000);

    //hàm đẩy dữ liệu từ mảng quizzs vào mảng quizzDetail
    $scope.pushQuizz = function () {
        var idQuestion = 0;
        // bắt đầu bài kiểm tra sẽ kh được vào lần 2
        $rootScope.SubjectAlreadyDo.push($rootScope.quizz.Name);
        // alert("da them mon hoc nay vao ds " + $rootScope.SubjectAlreadyDo);
        $scope.quizzs.forEach(qz => {
            if (idQuestion < 10) {
                $scope.quizzsDetail.push(qz);
                //khi đẩy dữ liệu vào mảng sẽ đẩy luôn dữ liệu id câu trả lời đúng của hệ thống vào mảng
                $rootScope.SystemAnswers[idQuestion] = (angular.copy(qz.AnswerId));
                qz.Answers.forEach(qzA => {
                    if (qzA.Id == qz.AnswerId) {
                        $scope.quizzsDetailSystemAnswerText.push(qzA.Text);
                    }
                });
            }
            idQuestion++;
            //nhận dữ liệu câu đầu tiên
            if (idQuestion == 1) {
                $rootScope.quizz.Id = qz.Id;
                $rootScope.quizz.Text = qz.Text;
                $rootScope.quizz.Marks = qz.Marks;
                $rootScope.quizz.AnswerId = qz.AnswerId;
                $rootScope.quizz.Answers = qz.Answers;
            }
        });
        //bắt đầu khởi động đồng hồ đếm ngược
        $scope.timeleft = 300;
    }

    $scope.arrAnswers = function (id, asid) {
        $scope.tempUserAnswer = id;
        //truyền id câu trả lời của người dùng vào mảng
        $rootScope.UserAnswers[$rootScope.quizz.QuestionNo] = (angular.copy($scope.tempUserAnswer));
        //click vào câu trả lời để kích hoạt điều kiện nút tiếp theo != null
        $scope.quizzsDetailUserAnswerText[$rootScope.quizz.QuestionNo] = (angular.copy($scope.tempUserAnswer));
    }

    //nhận dữ liệu cho câu tiếp theo
    $scope.nextQuestion = function () {
        $rootScope.quizz.Id++;
        $scope.quizzs.forEach(qz => {
            if ($rootScope.quizz.Id == qz.Id) {
                $rootScope.quizz.Id = qz.Id;
                $rootScope.quizz.Text = qz.Text;
                $rootScope.quizz.Marks = qz.Marks;
                $rootScope.quizz.AnswerId = qz.AnswerId;
                $rootScope.quizz.Answers = qz.Answers;
            }
            //đẩy câu trả lời của người dùng vào hệ thống (loại Text)
            qz.Answers.forEach(qzA => {
                if ($scope.tempUserAnswer == qzA.Id) {
                    $scope.quizzsDetailUserAnswerText[$rootScope.quizz.QuestionNo] = (angular.copy(qzA.Text));
                }
            });
        });
        //vị trí câu hỏi
        $rootScope.quizz.QuestionNo++;
        //ng-model nhận dữ liệu từ đây để checked radio
        $scope.tempUserAnswer = String($rootScope.UserAnswers[$rootScope.quizz.QuestionNo]);
    }

    //nhận dữ liệu câu trước đó
    $scope.preQuestion = function () {
        $rootScope.quizz.QuestionNo--;
        $rootScope.quizz.Id--;
        $scope.quizzs.forEach(qz => {
            if ($rootScope.quizz.Id == qz.Id) {
                $rootScope.quizz.Id = qz.Id;
                $rootScope.quizz.Text = qz.Text;
                $rootScope.quizz.Marks = qz.Marks;
                $rootScope.quizz.AnswerId = qz.AnswerId;
                $rootScope.quizz.Answers = qz.Answers;
            }
        });
        //ng-model nhận dữ liệu từ đây để checked radio
        $scope.tempUserAnswer = String($rootScope.UserAnswers[$rootScope.quizz.QuestionNo]);
    }


    $scope.point = 0;
    $scope.yourSubmit = function () {
        $scope.point = 0;
        //duyệt nốt dữ liệu còn tồn động
        $scope.nextQuestion();
        //dừng thời gian đếm ngược
        $interval.cancel(timelimit);
        var checkAnswer = 0;
        //so sánh đáp án của người dùng và hệ thống (dạng id)
        $rootScope.SystemAnswers.forEach(as => {
            if (as == $rootScope.UserAnswers[checkAnswer]) {
                $scope.point++;
            }
            checkAnswer++;
        });
        //điểm của người thi sẽ được cộng dồn
        $rootScope.student.marks = parseInt($rootScope.student.marks) + parseInt($scope.point);
        localStorage.setItem("student", JSON.stringify($rootScope.student));
        firebase.database().ref("Students/" + $rootScope.user + "marks/").set($rootScope.student.marks);
        //biến kiểm tra để hiển thị điểm và thông tin chi tiết
        $scope.checkFinish = true;
    }
});