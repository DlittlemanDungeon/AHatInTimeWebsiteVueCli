<template>
<div class='rightContent colorLightPurple debug'>
  <div class='text-white debug'>
    <h1  style='margin-top: 30px;'>Contribute to our Guide!</h1>
  </div>
  <div class='rightContentText colorLightPurple text-white debug'>
    <p class='bigText'>We are a completely volunteer and non-commercial effort, so all of our information and upkeep comes from
        people like you! If you would like to add a new strat tutorial to our current list, use the form below! If you'd like to edit
        or delete one of our current strat tutorials, check the list of current strats below! Thanks to you, A Hat in Time
        Speedrun will continue to grow!
    </p>
  </div>

  <div class='communityBox debug'>
    <p class='mainCommunityText debug'>Submit a Strat</p>
    <form>
      <div class="form-floating mb-3" style='margin: 20px;'>
        <input class="form-control" id="newStratName" placeholder="">
        <label for="floatingInput">Strat Name</label>
      </div>
      <div id='inputGuides'>
        <div class='form-floating' style='margin: 20px;'>
            <textarea class='form-control' placeholder='Leave a comment here' id='newStratText1' style='height: 200px'></textarea>
            <label for='floatingTextarea'>Paragraph 1</label>
        </div>
      </div>
      <button type="submit" class="btn btn-warning" style='margin-bottom: 20px; margin-left: 70px;' @click="editInputGuideNum(1); preventDefault()">Add Paragraph</button>
      <button type="submit" v-if='numOfInputGuides > 1' class="btn btn-warning" style='margin-bottom: 20px; 
                    margin-left: 70px;' @click="editInputGuideNum(-1); preventDefault()">Remove Paragraph</button>
      <div id ='inputVideos'>
        <div class='form-floating mb-3' style='margin: 20px;'>
            <input class='form-control' id='newName1' placeholder=''>
            <label for='floatingInput'>Player Name 1</label>
        </div>
        <div class='form-floating mb-3' style='margin: 20px;'>
            <input class='form-control' id='newVideo1' placeholder=''>
            <label for='floatingInput'>Video Link 1</label>
        </div>
      </div>
      <button type="submit" class="btn btn-warning" style='margin-bottom: 20px; margin-left: 70px;' @click="editInputVideoNum(1); preventDefault()">Add Video</button>
      <button type="submit" v-if='numOfInputGuides > 0' class="btn btn-warning" style='margin-bottom: 20px; 
                    margin-left: 70px;' @click="editInputVideoNum(-1); preventDefault()">Remove Video</button>
      <br>
      <button type="submit" class="btn btn-warning btn-lg" style='margin-bottom: 20px; margin-left: 70px;' @click="addGuide(); preventDefault()">Submit</button>
    </form>
  </div>
  <br>

  <div class='communityBox debug'>
    <p class='mainCommunityText debug'>Current Guides</p>
    <div v-for='guide in guides' :key='guide._id'>
        <div v-if='guide.visible'>
            <button type="submit" class="btn btn-warning" style='margin-bottom: 20px; margin-left: 70px;' @click="setEditGuide(guide); preventDefault()">
                {{guide.title}}</button>
        </div>
    </div>
    <div v-if='editGuide'>
        <p class='mainCommunityText debug'>Edit</p>
        <div class="form-floating mb-3" style='margin: 20px;'>
            <input class="form-control" :id='editGuide._id' :value='editGuide.title' placeholder="">
            <label for="floatingInput">Strat Name</label>
            <button class="btn btn-warning" type="button" @click="deleteStrat(); preventDefault()" style='width: 30%;'>Delete Guide</button>
        </div>
        <div v-for='i in infoParagraphs' :key='i._id'>
            <div class='form-floating' style='margin: 20px;'>
            <textarea class='form-control' placeholder='Leave a comment here' :id='i._id' :value='i.text' style='height: 200px'></textarea>
            <label for='floatingTextarea'></label>
            </div>
        </div>
        <div v-for='v in tutorialVideos' :key='v._id'>
            <div class='form-floating mb-3' style='margin: 20px;'>
            <input class='form-control' :id='v._id' :value='v.playerName' placeholder=''>
            <label for='floatingInput'>Player Name</label>
            </div>
            <div class='form-floating mb-3' style='margin: 20px;'>
            <input class='form-control' :id='v.videoLink' :value='v.videoLink' placeholder=''>
            <label for='floatingInput'>Video Link</label>";
            </div>
        </div>
        <button type="submit" class="btn btn-warning btn-lg" style='margin-bottom: 20px; margin-left: 70px;'
            @click="editStrat(); preventDefault()">Save Changes</button>
    </div>
  </div>
  <br>
</div>

</template>

