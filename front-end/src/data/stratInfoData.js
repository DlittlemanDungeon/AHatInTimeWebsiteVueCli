let stratInfoData = [
    {
        id: 0,
        visible: false,
        stratName: "error",
        title: 'Error 101 - Strat Info Not Found Page',
        info: [{id: 0, text:`If you can see this, than the strat you are looking for is not currently found on the website. Please let us know
        of this error through the "Contact Us" page.`},
        ],
        tutorials: [],
    },
    {
        id: 1,
        visible: false,
        stratName: "default",
        title: 'Strat Welcome Page!',
        info: [{id: 0, text:`Here is where you can find the tutorials, examples, and explanations for the strats used in speedrunning 
        "A Hat In Time"! You can find all of the strats currently available on this site in the naviagation bar on the left. Not
        all of these strats are equal in difficulty, so I reccommend you start with the strats higher up on the bar, which are less 
        difficult, before heading down the the more difficult ones. Good luck!`},
        ],
        tutorials: [],
    },
    {
        id: 2,
        visible: true,
        stratName: "diveBoost",
        title: 'Dive Boost',
        info: [{id: 0, text:`The Dive Boost is a beginner strat, that isn't actually a glitch or an exploit. Rather, 
        it is a very intentional part of Hat Kid's movement: the game just doesn't tell you that it's there. 
        After diving, you can either press jump to cancel out of the dive to gain a little extra height, or you 
        can just wait until Hat Kid slows to a halt in the dive position. However, there's a third option, which
        is the dive boost.`},
        {id: 1, text:`If you press jump right as Hat Kid hits the floor after diving, she will fly forward with increased speed
        as she cancels the dive, allowing you to move as normal afterward. You can tell you got it right because particles 
        similar to those of the Sprint Jump will appear, and a wind sound effect will play. Be careful though, if you try to
        do this from too high up, Hat Kid will bonk against the floor instead of Dive Boosting. `},
        {id: 2, text:`Since this trick is so simple, it is used everywhere for movement where some other movement isn't 
        required (or faster). The best way to learn it is to try and use it as much as you can, and you'll have it pretty
        consistently in no time.`},
        ],
        tutorials: [],
    },
    {
        id: 3,
        visible: true,
        stratName: "sprintDoubleJump",
        title: "Sprint Double Jump",
        info: [{id: 0, text:`The Sprint Double Jump is a strat of medium difficulty. Normally, when one double jumps, the 
        quickest that you can go is as fast as you were previously moving. This might make you think that you 
        could do a double jump with the speed of one sprinting with the sprint hat. However, it's not that easy. 
        If you jump while sprinting, you will instead do a Spring Jump, and will not be allowed to jump as 
        second time. The way around this (to do a double jump with the speed of sprinting) is to do a Sprint 
        Double Jump. The way to do this is simple, but not super easy to pull off.`},
        {id: 1, text:`First, Hat Kid needs to be sprinting with the sprint hat. When you want to trigger the SDJ (Spring Double Jump),
        you must then let go of sprint and then IMMEDIATELY press jump. If you press jump before you let go of sprint, you 
        will do a Sprint Jump like normal, and if you press jump too late after letting go of sprint, then you will do a normal
        double jump. If done correctly, Hat Kid will play the same animation for a double jump, but will be moving through 
        the air slightly faster than for a normal double jump. It may take some practice to get this trick consistantly, and 
        to be able to tell if you have pulled it off.`},
        ],
        tutorials: [{
            id: 0,
            playerName: "EpicYoshiMaster",
            video: "https://www.youtube.com/embed/RrrNSelldHM"
        }, {
            id: 1,
            playerName: "Martyrr",
            video: "https://www.youtube.com/embed/25Iv7BHgK_o"
        },
        ],
    },
    {
        id: 4,
        visible: true,
        stratName: "doubleSprintJump",
        title: "Double Sprint Jump",
        info: [{id: 0, text:`The Double Sprint Jump is a strat of medium to advanced difficulty. Normally, after you perform a Sprint
        jump, you are not allowed to jump again (as is standard with a double jump). However, there is a way to trick the game
        into allowing Hat Kid to jump twice with a Spring Jump, therefore becoming a Double Sprint Jump. It all has to do with
        ledges, as this trick can be performed right after Hat Kid falls off a ledge. The Double Sprint Jump can't be performed
        where there aren't any sort of drop-offs. Despite this limitation, however, the Double Sprint Jump is one of the most
        useful strats in the game, allowing the player to gain increased height and cross longer distances. `},
        {id: 1, text:`To set-up, just find a ledge that you want to DSJ (Double Sprint Jump) off of. To successfully pull it off,
        you'll need the right execution and timing. The execution is the simple part: as you fall off the ledge, hold the sprint button and 
        hit the Jump button twice in rapid succession. If it's more comfortable for you, you can even hit space more than twice, just as long as 
        you hit it rapidly and at least twice. You'll need to continue holding sprint during the entire DSJ.`},
        {id: 2, text:`Now for the right timing. The window for pulling off a Double Spring Jump is very tight. You'll need to hit
        the Jump button twice immediately after leaving the ledge, with very little room for error. Too early or too late, you'll
        do a standard sprint jump. What's more, the game uses the hitboxes of objects to calculate the "ledge" you are jumping off 
        of, which can vary from the what actually renders in game. An easy way to tell if an object is like this is if you can be
        "standing" on it even if you are in the air right next to it. This is proof that the actual ledge of this object extends 
        out further than can been seen. You'll want to press Jump twice after falling off the invisible ledge, not when you reach 
        the end of the visible part.`},
        {id: 3, text:`If you get the timing and the execution right, Hat Kid will do two somersaults instead of just one. The first 
        one will be the one that always occurs when doing a Spring Jump, but the second one will be a couple moments after the first,
        and will be in midair. Thus, you'll gain more height than possible with normal movement. In addition, Both of these somersaults 
        will also include white cloud particles flying out from under Hat Kid's feet, so if you see two sets of particles (or one of them 
        in midair) the you'll know you pulled it off.`},
        ],
        tutorials: [{
            id: 0,
            playerName: "Spyrunite",
            video: "https://www.youtube.com/embed/JpXWlFCT3d8"
        },
        ],
    },
    {
        id: 5,
        visible: true,
        stratName: "boopClip",
        title: "Boop Clip",
        info: [{id: 0, text:`The Boop Clip is a strat of medium difficulty, that is only available on Patch 2.1. Getting out of bounds can be one of the most useful glitches
        in a game, and the Boop Clip is a way of doing that. In a Hat in Time, the number of potential uses are limited, but glitching 
        out of bounds is extremely useful in certain levels like "Down with the Mafia" or "Nyakuza Metro", where getting out of bounds
        can save minutes. Even though the Boop Clip is the slower of the two clip methods (the other being the Lag Clip), it is slower
        by only a couple seconds, and so it's a good strat to learn first before moving on to the more difficult Lag Clip. And in "Down
        with the Mafia", the Boop clip is the only clip that will allow you to pull off the Mafia Boss Quick Kill, so it's a required
        strat for most categories.`},
        {id: 1, text:`This Clip requires the use of the Boop emote, which is available on the emote wheel. That is 
        why this glitch only works on 2.1, as the emote wheel was added in 2.1, and the glitchy Boop emote was patched in later updates.
        The glitch involves the use of the Boop emote and grabbing onto ledges. If Hat Kid grabs onto a ledge while playing the Boop 
        animation, she will enter a different state, where she will begin to fall down through the side of the wall that she grabbed onto.
        If one hits the jump buttton at any time during this falling, Hat Kid will "jump up" over the ledge (as the game still thinks that 
        you are hanging), which will push you through the wall, clipping out of bounds.`},
        {id: 2, text:`To set-up, you'll need to make sure you are in a position where you can jump towards a ledge.
        This can be above the ledge, under the ledge, or in front of it (although doing it from above is more difficult). Once you are here, 
        you can start by jumping towards the ledge hitbox (the place where Hat Kid would automatically grab onto the ledge). While in mid-air, 
        use the emote wheel to activate the Boop emote. Being in mid-air is crucial, as the Boop emote will stop your movement if you are on
        the ground, which would prevent you from grabbing onto a ledge while the animation is playing. Also make sure that you activate the Boop 
        emote a little before you actually hit the ledge, as doing so just as you reach the ledge will cause the clip to fail.`},
        {id: 3, text:`The jump towards the ledge can be tricky to pull off. Too high, and Hat Kid will land on the ledge itself. Too low, and 
        you'll miss the ledge and start falling downwards, which can lose you precious time and cause other side effects (if there is no ground 
        below the ledge, etc). You'll probably need lots of practice to make sure you get the height just right. If everything is done correctly, 
        Hat Kid will begin to fall through the side of the wall. Then, just press the Jump button at the desired location, and you'll clip through 
        the wall at that point.`},
        {id: 4, text:`Be sure to practice this clip sufficiently, as the Mafia Boss quick kill requires the speedrunner to get this first 
        try if you don't want to miss a cycle, and failing Boop Clips in Nyakuza Metro will cause you to take damage and warp back to a 
        previous checkpoint.`},
        ],
        tutorials: [{
            id: 0,
            playerName: "EpicYoshiMaster",
            video: "https://www.youtube.com/embed/ZKUz_20avec"
        },
        ],
    },
]

export default stratInfoData;