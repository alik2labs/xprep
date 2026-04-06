window.TOOLS_REFERENCE = {

  "survival-priorities": {
    title: "Survival Priorities",
    sub: "Rule of 3s & survival decision framework",
    html: `
      <div class="tool-section">
        <h3>The Rule of 3s</h3>
        <table class="reference-table">
          <thead><tr><th>You can survive...</th><th>Without...</th></tr></thead>
          <tbody>
            <tr><td>3 minutes</td><td>Air (or in icy water)</td></tr>
            <tr><td>3 hours</td><td>Shelter in harsh weather</td></tr>
            <tr><td>3 days</td><td>Water</td></tr>
            <tr><td>3 weeks</td><td>Food</td></tr>
            <tr><td>3 months</td><td>Human contact</td></tr>
          </tbody>
        </table>
        <p class="note">The Rule of 3s is a guideline, not a guarantee. Conditions vary significantly - extreme heat, cold, or injury can shorten these windows dramatically.</p>
      </div>
      <div class="tool-section">
        <h3>Survival Priority Order</h3>
        <ol style="padding-left:18px;font-size:0.85rem;line-height:1.9;color:#555;">
          <li><strong>Safety</strong> - move away from immediate danger (fire, flood, unstable structure, traffic)</li>
          <li><strong>First Aid</strong> - address life-threatening injuries immediately</li>
          <li><strong>Shelter</strong> - protect from exposure, wind, rain, extreme temperatures</li>
          <li><strong>Signal</strong> - make your position known to rescuers as early as possible</li>
          <li><strong>Water</strong> - find, collect, and purify water</li>
          <li><strong>Fire</strong> - warmth, water purification, signalling, morale</li>
          <li><strong>Food</strong> - lowest priority in short-term survival</li>
        </ol>
      </div>
      <div class="tool-section">
        <h3>Survival Mindset</h3>
        <table class="reference-table">
          <thead><tr><th>Principle</th><th>What It Means</th></tr></thead>
          <tbody>
            <tr><td>Stay calm</td><td>Panic burns energy and leads to poor decisions - breathe slowly, think clearly</td></tr>
            <tr><td>Assess before acting</td><td>A bad decision made fast is worse than a good decision made slowly</td></tr>
            <tr><td>Conserve energy</td><td>Move only when necessary - rest preserves water and calories</td></tr>
            <tr><td>Stay put if lost</td><td>Rescuers search last known position - moving makes you harder to find</td></tr>
            <tr><td>Signal continuously</td><td>Regular signals increase chance of detection significantly</td></tr>
            <tr><td>Maintain hope</td><td>Will to survive is the most critical survival factor</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tool-section">
        <h3>Decision Framework</h3>
        <table class="reference-table">
          <thead><tr><th>Question</th><th>If Yes</th><th>If No</th></tr></thead>
          <tbody>
            <tr><td>Am I in immediate danger?</td><td>Move to safety first</td><td>Stay and assess</td></tr>
            <tr><td>Is anyone injured?</td><td>First aid immediately</td><td>Continue assessment</td></tr>
            <tr><td>Do rescuers know my location?</td><td>Wait and signal</td><td>Signal now</td></tr>
            <tr><td>Is weather a threat?</td><td>Find or build shelter</td><td>Secure water next</td></tr>
            <tr><td>Do I have water for 24h?</td><td>Assess food situation</td><td>Find water now</td></tr>
          </tbody>
        </table>
      </div>`
  },

  "checklists": {
    title: "Checklists",
    sub: "Pre-built emergency checklists",
    html: `
      <div class="tool-section">
        <h3>72-Hour Bug-Out Bag</h3>
        ${["Water (3L/person)","Food (3 days)","First aid kit","Flashlight + batteries","Radio (hand-crank)","Documents (copies)","Cash (small bills)","Medications (7 days)","Warm clothing","Rain gear","Knife / multi-tool","Fire starter","Emergency blanket","Whistle","Map of area"].map(i=>`<label class="checklist-item"><input type="checkbox" onchange="this.parentElement.classList.toggle('checked',this.checked)"> ${i}</label>`).join("")}
      </div>
      <div class="tool-section" style="margin-top:20px;">
        <h3>Medical Kit</h3>
        ${["Bandages (assorted)","Gauze pads","Medical tape","Antiseptic wipes","Antibiotic ointment","Gloves (nitrile)","Scissors + tweezers","Thermometer","Pain reliever","Antihistamine","Oral rehydration salts","Wound closure strips","CPR face shield","SAM splint","Tourniquet"].map(i=>`<label class="checklist-item"><input type="checkbox" onchange="this.parentElement.classList.toggle('checked',this.checked)"> ${i}</label>`).join("")}
      </div>
      <div class="tool-section" style="margin-top:20px;">
        <h3>Vehicle Emergency Kit</h3>
        ${["Jump cables","Tow rope","Reflective triangles / flares","Spare tyre + jack","Tyre inflator / puncture kit","Water (2L minimum)","Basic tools (screwdrivers, wrench)","Torch + batteries","First aid kit","Blanket","Phone charger / power bank","Cash","Pen + paper"].map(i=>`<label class="checklist-item"><input type="checkbox" onchange="this.parentElement.classList.toggle('checked',this.checked)"> ${i}</label>`).join("")}
      </div>
      <div class="tool-section" style="margin-top:20px;">
        <h3>Home Emergency Kit</h3>
        ${["Water (4L/person for 3 days)","Non-perishable food (3 days)","Manual can opener","Battery / hand-crank radio","Flashlights + batteries","First aid kit","7-day medication supply","Copies of important documents","Emergency contact list","Cash","Warm clothing + blankets","Whistle","Dust masks","Plastic sheeting + duct tape","Garbage bags + ties","Wrench to shut off utilities","Baby / pet supplies if needed"].map(i=>`<label class="checklist-item"><input type="checkbox" onchange="this.parentElement.classList.toggle('checked',this.checked)"> ${i}</label>`).join("")}
      </div>`
  },

  "radio-comms": {
    title: "Radio / Comms",
    sub: "Frequencies & phonetic alphabet",
    html: `
      <div class="tool-section">
        <h3>NATO Phonetic Alphabet</h3>
        <table class="reference-table">
          <thead><tr><th>Letter</th><th>Word</th><th>Letter</th><th>Word</th></tr></thead>
          <tbody>
            <tr><td>A</td><td>Alpha</td><td>N</td><td>November</td></tr>
            <tr><td>B</td><td>Bravo</td><td>O</td><td>Oscar</td></tr>
            <tr><td>C</td><td>Charlie</td><td>P</td><td>Papa</td></tr>
            <tr><td>D</td><td>Delta</td><td>Q</td><td>Quebec</td></tr>
            <tr><td>E</td><td>Echo</td><td>R</td><td>Romeo</td></tr>
            <tr><td>F</td><td>Foxtrot</td><td>S</td><td>Sierra</td></tr>
            <tr><td>G</td><td>Golf</td><td>T</td><td>Tango</td></tr>
            <tr><td>H</td><td>Hotel</td><td>U</td><td>Uniform</td></tr>
            <tr><td>I</td><td>India</td><td>V</td><td>Victor</td></tr>
            <tr><td>J</td><td>Juliet</td><td>W</td><td>Whiskey</td></tr>
            <tr><td>K</td><td>Kilo</td><td>X</td><td>X-ray</td></tr>
            <tr><td>L</td><td>Lima</td><td>Y</td><td>Yankee</td></tr>
            <tr><td>M</td><td>Mike</td><td>Z</td><td>Zulu</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tool-section">
        <h3>Emergency Frequencies</h3>
        <table class="reference-table">
          <thead><tr><th>Frequency / Channel</th><th>Use</th></tr></thead>
          <tbody>
            <tr><td>121.5 MHz</td><td>Aviation emergency (VHF)</td></tr>
            <tr><td>156.8 MHz (Ch 16)</td><td>Marine distress & calling</td></tr>
            <tr><td>406 MHz</td><td>EPIRB / PLB distress beacon</td></tr>
            <tr><td>FRS Ch 1 - 462.5625 MHz</td><td>Common simplex family radio</td></tr>
            <tr><td>CB Ch 9 - 27.065 MHz</td><td>Highway emergency</td></tr>
            <tr><td>CB Ch 19 - 27.185 MHz</td><td>Truckers / highway info</td></tr>
            <tr><td>NOAA Weather - 162.400–162.550 MHz</td><td>US weather broadcasts</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tool-section">
        <h3>Radio Communication Tips</h3>
        <table class="reference-table">
          <thead><tr><th>Term</th><th>Meaning</th></tr></thead>
          <tbody>
            <tr><td>Over</td><td>I have finished speaking, your turn</td></tr>
            <tr><td>Out</td><td>Conversation is ended</td></tr>
            <tr><td>Roger</td><td>Message received and understood</td></tr>
            <tr><td>Wilco</td><td>Will comply with instructions</td></tr>
            <tr><td>Say again</td><td>Please repeat your last message</td></tr>
            <tr><td>Standby</td><td>Wait - I will respond shortly</td></tr>
            <tr><td>Mayday</td><td>Life-threatening emergency - repeat 3 times</td></tr>
            <tr><td>Pan-Pan</td><td>Urgent situation, not immediately life-threatening</td></tr>
          </tbody>
        </table>
      </div>`
  },

  "morse-code": {
    title: "Morse Code",
    sub: "Text to Morse translator & reference",
    html: `
      <div class="tool-section">
        <h3>Morse Code Translator</h3>
        <div class="input-row" style="flex-direction:column;align-items:flex-start;gap:6px;">
          <label>Enter text</label>
          <textarea id="morse-input" rows="3" placeholder="Type text here..." oninput="translateMorse()" style="width:100%;"></textarea>
        </div>
        <div class="result-box" style="margin-top:10px;">
          <div id="morse-output" style="font-family:monospace;font-size:1rem;font-weight:bold;color:#161616;word-break:break-all;line-height:1.8;">-</div>
          <div class="result-label" style="margin-top:4px;">Morse code output</div>
        </div>
      </div>
      <div class="tool-section">
        <h3>Morse Code Reference</h3>
        <table class="reference-table">
          <thead><tr><th>Char</th><th>Code</th><th>Char</th><th>Code</th><th>Char</th><th>Code</th></tr></thead>
          <tbody>
            <tr><td>A</td><td>.-</td><td>J</td><td>.---</td><td>S</td><td>...</td></tr>
            <tr><td>B</td><td>-...</td><td>K</td><td>-.-</td><td>T</td><td>-</td></tr>
            <tr><td>C</td><td>-.-.</td><td>L</td><td>.-..</td><td>U</td><td>..-</td></tr>
            <tr><td>D</td><td>-..</td><td>M</td><td>--</td><td>V</td><td>...-</td></tr>
            <tr><td>E</td><td>.</td><td>N</td><td>-.</td><td>W</td><td>.--</td></tr>
            <tr><td>F</td><td>..-.</td><td>O</td><td>---</td><td>X</td><td>-..-</td></tr>
            <tr><td>G</td><td>--.</td><td>P</td><td>.--.</td><td>Y</td><td>-.--</td></tr>
            <tr><td>H</td><td>....</td><td>Q</td><td>--.-</td><td>Z</td><td>--..</td></tr>
            <tr><td>I</td><td>..</td><td>R</td><td>.-.</td><td></td><td></td></tr>
          </tbody>
        </table>
        <table class="reference-table" style="margin-top:8px;">
          <thead><tr><th>Char</th><th>Code</th><th>Char</th><th>Code</th><th>Char</th><th>Code</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>-----</td><td>4</td><td>....-</td><td>8</td><td>---..</td></tr>
            <tr><td>1</td><td>.----</td><td>5</td><td>.....</td><td>9</td><td>----.</td></tr>
            <tr><td>2</td><td>..---</td><td>6</td><td>-....</td><td>.</td><td>.-.-.-</td></tr>
            <tr><td>3</td><td>...--</td><td>7</td><td>--...</td><td>?</td><td>..--..</td></tr>
          </tbody>
        </table>
        <p class="note">SOS: ... --- ... (3 dots, 3 dashes, 3 dots). The universal distress signal.</p>
      </div>`
  },

  "emergency-numbers": {
    title: "Emergency Numbers",
    sub: "Country-by-country emergency contacts",
    html: `
      <div class="tool-section">
        <h3>Universal</h3>
        <table class="reference-table">
          <thead><tr><th>Number</th><th>Use</th></tr></thead>
          <tbody>
            <tr><td>112</td><td>International GSM emergency (works on any mobile worldwide)</td></tr>
            <tr><td>911</td><td>North America general emergency</td></tr>
            <tr><td>999</td><td>UK, Ireland, and many Commonwealth nations</td></tr>
          </tbody>
        </table>
        <p class="note">112 works even without a SIM card on most mobile networks worldwide.</p>
      </div>
      <div class="tool-section">
        <h3>Middle East & Gulf</h3>
        <table class="reference-table">
          <thead><tr><th>Country</th><th>Police</th><th>Ambulance</th><th>Fire</th></tr></thead>
          <tbody>
            <tr><td>UAE</td><td>999</td><td>998</td><td>997</td></tr>
            <tr><td>Saudi Arabia</td><td>999</td><td>911</td><td>998</td></tr>
            <tr><td>Qatar</td><td>999</td><td>999</td><td>999</td></tr>
            <tr><td>Kuwait</td><td>112</td><td>112</td><td>112</td></tr>
            <tr><td>Bahrain</td><td>999</td><td>999</td><td>999</td></tr>
            <tr><td>Oman</td><td>9999</td><td>9999</td><td>9999</td></tr>
            <tr><td>Jordan</td><td>911</td><td>911</td><td>911</td></tr>
            <tr><td>Egypt</td><td>122</td><td>123</td><td>180</td></tr>
            <tr><td>Lebanon</td><td>112</td><td>140</td><td>175</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tool-section">
        <h3>South & Southeast Asia</h3>
        <table class="reference-table">
          <thead><tr><th>Country</th><th>Police</th><th>Ambulance</th><th>Fire</th></tr></thead>
          <tbody>
            <tr><td>India</td><td>100</td><td>102</td><td>101</td></tr>
            <tr><td>Pakistan</td><td>15</td><td>115</td><td>16</td></tr>
            <tr><td>Bangladesh</td><td>999</td><td>999</td><td>999</td></tr>
            <tr><td>Sri Lanka</td><td>119</td><td>110</td><td>111</td></tr>
            <tr><td>Singapore</td><td>999</td><td>995</td><td>995</td></tr>
            <tr><td>Malaysia</td><td>999</td><td>999</td><td>994</td></tr>
            <tr><td>Philippines</td><td>911</td><td>911</td><td>911</td></tr>
            <tr><td>Indonesia</td><td>110</td><td>118</td><td>113</td></tr>
            <tr><td>Thailand</td><td>191</td><td>1669</td><td>199</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tool-section">
        <h3>Europe</h3>
        <table class="reference-table">
          <thead><tr><th>Country</th><th>General</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>All EU countries</td><td>112</td><td>Single emergency number across EU</td></tr>
            <tr><td>UK</td><td>999 / 112</td><td>Both work</td></tr>
            <tr><td>Russia</td><td>112</td><td>Also: Police 102, Ambulance 103, Fire 101</td></tr>
            <tr><td>Turkey</td><td>112</td><td>Single number for all services</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tool-section">
        <h3>Americas & Oceania</h3>
        <table class="reference-table">
          <thead><tr><th>Country</th><th>Police</th><th>Ambulance</th><th>Fire</th></tr></thead>
          <tbody>
            <tr><td>USA</td><td>911</td><td>911</td><td>911</td></tr>
            <tr><td>Canada</td><td>911</td><td>911</td><td>911</td></tr>
            <tr><td>Mexico</td><td>911</td><td>911</td><td>911</td></tr>
            <tr><td>Brazil</td><td>190</td><td>192</td><td>193</td></tr>
            <tr><td>Australia</td><td>000</td><td>000</td><td>000</td></tr>
            <tr><td>New Zealand</td><td>111</td><td>111</td><td>111</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tool-section">
        <h3>Africa</h3>
        <table class="reference-table">
          <thead><tr><th>Country</th><th>Police</th><th>Ambulance</th><th>Fire</th></tr></thead>
          <tbody>
            <tr><td>South Africa</td><td>10111</td><td>10177</td><td>10111</td></tr>
            <tr><td>Nigeria</td><td>112</td><td>112</td><td>112</td></tr>
            <tr><td>Kenya</td><td>999</td><td>999</td><td>999</td></tr>
            <tr><td>Morocco</td><td>19</td><td>15</td><td>15</td></tr>
            <tr><td>Egypt</td><td>122</td><td>123</td><td>180</td></tr>
          </tbody>
        </table>
      </div>`
  },

  "weather-signs": {
    title: "Weather Signs",
    sub: "Natural weather indicators & cloud types",
    html: `
      <div class="tool-section">
        <h3>Natural Weather Indicators</h3>
        <table class="reference-table">
          <thead><tr><th>Sign</th><th>Indicates</th></tr></thead>
          <tbody>
            <tr><td>Red sky at night</td><td>Fair weather likely tomorrow</td></tr>
            <tr><td>Red sky in morning</td><td>Storm or rain approaching</td></tr>
            <tr><td>Ring around moon</td><td>Rain or snow within 24 hours</td></tr>
            <tr><td>Rapidly falling pressure</td><td>Storm approaching fast</td></tr>
            <tr><td>Swallows flying low</td><td>Rain likely soon</td></tr>
            <tr><td>Ants building higher mounds</td><td>Rain coming</td></tr>
            <tr><td>Smoke rises straight up</td><td>Fair weather, high pressure</td></tr>
            <tr><td>Smoke drifts low</td><td>Low pressure, rain likely</td></tr>
            <tr><td>Dew on grass in morning</td><td>Fair day ahead</td></tr>
            <tr><td>No dew despite clear night</td><td>Rain likely next day</td></tr>
            <tr><td>Wind shifts to SW or W</td><td>Weather improving (Northern hemisphere)</td></tr>
            <tr><td>Wind shifts to NE or E</td><td>Storm approaching (Northern hemisphere)</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tool-section">
        <h3>Cloud Types & Weather</h3>
        <table class="reference-table">
          <thead><tr><th>Cloud Type</th><th>Appearance</th><th>Weather Indication</th></tr></thead>
          <tbody>
            <tr><td>Cirrus</td><td>Thin wispy streaks high up</td><td>Fair now, possible change in 24–48h</td></tr>
            <tr><td>Cirrostratus</td><td>Thin white sheet, halo around sun/moon</td><td>Rain or snow within 12–24h</td></tr>
            <tr><td>Altocumulus</td><td>Grey/white patches, mid-level</td><td>Thunderstorms possible later</td></tr>
            <tr><td>Altostratus</td><td>Grey sheet covering sky</td><td>Continuous rain or snow soon</td></tr>
            <tr><td>Nimbostratus</td><td>Dark grey, featureless, low</td><td>Steady rain or snow now</td></tr>
            <tr><td>Cumulus</td><td>Fluffy white, flat base</td><td>Fair weather if small and separate</td></tr>
            <tr><td>Cumulonimbus</td><td>Tall dark anvil-shaped towers</td><td>Thunderstorms, heavy rain, hail, lightning</td></tr>
            <tr><td>Stratus</td><td>Low grey uniform layer, like fog</td><td>Drizzle or overcast conditions</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tool-section">
        <h3>Beaufort Wind Scale</h3>
        <table class="reference-table">
          <thead><tr><th>Force</th><th>Speed (km/h)</th><th>Description</th><th>Signs</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>0</td><td>Calm</td><td>Smoke rises vertically</td></tr>
            <tr><td>1–2</td><td>1–11</td><td>Light breeze</td><td>Leaves rustle, wind felt on face</td></tr>
            <tr><td>3–4</td><td>12–28</td><td>Gentle to moderate</td><td>Small branches move, dust raised</td></tr>
            <tr><td>5–6</td><td>29–49</td><td>Fresh to strong</td><td>Small trees sway, umbrellas difficult</td></tr>
            <tr><td>7–8</td><td>50–74</td><td>Near gale to gale</td><td>Whole trees move, walking difficult</td></tr>
            <tr><td>9–10</td><td>75–102</td><td>Strong to storm</td><td>Branches break, structural damage</td></tr>
            <tr><td>11–12</td><td>103+</td><td>Violent storm to hurricane</td><td>Widespread damage</td></tr>
          </tbody>
        </table>
      </div>`
  },

  "quick-charts": {
    title: "Quick Charts",
    sub: "Common conversions & reference tables",
    html: `
      <div class="tool-section">
        <h3>Common Conversions</h3>
        <table class="reference-table">
          <thead><tr><th>From</th><th>To</th><th>Multiply by</th></tr></thead>
          <tbody>
            <tr><td>Miles</td><td>Kilometers</td><td>1.609</td></tr>
            <tr><td>Kilometers</td><td>Miles</td><td>0.621</td></tr>
            <tr><td>Pounds</td><td>Kilograms</td><td>0.453</td></tr>
            <tr><td>Kilograms</td><td>Pounds</td><td>2.205</td></tr>
            <tr><td>Gallons (US)</td><td>Liters</td><td>3.785</td></tr>
            <tr><td>Liters</td><td>Gallons (US)</td><td>0.264</td></tr>
            <tr><td>Feet</td><td>Meters</td><td>0.305</td></tr>
            <tr><td>Meters</td><td>Feet</td><td>3.281</td></tr>
            <tr><td>Inches</td><td>Centimeters</td><td>2.540</td></tr>
            <tr><td>Centimeters</td><td>Inches</td><td>0.394</td></tr>
            <tr><td>Acres</td><td>Hectares</td><td>0.405</td></tr>
            <tr><td>Hectares</td><td>Acres</td><td>2.471</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tool-section">
        <h3>Temperature Quick Reference</h3>
        <table class="reference-table">
          <thead><tr><th>°C</th><th>°F</th><th>Reference Point</th></tr></thead>
          <tbody>
            <tr><td>-40</td><td>-40</td><td>Scales converge</td></tr>
            <tr><td>-18</td><td>0</td><td>Freezer temperature</td></tr>
            <tr><td>0</td><td>32</td><td>Water freezes</td></tr>
            <tr><td>20</td><td>68</td><td>Room temperature</td></tr>
            <tr><td>37</td><td>98.6</td><td>Body temperature</td></tr>
            <tr><td>74</td><td>165</td><td>Safe cooking temperature</td></tr>
            <tr><td>100</td><td>212</td><td>Water boils (sea level)</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tool-section">
        <h3>Cooking Measurements</h3>
        <table class="reference-table">
          <thead><tr><th>Measure</th><th>ml</th><th>Equivalent</th></tr></thead>
          <tbody>
            <tr><td>1 teaspoon</td><td>5 ml</td><td>-</td></tr>
            <tr><td>1 tablespoon</td><td>15 ml</td><td>3 teaspoons</td></tr>
            <tr><td>1 cup (US)</td><td>237 ml</td><td>16 tablespoons</td></tr>
            <tr><td>1 pint (US)</td><td>473 ml</td><td>2 cups</td></tr>
            <tr><td>1 quart (US)</td><td>946 ml</td><td>4 cups</td></tr>
            <tr><td>1 gallon (US)</td><td>3785 ml</td><td>16 cups</td></tr>
            <tr><td>1 fluid oz (US)</td><td>30 ml</td><td>2 tablespoons</td></tr>
          </tbody>
        </table>
      </div>`
  },

  "country-codes": {
    title: "Country Codes",
    sub: "International dialling codes",
    html: `
      <div class="tool-section">
        <h3>How to Dial Internationally</h3>
        <p style="font-size:0.85rem;color:#555;line-height:1.7;margin-bottom:10px;">Dial: <strong>Exit code + Country code + Area code (drop leading 0) + Number</strong><br>Example to call UK from UAE: 00 + 44 + 20 + local number</p>
        <table class="reference-table">
          <thead><tr><th>Region</th><th>Common Exit Code</th></tr></thead>
          <tbody>
            <tr><td>Most of world</td><td>00</td></tr>
            <tr><td>USA / Canada</td><td>011</td></tr>
            <tr><td>Australia</td><td>0011</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tool-section">
        <h3>Middle East & Gulf</h3>
        <table class="reference-table">
          <thead><tr><th>Country</th><th>Code</th></tr></thead>
          <tbody>
            <tr><td>UAE</td><td>+971</td></tr>
            <tr><td>Saudi Arabia</td><td>+966</td></tr>
            <tr><td>Qatar</td><td>+974</td></tr>
            <tr><td>Kuwait</td><td>+965</td></tr>
            <tr><td>Bahrain</td><td>+973</td></tr>
            <tr><td>Oman</td><td>+968</td></tr>
            <tr><td>Jordan</td><td>+962</td></tr>
            <tr><td>Lebanon</td><td>+961</td></tr>
            <tr><td>Egypt</td><td>+20</td></tr>
            <tr><td>Iraq</td><td>+964</td></tr>
            <tr><td>Iran</td><td>+98</td></tr>
            <tr><td>Israel</td><td>+972</td></tr>
            <tr><td>Yemen</td><td>+967</td></tr>
            <tr><td>Syria</td><td>+963</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tool-section">
        <h3>South & Southeast Asia</h3>
        <table class="reference-table">
          <thead><tr><th>Country</th><th>Code</th></tr></thead>
          <tbody>
            <tr><td>India</td><td>+91</td></tr>
            <tr><td>Pakistan</td><td>+92</td></tr>
            <tr><td>Bangladesh</td><td>+880</td></tr>
            <tr><td>Sri Lanka</td><td>+94</td></tr>
            <tr><td>Nepal</td><td>+977</td></tr>
            <tr><td>Afghanistan</td><td>+93</td></tr>
            <tr><td>Singapore</td><td>+65</td></tr>
            <tr><td>Malaysia</td><td>+60</td></tr>
            <tr><td>Indonesia</td><td>+62</td></tr>
            <tr><td>Philippines</td><td>+63</td></tr>
            <tr><td>Thailand</td><td>+66</td></tr>
            <tr><td>Vietnam</td><td>+84</td></tr>
            <tr><td>China</td><td>+86</td></tr>
            <tr><td>Japan</td><td>+81</td></tr>
            <tr><td>South Korea</td><td>+82</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tool-section">
        <h3>Europe</h3>
        <table class="reference-table">
          <thead><tr><th>Country</th><th>Code</th></tr></thead>
          <tbody>
            <tr><td>UK</td><td>+44</td></tr>
            <tr><td>Germany</td><td>+49</td></tr>
            <tr><td>France</td><td>+33</td></tr>
            <tr><td>Italy</td><td>+39</td></tr>
            <tr><td>Spain</td><td>+34</td></tr>
            <tr><td>Netherlands</td><td>+31</td></tr>
            <tr><td>Switzerland</td><td>+41</td></tr>
            <tr><td>Sweden</td><td>+46</td></tr>
            <tr><td>Norway</td><td>+47</td></tr>
            <tr><td>Denmark</td><td>+45</td></tr>
            <tr><td>Poland</td><td>+48</td></tr>
            <tr><td>Turkey</td><td>+90</td></tr>
            <tr><td>Russia</td><td>+7</td></tr>
            <tr><td>Greece</td><td>+30</td></tr>
            <tr><td>Portugal</td><td>+351</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tool-section">
        <h3>Americas & Oceania</h3>
        <table class="reference-table">
          <thead><tr><th>Country</th><th>Code</th></tr></thead>
          <tbody>
            <tr><td>USA</td><td>+1</td></tr>
            <tr><td>Canada</td><td>+1</td></tr>
            <tr><td>Mexico</td><td>+52</td></tr>
            <tr><td>Brazil</td><td>+55</td></tr>
            <tr><td>Argentina</td><td>+54</td></tr>
            <tr><td>Colombia</td><td>+57</td></tr>
            <tr><td>Australia</td><td>+61</td></tr>
            <tr><td>New Zealand</td><td>+64</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tool-section">
        <h3>Africa</h3>
        <table class="reference-table">
          <thead><tr><th>Country</th><th>Code</th></tr></thead>
          <tbody>
            <tr><td>South Africa</td><td>+27</td></tr>
            <tr><td>Nigeria</td><td>+234</td></tr>
            <tr><td>Kenya</td><td>+254</td></tr>
            <tr><td>Ethiopia</td><td>+251</td></tr>
            <tr><td>Ghana</td><td>+233</td></tr>
            <tr><td>Morocco</td><td>+212</td></tr>
            <tr><td>Tunisia</td><td>+216</td></tr>
            <tr><td>Algeria</td><td>+213</td></tr>
          </tbody>
        </table>
      </div>`
  },

  "military-time": {
    title: "Military Time",
    sub: "24-hour clock converter & reference",
    html: `
      <div class="tool-section">
        <h3>Military Time Converter</h3>
        <div class="input-row"><label>Standard Time</label><input type="time" id="mt-input" value="14:30"></div>
        <button class="calc-btn" onclick="calcMilitaryTime()">Convert</button>
        <div class="result-box" id="mt-result" style="display:none;">
          <div class="result-value" id="mt-out">-</div><div class="result-label">Military time (24hr)</div>
          <div class="result-value" id="mt-spoken" style="margin-top:8px;">-</div><div class="result-label">Spoken as</div>
        </div>
      </div>
      <div class="tool-section">
        <h3>Quick Reference</h3>
        <table class="reference-table">
          <thead><tr><th>Standard</th><th>Military</th><th>Spoken</th></tr></thead>
          <tbody>
            <tr><td>12:00 AM (Midnight)</td><td>0000</td><td>Zero hundred hours</td></tr>
            <tr><td>1:00 AM</td><td>0100</td><td>Zero one hundred hours</td></tr>
            <tr><td>6:00 AM</td><td>0600</td><td>Zero six hundred hours</td></tr>
            <tr><td>12:00 PM (Noon)</td><td>1200</td><td>Twelve hundred hours</td></tr>
            <tr><td>1:00 PM</td><td>1300</td><td>Thirteen hundred hours</td></tr>
            <tr><td>6:00 PM</td><td>1800</td><td>Eighteen hundred hours</td></tr>
            <tr><td>9:00 PM</td><td>2100</td><td>Twenty-one hundred hours</td></tr>
            <tr><td>11:59 PM</td><td>2359</td><td>Twenty-three fifty-nine</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tool-section">
        <h3>Time Zones Reference</h3>
        <table class="reference-table">
          <thead><tr><th>Zone</th><th>Name</th><th>UTC Offset</th></tr></thead>
          <tbody>
            <tr><td>UTC</td><td>Coordinated Universal Time</td><td>+0</td></tr>
            <tr><td>GST</td><td>Gulf Standard Time (UAE, Oman)</td><td>+4</td></tr>
            <tr><td>AST</td><td>Arabia Standard Time (Saudi, Qatar, Kuwait)</td><td>+3</td></tr>
            <tr><td>IST</td><td>India Standard Time</td><td>+5:30</td></tr>
            <tr><td>PKT</td><td>Pakistan Standard Time</td><td>+5</td></tr>
            <tr><td>SGT</td><td>Singapore / Malaysia Time</td><td>+8</td></tr>
            <tr><td>JST</td><td>Japan Standard Time</td><td>+9</td></tr>
            <tr><td>GMT</td><td>Greenwich Mean Time (UK winter)</td><td>+0</td></tr>
            <tr><td>CET</td><td>Central European Time</td><td>+1</td></tr>
            <tr><td>EST</td><td>Eastern Standard Time (US)</td><td>-5</td></tr>
            <tr><td>PST</td><td>Pacific Standard Time (US)</td><td>-8</td></tr>
            <tr><td>AEST</td><td>Australian Eastern Standard Time</td><td>+10</td></tr>
          </tbody>
        </table>
      </div>`
  },

  "map-navigation": {
    title: "Map & Navigation",
    sub: "Grid references, compass use & map reading",
    html: `
      <div class="tool-section">
        <h3>Compass Basics</h3>
        <table class="reference-table">
          <thead><tr><th>Direction</th><th>Degrees</th><th>Direction</th><th>Degrees</th></tr></thead>
          <tbody>
            <tr><td>North</td><td>0° / 360°</td><td>South</td><td>180°</td></tr>
            <tr><td>North-East</td><td>45°</td><td>South-West</td><td>225°</td></tr>
            <tr><td>East</td><td>90°</td><td>West</td><td>270°</td></tr>
            <tr><td>South-East</td><td>135°</td><td>North-West</td><td>315°</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tool-section">
        <h3>Taking a Compass Bearing</h3>
        <ol style="padding-left:18px;font-size:0.85rem;line-height:1.8;color:#555;">
          <li>Hold compass flat and level in front of you</li>
          <li>Point direction of travel arrow toward your destination</li>
          <li>Rotate the bezel until the N on the dial aligns with the red (north) needle</li>
          <li>Read the bearing at the index line - this is your bearing</li>
          <li>To follow the bearing - keep red needle aligned with N as you walk</li>
        </ol>
        <p class="note">Magnetic declination: true north and magnetic north differ by a few degrees depending on location. In the Middle East, declination is approximately 2–4 degrees east.</p>
      </div>
      <div class="tool-section">
        <h3>Grid References</h3>
        <ol style="padding-left:18px;font-size:0.85rem;line-height:1.8;color:#555;">
          <li>Find the grid square - read the number along the bottom (Easting) first</li>
          <li>Then read the number up the side (Northing) - remember: along the corridor and up the stairs</li>
          <li>For a 6-figure reference - estimate tenths within the square for each axis</li>
          <li>Example: 362 741 = Easting 362, Northing 741</li>
        </ol>
      </div>
      <div class="tool-section">
        <h3>Navigation Without a Compass</h3>
        <table class="reference-table">
          <thead><tr><th>Method</th><th>How</th></tr></thead>
          <tbody>
            <tr><td>Sun - morning</td><td>Sun rises in the East - stand with sunrise on your right to face North (Northern hemisphere)</td></tr>
            <tr><td>Sun - midday</td><td>Sun is due South at noon (Northern hemisphere) - shadows point North</td></tr>
            <tr><td>Watch method</td><td>Point hour hand at sun - halfway between hour hand and 12 is South (Northern hemisphere)</td></tr>
            <tr><td>North Star (Polaris)</td><td>Find the Big Dipper - follow the two outer stars of the cup upward - Polaris is true North</td></tr>
            <tr><td>Southern Cross</td><td>Extend the long axis 4.5 times - that point is due South (Southern hemisphere)</td></tr>
            <tr><td>Stick shadow</td><td>Place stick upright - mark shadow tip, wait 15 min, mark again - line between marks runs East–West</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tool-section">
        <h3>Map Reading Tips</h3>
        <table class="reference-table">
          <thead><tr><th>Feature</th><th>What to Look For</th></tr></thead>
          <tbody>
            <tr><td>Contour lines</td><td>Closer together = steeper slope. Circles = hill or depression</td></tr>
            <tr><td>Scale</td><td>1:25,000 means 1cm = 250m on ground. 1:50,000 means 1cm = 500m</td></tr>
            <tr><td>Blue lines</td><td>Water - rivers, streams, lakes</td></tr>
            <tr><td>Green areas</td><td>Woodland or vegetation</td></tr>
            <tr><td>Orienting map</td><td>Rotate map until north arrow aligns with compass north needle</td></tr>
          </tbody>
        </table>
      </div>`
  }

};

