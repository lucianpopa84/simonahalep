window.router = new kendo.Router();
import Auth from './js/auth.js';
import BiographyView from "./js/biographyView.js";
import homePageHtml from "./js/homePage.js";
import CommentsView from "./js/commentsView.js";
import EventsView from "./js/eventsView.js";
import PalmaresView from "./js/palmaresView.js";


$(document).ready(function () {
    let sectionArea = $('#sectionArea');
    router.route("/", function () {
        $("#navb a").removeClass("active");
        sectionArea.empty();
        sectionArea.html(homePageHtml);
    });

    router.route("/biography", () => {
        $("#navb a").removeClass("active");
        $("#biography").addClass("active");
        let biographyView = new BiographyView();
        biographyView.load(sectionArea);
    });

    router.route("/careerStatistics", () => {
        $("#navb a").removeClass("active");
        $("#careerStatistics").addClass("active");
        sectionArea.html("<h1>CareerStatistics view</h1>");
    });

    router.route("/events", () => {
        $("#navb a").removeClass("active");
        $("#navbarDropdown").addClass("active");
        let eventsView = new EventsView();
        eventsView.load(sectionArea);
    });
    router.route("/pastevents", () => {
        $("#navb a").removeClass("active");
        $("#navbarDropdown").addClass("active");
        let eventsView = new EventsView();
        eventsView.loadPast(sectionArea);
    });
    router.route("/palmares", () => {
        $("#navb a").removeClass("active");
        $("#careerStatistics").addClass("active");
        let palmaresView = new PalmaresView();
        palmaresView.loadPalmares(sectionArea);
    });
    router.route("/comments", () => {
        $("#navb a").removeClass("active");
        $("#comments").addClass("active");
        let commentsView = new CommentsView();
        commentsView.load(sectionArea);
    });

    router.start();


    window.auth = new Auth($("#authenticate"));

    $("#biography").on('click', function () {
        router.navigate("/biography");
    })
    $("#careerStatistics").on('click', function () {
        router.navigate("/palmares");

    })
    $("#events").on('click', function () {
        router.navigate("/events");
    })
    $("#pastEvents").on('click', function () {
        router.navigate("/pastevents");
    })
    $("#comments").on('click', function () {
        router.navigate("/comments");
    })

    $("#logo").on('click', function () {
        router.navigate("/");
    })

    $("#user-log").on('click', () => {
        auth.webAuth.authorize();
    })

})