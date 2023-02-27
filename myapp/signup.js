app.controller("signup-ctrl", function ($scope, $rootScope, $http) {
    $scope.validate = 0;
    $scope.newUser = [];
    $scope.newUser.Gender = "true";

    //kiểm tra validate và tiến hành thêm mới người dùng
    $scope.signUpNewUser = function () {
        if ($scope.newUser.FullName == null) {
            // alert("vui long nhap ten ho va ten");
            $scope.validate = 1;
        }
        else {
            if ($scope.newUser.userName == null) {
                // alert("vui long nhap ten ten dang nhap");
                $scope.validate = 2;
            }
            else {
                if ($scope.newUser.Email == null) {
                    // alert("vui long nhap email");
                    $scope.validate = 3;
                }
                else {
                    if ($scope.newUser.Birthday == null) {
                        // alert("vui long nhap ngay sinh");
                        $scope.validate = 4;
                    }
                    else {
                        if ($scope.newUser.Password == null) {
                            // alert("vui long nhap mat khau");
                            $scope.validate = 5;
                        }
                        else {
                            // alert($scope.newUser.Password);
                            if ($scope.newUser.RePassword == null) {
                                // alert("vui long nhap xac nhan lai mat khau");
                                $scope.validate = 6;
                            }
                            else {
                                $scope.validate = 0;
                                if ($scope.newUser.Password == $scope.newUser.RePassword) {
                                    $rootScope.student.username = $scope.newUser.userName;
                                    $rootScope.student.password = $scope.newUser.Password;
                                    $rootScope.student.fullname = $scope.newUser.FullName;
                                    $rootScope.student.email = $scope.newUser.Email;
                                    $rootScope.student.gender = $scope.newUser.Gender;
                                    var birthday = document.getElementById('bd').value;
                                    // alert(birthday);
                                    $rootScope.student.birthday = birthday;
                                    $rootScope.student.schoolfee = 0;
                                    $rootScope.student.marks = 0;
                                    $rootScope.students.push($rootScope.student);
                                    firebase.database().ref("Students/" + $rootScope.student.username).set($rootScope.student);
                                    alert("Đăng kí thành công");
                                    window.location.href = "#!login";
                                    $scope.newUser = [];
                                    $rootScope.student = [];
                                    // alert($rootScope.students[3].username);
                                } else {
                                    alert("Xác nhận lại mật khẩu không khớp!!!");
                                    $scope.validate = 6;
                                }
                            }
                        }
                    }
                }
            }
        }
    }


});