// ── REFERENCE FUNCTIONS ────────────────────────────────

function translateMorse() {
  const MORSE = {
    'A':'.-','B':'-...','C':'-.-.','D':'-..','E':'.','F':'..-.','G':'--.','H':'....','I':'..','J':'.---',
    'K':'-.-','L':'.-..','M':'--','N':'-.','O':'---','P':'.--.','Q':'--.-','R':'.-.','S':'...','T':'-',
    'U':'..-','V':'...-','W':'.--','X':'-..-','Y':'-.--','Z':'--..',
    '0':'-----','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....',
    '6':'-....','7':'--...','8':'---..','9':'----.',
    '.':'.-.-.-',',':'--..--','?':'..--..','!':'-.-.--','/':'-..-.','@':'.--.-.','=':'-...-'
  };
  const input = document.getElementById("morse-input").value.toUpperCase();
  const output = input.split("").map(c => {
    if (c === " ") return "  /  ";
    return MORSE[c] || c;
  }).join(" ");
  const el = document.getElementById("morse-output");
  if (el) el.textContent = output || "-";
}

function calcMilitaryTime() {
  const val = document.getElementById("mt-input").value;
  if (!val) return;
  const [h, m] = val.split(":").map(Number);
  const mil = String(h).padStart(2,"0") + String(m).padStart(2,"0");
  const ones = ["","one","two","three","four","five","six","seven","eight","nine",
    "ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen",
    "twenty","twenty-one","twenty-two","twenty-three"];
  const minStr = m === 0 ? "hundred hours" : String(m).padStart(2,"0") + " hours";
  const spoken = (ones[h] || h) + " " + minStr;
  document.getElementById("mt-out").textContent = mil;
  document.getElementById("mt-spoken").textContent = spoken.charAt(0).toUpperCase() + spoken.slice(1);
  document.getElementById("mt-result").style.display = "block";
}

function saveNotes() {
  localStorage.setItem("xprep-notes", document.getElementById("notes-body").value);
}
