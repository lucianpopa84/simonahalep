import Event from "./event.js";
export default class EventWidget extends Event {
    constructor(data) {
        super(data);
    }
    render(container) {
        let { id, name, location, startDate, endDate, description } = this;
        let div = $(`
        <div class="card border mb-3">
        <div class="card-header">${startDate} - ${endDate}</div>
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${location} ${description}</p>
        </div>
      </div>
      `);
        container.append(div);
    }
    static deleteEvent(id) {
        $.ajax('http://localhost:8080/competitions/' + id,
            {
                method: "DELETE",
                dataType: "json",
                data: { id },
                content: "application/json",
                context: this,
                success: function (data) {
                    router.navigate("/events");
                },
                error: function (err) {
                    console.log(err);
                }
            }
        );
    }

    static updateEvent(formular) {
        let inputs = formular.serializeArray();
        let newValues = {};
        for (let input of inputs) {
            let { name, value } = input;
            newValues[name] = value;
        }
        $.ajax('http://localhost:8080/competitions/',
            {
                method: "PUT",
                dataType: "json",
                data: newValues,
                content: "application/json",
                context: this,
                success: function (data) {
                    router.navigate("/events");
                },
                error: function (err) {
                    console.log(err);
                }
            }
        );
    }

    static showUpdateEventForm(container, { id = '', startDate = '', endDate = '', name = '', description = '', location = '' } = {}) {
        let form = $(`
<form>
  <input type="hidden" name="id" value="${id}">
  <div class="form-group">
    <label for="startdate">Start Date:</label>
    <input  class="form-control" id="startdate" name="startDate" value="${startDate}" placeholder="start date of event" required>
    <label for="enddate">Start Date:</label>
    <input  class="form-control" id="enddate" name="endDate" value="${endDate}" placeholder="end date of event" required>
  </div>
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" class="form-control" id="name" name="name" value="${name}" required>
  </div>
  <div class="form-group">
    <label for="location">Location</label>
    <input type="text" class="form-control" id="location" name="location" value="${location}" required>
  </div>
  <div class="form-group">
    <label for="description">Description</label>
    <textarea class="form-control" id="description" name="description" rows="3" required>${description}</textarea>
  </div>
  <button type="submit" class="btn btn-primary">add/edit event</button>
</form>
        `);
        if (id) {
            let deleteButton = $("<button class='btn btn-danger'>delete</button>");
            deleteButton.on('click', (e) => {
                e.preventDefault();
                if (confirm('siguri stergeti?')) {
                    this.deleteEvent(id);
                }
            });
            deleteButton.appendTo(form);
        }
        container.empty();
        container.append(`<h2>Add/Edit Event</h2>`);
        container.append(form);
        $("#startdate").kendoDatePicker({ format: "yyyy-MM-dd" });
        $("#enddate").kendoDatePicker({ format: "yyyy-MM-dd" });
        if (!id) {
            form.on('submit', (e) => { e.preventDefault(); this.addEvent(form); })
        } else {
            form.on('submit', (e) => { e.preventDefault(); this.updateEvent(form); })
        }
    }
    static addEvent(formular) {
        let inputs = formular.serializeArray();
        let newValues = {}
        for (let input of inputs) {
            let { name, value } = input;
            newValues[name] = value;
        }
        console.log(newValues);
        $.ajax('http://localhost:8080/competitions/',
            {
                method: "POST",
                dataType: "json",
                data: newValues,
                content: "application/json",
                context: this,
                success: function (data) {
                    router.navigate("/events");
                },
                error: function (err) {
                    console.log(err);
                }
            }
        );
    }
    static editEvent(container, id) {

        $.ajax('http://localhost:8080/competitions/' + id,
            {
                method: "GET",
                dataType: "json",
                content: "application/json",
                context: this,
                success: function (data) {
                    let event = new Event(data.data);
                    let widget = new EventWidget(event);
                    container.empty();
                    EventWidget.showUpdateEventForm(container, widget);
                }
            }
        );
    }
}

