export default class Auth {
    constructor(profileElement) {
        this.webAuth = new auth0.WebAuth({
            domain: 'dev-hh0es11i.auth0.com',
            clientID: 'WaxdX_WWU0hICTU7Wal-QjYWDtiXRaAI',
            responseType: 'token id_token',
            redirectUri: window.location.href,
            audience: 'firstapi',
            scope: 'openid profile read:messages'
        });
        this.idToken = "";
        this.accessToken = "";
        this.expiresAt = "";
        this.userProfile = null;
        this.profileElement = profileElement;
        if (this.isAuthenticated()) {
            this.renewTokens();
        } else {
            this.handleAuthentication();
        }
    }
    localLogin(authResult) {
        console.log("local login");
        localStorage.setItem('isLoggedIn', 'true');
        // Set the time that the access token will expire at
        this.expiresAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime()
        );
        this.accessToken = authResult.accessToken;
        this.idToken = authResult.idToken;
        console.log('apel getProfile...');
        this.getProfile();
        console.log('apel getLocalToken...');
        this.getLocalToken();
    }
    getLocalToken() {
        console.log('enter getLocalToken');
        $.ajax('http://localhost:8080/users/',
            {
                method: "POST",
                dataType: "json",
                data: this.userProfile,
                content: "application/json",
                context: this,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + this.accessToken);
                },
                success: function (data) {
                    console.log(data);
                    this.localToken = data.token;
                    $.ajaxSetup({
                        headers: {
                            'x-access-token': this.localToken
                        }
                    });
                    router.navigate("/");
                },
                error: function (err) {
                    console.log(err);

                }
            }
        );
    }
    handleAuthentication() {
        this.webAuth.parseHash((err, authResult) => {
            console.log("handle autentification here", err, authResult);
            if (authResult && authResult.accessToken && authResult.idToken) {
                console.log('caz1');
                window.location.hash = '';
                this.localLogin(authResult);
            } else if (err) {
                console.log('caz2');
                console.log(err);
                alert(
                    'Error: ' + err.error + '. Check the console for further details.'
                );
            } else {
                console.log('caz3');
            }
            //displayButtons();
        });
    }
    renewTokens() {
        this.webAuth.checkSession({}, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.localLogin(authResult);
            } else if (err) {
                alert(
                    'Could not get a new token ' + err.error + ':' + err.error_description + '.'
                );
                this.logout();
            }
        });
    }
    logout() {
        // Remove isLoggedIn flag from localStorage
        this.webAuth.logout({
            client_id: 'WaxdX_WWU0hICTU7Wal-QjYWDtiXRaAI',
            returnTo: 'http://localhost:5500/index.html'

        });
        localStorage.removeItem('isLoggedIn');
        // Remove tokens and expiry time
        this.accessToken = '';
        this.idToken = '';
        this.expiresAt = 0;
        this.userProfile = null;
        var button = $(`<a class="nav-link" href="javascript: void(0)">Login</a>`);
        button.on('click', () => { this.webAuth.authorize(); });
        this.profileElement.empty();
        this.profileElement.append(button);
    }
    isAuthenticated() {
        // Check whether the current time is past the
        // Access Token's expiry time
        console.log("check for autentification...");
        var expiration = parseInt(this.expiresAt) || 0;
        return localStorage.getItem('isLoggedIn') === 'true' && new Date().getTime() < expiration;
    }
    getProfile() {
        if (!this.userProfile) {
            if (!this.accessToken) {
                console.log('Access Token must exist to fetch profile');
            }

            this.webAuth.client.userInfo(this.accessToken, (err, profile) => {
                console.log("incearca profile", profile);
                if (profile) {
                    this.userProfile = profile;
                    console.log("picture", profile.picture);
                    console.log("name", profile.name);
                    var img = ` <li class="nav-item"><a class="nav-link" >Logged as: <img height='30' src="${profile.picture}">${profile.nickname}</a><li>`;

                    var button = $(` <li class="nav-item"><a class="nav-link" href="javascript: void(0)">Logout</a></li>`);
                    button.on('click', () => { this.logout() });
                    this.profileElement.empty();
                    this.profileElement.append(button);
                    this.profileElement.append(img);
                    console.log("user profile:", this.userProfile);
                }
            });
        }
    }
}








