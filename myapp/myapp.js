var app = angular.module("myApp", ["ngRoute"]);
app.run(function ($rootScope, $http) {
    //khi chạy trang web sẽ nhận dữ liệu của các học sinh
    $rootScope.students = [];

    //lấy dữ liệu từ sever
    var dbRef = firebase.database().ref().child("Students");
    dbRef.on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var key = childSnapshot.key;
            var User = snapshot.child(key).val();
            $rootScope.students.push(User);
        });
        $rootScope.students.forEach(st => {
            console.log(st);
        });
    })

    // localStorage.clear("students");
    if (localStorage.getItem("students") == null) {
        localStorage.setItem("students", JSON.stringify($rootScope.students));
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

    $rootScope.student = {
        username: "",
        password: "",
        fullname: "",
        email: "",
        gender: "",
        birthday: "",
        schoolfee: 0,
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
            templateUrl: "html/about.html?"
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
