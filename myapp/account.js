app.controller("ac-ctrl", function ($scope, $rootScope, $http) {
    $scope.validate = 0;
    if (localStorage.getItem("student") == null) {
        $rootScope.student = null;
    } else {
        $rootScope.student = JSON.parse(localStorage.getItem("student"));
    }
    $scope.studentFullname = $rootScope.student.fullname;
    //validate và bắt đầu cập nhật dữ liệu của người dùng đang đang nhập vào trong mảng students
    $scope.updateAC = function () {
        var count = 0;
        if ($scope.studentFullname == null) {
            $scope.validate = 1;
        } else {
            if ($scope.StudentOldPassword == null) {
                $scope.validate = 2;
            }
            else {
                if ($scope.StudentNewPassword == null) {
                    $scope.validate = 3;
                } else {
                    if ($scope.StudentReNewPassword == null) {
                        $scope.validate = 4;
                    }
                    else {
                        if ($rootScope.student.password == $scope.StudentOldPassword) {
                            if ($scope.StudentNewPassword == $scope.StudentReNewPassword) {
                                $rootScope.students.forEach(st => {
                                    if (st.username == $rootScope.student.username) {
                                        //cập nhật dữ liệu của user
                                        $rootScope.students[count].fullname = (angular.copy($scope.studentFullname));
                                        $rootScope.students[count].gender = (angular.copy($scope.student.gender));
                                        $rootScope.students[count].password = (angular.copy($scope.StudentNewPassword));
                                        $rootScope.student.fullname = (angular.copy($scope.studentFullname));
                                        $rootScope.student.gender = (angular.copy($scope.student.gender));
                                        $rootScope.student.password = (angular.copy($scope.StudentNewPassword));
                                        alert("Cập nhật thông tin thành công!");
                                        localStorage.setItem("student", JSON.stringify($rootScope.student));
                                        firebase.database().ref("Students/" + $rootScope.student.username).set($rootScope.student);
                                    }
                                    count++;
                                })
                            } else {
                                alert("Xác nhận mật khẩu không khớp nhau vui lòng kiểm tra lại!");
                                $scope.validate = 4;
                            }
                        }
                        else {
                            alert("Sai mật khẩu!!");
                            $scope.validate = 2;
                        }
                    }
                }
            }
        }
    }
});