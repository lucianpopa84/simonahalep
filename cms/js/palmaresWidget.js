import Palmares from "./palmares.js";
export default class PalmaresWidget extends Palmares {
    constructor(data) {
        super(data);
    }
    render(container) {
        let { id, turneu, an, record } = this;
        let div = $(`
        <div class="card border mb-3">
        <div class="card-header">${turneu}</div>
        <div class="card-body">
          <h5 class="card-title">${an}</h5>
          <p class="card-text">${record}</p>
        </div>
      </div>
      `);
        container.append(div);
    }
    static delete(id) {
        $.ajax('http://localhost:8080/palmares/' + id,
            {
                method: "DELETE",
                dataType: "json",
                data: { id },
                content: "application/json",
                context: this,
                success: function (data) {
                    router.navigate("/palmares");
                },
                error: function (err) {
                    console.log(err);
                }
            }
        );
    }

    static update(formular) {
        let inputs = formular.serializeArray();
        let newValues = {};
        for (let input of inputs) {
            let { name, value } = input;
            newValues[name] = value;
        }
        $.ajax('http://localhost:8080/palmares/',
            {
                method: "PUT",
                dataType: "json",
                data: newValues,
                content: "application/json",
                context: this,
                success: function (data) {
                    router.navigate("/palmares");
                },
                error: function (err) {
                    console.log(err);
                }
            }
        );
    }

    static showUpdateForm(container, { id = '', turneu = '', an = '', record = '' } = {}) {
        let tournements = ["Australian Open", "French Open", "Wimbledon", "US Open", "Davis Cup", "Fed Cup", "Hopman Cup", "Laver Cup"];
        let records = ["Winner", "Finalist", "SemiFinalist", "QF", "Round 16", "Round 32", "Round 64", "Round 128"];
        let ulFields = $(`
<ul class="fieldlist">  
  <li>
    <label for="an">Year:</label>
    <input  id="an" name="an" value="${an}" placeholder="year of record" required>
    <input type="hidden" name="id" value="${id}">
  </li>
  <li >
    <label for="turneu">Turnement:</label>
    <input type="text"  id="turneu" name="turneu" value="${turneu}" required>
  </li>
  <li>
    <label for="record">Record:</label>
    <input type="text"  id="record" name="record" value="${record}" required>
  </li>
</ul>
`);
        let buttonsGroup = $(`
        <li id="buttonsGroup">
        <button type="submit" class="btn btn-primary">add/edit record</button>
        </li>
        `);
        if (id) {
            let deleteButton = $("<button class='btn btn-danger'>delete</button>");
            deleteButton.on('click', (e) => {
                e.preventDefault();
                if (confirm('siguri stergeti?')) {
                    this.delete(id);
                }
            });
            deleteButton.appendTo(buttonsGroup);
        }
        buttonsGroup.appendTo(ulFields);
        let form = $("<form></form>");
        ulFields.appendTo(form);
        container.empty();
        container.append(`<h2>Add/Edit Record</h2>`);
        container.append(form);
        $("#an").kendoDatePicker({
            start: "decade",
            depth: "decade",
            format: "yyyy"
        });
        $("#turneu").kendoDropDownList({ dataSource: tournements });
        $("#record").kendoDropDownList({ dataSource: records });
        if (!id) {
            form.on('submit', (e) => { e.preventDefault(); this.add(form); })
        } else {
            form.on('submit', (e) => { e.preventDefault(); this.update(form); })
        }
    }
    static add(formular) {
        let inputs = formular.serializeArray();
        let newValues = {}
        for (let input of inputs) {
            let { name, value } = input;
            newValues[name] = value;
        }
        $.ajax('http://localhost:8080/palmares/',
            {
                method: "POST",
                dataType: "json",
                data: newValues,
                content: "application/json",
                context: this,
                success: function (data) {
                    router.navigate("/palmares");
                },
                error: function (err) {
                    console.log(err);
                }
            }
        );
    }
    static edit(container, id) {

        $.ajax('http://localhost:8080/palmares/' + id,
            {
                method: "GET",
                dataType: "json",
                content: "application/json",
                context: this,
                success: function (data) {
                    let palmares = new Palmares(data.data);
                    let widget = new PalmaresWidget(palmares);
                    container.empty();
                    PalmaresWidget.showUpdateForm(container, widget);
                }
            }
        );
    }
}

