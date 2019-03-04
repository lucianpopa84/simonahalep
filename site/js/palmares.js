export default class Palmares {
    constructor({ id = "", turneu = "", an = "", record = "" } = {}) {
        this.id = id;
        this.turneu = turneu;
        this.an = an;
        this.record = record;
    }
    render(container) {
        let { id, turneu, an, record } = this;
        let div = $(`
        <div class="card border mb-3">
          <div class="card-header">${turneu} ${an}</div>
            <div class="card-body">
              <h5 class="card-title">${record}</h5>
              <p class="card-text">
                <div class="container">
                  <div class="row">
                    <div class="col-sm-6">
                      ${description}
                    </div>
                    <div class="col-sm-6 mapouter">
                        <div class="gmap_canvas">
                         <iframe width="476" height="310" id="gmap_canvas" src="https://maps.google.com/maps?q=${location}&t=&z=5&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                        </div>
                        <style>.mapouter{text-align:right;height:310px;width:476px;}.gmap_canvas {overflow:hidden;background:none!important;height:310px;width:476px;}</style>
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
        let { id, turneu, an, record } = this;
        let div = $(`
    <div class="row">
      <div class="col-sm">
          ${turneu} ${an}
      </div>
      <div class="col-sm">
          ${record}
      </div>
    </div>
          `);
        container.append(div);
    }


}