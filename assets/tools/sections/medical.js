window.TOOLS_MEDICAL = {

  "vitals": {
    title: "Vitals Reference",
    sub: "Normal ranges for adults & children",
    html: `
      <div class="tool-section">
        <h3>Adult Normal Ranges</h3>
        <table class="reference-table">
          <thead><tr><th>Vital Sign</th><th>Normal Range</th><th>Concern</th></tr></thead>
          <tbody>
            <tr><td>Heart Rate (bpm)</td><td>60–100</td><td>&lt;50 or &gt;120 at rest</td></tr>
            <tr><td>Respiratory Rate (/min)</td><td>12–20</td><td>&lt;10 or &gt;25</td></tr>
            <tr><td>Systolic BP (mmHg)</td><td>90–140</td><td>&lt;90 or &gt;180</td></tr>
            <tr><td>Diastolic BP (mmHg)</td><td>60–90</td><td>&gt;120</td></tr>
            <tr><td>Temperature (C)</td><td>36.5–37.5</td><td>&lt;35 or &gt;38.5</td></tr>
            <tr><td>SpO2 (%)</td><td>95–100</td><td>&lt;92</td></tr>
            <tr><td>Blood glucose (mmol/L)</td><td>4.0–7.8</td><td>&lt;3.5 or &gt;11.0</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tool-section">
        <h3>Pediatric Normal Ranges</h3>
        <table class="reference-table">
          <thead><tr><th>Vital Sign</th><th>Infant (&lt;1yr)</th><th>Toddler (1–3)</th><th>Child (4–12)</th><th>Teen (13–17)</th></tr></thead>
          <tbody>
            <tr><td>Heart Rate (bpm)</td><td>100–160</td><td>90–150</td><td>70–120</td><td>60–100</td></tr>
            <tr><td>Resp Rate (/min)</td><td>30–60</td><td>24–40</td><td>20–30</td><td>12–20</td></tr>
            <tr><td>Systolic BP (mmHg)</td><td>60–90</td><td>80–100</td><td>85–110</td><td>90–130</td></tr>
            <tr><td>Temperature (C)</td><td>36.5–37.5</td><td>36.5–37.5</td><td>36.5–37.5</td><td>36.5–37.5</td></tr>
            <tr><td>SpO2 (%)</td><td>95–100</td><td>95–100</td><td>95–100</td><td>95–100</td></tr>
          </tbody>
        </table>
        <p class="note">For reference only. Clinical context always applies.</p>
      </div>`
  },

  "gcs": {
    title: "Glasgow Coma Scale",
    sub: "Consciousness assessment scoring",
    html: `
      <div class="tool-section">
        <h3>GCS Calculator</h3>
        <div class="input-row"><label>Eye Opening</label>
          <select id="gcs-eye">
            <option value="4">4 - Spontaneous</option>
            <option value="3">3 - To voice</option>
            <option value="2">2 - To pain</option>
            <option value="1">1 - None</option>
          </select>
        </div>
        <div class="input-row"><label>Verbal Response</label>
          <select id="gcs-verbal">
            <option value="5">5 - Oriented</option>
            <option value="4">4 - Confused</option>
            <option value="3">3 - Words only</option>
            <option value="2">2 - Sounds only</option>
            <option value="1">1 - None</option>
          </select>
        </div>
        <div class="input-row"><label>Motor Response</label>
          <select id="gcs-motor">
            <option value="6">6 - Obeys commands</option>
            <option value="5">5 - Localizes pain</option>
            <option value="4">4 - Withdraws from pain</option>
            <option value="3">3 - Abnormal flexion</option>
            <option value="2">2 - Extension to pain</option>
            <option value="1">1 - None</option>
          </select>
        </div>
        <button class="calc-btn" onclick="calcGCS()">Calculate</button>
        <div class="result-box" id="gcs-result" style="display:none;">
          <div class="result-value" id="gcs-score">-</div><div class="result-label">GCS Total (out of 15)</div>
          <div class="result-value" id="gcs-level" style="margin-top:8px;">-</div><div class="result-label">Severity</div>
          <div id="gcs-action" style="margin-top:10px;font-size:0.82rem;color:#555;"></div>
        </div>
      </div>
      <div class="tool-section">
        <h3>GCS Reference</h3>
        <table class="reference-table">
          <thead><tr><th>Score</th><th>Severity</th><th>Action</th></tr></thead>
          <tbody>
            <tr><td>13–15</td><td>Mild</td><td>Monitor closely, reassess frequently</td></tr>
            <tr><td>9–12</td><td>Moderate</td><td>Urgent medical evaluation needed</td></tr>
            <tr><td>3–8</td><td>Severe</td><td>Life-threatening - immediate evacuation, airway management</td></tr>
            <tr><td>3</td><td>No response</td><td>Critical - begin CPR if no pulse/breathing</td></tr>
          </tbody>
        </table>
        <p class="note">GCS of 8 or below - assume airway compromise. Position patient on side if no spinal injury suspected.</p>
      </div>`
  },

  "sample": {
    title: "SAMPLE History",
    sub: "Patient assessment framework",
    html: `
      <div class="tool-section">
        <h3>SAMPLE Framework</h3>
        <table class="reference-table">
          <thead><tr><th>Letter</th><th>Stands For</th><th>Ask</th></tr></thead>
          <tbody>
            <tr><td><strong>S</strong></td><td>Signs & Symptoms</td><td>What are you feeling? Where does it hurt? When did it start?</td></tr>
            <tr><td><strong>A</strong></td><td>Allergies</td><td>Are you allergic to any medications, foods, or substances?</td></tr>
            <tr><td><strong>M</strong></td><td>Medications</td><td>What medications are you currently taking, including supplements?</td></tr>
            <tr><td><strong>P</strong></td><td>Pertinent History</td><td>Do you have any medical conditions? Previous surgeries? Similar episodes?</td></tr>
            <tr><td><strong>L</strong></td><td>Last Oral Intake</td><td>When did you last eat or drink? What was it?</td></tr>
            <tr><td><strong>E</strong></td><td>Events Leading Up</td><td>What were you doing when this started? What happened before?</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tool-section">
        <h3>OPQRST - Pain Assessment</h3>
        <table class="reference-table">
          <thead><tr><th>Letter</th><th>Stands For</th><th>Ask</th></tr></thead>
          <tbody>
            <tr><td><strong>O</strong></td><td>Onset</td><td>When did the pain start? Was it sudden or gradual?</td></tr>
            <tr><td><strong>P</strong></td><td>Provocation / Palliation</td><td>What makes it better or worse?</td></tr>
            <tr><td><strong>Q</strong></td><td>Quality</td><td>How would you describe the pain? Sharp, dull, burning, crushing?</td></tr>
            <tr><td><strong>R</strong></td><td>Region / Radiation</td><td>Where exactly is the pain? Does it spread anywhere?</td></tr>
            <tr><td><strong>S</strong></td><td>Severity</td><td>On a scale of 1–10, how bad is the pain?</td></tr>
            <tr><td><strong>T</strong></td><td>Time</td><td>Is it constant or does it come and go? Getting better or worse?</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tool-section">
        <h3>Primary Survey - ABCDE</h3>
        <table class="reference-table">
          <thead><tr><th>Step</th><th>Check</th><th>Action</th></tr></thead>
          <tbody>
            <tr><td><strong>A</strong> - Airway</td><td>Is the airway open?</td><td>Tilt head/lift chin, remove visible obstruction</td></tr>
            <tr><td><strong>B</strong> - Breathing</td><td>Are they breathing normally?</td><td>Look, listen, feel - begin rescue breathing if absent</td></tr>
            <tr><td><strong>C</strong> - Circulation</td><td>Is there a pulse? Severe bleeding?</td><td>CPR if no pulse, control bleeding</td></tr>
            <tr><td><strong>D</strong> - Disability</td><td>Level of consciousness?</td><td>AVPU or GCS assessment</td></tr>
            <tr><td><strong>E</strong> - Exposure</td><td>Hidden injuries?</td><td>Expose and examine - maintain dignity and warmth</td></tr>
          </tbody>
        </table>
        <p class="note">AVPU scale: Alert - responds to Voice - responds to Pain - Unresponsive</p>
      </div>`
  },

  "dosage": {
    title: "Dosage Calc",
    sub: "Weight-based medication dosing",
    html: `
      <div class="tool-section">
        <div class="input-row"><label>Patient weight</label><input type="number" id="dos-wt" value="70"><select id="dos-unit"><option value="kg">kg</option><option value="lb">lb</option></select></div>
        <div class="input-row"><label>Dose (mg/kg)</label><input type="number" id="dos-mgkg" value="10" step="0.1"></div>
        <div class="input-row"><label>Frequency</label>
          <select id="dos-freq">
            <option value="1">Once daily</option>
            <option value="2">Twice daily</option>
            <option value="3">Three times daily</option>
            <option value="4">Four times daily</option>
          </select>
        </div>
        <button class="calc-btn" onclick="calcDosage()">Calculate</button>
        <div class="result-box" id="dos-result" style="display:none;">
          <div class="result-value" id="dos-single">-</div><div class="result-label">Single dose (mg)</div>
          <div class="result-value" id="dos-daily" style="margin-top:8px;">-</div><div class="result-label">Total daily dose (mg)</div>
        </div>
        <p class="note">For reference only. Always verify with a medical professional.</p>
      </div>`
  },

  "iv-drip": {
    title: "IV Drip Rate",
    sub: "Drip rate & flow calculator",
    html: `
      <div class="tool-section">
        <div class="input-row"><label>Volume (ml)</label><input type="number" id="iv-vol" value="1000"></div>
        <div class="input-row"><label>Time (hours)</label><input type="number" id="iv-hrs" value="8"></div>
        <div class="input-row"><label>Drop factor</label>
          <select id="iv-drop">
            <option value="10">10 drops/ml (macrodrip)</option>
            <option value="15">15 drops/ml</option>
            <option value="20">20 drops/ml</option>
            <option value="60">60 drops/ml (microdrip)</option>
          </select>
        </div>
        <button class="calc-btn" onclick="calcIV()">Calculate</button>
        <div class="result-box" id="iv-result" style="display:none;">
          <div class="result-value" id="iv-rate">-</div><div class="result-label">drops per minute</div>
          <div class="result-value" id="iv-mlhr" style="margin-top:8px;">-</div><div class="result-label">ml per hour</div>
        </div>
        <p class="note">For reference only. Always verify with a medical professional.</p>
      </div>`
  },

  "medication-ref": {
    title: "Medication Reference",
    sub: "Common emergency medications",
    html: `
      <div class="tool-section">
        <h3>Pain & Fever</h3>
        <table class="reference-table">
          <thead><tr><th>Medication</th><th>Adult Dose</th><th>Use</th><th>Avoid</th></tr></thead>
          <tbody>
            <tr><td>Paracetamol (Acetaminophen)</td><td>500–1000mg every 4–6h (max 4g/day)</td><td>Pain, fever</td><td>Liver disease, alcohol use</td></tr>
            <tr><td>Ibuprofen</td><td>200–400mg every 4–6h (max 1200mg/day OTC)</td><td>Pain, fever, inflammation</td><td>Stomach ulcers, kidney disease, pregnancy (3rd trimester)</td></tr>
            <tr><td>Aspirin</td><td>300–600mg every 4h (max 4g/day)</td><td>Pain, fever, suspected heart attack (300mg chewed)</td><td>Children under 16, bleeding disorders, asthma</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tool-section">
        <h3>Allergies & Reactions</h3>
        <table class="reference-table">
          <thead><tr><th>Medication</th><th>Adult Dose</th><th>Use</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>Cetirizine (antihistamine)</td><td>10mg once daily</td><td>Mild allergic reaction, hives, hay fever</td><td>May cause drowsiness</td></tr>
            <tr><td>Loratadine (antihistamine)</td><td>10mg once daily</td><td>Mild allergic reaction, hives</td><td>Non-drowsy formula</td></tr>
            <tr><td>Epinephrine (EpiPen)</td><td>0.3mg IM into outer thigh</td><td>Anaphylaxis only</td><td>Seek emergency care immediately after use</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tool-section">
        <h3>Gastrointestinal</h3>
        <table class="reference-table">
          <thead><tr><th>Medication</th><th>Adult Dose</th><th>Use</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>ORS (Oral Rehydration Salts)</td><td>200–400ml after each loose stool</td><td>Diarrhoea, dehydration</td><td>DIY: 1L water + 6 tsp sugar + 0.5 tsp salt</td></tr>
            <tr><td>Loperamide (Imodium)</td><td>4mg initially, then 2mg after each stool (max 16mg/day)</td><td>Diarrhoea</td><td>Do not use if bloody diarrhoea or fever</td></tr>
            <tr><td>Omeprazole</td><td>20mg once daily before food</td><td>Heartburn, acid reflux, stomach ulcers</td><td>Take 30 min before eating</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tool-section">
        <h3>Infections</h3>
        <table class="reference-table">
          <thead><tr><th>Medication</th><th>Adult Dose</th><th>Use</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>Amoxicillin</td><td>500mg every 8h for 5–7 days</td><td>Bacterial infections - chest, ear, throat, skin</td><td>Check penicillin allergy first</td></tr>
            <tr><td>Metronidazole</td><td>400mg every 8h for 7 days</td><td>Gut infections, dental infections, anaerobic bacteria</td><td>Do not drink alcohol during course</td></tr>
            <tr><td>Fluconazole</td><td>150mg single dose</td><td>Fungal infections</td><td>Check for drug interactions</td></tr>
          </tbody>
        </table>
        <p class="note">Antibiotics require prescription in most countries. For reference only. Self-treatment of infections carries risk - seek professional advice whenever possible.</p>
      </div>`
  },

  "wound-care": {
    title: "Wound Care",
    sub: "Cleaning, closure & infection signs",
    html: `
      <div class="tool-section">
        <h3>Wound Cleaning</h3>
        <ol style="padding-left:18px;font-size:0.85rem;line-height:1.8;color:#555;">
          <li>Control bleeding first - direct pressure for 10–15 min</li>
          <li>Wash hands thoroughly before touching wound</li>
          <li>Irrigate wound with clean water or saline - use syringe or squeeze bottle for pressure</li>
          <li>Remove visible debris with clean tweezers - do not probe deep wounds</li>
          <li>Clean surrounding skin with antiseptic wipe - avoid getting antiseptic inside wound</li>
          <li>Pat dry, apply thin layer of antibiotic ointment if available</li>
          <li>Cover with appropriate dressing</li>
        </ol>
        <p class="note">Do not close dirty, bite, or puncture wounds - leave open to drain and monitor for infection.</p>
      </div>
      <div class="tool-section">
        <h3>Wound Closure Guide</h3>
        <table class="reference-table">
          <thead><tr><th>Wound Type</th><th>Method</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>Small clean cut (&lt;2cm)</td><td>Steri-strips / wound closure strips</td><td>Dry skin first, apply perpendicular to wound</td></tr>
            <tr><td>Larger clean cut</td><td>Sutures or staples</td><td>Requires training - close within 6–8 hours</td></tr>
            <tr><td>Gaping wound</td><td>Butterfly closures or steri-strips</td><td>Pull edges together, do not overlap</td></tr>
            <tr><td>Puncture wound</td><td>Do not close - leave open</td><td>High infection risk, needs irrigation and monitoring</td></tr>
            <tr><td>Animal bite</td><td>Do not close - leave open</td><td>Rabies risk - seek medical care urgently</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tool-section">
        <h3>Signs of Infection</h3>
        <table class="reference-table">
          <thead><tr><th>Sign</th><th>Severity</th><th>Action</th></tr></thead>
          <tbody>
            <tr><td>Increasing redness around wound</td><td>Early</td><td>Clean, monitor closely</td></tr>
            <tr><td>Warmth and swelling</td><td>Early–Moderate</td><td>Elevate, consider antibiotics</td></tr>
            <tr><td>Pus or cloudy discharge</td><td>Moderate</td><td>Open wound, irrigate, antibiotics</td></tr>
            <tr><td>Red streaking from wound</td><td>Severe</td><td>Evacuation - spreading infection (cellulitis/sepsis risk)</td></tr>
            <tr><td>Fever, chills, rapid heartbeat</td><td>Severe</td><td>Systemic infection - evacuate immediately</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tool-section">
        <h3>Dressing Types</h3>
        <table class="reference-table">
          <thead><tr><th>Type</th><th>Best For</th><th>Change Frequency</th></tr></thead>
          <tbody>
            <tr><td>Dry gauze pad</td><td>Clean wounds, light exudate</td><td>Daily or when wet</td></tr>
            <tr><td>Non-adherent dressing</td><td>Burns, raw wounds</td><td>Every 2–3 days</td></tr>
            <tr><td>Hydrocolloid</td><td>Minor wounds, blisters</td><td>Every 3–5 days or when leaking</td></tr>
            <tr><td>Compression bandage</td><td>Sprains, swelling control</td><td>Check circulation every 2 hours</td></tr>
          </tbody>
        </table>
      </div>`
  },

  "blood-pressure": {
    title: "Blood Pressure Guide",
    sub: "BP ranges, hypertension stages & action",
    html: `
      <div class="tool-section">
        <h3>Blood Pressure Calculator</h3>
        <div class="input-row"><label>Systolic (mmHg)</label><input type="number" id="bp-sys" value="120"></div>
        <div class="input-row"><label>Diastolic (mmHg)</label><input type="number" id="bp-dia" value="80"></div>
        <button class="calc-btn" onclick="calcBP()">Assess</button>
        <div class="result-box" id="bp-result" style="display:none;">
          <div class="result-value" id="bp-category">-</div><div class="result-label">BP Category</div>
          <div class="result-value" id="bp-action" style="margin-top:8px;font-size:1rem;">-</div><div class="result-label">Recommended action</div>
        </div>
      </div>
      <div class="tool-section">
        <h3>Blood Pressure Ranges</h3>
        <table class="reference-table">
          <thead><tr><th>Category</th><th>Systolic</th><th>Diastolic</th><th>Action</th></tr></thead>
          <tbody>
            <tr><td>Low (Hypotension)</td><td>&lt;90</td><td>&lt;60</td><td>Lie down, fluids if conscious, monitor for shock</td></tr>
            <tr><td>Normal</td><td>90–119</td><td>60–79</td><td>No action needed</td></tr>
            <tr><td>Elevated</td><td>120–129</td><td>&lt;80</td><td>Lifestyle changes recommended</td></tr>
            <tr><td>High Stage 1</td><td>130–139</td><td>80–89</td><td>Monitor, reduce salt/stress, consult doctor</td></tr>
            <tr><td>High Stage 2</td><td>140–179</td><td>90–119</td><td>Medical evaluation needed</td></tr>
            <tr><td>Hypertensive Crisis</td><td>&gt;180</td><td>&gt;120</td><td>Emergency - seek immediate care</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tool-section">
        <h3>How to Measure Correctly</h3>
        <ol style="padding-left:18px;font-size:0.85rem;line-height:1.8;color:#555;">
          <li>Sit quietly for 5 minutes before measuring</li>
          <li>Sit with back supported, feet flat on floor</li>
          <li>Rest arm on flat surface at heart level</li>
          <li>Do not talk or move during measurement</li>
          <li>Take 2–3 readings 1 minute apart and average them</li>
          <li>Avoid caffeine, exercise, or smoking 30 min before</li>
        </ol>
      </div>`
  },

  "bmi": {
    title: "BMI",
    sub: "Body mass index calculator",
    html: `
      <div class="tool-section">
        <div class="input-row"><label>Weight (kg)</label><input type="number" id="bmi-w" value="70"></div>
        <div class="input-row"><label>Height (cm)</label><input type="number" id="bmi-h" value="170"></div>
        <button class="calc-btn" onclick="calcBMI()">Calculate</button>
        <div class="result-box" id="bmi-result" style="display:none;">
          <div class="result-value" id="bmi-val">-</div>
          <div class="result-label" id="bmi-cat">-</div>
        </div>
      </div>
      <div class="tool-section">
        <h3>BMI Reference</h3>
        <table class="reference-table">
          <thead><tr><th>BMI</th><th>Category</th></tr></thead>
          <tbody>
            <tr><td>&lt;18.5</td><td>Underweight</td></tr>
            <tr><td>18.5–24.9</td><td>Normal weight</td></tr>
            <tr><td>25.0–29.9</td><td>Overweight</td></tr>
            <tr><td>30.0–34.9</td><td>Obese (Class I)</td></tr>
            <tr><td>35.0–39.9</td><td>Obese (Class II)</td></tr>
            <tr><td>&gt;40</td><td>Obese (Class III)</td></tr>
          </tbody>
        </table>
        <p class="note">BMI is a screening tool only - it does not account for muscle mass, age, or body composition.</p>
      </div>`
  },

  "pediatric-ref": {
    title: "Pediatric Reference",
    sub: "Child-specific dosing & emergency differences",
    html: `
      <div class="tool-section">
        <h3>Weight Estimation by Age</h3>
        <table class="reference-table">
          <thead><tr><th>Age</th><th>Estimated Weight</th><th>Formula</th></tr></thead>
          <tbody>
            <tr><td>0–12 months</td><td>3–10 kg</td><td>Weight (kg) = (age in months + 9) / 2</td></tr>
            <tr><td>1–5 years</td><td>10–18 kg</td><td>Weight (kg) = (age in years x 2) + 8</td></tr>
            <tr><td>6–12 years</td><td>18–40 kg</td><td>Weight (kg) = (age in years x 3) + 7</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tool-section">
        <h3>Pediatric Weight Calculator</h3>
        <div class="input-row"><label>Age</label><input type="number" id="ped-age" value="5" step="0.5"></div>
        <div class="input-row"><label>Unit</label>
          <select id="ped-unit">
            <option value="years">Years</option>
            <option value="months">Months</option>
          </select>
        </div>
        <button class="calc-btn" onclick="calcPedWeight()">Estimate Weight</button>
        <div class="result-box" id="ped-result" style="display:none;">
          <div class="result-value" id="ped-weight">-</div><div class="result-label">Estimated weight (kg)</div>
          <div class="result-value" id="ped-paracetamol" style="margin-top:8px;">-</div><div class="result-label">Paracetamol dose (15mg/kg)</div>
          <div class="result-value" id="ped-ibuprofen" style="margin-top:8px;">-</div><div class="result-label">Ibuprofen dose (10mg/kg)</div>
        </div>
      </div>
      <div class="tool-section">
        <h3>Child vs Adult Emergency Differences</h3>
        <table class="reference-table">
          <thead><tr><th>Consideration</th><th>Child</th></tr></thead>
          <tbody>
            <tr><td>Airway</td><td>Smaller, softer, easier to obstruct - neutral head position for infants</td></tr>
            <tr><td>Breathing</td><td>Faster rate, abdominal breathing is normal in infants</td></tr>
            <tr><td>Circulation</td><td>Higher heart rate normal - BP lower than adults</td></tr>
            <tr><td>Dehydration</td><td>Deteriorates faster - sunken fontanelle in infants is a warning sign</td></tr>
            <tr><td>Fever</td><td>Children can spike high fevers rapidly - febrile seizures possible</td></tr>
            <tr><td>CPR compressions</td><td>2 fingers for infants, 1–2 hands for children - 1/3 chest depth</td></tr>
            <tr><td>Medication doses</td><td>Always weight-based - never give aspirin to children under 16</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tool-section">
        <h3>Febrile Seizure Management</h3>
        <ol style="padding-left:18px;font-size:0.85rem;line-height:1.8;color:#555;">
          <li>Stay calm - most febrile seizures stop within 1–2 minutes</li>
          <li>Place child on their side on a soft surface</li>
          <li>Do not restrain - do not put anything in the mouth</li>
          <li>Clear area of hard objects</li>
          <li>Time the seizure - call emergency if it lasts more than 5 minutes</li>
          <li>After seizure - child will be drowsy and confused - this is normal</li>
        </ol>
        <p class="note">A febrile seizure is frightening but usually harmless. Always seek medical evaluation after a first febrile seizure.</p>
      </div>`
  },

  "dental-emergency": {
    title: "Dental Emergency",
    sub: "Toothache, knocked-out tooth & abscess",
    html: `
      <div class="tool-section">
        <h3>Knocked-Out Tooth (Avulsion)</h3>
        <ol style="padding-left:18px;font-size:0.85rem;line-height:1.8;color:#555;">
          <li>Handle tooth by the crown only - never touch the root</li>
          <li>If dirty, rinse gently with milk or saline - do not scrub</li>
          <li>Re-implant immediately if possible - push firmly into socket</li>
          <li>Bite down gently on clean cloth to hold in place</li>
          <li>If unable to re-implant - store in milk, saliva, or saline (not water)</li>
          <li>See a dentist within 30 minutes - time is critical</li>
        </ol>
        <p class="note">Applies to adult teeth only - do not re-implant baby teeth.</p>
      </div>
      <div class="tool-section">
        <h3>Toothache</h3>
        <table class="reference-table">
          <thead><tr><th>Cause</th><th>Signs</th><th>Action</th></tr></thead>
          <tbody>
            <tr><td>Decay / cavity</td><td>Sharp pain when eating/drinking cold or sweet</td><td>Avoid triggers, dental filling needed</td></tr>
            <tr><td>Cracked tooth</td><td>Sharp pain when biting, may come and go</td><td>Avoid hard foods, see dentist</td></tr>
            <tr><td>Exposed root</td><td>Sensitivity to hot and cold</td><td>Desensitising toothpaste, dental review</td></tr>
            <tr><td>Abscess</td><td>Throbbing constant pain, swelling, fever</td><td>Antibiotics + urgent dental care</td></tr>
          </tbody>
        </table>
        <p class="note">Temporary pain relief: ibuprofen 400mg or paracetamol 1000mg. Clove oil applied to tooth can provide short-term relief.</p>
      </div>
      <div class="tool-section">
        <h3>Dental Abscess</h3>
        <ol style="padding-left:18px;font-size:0.85rem;line-height:1.8;color:#555;">
          <li>Signs: severe throbbing pain, swelling of face/jaw, fever, bad taste in mouth</li>
          <li>Take ibuprofen 400mg and paracetamol 1000mg together for pain</li>
          <li>Start antibiotics if available - Amoxicillin 500mg 3x daily or Metronidazole 400mg 3x daily</li>
          <li>Rinse with warm salt water - 1 tsp salt in 250ml warm water</li>
          <li>Do not apply heat to face - can spread infection</li>
          <li>Seek dental care urgently - abscess can spread to jaw and airway</li>
        </ol>
        <p class="note">A spreading dental abscess is a medical emergency. If swelling reaches the neck or you have difficulty swallowing or breathing - evacuate immediately.</p>
      </div>
      <div class="tool-section">
        <h3>Lost Filling or Crown</h3>
        <ol style="padding-left:18px;font-size:0.85rem;line-height:1.8;color:#555;">
          <li>Clean the tooth and the crown if you have it</li>
          <li>Temporary fix: dental cement, sugar-free gum, or toothpaste in cavity</li>
          <li>If crown is available - try replacing it with dental cement or vaseline</li>
          <li>Avoid chewing on that side</li>
          <li>See a dentist as soon as possible</li>
        </ol>
      </div>`
  },

  "childbirth-emergency": {
    title: "Childbirth Emergency",
    sub: "Emergency delivery steps & newborn care",
    html: `
      <div class="tool-section">
        <p style="font-size:0.85rem;color:#c0392b;font-weight:bold;margin-bottom:12px;">This section is for use only when professional medical help is unavailable and delivery is imminent.</p>
        <h3>Signs of Imminent Delivery</h3>
        <ul style="padding-left:18px;font-size:0.85rem;line-height:1.8;color:#555;">
          <li>Contractions less than 2 minutes apart</li>
          <li>Strong urge to push or bear down</li>
          <li>Baby's head visible at the opening (crowning)</li>
          <li>Water has broken</li>
        </ul>
      </div>
      <div class="tool-section">
        <h3>Delivery Steps</h3>
        <ol style="padding-left:18px;font-size:0.85rem;line-height:1.8;color:#555;">
          <li>Call emergency services immediately if at all possible</li>
          <li>Wash hands thoroughly - use gloves if available</li>
          <li>Help mother into comfortable position - semi-reclined or on back, knees bent</li>
          <li>When head crowns - support it gently with both hands, do not pull</li>
          <li>Guide head downward gently to deliver top shoulder, then upward for bottom shoulder</li>
          <li>Baby will be slippery - have a clean towel ready</li>
          <li>Note time of birth</li>
          <li>Hold baby at level of mother's abdomen - do not hold upside down</li>
          <li>Dry and warm baby immediately - wipe face, clear airway gently</li>
          <li>Baby should cry within 30 seconds - if not, rub back firmly</li>
          <li>Do not cut cord unless it is very long and wrapped tightly around neck</li>
          <li>Placenta will deliver within 30 min - do not pull cord</li>
        </ol>
      </div>
      <div class="tool-section">
        <h3>Newborn Care</h3>
        <table class="reference-table">
          <thead><tr><th>Action</th><th>Detail</th></tr></thead>
          <tbody>
            <tr><td>Warmth</td><td>Dry immediately, skin-to-skin with mother, cover head</td></tr>
            <tr><td>Airway</td><td>Wipe mouth and nose gently with clean cloth</td></tr>
            <tr><td>Breathing</td><td>Should breathe within 30 sec - rub back if not</td></tr>
            <tr><td>Not breathing</td><td>Begin infant CPR - 2 fingers, 30 compressions + 2 puffs</td></tr>
            <tr><td>Cord</td><td>Leave intact until help arrives - tie if must cut</td></tr>
            <tr><td>Feeding</td><td>Breastfeed as soon as possible - within first hour</td></tr>
          </tbody>
        </table>
      </div>
      <div class="tool-section">
        <h3>Warning Signs - Mother</h3>
        <ul style="padding-left:18px;font-size:0.85rem;line-height:1.8;color:#555;">
          <li>Heavy bleeding after delivery (soaking more than 1 pad per hour)</li>
          <li>Placenta not delivered within 30–60 minutes</li>
          <li>Seizures before, during, or after delivery</li>
          <li>Severe headache or vision changes</li>
          <li>Difficulty breathing</li>
        </ul>
        <p class="note">All of the above require immediate emergency evacuation.</p>
      </div>`
  }

};

