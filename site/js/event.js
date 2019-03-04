export default class Event {
  constructor({ id = "", startDate = "", endDate = "", name = "", location = "", description = "" } = {}) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.name = name;
    this.location = location;
    this.description = description;
    this.id = id;
  }
  render(container) {
    let { id, startDate, endDate, name, location, description } = this;
    description = description.replace(/(?:\r\n|\r|\n)/g, '<br>');
    let div = $(`
      <div class="card border mb-3">
        <div class="card-header">${name} ${startDate}-${endDate}</div>
          <div class="card-body">
            <h5 class="card-title">${location}</h5>
            <p class="card-text">
              <div class="container">
                <div class="row">
                  <div class="col-sm-6 mapouter">
                      <div class="gmap_canvas">
                       <iframe width="476" height="310" id="gmap_canvas" src="https://maps.google.com/maps?q=${location}&t=&z=5&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                      </div>
                      <style>.mapouter{text-align:right;height:310px;width:476px;}.gmap_canvas {overflow:hidden;background:none!important;height:310px;width:476px;}</style>
                  </div>
                  <div class="col-sm-6">
                    ${description}
                  </div>
                </div>
              </div>
            </p>
          </div>
        </div>
       </div>
        `);
    container.append(div);
  }

  renderList(container) {
    let { id, startDate, endDate, name, location, description } = this;
    let div = $(`
  <div class="row">
    <div class="col-sm">
        ${name}
    </div>
    <div class="col-sm">
        ${location}
    </div>
    <div class="col-sm">
        ${startDate} - ${endDate}
    </div>
  </div>
        `);
    container.append(div);
  }


}