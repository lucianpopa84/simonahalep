window.router = new kendo.Router();
import BiographyView from './js/biographyView.js';
import BiographyWidget from './js/biographyWidget.js';
import Authenticate from './js/authenticate.js';
import CommentsView from './js/commentsView.js';
import CommentWidget from './js/commentWidget.js';
import EventsView from './js/eventsView.js';
import EventWidget from './js/eventWidget.js';
import PalmaresView from './js/palmaresView.js';
import PalmaresWidget from './js/palmaresWidget.js';


$(document).ready(function () {
    var biographyView = new BiographyView();
    var commentsView = new CommentsView();
    var eventsView = new EventsView();
    var palmaresView = new PalmaresView();

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

    router.route("/palmares", () => {
        $("#v-pills-tab a").removeClass("active");
        $("#career-tab").addClass("active");
        palmaresView.load($("#main-container"));
    });
    router.route("/palmares/add", () => {
        PalmaresWidget.showUpdateForm($("#main-container"));
    });
    router.route("/palmares/delete/:id", (id) => {
        PalmaresWidget.delete(id);
    });
    router.route("/palmares/:id", function (id) {
        PalmaresWidget.edit($("#main-container"), id);
    });

    router.route("/events", () => {
        $("#v-pills-tab a").removeClass("active");
        $("#events-tab").addClass("active");
        eventsView.load($("#main-container"));
    });
    router.route("/events/add", () => {
        EventWidget.showUpdateEventForm($("#main-container"));
    });
    router.route("/events/delete/:id", (id) => {
        EventWidget.deleteEvent(id);
    });
    router.route("/events/:id", function (id) {
        EventWidget.editEvent($("#main-container"), id);
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
        router.navigate("/palmares");
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