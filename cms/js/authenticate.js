export default class Authenticate {
    constructor(element) {
        this.element = element;
        if (!localStorage.getItem('isLoggedInAdmin')) {
            this.adminToken = "";
            this.username = "";
            this.showLogin();
        } else {
            this.adminToken = localStorage.getItem('localAdminToken');
            this.username = localStorage.getItem('username');
            this.element.empty();
            this.doLogin();
        }
    }

    logout() {
        this.adminToken = "";
        this.username = "";
        $.ajaxSetup({
            headers: {
                'x-access-token': this.adminToken
            }
        });
        var event = new Event('userLoggedOut');
        window.dispatchEvent(event);
        localStorage.removeItem('isLoggedInAdmin');
        localStorage.removeItem('localAdminToken');
        localStorage.removeItem('username');
        this.showLogin();
    }
    showLogin() {
        let form = $(`<form></form>`);
        form.append(`<div class="modal fade" id="modalLoginForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header text-center">
              <h4 class="modal-title w-100 font-weight-bold">Sign in</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body mx-3">
              <div class="md-form mb-5">
                <i class="fas fa-envelope prefix grey-text"></i>
                <input type="text" name="username" id="username" class="form-control validate">
                <label data-error="wrong" data-success="right" for="username">Your username</label>
              </div>
              <div class="md-form mb-4">
                <i class="fas fa-lock prefix grey-text"></i>
                <input type="password" name="password" id="password" class="form-control validate">
                <label data-error="wrong" data-success="right" for="password">Your password</label>
              </div>
            </div>
            <div class="modal-footer d-flex justify-content-center">
              <button class="btn btn-default">Login</button>
            </div>
            <label id="errMsg">ok</label>
          </div>
        </div>
    </div>
    <div class="text-center" id="loginButton">
        <a href="" class="btn btn-default btn-rounded mb-4" data-toggle="modal" data-target="#modalLoginForm">Login</a>
    </div>
      `)
        form.on('submit', (e) => { e.preventDefault(); this.requestLogin(form); })
        this.element.empty();
        this.element.append(form);
    }
    doLogin() {
        $.ajaxSetup({
            headers: {
                'x-access-token': this.adminToken
            }
        });
        this.element.append(`Hi, ${this.username}`);
        let button = $("<button class='btn btn-primary btn-sm'>Logout</button>");
        button.on('click', () => { this.logout(); })
        this.element.append(button);
        $('#loginButton').hide();
        var event = new Event('userLoggedIn');
        window.dispatchEvent(event);
        localStorage.setItem('isLoggedInAdmin', 'true');
        localStorage.setItem('localAdminToken', this.adminToken);
        localStorage.setItem('username', this.username);

    }
    requestLogin(formular) {
        let inputs = formular.serializeArray();
        let values = {}
        for (let input of inputs) {
            let { name, value } = input;
            values[name] = value;
        }
        $.ajax('http://localhost:8080/adminusers/login',
            {
                method: "POST",
                dataType: "json",
                data: values,
                content: "application/json",
                context: this,
                success: function (data) {
                    console.log(data);
                    if (!data.auth) {
                        $("#errMsg").html("Login error");
                    } else {
                        this.adminToken = data.token;
                        this.username = data.username;
                        $("#errMsg").html("Login ok");
                        $('#modalLoginForm').modal('hide');
                        this.doLogin();
                    }
                },
                error: function (err) {
                    console.log(err);
                    $("#errMsg").html("Login error");
                }
            }
        );
    }
}
