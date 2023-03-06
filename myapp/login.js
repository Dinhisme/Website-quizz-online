app.controller("login-ctrl", function ($scope, $rootScope, $http) {
    $scope.exist = false;
    $scope.IDRequestAfterCheck = false;
    $scope.loginSuccess = false;
    $scope.validatetxtUser = true;
    $scope.validatetxtPass = true;
    $rootScope.user = null;
    $scope.IdRequest = Math.floor(Math.random() * 1000000);

    if ($rootScope.status == "day") {
        $rootScope.day();
    } else {
        $rootScope.night();
    }

    //kiểm tra và validate
    $scope.check = function () {
        if ($scope.Username == null) {
            $scope.validatetxtUser = false;
        } else {
            if ($scope.Password == null) {
                $scope.validatetxtUser = true;
                $scope.validatetxtPass = false;
            }
            else {
                $scope.validatetxtUser = true;
                $scope.validatetxtPass = true;
                $rootScope.accounts.forEach(st => {
                    //kiểm tra tài khoản có tồn tại chưa
                    if (st.username == $scope.Username) {
                        $scope.exist = true;
                    }
                    //kiểm tra tài khoản đăng nhập đúng hay không
                    if ((st.username == $scope.Username) && (st.password == $scope.Password)) {
                        $scope.loginSuccess = true;
                        $rootScope.accountUser = st;
                        localStorage.clear("account");
                        localStorage.setItem("account", JSON.stringify(st));
                    }
                });
                //trường hợp có tồn tại và đăng nhập đúng
                if ($scope.exist == true) {
                    if ($scope.loginSuccess == true) {
                        $rootScope.user = $scope.Username;
                        localStorage.setItem("user", $rootScope.user);
                        alert('Đăng nhập thành công!');
                        window.location.href = "#!about";
                        return;
                    } else {
                        alert('Mật khẩu không chính xác vui lòng kiểm tra lại');
                    }
                }
                //trường hợp tài khoản chưa tồn tại
                else {
                    alert('Tài khoản không tồn tại');
                }
            }
        }
    }



    //** Quên mật khẩu**/
    //kiểm tra email có tồn tại hay kh và tiến hành gửi mail
    $scope.alreadyExist = function () {
        var email = document.getElementById('Email').value;
        $scope.exist == false;
        $scope.IDRequestAfterCheck = false;
        if (email == "") {
            return;
        } else {
            $rootScope.accounts.forEach(st => {
                //kiểm tra email có tồn tại chưa
                if (st.email == email) {
                    // alert('email có tồn tại!');
                    $scope.exist = true;
                }
            });
            //trường hợp email có tồn tại trong hệ thống
            alert("Mã xác nhận: " + $scope.IdRequest + " đã được gửi qua email của bạn!!!");
            if ($scope.exist == true) {
                // alert(email);
                //tiến hành gửi mail
                var body = String("Mã xác nhận của bạn là: " + $scope.IdRequest);
                Email.send({
                    SecureToken: "e6708ad2-932f-45ae-84ce-177eecc87ec5",
                    To: email,
                    From: "dinhismee@gmail.com",
                    Subject: "Mã xác nhận từ trang thi trắc nghiệm Dinhisme!",
                    Body: body
                }).then(
                    message => alert(message + " Gửi thành công!!!"),
                    $scope.exist == false
                )
            }
            else {
                alert("email không tồn tại trong hệ thống!");
            }
        }
    }

    //kiểm tra mã xác nhận
    $scope.checkIdRequest = function () {
        var IdRequestFromUser = document.getElementById('IdRequestFromUser').value;
        // alert(IdRequestFromUser);
        if (IdRequestFromUser == "") {
            return;
        } else {
            if (IdRequestFromUser == $scope.IdRequest) {
                // alert("Mã xác nhận chính xác");
                $scope.IDRequestAfterCheck = true;
            }
            else {
                $scope.IDRequestAfterCheck = false;
                alert("Mã xác nhận không chính xác vui lòng kiểm tra lại!!");
            }
        }
    }

    //tiến hành thay đổi mật khẩu nếu mã xác nhận đúng
    $scope.changePW = function () {
        var email = document.getElementById('Email').value;
        var newPassword = document.getElementById('NewPW').value;
        if (newPassword == "") {
            return;
        } else {
            $rootScope.accounts.forEach(st => {
                if (st.email == email) {
                    st.password = newPassword;
                    firebase.database().ref("Accounts/" + st.username + "/password").set(newPassword);
                    alert("Đã thay đổi mật khẩu thành công!!!");
                    // window.location.href = "#!login";
                }

            });
        }
    }

});