<script>
// import components
export default {
  name: "AppFooter",
};
</script>
<template>
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-8 d-flex">
          <!--Link-->
          <div class="row py-5 my-5 me-1">
            <div class="col-4 g-0">
              <h5 class="mb-3 title-link-footer ibm-plex-mono-semibold">
                Scopri deliveBoo
              </h5>
              <div>
                <ul class="p-0 my-1 link-footer ibm-plex-mono-regular">
                  <li>
                    <a href="#">Chi siamo</a>
                  </li>
                  <li>
                    <a href="#">Ristoranti</a>
                  </li>
                  <li>
                    <a href="#">Diventa parte del team!</a>
                  </li>
                  <li>
                    <a href="#">Diventa nostro partner!</a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-4">
              <h5 class="mb-3 title-link-footer ibm-plex-mono-semibold">
                Scopri deliveBoo
              </h5>
              <div>
                <ul class="p-0 my-1 link-footer ibm-plex-mono-regular">
                  <li>
                    <a href="#">Termin e condizioni</a>
                  </li>
                  <li>
                    <a href="#">Informativa sulla privacy</a>
                  </li>
                  <li>
                    <a href="#">Cookies</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-4">
              <h5 class="mb-3 title-link-footer ibm-plex-mono-semibold">
                Scopri deliveBoo
              </h5>
              <div>
                <ul class="p-0 my-1 link-footer ibm-plex-mono-regular">
                  <li>
                    <a href="#">Contattaci</a>
                  </li>
                  <li>
                    <a href="#">FAQ</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!--Logo-->
        <div class="col-4 d-flex flex-column justify-content-center pe-5">
          <img
            class="logo-deliveboo"
            src="/images/Logo-deliveBoo-white.png"
            alt="deliveBoo-logo"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-4 d-flex justify-content-between">
          <div>
            <ul class="link-footer d-flex p-0">
              <li>
                <i class="fa-brands fa-facebook"></i>
              </li>
              <li>
                <i class="fa-brands fa-instagram"></i>
              </li>
              <li>
                <i class="fa-brands fa-tiktok"></i>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-4 cop-deliveboo ibm-plex-mono-regular">
          <h4>Copyright deliveBoo</h4>
        </div>
        <div class="col-4 team-5 ibm-plex-mono-regular">
          <h4>Team 5</h4>
        </div>
      </div>
    </div>
  </footer>
</template>
<style scoped>
footer {
  background-color: #2f2f2f;
  max-height: 400px;
}
.title-link-footer {
  color: white;
}
.link-footer {
  list-style-type: none;
}
ul > li > i {
  color: white;
  margin-right: 15px;
  margin-bottom: 20px;
  font-size: 25px;
}
a {
  text-decoration: none;
  color: white;
}
.logo-deliveboo {
  width: 100%;
  height: auto;
  max-width: 300px;
  margin-top: 20px;
}
.cop-deliveboo {
  text-align: center;
}
.team-5 {
  text-align: end;
}
h4 {
  color: #4a4a4a;
  font-size: 15px;
}
</style>