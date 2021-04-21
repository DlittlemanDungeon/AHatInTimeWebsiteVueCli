<template>
<div>
  <div class='top'>
    <img class='logo' src ='../src/assets/logo.png'/>
    <div class='videoContainer'>
      <video class='video' src="../src/assets/speedrunVideo.mp4" autoplay muted loop>
        <source src="../src/assets/speedrunVideo.mp4" type="video/mp4"/>
      </video>
    </div>
  </div>

  <nav class="navbar sticky-top navbar-expand-lg navbar-light colorDarkPurple bar">
    <div class="container-fluid">
      <a class="navbar-brand" href="/"><img src="../src/assets/timepiece.png" width='50px'></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="true" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">

        <div class="navbar-nav">
          <a class="nav-link disabled text-secondary" href="#" aria-disabled="true">Guides</a>
          <a class="nav-link text-white" href="/strats">Strats</a>
          <a class="nav-link disabled text-secondary" href="#"  aria-disabled="true">Tools</a>
          <a class="nav-link disabled text-secondary" href="#" aria-disabled="true">Leaderboards</a>
          <a class="nav-link disabled text-secondary" href="#" aria-disabled="true">Community</a>
          <a class="nav-link disabled text-secondary" href="#" aria-disabled="true">Contact Us</a>
        </div>

        <div class='navbar-nav user'>
          <a v-if='!user' class="nav-link btn btn-warning buttonMargin" href="/login" role="button" style='color:black;'>Login</a>
          <a v-if='user' class="nav-link text-white" href="#">{{user.speedrunUsername}}</a>
          <a v-if='user' class="nav-link btn btn-warning buttonMargin" @click="logout" role="button" style='color:black;'>
              Log out</a>
        </div>

        <form class="form-inline navbar-nav">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-light" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>

  <router-view />

  <div class='footer textAlignCenter colorDarkPurple'>
    <div class='footerBox'>
      <a class='footerLink' href='https://www.speedrun.com/ahit'>A Hat in Time Leaderboards</a>
      <a class='footerLink' href='https://www.speedrun.com/ahitce'>A Hat in Time Category Extensions</a>
      <a class='footerLink' href='https://www.speedrun.com/'>Speedrun.com</a>
    </div>

    <div class='footerBox'>
      <a class='footerLink' href='https://github.com/DlittlemanDungeon/AHatInTimeWebsiteVueCli'>GitHub Repository</a>
      <a class='footerLink' href='https://gearsforbreakfast.com/games/a-hat-in-time/'>A Hat in Time Website</a>
      <a class='footerLink' href='https://store.steampowered.com/app/253230/A_Hat_in_Time/'>A Hat in Time Steam</a>
     </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'App',
    components: {
    },
    data() {
        return {
        }
    },
    methods: {
        async getLoggedIn() {
            try {
                let response = await axios.get('/api/users');
                this.$root.$data.user = response.data.user;
            }
            catch (error) {
                this.$root.$data.user = null;
            }
        },
        async logout() {
            try {
              await axios.delete("/api/users");
              this.$root.$data.user = null;
              this.$router.push("/");
              window.scrollTo(0,0);
            } catch (error) {
              this.$root.$data.user = null;
            }
        },
    },
    created() {
        this.getLoggedIn();
    },
    computed: {
        user() {
            return this.$root.$data.user;
        }
    }
}

</script>


<style>
@font-face {
    font-family: "cursedCasual";
    src: url(../src/assets/CurseCasual.ttf);
    font-style: normal;
}

* {
    padding: 0px;
    margin: 0px;
    font-family: 'cursedCasual';
}

.user {
  display: flex;
  align-items: center;
}

.top {
    width: 100%;
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.logo {
    position: absolute;
    z-index: 1;
    align-self: center;
    width: 30%;
}

.videoContainer {
    height: 100%;
    display: flex;
    padding: 0px;
    margin: 0px;
    overflow: hidden;
}

.video {
    align-self: center;
    width: 100%;
}

.colorDarkPurple {
    background-color: #231457;
}

.debug {
    /*border: 1px solid red;*/
}

.footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}

.footerBox {
    display: flex;
    padding: 20px;
    margin: 10px;
    flex-direction: column;

}

.footerLink {
    text-decoration: none;
    color: white;
}

.textAlignCenter {
    text-align: center;
}
</style>
