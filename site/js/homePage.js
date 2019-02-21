let homePageHtml = `
<div class="row">
    <div class="col-6">
        <!-- product images start -->
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1" class=""></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2" class=""></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img class="d-block w-100" width="500" height="400" src="assets/simona1.jpg" alt="First slide"
                        style="float:left; object-fit:contain;">
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100" width="500" height="400" src="assets/simona2.jpg" alt="Second slide"
                        style="float:left; object-fit:contain;">
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100" width="500" height="400" src="assets/simona3.jpg" alt="Third slide"
                        style="float:left; object-fit:contain;">
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
        <!-- product images stop -->
    </div>

    <!--  description start -->
    <div class="col-4">
        <p></p>
        <p></p>

        <h1>Despre Simona</h1>
        <p>De la malul Mării Negre și până în inima Parisului, unde a câștigat primul titlu de Grand Slam la
            Roland
            Garros, Simona a parcurs un drum anevoios către culmile tenisului feminin mondial. Ani de
            antrenamente
            epuizante au transformat-o în final în cea mai bună tenismenă a lumii.</p>
        <p>Simona s-a născut într-o familie de aromâni în orașul Constanța. Tatăl ei, Stere (jucător de fotbal
            la
            echipa Săgeata Stejaru), deținea o fabrică de lactate. Ea a început să joace tenis la 4 ani, fiind
            antrenată de Ion Stan care era și antrenorul ...</p>
        <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" onclick="maiMulte()">Mai multe</button>
        </div>
    </div>
    <p id="textbox"></p>
</div>
`;
export default homePageHtml;