// ── MEDICAL CALCULATORS ────────────────────────────────

function calcGCS() {
  const eye = parseInt(document.getElementById("gcs-eye").value);
  const verbal = parseInt(document.getElementById("gcs-verbal").value);
  const motor = parseInt(document.getElementById("gcs-motor").value);
  const score = eye + verbal + motor;
  let level, action;
  if (score >= 13) { level = "Mild"; action = "Monitor closely and reassess frequently. Note any deterioration."; }
  else if (score >= 9) { level = "Moderate"; action = "Urgent medical evaluation needed. Keep airway open, monitor vitals."; }
  else { level = "Severe"; action = "Life-threatening. Immediate evacuation. Protect airway - place on side if no spinal injury suspected."; }
  document.getElementById("gcs-score").textContent = score + " / 15";
  document.getElementById("gcs-level").textContent = level;
  document.getElementById("gcs-action").textContent = action;
  document.getElementById("gcs-result").style.display = "block";
}

function calcDosage() {
  let wt = parseFloat(document.getElementById("dos-wt").value);
  if (document.getElementById("dos-unit").value === "lb") wt *= 0.453592;
  const mgkg = parseFloat(document.getElementById("dos-mgkg").value);
  const freq = parseInt(document.getElementById("dos-freq").value);
  const single = wt * mgkg;
  document.getElementById("dos-single").textContent = single.toFixed(1) + " mg";
  document.getElementById("dos-daily").textContent = (single * freq).toFixed(1) + " mg";
  document.getElementById("dos-result").style.display = "block";
}

