app.controller("ac-ctrl", function ($scope, $rootScope, $http) {
    $scope.validate = 0;
    if (localStorage.getItem("account") == null) {
        $rootScope.accountUser = null;
    } else {
        $rootScope.accountUser = JSON.parse(localStorage.getItem("account"));
    }

    $scope.change = false;
    $scope.changePassword = function () {
        $scope.change = true;
    }

    $scope.accountUserFullname = $rootScope.accountUser.fullname;
    //validate và bắt đầu cập nhật dữ liệu của người dùng đang đang nhập vào trong mảng accounts
    $scope.updateAC = function () {
        var count = 0;
        if ($scope.accountUserFullname == null) {
            $scope.validate = 1;
        } else {
            //truong hop cap nhat can mat khau
            if ($scope.change == true) {
                if ($scope.AccountUserOldPassword == null) {
                    $scope.validate = 2;
                }
                else {
                    if ($scope.AccountUserNewPassword == null) {
                        $scope.validate = 3;
                    } else {
                        if ($scope.AccountUserReNewPassword == null) {
                            $scope.validate = 4;
                        }
                        else {
                            if ($rootScope.accountUser.password == $scope.AccountUserOldPassword) {
                                if ($scope.AccountUserNewPassword == $scope.AccountUserReNewPassword) {
                                    $rootScope.accounts.forEach(st => {
                                        if (st.username == $rootScope.accountUser.username) {
                                            //cập nhật dữ liệu của user
                                            $rootScope.accounts[count].fullname = (angular.copy($scope.accountUserFullname));
                                            $rootScope.accounts[count].gender = (angular.copy($scope.accountUser.gender));
                                            $rootScope.accounts[count].password = (angular.copy($scope.AccountUserNewPassword));
                                            $rootScope.accountUser.fullname = (angular.copy($scope.accountUserFullname));
                                            $rootScope.accountUser.gender = (angular.copy($scope.accountUser.gender));
                                            $rootScope.accountUser.password = (angular.copy($scope.AccountUserNewPassword));
                                            alert("Cập nhật thông tin thành công!");
                                            localStorage.setItem("account", JSON.stringify($rootScope.accountUser));
                                            firebase.database().ref("Accounts/" + $rootScope.accountUser.username).set($rootScope.accountUser);
                                            $scope.change = false;
                                        }
                                        count++;
                                    })
                                } else {
                                    // alert("Xác nhận mật khẩu không khớp nhau vui lòng kiểm tra lại!");
                                    $scope.validate = 6;
                                }
                            }
                            else {
                                // alert("Sai mật khẩu!!");
                                $scope.validate = 5;
                            }
                        }
                    }
                }
            }
            //truong hop cap nhat khong can mat khau
            else {
                $rootScope.accounts.forEach(st => {
                    if (st.username == $rootScope.accountUser.username) {
                        //cập nhật dữ liệu của user
                        $rootScope.accounts[count].fullname = (angular.copy($scope.accountUserFullname));
                        $rootScope.accounts[count].gender = (angular.copy($scope.accountUser.gender));
                        $rootScope.accountUser.fullname = (angular.copy($scope.accountUserFullname));
                        $rootScope.accountUser.gender = (angular.copy($scope.accountUser.gender));
                        alert("Cập nhật thông tin thành công!");
                        localStorage.setItem("account", JSON.stringify($rootScope.accountUser));
                        firebase.database().ref("Accounts/" + $rootScope.accountUser.username).set($rootScope.accountUser);
                    }
                    count++;
                })
            }
        }
    }
});