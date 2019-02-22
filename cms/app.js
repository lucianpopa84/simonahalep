window.router = new kendo.Router();
import BiographyView from './js/biographyView.js';
import BiographyWidget from './js/biographyWidget.js';
import Authenticate from './js/authenticate.js';
import CommentsView from './js/commentsView.js';
import CommentWidget from './js/commentWidget.js';


$(document).ready(function () {
    var biographyView = new BiographyView();
    var commentsView = new CommentsView();

    router.route("/", function () {
        $("#main-container").empty();
        $("#main-container").html(`<h1>INDEX PAGE</h1>`);
    });

    router.route("/biography", () => {
        $("#v-pills-tab a").removeClass("active");
        $("#biography-tab").addClass("active");
        biographyView.load($("#main-container"));
    });
    router.route("/biography/add", () => {
        BiographyWidget.showUpdateBiographyForm($("#main-container"));
    });
    router.route("/biography/delete/:id", (id) => {
        BiographyWidget.deleteBiography(id);
    });
    router.route("/biography/:id", function (id) {
        BiographyWidget.editBiography($("#main-container"), id);
    });

    router.route("/careerStatistics", () => {
        $("#v-pills-tab a").removeClass("active");
        $("#career-tab").addClass("active");
        $("#main-container").html("<h1>CareerStatistics view</h1>");
    });

    router.route("/events", () => {
        $("#v-pills-tab a").removeClass("active");
        $("#events-tab").addClass("active");
        $("#main-container").html("<h1>Events view</h1>");
    });

    router.route("/comments", () => {
        $("#v-pills-tab a").removeClass("active");
        $("#cusers-tab").addClass("active");
        commentsView.load($("#main-container"));
    });
    router.route("/comments/delete/:id", (id) => {
        CommentWidget.delete(id);
    });
    router.route("/comments/ban/:id", (id) => {
        CommentWidget.updateUserBan(id, 1);
    });
    router.route("/comments/unban/:id", (id) => {
        CommentWidget.updateUserBan(id, 0);
    });
    router.start();

    $(window).on('userLoggedIn', () => { $('#logedInSection').removeClass("d-none") });

    $(window).on('userLoggedOut', () => { $('#logedInSection').addClass("d-none") });

    var authenticate = new Authenticate($("#authenticate"));

    $("#biography-tab").on('click', function () {
        router.navigate("/biography");
    })
    $("#career-tab").on('click', function () {
        router.navigate("/careerStatistics");

    })
    $("#events-tab").on('click', function () {
        router.navigate("/events");

    })
    $("#users-tab").on('click', function () {
        router.navigate("/comments");

    })
    $("#logo").on('click', function () {
        router.navigate("/");
    })



})