function calcIV() {
  const vol = parseFloat(document.getElementById("iv-vol").value);
  const hrs = parseFloat(document.getElementById("iv-hrs").value);
  const drop = parseInt(document.getElementById("iv-drop").value);
  document.getElementById("iv-rate").textContent = Math.round((vol * drop) / (hrs * 60)) + " drops/min";
  document.getElementById("iv-mlhr").textContent = (vol / hrs).toFixed(1) + " ml/hr";
  document.getElementById("iv-result").style.display = "block";
}

function calcBP() {
  const sys = parseInt(document.getElementById("bp-sys").value);
  const dia = parseInt(document.getElementById("bp-dia").value);
  let category, action;
  if (sys < 90 || dia < 60) { category = "Low (Hypotension)"; action = "Lie down, fluids if conscious, monitor for shock signs."; }
  else if (sys < 120 && dia < 80) { category = "Normal"; action = "No action needed. Maintain healthy lifestyle."; }
  else if (sys < 130 && dia < 80) { category = "Elevated"; action = "Lifestyle changes recommended - reduce salt, increase activity."; }
  else if (sys < 140 || dia < 90) { category = "High - Stage 1"; action = "Monitor regularly. Reduce salt and stress. Consult a doctor."; }
  else if (sys < 180 || dia < 120) { category = "High - Stage 2"; action = "Medical evaluation needed. Avoid strenuous activity."; }
  else { category = "Hypertensive Crisis"; action = "Emergency - seek immediate medical care."; }
  if (sys >= 180 && dia >= 120) { category = "Hypertensive Crisis"; action = "Emergency - seek immediate medical care."; }
  document.getElementById("bp-category").textContent = category;
  document.getElementById("bp-action").textContent = action;
  document.getElementById("bp-result").style.display = "block";
}

