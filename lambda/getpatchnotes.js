
exports.getpatchnotes = async () => {
    
    let patchNotes = [`
        <p style="font-weight:bold">v1.3: Modern Wonders</p>
        <br/>
        <p>Based on the <a class="userinfolink" href="https://www.youtube.com/watch?v=QAuruCMfhMg">Modern Wonders</a> custom wonders pack, there are some exciting new wonders in play :)</p>
        <br/><br/>
        <p><span style="color: gold">Five</span> new wonders:</p>
        <p class="pnci">- Bring back James' patented blue strat with <span style="color: gold">New York</span>!</p>
        <p class="pnci">- Form sets of same-color cards with <span style="color: gold">Paris</span>!</p>
        <p class="pnci">- Flip your military defeats and come back stronger with <span style="color: gold">Moscow</span>!</p>
        <p class="pnci">- Study a new kind of science with <span style="color: gold">Oxford</span>!</p>
        <p class="pnci">- See the future with <span style="color: gold">Delphoi</span>!</p>
        <br/><br/>
        <p>Wonder Balances:</p>
        <p class="pnci">- Byzantium Day/Night: Changed starting resource glass -> press</p>
        <p class="pnci">- Byzantium Day: Diplomacy has been moved to the last stage; extra gold on middle stage</p>
        <p class="pnci">- Alexandria Night: Second stage cost has been reduced</p>
        <p class="pnci">- Giza Day: Last stage cost has been reduced</p>
        <p class="pnci">- Halikarnassos Night: Removed points from stages</p>
        <p class="pnci">- Great Wall A: Second stage has been changed from a science guild to an astrolabe</p>
        <p class="pnci">- Manneken Pis B: Second stage has been changed to a flipped version of side A</p>
        <br/><br/>
        <p style="color: gold">7WCE is open-source! <a class="userinfolink" href="https://github.com/lectvs/7wCE">Check it out</a>!</p>
    `,`
        <p style="font-weight:bold">v1.2: The Final* Update</p>
        <br/>
        <p>* finality not guaranteed</p>
        <br/><br/><br/>
        <p>Two new wonders:</p>
        <p class="pnci">- Build your stages in any order with <span style="color: gold">The Great Wall</span>!</p>
        <p class="pnci">- Copy your neighbors' stages with <span style="color: gold">Manneken Pis</span>!</p>
        <br/>
        <p>Two wacky alternative game modes:</p>
        <p class="pnci">- Aim for the lowest score to win in <span style="color: gold">7 Blunders</span>!</p>
        <p class="pnci">- Enjoy total chaos with randomly-generated wonders and cards in <span style="color: gold">Randomizer</span>!</p>
        <br/><br/><br/>
        <p>Planned changes:</p>
        <p class="pnci">- None</p>
        <p class="pnci">- I'm still open to suggestions though :)</p>
        <br/><br/><br/>
        <p style="color: gold">7WCE is open-source! <a class="userinfolink" href="https://github.com/lectvs/7wCE">Check it out</a>!</p>
    `,
    `
        <p style="font-weight:bold">v1.1: CITIES</p>
        <br/>
        <p>At long last, 7WCE is serving its original purpose - to bring the <a class="userinfolink" href="https://www.rprod.com/en/games/7-wonders/cities">Cities Expansion</a> to you!</p>
        <br/><br/><br/>
        <p style="color: gold">The Cities Expansion includes:</p>
        <p class="pnci">- 42 new black cards, with 18 new and unique effects!</p>
        <p class="pnci">- 2 new wonders: Byzantium and Petra!</p>
        <p class="pnci">- Diplomacy! Debt! Yay!</p>
        <br/><br/><br/>
        <p style="color: gold">7WCE is open-source! <a class="userinfolink" href="https://github.com/lectvs/7wCE">Check it out</a>!</p>
        <br/><br/>
        <p>Upcoming changes:</p>
        <p class="pnci">- Two more wonders</p>
        <p class="pnci">- Alternative game modes</p>
    `,
    `
        <p style="font-weight:bold">v1.0: 7WCE</p>
        <br/>
        <p>That's right, 7WCE is "complete"! There are still many things on the todo-list, but they'll be developed over time.</p>
        <br/><br/><br/><br/>
        <p style="color: gold">Major features coming:</p>
        <p class="pnci">- The <a class="userinfolink" href="https://www.rprod.com/en/games/7-wonders/cities">Cities</a> Expansion</p>
        <p class="ppnci">- Black cards!</p>
        <p class="ppnci">- Diplomacy!</p>
        <p class="ppnci">- Two new wonders!</p>
        <p class="pnci">- BGA move mode</p>
        <p class="pnci">- Game creation limit</p>
        <p class="pnci">- More optimization</p>
    `,
    `
        <p style="font-weight:bold">v0.9: Throwback Friday?</p>
        <br/>
        <p>The hottest 7W update since September 2020 is here! Bringing back everything you loved (or hated) about Old Edition.</p>
        <br/>
        <br/>
        <p>- <span style="color:gold">New Wonder!</span> Old Edition Olympia</p>
        <br/>
        <p>- <span style="color:gold">Strategists Guild is back!</span></p>
        <p class="pnci">- Note: For balance, Strategists Guild will not appear in the 4P deck</p>
        <br/>
        <p>- <span style="color:gold">Rebalance: Halikarnassos</span></p>
        <p class="pnci">- Night: Now uses Old Edition costs</p>
        <p class="pnci">- Day: Now mostly uses Old Edition costs, buffed because Day is trash</p>
        <br/><br/><br/><br/>
        <p>Work remaining for v1.0:</p>
        <p class="pnci">- Optimization</p>
    `];
    
    patchNotes = patchNotes.map(pn => pn.split('\n').map(line => line.trim()).join('\n'));
    
    return { patchNotes: patchNotes[0] };
}