<script>
import axios from 'axios';
export default {
  name: 'StratContribute',
  data () {
      return {
          numOfInputGuides: 1,
          numOfInputVideos: 1,
          currGuide: null,
          guides: [],
          infoParagraphs: [],
          tutorialVideos: [],
          editGuide: null,
      }
  },
  computed: {
    stratData() {
        return this.$root.$data.stratInfoData;
    }
  },
  created() {
      this.getGuides();
  },
  methods: {
    async addGuide() {
        try {
            let newName = document.getElementById("newStratName").value;

            let response = await axios.post("/api/guides", {
                stratName: newName.split(" ").join("").toLowerCase(),
                title: newName,
                });
            this.currGuide = response.data;
            for(let i = 1; i <= this.numOfInputGuides; i++) {
                let idName = "newStratText" + i;
                let newText = document.getElementById(idName).value;
                await this.addInfoParagraph(newText);
                document.getElementById(idName).value = "";
            }
            for(let i = 1; i <= this.numOfInputVideos; i++) {
                let idNamePlayer = "newName" + i;
                let playerName = document.getElementById(idNamePlayer).value;
                let idName = "newVideo" + i;
                let videoLink = document.getElementById(idName).value;
                await this.addTutorialVideo(playerName, videoLink);
                document.getElementById(idNamePlayer).value = "";
                document.getElementById(idName).value = "";
            }
            document.getElementById("newStratName").value = "";
            this.getGuides();
        } catch (error) {
            console.log(error);
        }
    },
    async addInfoParagraph(newText) {
        try {
            let url = "/api/guides/" + this.currGuide._id + "/infoParagraphs";
            await axios.post(url, {
                text: newText, 
            });
        } catch (error) {
            console.log(error);
        }
    },
    async addTutorialVideo(playerName, videoLink) {
        try {
            let url = "/api/guides/" + this.currGuide._id + "/tutorialVideos";
            await axios.post(url, {
                playerName: playerName,
                videoLink: videoLink, 
            });
        } catch (error) {
            console.log(error);
        }
    },
    async getGuides() {
        try {
        const response = await axios.get("/api/guides");
        this.guides = response.data;
        this.$root.$data.guides = this.guides;
      } catch (error) {
        console.log(error);
      }
    },
    async getInfoParagraphs() {
        try {
        let url = "/api/guides/" + this.editGuide._id + "/infoParagraphs";
        const response = await axios.get(url);
        this.infoParagraphs = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getTutorialVideos() {
        try {
        let url = "/api/guides/" + this.editGuide._id + "/tutorialVideos";
        const response = await axios.get(url);
        this.tutorialVideos = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteStrat() {
        let url = "/api/guides/" + this.editGuide._id;
        await axios.delete(url);
        this.editGuide = null;
        await this.getGuides();
    },
    async editStrat() {
        let newName = document.getElementById(this.editGuide._id).value;
        let url = "/api/guides/" + this.editGuide._id;
        let response = await axios.put(url, {
                stratName: newName.split(" ").join("").toLowerCase(),
                title: newName,
                });
        this.infoParagraphs.forEach(p => this.editInfoParagraph(p));
        this.tutorialVideos.forEach(v => this.editTutorialVideo(v));
        this.getGuides();
        this.setEditGuide(response.data);

    },
    async editInfoParagraph(i) {
        let newText = document.getElementById(i._id).value;
        let url = "/api/guides/" + this.editGuide._id + "/infoParagraphs/" + i._id;
        await axios.put(url, {
                text: newText,
        });
    },
    async editTutorialVideo(v) {
        let newPlayerName =document.getElementById(v._id).value;
        let newVideoLink =document.getElementById(v.videoLink).value;
        let url = "/api/guides/" + this.editGuide._id + "/tutorialVideos/" + v._id;
        await axios.put(url, {
                playerName: newPlayerName,
                videoLink: newVideoLink,
        });
    },
    editInputGuideNum(change) {
        this.numOfInputGuides += change;
        if(this.numOfInputGuides < 1) this.numOfInputGuides = 1;
        let newHTML = "";
        for(let i = 1; i <= this.numOfInputGuides; i++) {
            newHTML += "<div class='form-floating' style='margin: 20px;'>";
            newHTML += "<textarea class='form-control' placeholder='Leave a comment here' id='newStratText" + i + "' style='height: 200px'></textarea>";
            newHTML += "<label for='floatingTextarea'>Paragraph " + i + "</label>";
            newHTML += "</div>";
        }
        document.getElementById("inputGuides").innerHTML = newHTML;
    },
    editInputVideoNum(change) {
        this.numOfInputVideos += change;
        if(this.numOfInputVideos < 0) this.numOfInputVideos = 0;
        let newHTML = "";
        for(let i = 1; i <= this.numOfInputVideos; i++) {
            newHTML += "<div class='form-floating mb-3' style='margin: 20px;'>";
            newHTML += "<input class='form-control' id='newName" + i + "' placeholder=''>";
            newHTML += "<label for='floatingInput'>Player Name " + i + "</label>";
            newHTML += "</div>";
            newHTML += "<div class='form-floating mb-3' style='margin: 20px;'>";
            newHTML += "<input class='form-control' id='newVideo" + i + "' placeholder=''>";
            newHTML += "<label for='floatingInput'>Video Link " + i + "</label>";
            newHTML += "</div>";
        }
        document.getElementById("inputVideos").innerHTML = newHTML;
    },
    setEditGuide(guide) {
        this.editGuide = guide;
        this.getInfoParagraphs();
        this.getTutorialVideos();
    },
  }
}
</script>

<style scoped>
h1 {
    text-align: center;
}

p {
    text-align: center;
    color: white;
    font-family:Arial, Helvetica, sans-serif;
}

.debug {
    /*border: 1px solid red;*/
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
