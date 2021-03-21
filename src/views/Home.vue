<template>
  <!--<div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>-->

  <div>
    <div class='colorLightPurple debug'>
      <div class='content colorLightPurple text-white debug'>
        <h1 style='margin-top: 30px;'>Welcome to A Hat In Time Speedrun!</h1>
      </div>
      <div class='content colorLightPurple text-white debug'>
        <p class='bigText' style='text-align: center; width:80%;'>This is where you can find guides, tools, tips, and tricks for speedrunning "A Hat In Time"! You can also come and get to
            better know the members of Boop Troop, the speedrunning community.</p>
      </div>
    </div>

        <div class='cardMContainer colorLightPurple debug'>
          <div class='cardM debug '>
            <div class='imageBox debug '>
              <img class='image debug' src='../assets/timepieceCluster.png'/>
            </div>
            <div class='text debug'>
              <p class=' debug'>Read the speedrunning guides for Any%, ATP, Death Wish, 110%, ILs, and more!</p>
            </div>
            <a class="btn btn-warning disabled buttonMargin" href="#" role="button" aria-disabled="true">Guides</a>
          </div>

          <div class='cardM debug '>
            <div class='imageBox debug '>
              <img class='image debug' src='../assets/Wall_Jump.png'/>
            </div>
            <div class='text debug'>
            <p class='debug'>Learn all of the strats necessary to lower your times, including Sprint Double Jumps,
                             Boop Clips, and Lag Warps!
            </p>
            </div>
            <a class="btn btn-warning buttonMargin" href="/strats" role="button">Strats</a>
          </div>

          <div class='cardM debug '>
            <div class='imageBox debug '>
              <img class='image debug' src='../assets/leaderboards.png'/>
            </div>
            <div class='text debug'>
            <p class='debug'>See the current rankings in game-wide categories like Any%, All Time Pieces, and more!
            </p>
            </div>
            <a class="btn btn-warning buttonMargin disabled" href="#l" role="button" aria-disabled="true">Leaderboards</a>
          </div>

          <div class='cardM debug '>
            <div class='imageBox debug '>
              <img class='image debug' src='../assets/BoopTroop.png'/>
            </div>
            <div class='text debug'>
              <p class='debug'>Meet the members of the Boop Troop, who are competing in tournaments, finding new strats, and
                                  breaking records!
              </p>
            </div>
            <a class="btn btn-warning disabled buttonMargin" href="#" role="button" aria-disabled="true">Community</a>
          </div>
        </div>
        </div>
</template>

<script>
// @ is an alias to /src
/*import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}*/

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
