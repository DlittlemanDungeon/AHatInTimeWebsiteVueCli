<template>
    <div class='tutorialSetup'>
        <div class='colorYellow leftBar'>
           <ul class="colorYellow list-group list-group-flush">
               <li class="colorYellow list-group-item importantText"><a class='tutorialLink' href='#/' @click="setStrat('6068f2805b1b9651fcd605b8')">
                    Strats</a></li>
                <div v-for='s in stratData' :key='s._id'>
                    <li class="colorYellow list-group-item lessImportantText" v-if='s.visible'>
                        <a class='tutorialLink' href='#/' @click="setStrat(s._id)">{{s.title}}</a>
                    </li>
                </div>
                <li class="colorYellow list-group-item importantText"><a class='tutorialLink' href='#/' @click="setContribute()">
                    Contribute</a></li>
              </ul>
        </div>
        <StratInfo v-if='!contribute' :guide='guide' :infoParagraphs='infoParagraphs' :tutorialVideos='tutorialVideos'/>
        <StratContribute v-if='contribute'/>
    </div>
</template>

<script>
import StratInfo from '@/components/StratInfo.vue'
import StratContribute from '@/components/StratContribute.vue'
import axios from 'axios';

export default {
    name: 'Strats',
    components: {
        StratInfo,
        StratContribute
    },
    data() {
        return {
            strat: '6068f2805b1b9651fcd605b8',
            contribute: false,
            guide: {title: ""},
            infoParagraphs: [],
            tutorialVideos:[],
        }
    },
    methods: {
        setStrat(stratName) {
            this.strat = stratName;
            this.contribute = false;
            this.getInfo();
        },
        setContribute() {
            this.contribute = true;
        },
        async getGuides() {
            try {
            const response = await axios.get("/api/guides");
            this.$root.$data.guides = response.data;
            } catch (error) {
            console.log(error);
            }
        },
        async getInfo() {
          let url = "/api/guides/" + this.strat;
          let response = await axios.get(url);
          this.guide = response.data;

          let urlPar = "/api/guides/" + this.strat + "/infoParagraphs";
          response = await axios.get(urlPar);
          this.infoParagraphs = response.data;
          let urlVid = "/api/guides/" + this.strat + "/tutorialVideos";
          response = await axios.get(urlVid);
          this.tutorialVideos = response.data;
      }, 
    },
    created() {
        this.getGuides();
        this.getInfo();
    },
    computed: {
        stratData() {
            return this.$root.$data.guides;
        }
    }
}

</script>


<style>
h1 {
    text-align: center;
}

p {
    text-align: center;
    color: white;
    font-family:Arial, Helvetica, sans-serif;
}

.debug {
    border: 0px solid red;
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

.colorLightPurple {
    background-color: #47358b;
}

.colorYellow {
    background-color: #ffc107 !important;
}

.communityBox {
    background-color: #231457 !important;
    width: 75%;
    border-radius: 50px;
    padding: 3px;
}

.mainCommunityText {
    text-align: center;
    margin-top: 10px;
    font-size: 35px;
    font-family: 'CursedCasual';
}

.communityText {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 50px;
}

.communityTextRight {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-family: 'CursedCasual';
    padding: 5px;
    padding-left:15px;
    padding-right:15px;
}

.communityTextLeft {
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    font-size: 25px;
    font-family: 'CursedCasual';
    background-color: #ffc107 !important;
    border-radius: 20px;
    padding: 5px;
    padding-left:15px;
    padding-right:15px;
    margin: 0px;
}

.width20 {
    width: 20%;
}

.width15 {
    width: 15%;
}

.width10 {
    width: 10%;
}

.width5 {
    width: 5%;
}

.textDisabled {
    color: #EBEBEB;
}

.overflowHidden {
    overflow: hidden;
}

.content {
    display: flex;
    padding: 10px;
    justify-content: center;
    text-align: center;
}

.cardMContainer {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
}

.leaderboardTop {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    padding-top: 30px;
}

.leaderboardButtons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.leaderboardButton {
    margin: 5px;
}

.leaderboardBox {
    padding: 25px;
}

.cardM {
    margin: 30px;
    width: 300px;

    display: flex;
    align-items: center;
    flex-direction: column;
    
}

.imageBox {
    display: flex;
    justify-content: center;
    height: 70%;
    width: 100%;
}

.image {
    width: 75%;
}

.text {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding : 10px;
    height: 100px;
}

.buttonMargin {
    margin: 10px;
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

.tutorialSetup {
    display: flex;
}

.leftBar {
    width: 20%;
    text-align: center;
}

.importantText {
    text-align: left;

}

.lessImportantText {
    text-align:center;
}

.tutorialLink {
    text-decoration: none;
    color: black;
}

.rightContent {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.rightContentText {
    width: 80%;
    padding: 20px;
}

.groupOButtons {
    display: flex;
    width: 80%;
    margin-bottom: 25px;
    justify-content: center;
}

.bigText {
    font-size: 23px;
    text-align: left;
}

.run {
    background-color:  #231457;
    display: flex;
    flex-wrap: wrap;
    border-radius: 20px;
    padding: 5px;
    margin: 5px;
    justify-content: space-between;
}

.mediumText {
    font-size: 19px;
    text-align: left;
    padding-right: 15px;
}

.youtubeVideoBox {
    overflow: hidden;
    display: flex;
    justify-content: center;
    padding: 20px;
    width: 100%;
}

@media only screen and (max-width: 770px) {
    .video {
      height: 101%;
      width: auto;
    }

    .logo {
        width: 80%;
    }
  }

  
@media only screen and (max-width: 544px) {
    .run {
        flex-direction: column;
        align-items: center;
    }
}
</style>