function calcBMI() {
  const w = parseFloat(document.getElementById("bmi-w").value);
  const h = parseFloat(document.getElementById("bmi-h").value) / 100;
  const bmi = w / (h * h);
  let cat;
  if (bmi < 18.5) cat = "Underweight";
  else if (bmi < 25) cat = "Normal weight";
  else if (bmi < 30) cat = "Overweight";
  else if (bmi < 35) cat = "Obese (Class I)";
  else if (bmi < 40) cat = "Obese (Class II)";
  else cat = "Obese (Class III)";
  document.getElementById("bmi-val").textContent = bmi.toFixed(1);
  document.getElementById("bmi-cat").textContent = cat;
  document.getElementById("bmi-result").style.display = "block";
}

function calcPedWeight() {
  const age = parseFloat(document.getElementById("ped-age").value);
  const unit = document.getElementById("ped-unit").value;
  let weight;
  if (unit === "months") {
    weight = age <= 12 ? (age + 9) / 2 : ((age / 12) * 2) + 8;
  } else {
    if (age < 1) weight = ((age * 12) + 9) / 2;
    else if (age <= 5) weight = (age * 2) + 8;
    else weight = (age * 3) + 7;
  }
  weight = Math.round(weight * 10) / 10;
  document.getElementById("ped-weight").textContent = weight + " kg";
  document.getElementById("ped-paracetamol").textContent = (weight * 15).toFixed(0) + " mg";
  document.getElementById("ped-ibuprofen").textContent = (weight * 10).toFixed(0) + " mg";
  document.getElementById("ped-result").style.display = "block";
}
