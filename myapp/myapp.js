var app = angular.module("myApp", ["ngRoute"]);
app.run(function ($rootScope, $http) {
    $rootScope.status = "day";
    $rootScope.night = function () {
        $rootScope.status = "night";
        document.getElementById("main").style.backgroundColor = "rgb(35, 35, 35)";
        document.getElementById("ft").style.backgroundColor = "rgb(30, 30, 30)";
        document.getElementById("ft").style.borderTop = "2px solid white";
        document.getElementById("li").style.border = "2px solid white";
        document.getElementById("li").style.backgroundColor = "rgb(25, 25, 25)";
        document.getElementById("li").style.color = "white";
        document.getElementById("fpw").style.color = "white";
    }

    $rootScope.day = function () {
        $rootScope.status = "day";
        document.getElementById("main").style.backgroundColor = "rgb(190, 210, 228)";
        document.getElementById("ft").style.backgroundColor = "rgb(158, 198, 233)";
        document.getElementById("ft").style.borderTop = "2px solid black";
        document.getElementById("li").style.border = "2px solid black";
        document.getElementById("li").style.backgroundColor = "rgb(197, 226, 252)";
        document.getElementById("li").style.color = "black";
        document.getElementById("fpw").style.color = "black";
    }


    //khi chạy trang web sẽ nhận dữ liệu của các học sinh
    $rootScope.accounts = [];

    //lấy dữ liệu từ sever
    var dbRef = firebase.database().ref().child("Accounts");
    dbRef.on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var key = childSnapshot.key;
            var User = snapshot.child(key).val();
            $rootScope.accounts.push(User); ount
        });
        $rootScope.accounts.forEach(st => {
            console.log(st);
        });
    })

    // localStorage.clear("accounts");
    if (localStorage.getItem("accounts") == null) {
        localStorage.setItem("accounts", JSON.stringify($rootScope.accounts));
    }

    //Đăng xuất
    $rootScope.logout = function () {
        localStorage.clear("user");
        $rootScope.user = null;
        alert("Đăng xuất thành công!");
        window.location.href = "#!about";
    }

    if (localStorage.getItem("user") == null) {
        $rootScope.user = null;
    } else {
        $rootScope.user = localStorage.getItem("user");
    }

    $rootScope.accountUser = {
        username: "",
        password: "",
        fullname: "",
        email: "",
        gender: "",
        birthday: "",
        marks: 0
    };

    $rootScope.quizz = {
        QuestionNo: 0,
        Name: "",
        Fullname: "",
        Id: 0,
        Text: "",
        Marks: 0,
        AnswerId: 0,
        Answers: [
            { "Id": 0, "Text": "3" },
            { "Id": 0, "Text": "4" },
            { "Id": 0, "Text": "1" },
            { "Id": 0, "Text": "2" }
        ]
    };

    $rootScope.SubjectAlreadyDo = [];

});


app.config(function ($routeProvider) {
    $routeProvider
        .when("/about", {
            templateUrl: "html/about.html?",
        })
        .when("/contact", {
            templateUrl: "html/contact.html?"
        })
        .when("/login", {
            templateUrl: "html/login.html?"
        })
        .when("/signup", {
            templateUrl: "html/signup.html?"
        })
        .when("/subject", {
            templateUrl: "html/subjects.html?"
        })
        .when("/account", {
            templateUrl: "html/account.html?"
        })
        .when("/quizzs", {
            templateUrl: "html/quizzs.html?"
        })
        .otherwise({ redirectTo: "/about" });

});
