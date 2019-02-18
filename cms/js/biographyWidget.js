import Biography from "./biography.js";
export default class BiographyWidget extends Biography {
    constructor(biography) {
        super(biography);
    }

    render(container) {
        let { id, date, status, title, description } = this;
        let div = $(`<div>${date} ${status} ${title} ${description}</div>`);
        let buttonEdit = $(`<button class='studentButton' >Edit student</button>`);
        buttonEdit.on('click', () => {
            container.empty();
            router.navigate("/biography/edit");
            BiographyWidget.showUpdateBiographyForm(container, this);
        });
        div.append(buttonEdit);
        container.append(div);
    }

    static updateBiography(formular) {
        let inputs = formular.serializeArray();
        let newValues = {};
        for (let input of inputs) {
            let { name, value } = input;
            newValues[name] = value;
        }
        $.ajax('http://localhost:8080/biography/',
            {
                method: "PUT",
                dataType: "json",
                data: newValues,
                content: "application/json",
                context: this,
                success: function (data) {
                    router.navigate("/biography");
                },
                error: function (err) {
                    console.log(err);
                }
            }
        );
    }

    static deleteBiography(id) {
        $.ajax('http://localhost:8080/biography/' + id, //https://randomuser.me/api/?results=5
            {
                method: "DELETE",
                dataType: "json",
                data: { id },
                content: "application/json",
                context: this,
                success: function (data) {
                    router.navigate("/biography");

                },
                error: function (err) {
                    console.log(err);
                }
            }
        );
    }
    static showUpdateBiographyForm(container, { id = '', date = '', status = '', title = '', description = '' } = {}) {

        if (!status) {
            status = 'not visible';
        }
        let statusChecked = {};
        statusChecked[status] = "selected";
        let form = $(`
<form>
  <input type="hidden" name="id" value="${id}">
  <div class="form-group">
    <label for="date">Date:</label>
    <input type="date" class="form-control" id="date" name="date" value="${date}" placeholder="date of event" required>
  </div>
  <div class="form-group">
    <label for="title">Title</label>
    <input type="text" class="form-control" id="title" name="title" value="${title}" required>
  </div>
  <div class="form-group">
    <label for="status">Status</label>
    <select class="form-control" id="status" name="status">
      <option value='visible' ${statusChecked['visible']}>visible</option>
      <option value='not visible' ${statusChecked['not visible']}>not visible</option>
    </select>
  </div>
  <div class="form-group">
    <label for="description">Description</label>
    <textarea class="form-control" id="description" name="description" rows="3" required>${description}</textarea>
  </div>
  <button type="submit" class="btn btn-primary">add/edit biography</button>
</form>
        `);
        if (id) {
            let deleteButton = $("<button class='btn btn-danger'>delete</button>");
            deleteButton.on('click', (e) => {
                e.preventDefault();
                if (confirm('siguri stergeti?')) {
                    this.deleteBiography(id);
                }
            });
            deleteButton.appendTo(form);
        }
        container.empty();
        container.append(`<h2>Add/Edit Biography</h2>`);
        container.append(form);
        if (!id) {
            form.on('submit', (e) => { e.preventDefault(); this.addBiography(form); })
        } else {
            form.on('submit', (e) => { e.preventDefault(); this.updateBiography(form); })
        }
    }
    static addBiography(formular) {
        let inputs = formular.serializeArray();
        let newBiography = {}
        for (let input of inputs) {
            let { name, value } = input;
            newBiography[name] = value;
        }
        $.ajax('http://localhost:8080/biography/',
            {
                method: "POST",
                dataType: "json",
                data: newBiography,
                content: "application/json",
                context: this,
                success: function (data) {
                    router.navigate("/biography");
                },
                error: function (err) {
                    console.log(err);
                }
            }
        );
    }
    static editBiography(container, id) {

        $.ajax('http://localhost:8080/biography/' + id,
            {
                method: "GET",
                dataType: "json",
                content: "application/json",
                context: this,
                success: function (data) {
                    let biography = new Biography(data.data);
                    let widget = new BiographyWidget(biography);
                    container.empty();
                    BiographyWidget.showUpdateBiographyForm(container, widget);
                }
            }
        );
    }
}