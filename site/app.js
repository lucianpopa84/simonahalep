window.router = new kendo.Router();
import Auth from './js/auth.js';

$(document).ready(function () {

    router.route("/", function () {
        $("#navb a").removeClass("active");
        $("#sectionArea").empty();
        $("#sectionArea").html(`<h1>INDEX PAGE</h1>`);
    });

    router.route("/biography", () => {
        $("#navb a").removeClass("active");
        $("#biography").addClass("active");
        $("#sectionArea").html("<h1>Biography view</h1>");
    });

    router.route("/careerStatistics", () => {
        $("#navb a").removeClass("active");
        $("#careerStatistics").addClass("active");
        $("#sectionArea").html("<h1>CareerStatistics view</h1>");
    });

    router.route("/events", () => {
        $("#navb a").removeClass("active");
        $("#events").addClass("active");
        $("#sectionArea").html("<h1>Events view</h1>");
    });


    router.start();


    window.auth = new Auth($("#authenticate"));

    $("#biography").on('click', function () {
        router.navigate("/biography");
    })
    $("#careerStatistics").on('click', function () {
        router.navigate("/careerStatistics");

    })
    $("#events").on('click', function () {
        router.navigate("/events");

    })

    $("#logo").on('click', function () {
        router.navigate("/");
    })

    $("#user-log").on('click', () => {
        auth.webAuth.authorize();
    })

})