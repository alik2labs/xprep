window.TOOLS_UTILITY = {

  "unit-converter": {
    title: "Unit Converter",
    sub: "Length, weight, temperature and more",
    html: `
      <div class="tool-section">
        <div class="input-row">
          <label>Category</label>
          <select id="uc-cat" onchange="ucChangeCategory()" style="max-width:180px;">
            <option value="length">Length</option>
            <option value="area">Area</option>
            <option value="weight">Weight & Mass</option>
            <option value="volume">Volume</option>
            <option value="temperature">Temperature</option>
            <option value="time">Time</option>
            <option value="speed">Speed</option>
            <option value="power">Power</option>
            <option value="pressure">Pressure</option>
            <option value="energy">Energy</option>
            <option value="angle">Angle</option>
            <option value="fuel">Fuel Consumption</option>
          </select>
        </div>
        <div class="input-row">
          <label>Value</label>
          <input type="number" id="uc-value" value="1" oninput="ucCalc()">
          <select id="uc-from" onchange="ucCalc()" style="max-width:200px;"></select>
          <span style="color:#aaa;">to</span>
          <select id="uc-to" onchange="ucCalc()" style="max-width:200px;"></select>
        </div>
        <div class="result-box">
          <div class="result-value" id="uc-out">-</div>
          <div class="result-label" id="uc-label">Select units above</div>
        </div>
      </div>`
  },

  "number-base": {
    title: "Number Base Converter",
    sub: "Decimal, binary, hex, octal",
    html: `
      <div class="tool-section">
        <div class="input-row">
          <label>Input Base</label>
          <select id="nb-from">
            <option value="10">Decimal (base 10)</option>
            <option value="2">Binary (base 2)</option>
            <option value="16">Hexadecimal (base 16)</option>
            <option value="8">Octal (base 8)</option>
          </select>
        </div>
        <div class="input-row">
          <label>Value</label>
          <input type="text" id="nb-value" placeholder="Enter value..." oninput="calcBase()">
        </div>
        <div class="result-box">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div><div class="result-value" id="nb-dec">-</div><div class="result-label">Decimal</div></div>
            <div><div class="result-value" id="nb-bin">-</div><div class="result-label">Binary</div></div>
            <div><div class="result-value" id="nb-hex">-</div><div class="result-label">Hexadecimal</div></div>
            <div><div class="result-value" id="nb-oct">-</div><div class="result-label">Octal</div></div>
          </div>
        </div>
      </div>`
  },

  "currency": {
    title: "Currency Converter",
    sub: "Offline exchange rate converter",
    html: `
      <div class="tool-section">
        <div class="input-row"><label>Amount</label><input type="number" id="cc-amount" value="100" oninput="calcCurrency()"></div>
        <div class="input-row"><label>From</label><select id="cc-from" onchange="calcCurrency()" style="max-width:260px;"></select></div>
        <div class="input-row"><label>To</label><select id="cc-to" onchange="calcCurrency()" style="max-width:260px;"></select></div>
        <div class="result-box">
          <div class="result-value" id="cc-result">-</div>
          <div class="result-label" id="cc-label">Select currencies above</div>
        </div>
        <div style="margin-top:14px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <button class="calc-btn" onclick="updateRates()" style="margin-top:0;">Update Rates</button>
          <span id="cc-rate-date" style="font-size:0.78rem;color:#aaa;"></span>
        </div>
        <p class="note" style="margin-top:8px;">Rates are stored on this device. Use Update Rates when connected to internet.</p>
      </div>`
  },

  "date-diff": {
    title: "Date Difference",
    sub: "Days between two dates",
    html: `
      <div class="tool-section">
        <h3>Days Between Two Dates</h3>
        <div class="input-row"><label>Start Date</label><input type="date" id="dd-start"></div>
        <div class="input-row"><label>End Date</label><input type="date" id="dd-end"></div>
        <button class="calc-btn" onclick="calcDateDiff()">Calculate</button>
        <div class="result-box" id="dd-result" style="display:none;">
          <div class="result-value" id="dd-days">-</div><div class="result-label">days</div>
          <div class="result-value" id="dd-weeks" style="margin-top:8px;">-</div><div class="result-label">weeks and days</div>
          <div class="result-value" id="dd-months" style="margin-top:8px;">-</div><div class="result-label">approximate months</div>
        </div>
      </div>
      <div class="tool-section">
        <h3>Add / Subtract Days</h3>
        <div class="input-row"><label>Start Date</label><input type="date" id="da-start"></div>
        <div class="input-row"><label>Days</label><input type="number" id="da-days" value="30"></div>
        <div class="input-row"><label>Operation</label>
          <select id="da-op"><option value="add">Add days</option><option value="sub">Subtract days</option></select>
        </div>
        <button class="calc-btn" onclick="calcDateAdd()">Calculate</button>
        <div class="result-box" id="da-result" style="display:none;">
          <div class="result-value" id="da-out">-</div>
          <div class="result-label" id="da-label">-</div>
        </div>
      </div>`
  },

  "time-sun": {
    title: "Time / Sun",
    sub: "Current time, UTC & sunrise/sunset",
    html: `
      <div class="tool-section">
        <h3>Current Time</h3>
        <div class="result-box">
          <div class="result-value" id="ts-local">-</div><div class="result-label">Local time (this device)</div>
          <div class="result-value" id="ts-utc" style="margin-top:8px;">-</div><div class="result-label">UTC time</div>
        </div>
      </div>
      <div class="tool-section">
        <h3>Sunrise / Sunset by Location</h3>
        <div class="input-row">
          <label>City / Country</label>
          <select id="ts-city" onchange="tsSelectCity()" style="max-width:260px;">
            <option value="">- Select a city -</option>
          </select>
        </div>
        <div class="input-row"><label>Latitude</label><input type="number" id="ts-lat" value="23.6" step="0.0001"></div>
        <div class="input-row"><label>Longitude</label><input type="number" id="ts-lon" value="58.6" step="0.0001"></div>
        <button class="calc-btn" onclick="calcSun()">Calculate</button>
        <div class="result-box" id="ts-result" style="display:none;">
          <div class="result-value" id="ts-rise">-</div><div class="result-label" id="ts-rise-label">Sunrise (local time)</div>
          <div class="result-value" id="ts-set" style="margin-top:8px;">-</div><div class="result-label" id="ts-set-label">Sunset (local time)</div>
          <div style="margin-top:8px;font-size:0.78rem;color:#aaa;" id="ts-tz-info">-</div>
        </div>
      </div>`
  },

  "power-runtime": {
    title: "Power Runtime",
    sub: "Battery capacity & load calculator",
    html: `
      <div class="tool-section">
        <div class="input-row"><label>Battery (Ah)</label><input type="number" id="pr-ah" value="100"></div>
        <div class="input-row"><label>Voltage (V)</label><input type="number" id="pr-v" value="12"></div>
        <div class="input-row"><label>Load (Watts)</label><input type="number" id="pr-w" value="50"></div>
        <div class="input-row"><label>Efficiency (%)</label><input type="number" id="pr-eff" value="85"></div>
        <button class="calc-btn" onclick="calcPower()">Calculate</button>
        <div class="result-box" id="pr-result" style="display:none;">
          <div class="result-value" id="pr-out">-</div><div class="result-label" id="pr-label">-</div>
        </div>
      </div>`
  },

  "solar-sizing": {
    title: "Solar Sizing",
    sub: "Panel & battery bank sizing",
    html: `
      <div class="tool-section">
        <div class="input-row"><label>Daily usage (Wh)</label><input type="number" id="ss-wh" value="500"></div>
        <div class="input-row"><label>Sun hours/day</label><input type="number" id="ss-sun" value="5"></div>
        <div class="input-row"><label>Days autonomy</label><input type="number" id="ss-days" value="2"></div>
        <div class="input-row"><label>Battery voltage (V)</label><input type="number" id="ss-v" value="12"></div>
        <button class="calc-btn" onclick="calcSolar()">Calculate</button>
        <div class="result-box" id="ss-result" style="display:none;">
          <div class="result-value" id="ss-panel">-</div><div class="result-label">Minimum panel wattage</div>
          <div class="result-value" id="ss-bat" style="margin-top:10px;">-</div><div class="result-label">Minimum battery capacity (Ah)</div>
        </div>
      </div>`
  },

  "generator-sizing": {
    title: "Generator Sizing",
    sub: "Calculate generator requirements",
    html: `
      <div class="tool-section">
        <h3>Add Loads</h3>
        <div class="input-row"><label>Appliance</label><input type="text" id="gs-name" placeholder="e.g. Fridge"></div>
        <div class="input-row"><label>Watts</label><input type="number" id="gs-w" value="150"></div>
        <div class="input-row"><label>Hours/day</label><input type="number" id="gs-h" value="24"></div>
        <button class="calc-btn" onclick="addLoad()">Add</button>
        <div id="gs-list" style="margin-top:12px;"></div>
        <div class="result-box" id="gs-result" style="display:none;">
          <div class="result-value" id="gs-total-w">-</div><div class="result-label">Total peak watts</div>
          <div class="result-value" id="gs-total-wh" style="margin-top:8px;">-</div><div class="result-label">Total Wh/day</div>
          <div class="result-value" id="gs-rec" style="margin-top:8px;">-</div><div class="result-label">Recommended size (25% headroom)</div>
        </div>
      </div>`
  },

  "loan-calc": {
    title: "Loan / Interest",
    sub: "Simple interest & loan calculator",
    html: `
      <div class="tool-section">
        <h3>Simple Interest</h3>
        <div class="input-row"><label>Principal</label><input type="number" id="li-p" value="10000"></div>
        <div class="input-row"><label>Annual rate (%)</label><input type="number" id="li-r" value="5" step="0.1"></div>
        <div class="input-row"><label>Time (years)</label><input type="number" id="li-t" value="3" step="0.5"></div>
        <button class="calc-btn" onclick="calcLoan()">Calculate</button>
        <div class="result-box" id="li-result" style="display:none;">
          <div class="result-value" id="li-interest">-</div><div class="result-label">Total interest</div>
          <div class="result-value" id="li-total" style="margin-top:8px;">-</div><div class="result-label">Total repayment</div>
        </div>
      </div>
      <div class="tool-section">
        <h3>Monthly Payment</h3>
        <div class="input-row"><label>Loan amount</label><input type="number" id="lm-p" value="10000"></div>
        <div class="input-row"><label>Annual rate (%)</label><input type="number" id="lm-r" value="5" step="0.1"></div>
        <div class="input-row"><label>Months</label><input type="number" id="lm-n" value="36"></div>
        <button class="calc-btn" onclick="calcMonthly()">Calculate</button>
        <div class="result-box" id="lm-result" style="display:none;">
          <div class="result-value" id="lm-monthly">-</div><div class="result-label">Monthly payment</div>
          <div class="result-value" id="lm-total" style="margin-top:8px;">-</div><div class="result-label">Total repayment</div>
        </div>
      </div>`
  },

  "precious-metals": {
    title: "Precious Metals",
    sub: "Gold & silver value calculator",
    html: `
      <div class="tool-section">
        <h3>Set Spot Prices</h3>
        <p class="note" style="margin-bottom:12px;">Enter current spot prices manually - saved to this device.</p>
        <div class="input-row"><label>Gold (USD/oz)</label><input type="number" id="pm-gold" step="0.01" placeholder="e.g. 2300" oninput="savePM()"></div>
        <div class="input-row"><label>Silver (USD/oz)</label><input type="number" id="pm-silver" step="0.01" placeholder="e.g. 28" oninput="savePM()"></div>
      </div>
      <div class="tool-section">
        <h3>Calculate Value</h3>
        <div class="input-row"><label>Metal</label>
          <select id="pm-metal"><option value="gold">Gold</option><option value="silver">Silver</option></select>
        </div>
        <div class="input-row"><label>Weight</label><input type="number" id="pm-weight" value="1" step="0.001"></div>
        <div class="input-row"><label>Unit</label>
          <select id="pm-unit"><option value="oz">Troy oz</option><option value="g">Grams</option><option value="kg">Kilograms</option></select>
        </div>
        <div class="input-row"><label>Purity</label>
          <select id="pm-purity">
            <option value="1">999 / 24k (pure)</option>
            <option value="0.9167">917 / 22k</option>
            <option value="0.75">750 / 18k</option>
            <option value="0.585">585 / 14k</option>
          </select>
        </div>
        <button class="calc-btn" onclick="calcPM()">Calculate</button>
        <div class="result-box" id="pm-result" style="display:none;">
          <div class="result-value" id="pm-out">-</div><div class="result-label" id="pm-label">-</div>
          <div class="result-value" id="pm-ratio" style="margin-top:8px;">-</div><div class="result-label">Gold/Silver ratio</div>
        </div>
      </div>`
  },

  "compass": {
    title: "Compass / Bearing",
    sub: "Direction & bearing calculator",
    html: `
      <div class="tool-section">
        <h3>Bearing Between Two Points</h3>
        <div class="input-row"><label>From Latitude</label><input type="number" id="cb-lat1" value="25.0" step="0.0001"></div>
        <div class="input-row"><label>From Longitude</label><input type="number" id="cb-lon1" value="55.0" step="0.0001"></div>
        <div class="input-row"><label>To Latitude</label><input type="number" id="cb-lat2" value="24.0" step="0.0001"></div>
        <div class="input-row"><label>To Longitude</label><input type="number" id="cb-lon2" value="54.0" step="0.0001"></div>
        <button class="calc-btn" onclick="calcBearing()">Calculate</button>
        <div class="result-box" id="cb-result" style="display:none;">
          <div class="result-value" id="cb-bearing">-</div><div class="result-label">Bearing (degrees from North)</div>
          <div class="result-value" id="cb-direction" style="margin-top:8px;">-</div><div class="result-label">Cardinal direction</div>
          <div class="result-value" id="cb-distance" style="margin-top:8px;">-</div><div class="result-label">Distance (km)</div>
        </div>
      </div>`
  },

  "gps-converter": {
    title: "GPS Converter",
    sub: "Convert between DD, DMS, DDM and UTM",
    html: `
      <div class="tool-section">
        <h3>Decimal Degrees (DD)</h3>
        <div class="input-row"><label>Latitude</label><input type="number" id="gps-dd-lat" value="25.2048" step="0.000001"></div>
        <div class="input-row"><label>Longitude</label><input type="number" id="gps-dd-lon" value="55.2708" step="0.000001"></div>
        <button class="calc-btn" onclick="convertFromDD()">Convert</button>
      </div>
      <div class="tool-section">
        <h3>Degrees Minutes Seconds (DMS)</h3>
        <div class="input-row"><label>Latitude</label><input type="text" id="gps-dms-lat" placeholder="e.g. 25 12 17.28 N"></div>
        <div class="input-row"><label>Longitude</label><input type="text" id="gps-dms-lon" placeholder="e.g. 55 16 14.88 E"></div>
        <button class="calc-btn" onclick="convertFromDMS()">Convert</button>
      </div>
      <div class="tool-section">
        <h3>Results</h3>
        <div class="result-box" id="gps-result" style="display:none;">
          <div style="display:grid;gap:10px;">
            <div><div class="result-label">Decimal Degrees (DD)</div><div class="result-value" id="gps-out-dd" style="font-size:1rem;">-</div></div>
            <div><div class="result-label">Degrees Minutes Seconds (DMS)</div><div class="result-value" id="gps-out-dms" style="font-size:1rem;">-</div></div>
            <div><div class="result-label">Degrees Decimal Minutes (DDM)</div><div class="result-value" id="gps-out-ddm" style="font-size:1rem;">-</div></div>
            <div><div class="result-label">UTM</div><div class="result-value" id="gps-out-utm" style="font-size:1rem;">-</div></div>
          </div>
        </div>
      </div>
      <div class="tool-section">
        <h3>Format Reference</h3>
        <table class="reference-table">
          <thead><tr><th>Format</th><th>Example</th><th>Used By</th></tr></thead>
          <tbody>
            <tr><td>DD</td><td>25.2048, 55.2708</td><td>Google Maps, GPS devices</td></tr>
            <tr><td>DMS</td><td>25 12 17 N, 55 16 14 E</td><td>Traditional maps, aviation</td></tr>
            <tr><td>DDM</td><td>25 12.288 N, 55 16.248 E</td><td>Marine navigation, Garmin</td></tr>
            <tr><td>UTM</td><td>38N 345678 2789012</td><td>Military, surveying, hiking</td></tr>
          </tbody>
        </table>
      </div>`
  }

};

// HELPERS
function fmtNum(n) {
  if (n === null || n === undefined || isNaN(n)) return "-";
  const abs = Math.abs(n);
  if (abs >= 1e12 || (abs < 1e-6 && abs !== 0)) return n.toExponential(4);
  const fixed = parseFloat(n.toPrecision(10));
  if (Number.isInteger(fixed)) return fixed.toLocaleString();
  const parts = fixed.toString().split(".");
  parts[0] = parseInt(parts[0]).toLocaleString();
  return parts.join(".");
}

// UNIT CONVERTER
window.UC_UNITS = {
  length: { base:"meter", units:[["meter [m]",1],["kilometer [km]",1000],["decimeter [dm]",0.1],["centimeter [cm]",0.01],["millimeter [mm]",0.001],["micrometer [um]",1e-6],["nanometer [nm]",1e-9],["mile [mi]",1609.344],["yard [yd]",0.9144],["foot [ft]",0.3048],["inch [in]",0.0254],["light year [ly]",9.46073047258e15],["nautical mile",1852],["fathom",1.8288],["furlong",201.168],["chain [ch]",20.1168],["rod [rd]",5.0292],["league",4828.032],["astronomical unit [AU]",149597870691],["parsec [pc]",3.08567758128e16]] },
  area: { base:"square meter", units:[["square meter [m2]",1],["square kilometer [km2]",1e6],["square centimeter [cm2]",1e-4],["square millimeter [mm2]",1e-6],["hectare [ha]",10000],["acre [ac]",4046.8564224],["square mile [mi2]",2589988.110336],["square yard [yd2]",0.83612736],["square foot [ft2]",0.09290304],["square inch [in2]",0.00064516],["square decimeter [dm2]",0.01],["are [a]",100],["square rod",25.29285264],["rood",1011.7141056],["homestead",647497.027584]] },
  weight: { base:"kilogram", units:[["kilogram [kg]",1],["gram [g]",0.001],["milligram [mg]",1e-6],["microgram [ug]",1e-9],["metric ton [t]",1000],["pound [lbs]",0.45359237],["ounce [oz]",0.0283495231],["carat [ct]",0.0002],["ton (short) [US]",907.18474],["ton (long) [UK]",1016.0469088],["stone (UK)",6.35029318],["hundredweight (US)",45.359237],["grain [gr]",6.47989e-5],["pennyweight [pwt]",0.0015551738],["tonne",1000],["slug",14.5939029372],["atomic mass unit [u]",1.6605402e-27]] },
  volume: { base:"cubic meter", units:[["cubic meter [m3]",1],["cubic kilometer [km3]",1e9],["cubic centimeter [cm3]",1e-6],["cubic millimeter [mm3]",1e-9],["liter [L]",0.001],["milliliter [mL]",1e-6],["gallon (US) [gal]",0.0037854118],["quart (US) [qt]",0.0009463529],["pint (US) [pt]",0.0004731765],["cup (US)",0.0002365882],["fluid ounce (US) [fl oz]",2.95735e-5],["tablespoon (US)",1.47868e-5],["teaspoon (US)",4.92892e-6],["gallon (UK)",0.00454609],["quart (UK)",0.0011365225],["pint (UK)",0.0005682613],["fluid ounce (UK)",2.84131e-5],["cubic yard [yd3]",0.764554858],["cubic foot [ft3]",0.0283168466],["cubic inch [in3]",1.63871e-5],["barrel (oil) [bbl]",0.1589872949],["cup (metric)",0.00025],["deciliter [dL]",0.0001],["kiloliter [kL]",1],["hectoliter [hL]",0.1],["microliter [uL]",1e-9],["drop",5e-8],["gill (US)",0.0001182941],["hogshead",0.2384809424],["acre-foot",1233.4818375475]] },
  temperature: { base:"special", units:[["Celsius [C]","c"],["Fahrenheit [F]","f"],["Kelvin [K]","k"],["Rankine [R]","r"],["Reaumur [Re]","re"]] },
  time: { base:"second", units:[["second [s]",1],["millisecond [ms]",0.001],["microsecond [us]",1e-6],["nanosecond [ns]",1e-9],["picosecond [ps]",1e-12],["femtosecond [fs]",1e-15],["minute [min]",60],["hour [h]",3600],["day [d]",86400],["week",604800],["fortnight",1209600],["month",2628000],["year [y]",31557600],["decade",315576000],["century",3155760000],["millennium",31557600000],["year (Julian)",31557600],["year (leap)",31622400],["year (tropical)",31556930]] },
  speed: { base:"meter/second", units:[["meter/second [m/s]",1],["kilometer/hour [km/h]",0.2777777778],["mile/hour [mph]",0.44704],["foot/second [ft/s]",0.3048],["foot/minute [ft/min]",0.00508],["knot [kn]",0.5144444444],["knot (UK)",0.5147733333],["kilometer/second [km/s]",1000],["kilometer/minute [km/min]",16.6666666667],["mile/minute [mi/min]",26.8224],["centimeter/second [cm/s]",0.01],["millimeter/second [mm/s]",0.001],["yard/second [yd/s]",0.9144],["Mach (20C)",343.6],["Mach (SI)",295.0464]] },
  power: { base:"watt", units:[["watt [W]",1],["kilowatt [kW]",1000],["megawatt [MW]",1e6],["gigawatt [GW]",1e9],["milliwatt [mW]",0.001],["microwatt [uW]",1e-6],["horsepower [hp]",745.6998715823],["horsepower (metric)",735.49875],["horsepower (electric)",746],["Btu/hour [Btu/h]",0.2930710702],["Btu/minute",17.5842642103],["Btu/second",1055.05585262],["kilocalorie/hour [kcal/h]",1.163],["kilocalorie/second",4186.8],["calorie/second [cal/s]",4.1868],["ton (refrigeration)",3516.8528420667],["kilovolt ampere [kVA]",1000],["volt ampere [VA]",1],["joule/second [J/s]",1],["foot pound-force/second",1.3558179483]] },
  pressure: { base:"pascal", units:[["pascal [Pa]",1],["kilopascal [kPa]",1000],["megapascal [MPa]",1e6],["bar",100000],["millibar [mbar]",100],["psi",6894.7572931783],["ksi",6894757.2931783],["atmosphere (standard) [atm]",101325],["atmosphere (technical) [at]",98066.5],["torr [Torr]",133.3223684211],["millimeter mercury [mmHg]",133.322],["inch mercury [inHg]",3386.38],["millimeter water (4C)",9.80638],["inch water (4C) [inAq]",249.082],["foot water (4C) [ftAq]",2988.98],["newton/square meter",1],["newton/square centimeter",10000],["kilonewton/square meter",1000],["kilogram-force/sq. meter",9.80665],["kilogram-force/sq. cm",98066.5],["pound-force/sq. foot",47.8802589804],["pound-force/sq. inch",6894.7572931783]] },
  energy: { base:"joule", units:[["joule [J]",1],["kilojoule [kJ]",1000],["megajoule [MJ]",1e6],["gigajoule [GJ]",1e9],["millijoule [mJ]",0.001],["microjoule [uJ]",1e-6],["watt-hour [Wh]",3600],["kilowatt-hour [kWh]",3600000],["megawatt-hour [MWh]",3600000000],["calorie (nutritional) [Cal]",4186.8],["calorie (IT) [cal]",4.1868],["kilocalorie (IT) [kcal]",4186.8],["Btu (IT) [Btu]",1055.05585262],["horsepower hour [hp h]",2684519.5368856],["foot-pound [ft lbf]",1.3558179483],["erg",1e-7],["electron-volt [eV]",1.6021766339999e-19],["newton meter [N m]",1],["therm (US)",105480400],["ton (explosives)",4184000000]] },
  angle: { base:"degree", units:[["degree",1],["radian [rad]",57.2957795131],["grad",0.9],["minute",0.0166666667],["second",0.0002777778],["gon",0.9],["mil",0.05625],["revolution [r]",360],["quadrant",90],["right angle",90],["sextant",60],["sign",30]] },
  fuel: { base:"meter/liter", units:[["meter/liter [m/L]",1],["kilometer/liter [km/L]",1000],["mile (US)/liter [mi/L]",1609.344],["mile/gallon (US) [mpg]",425.1437075],["mile/gallon (UK)",354.00619],["kilometer/gallon (US)",264.1720524],["liter/100 km [L/100km]","special_l100km"],["nautical mile/liter",1853.24496],["nautical mile/gallon (US)",489.5755247]] }
};

function ucPopulate(cat) {
  const data = UC_UNITS[cat];
  const from = document.getElementById("uc-from");
  const to = document.getElementById("uc-to");
  if (!from || !to) return;
  from.innerHTML = ""; to.innerHTML = "";
  data.units.forEach((u, i) => {
    const o1 = document.createElement("option"); o1.value = i; o1.textContent = u[0]; from.appendChild(o1);
    const o2 = document.createElement("option"); o2.value = i; o2.textContent = u[0]; to.appendChild(o2);
  });
  to.selectedIndex = 1; ucCalc();
}
function ucChangeCategory() { ucPopulate(document.getElementById("uc-cat").value); }
function ucCalc() {
  const cat = document.getElementById("uc-cat")?.value;
  const val = parseFloat(document.getElementById("uc-value")?.value);
  const fi = parseInt(document.getElementById("uc-from")?.value);
  const ti = parseInt(document.getElementById("uc-to")?.value);
  if (!cat || isNaN(val) || isNaN(fi) || isNaN(ti)) return;
  const data = UC_UNITS[cat];
  const fromUnit = data.units[fi], toUnit = data.units[ti];
  let result;
  if (cat === "temperature") {
    const f = fromUnit[1], t = toUnit[1];
    let c;
    if (f==="c") c=val; else if (f==="f") c=(val-32)*5/9; else if (f==="k") c=val-273.15; else if (f==="r") c=(val-491.67)*5/9; else if (f==="re") c=val*5/4;
    if (t==="c") result=c; else if (t==="f") result=c*9/5+32; else if (t==="k") result=c+273.15; else if (t==="r") result=(c+273.15)*9/5; else if (t==="re") result=c*4/5;
  } else if (cat === "fuel") {
    const fv=fromUnit[1], tv=toUnit[1];
    if (fv==="special_l100km"&&tv==="special_l100km") result=val;
    else if (fv==="special_l100km") result=100000/val/tv;
    else if (tv==="special_l100km") result=100000/(val*fv);
    else result=(val*fv)/tv;
  } else { result = (val * fromUnit[1]) / toUnit[1]; }
  document.getElementById("uc-out").textContent = fmtNum(result);
  document.getElementById("uc-label").textContent = fromUnit[0] + " to " + toUnit[0];
}
function ucInit() { setTimeout(() => ucPopulate("length"), 100); }

// CURRENCY
const CC_DEFAULT_RATES = {
  date: "2025-01-01",
  rates: {
    "USD [United States Dollar]":1,"EUR [Euro]":0.9185,"GBP [British Pound]":0.7874,
    "JPY [Japanese Yen]":149.50,"AED [UAE Dirham]":3.6725,"SAR [Saudi Riyal]":3.7500,
    "QAR [Qatari Riyal]":3.6400,"KWD [Kuwaiti Dinar]":0.3076,"BHD [Bahraini Dinar]":0.3760,
    "OMR [Omani Rial]":0.3850,"EGP [Egyptian Pound]":30.90,"JOD [Jordanian Dinar]":0.7090,
    "LBP [Lebanese Pound]":89500,"IQD [Iraqi Dinar]":1310,"INR [Indian Rupee]":83.12,
    "PKR [Pakistani Rupee]":278.5,"BDT [Bangladeshi Taka]":110.0,"LKR [Sri Lankan Rupee]":305.0,
    "NPR [Nepalese Rupee]":133.0,"CHF [Swiss Franc]":0.8956,"SEK [Swedish Krona]":10.42,
    "NOK [Norwegian Krone]":10.56,"DKK [Danish Krone]":6.886,"CAD [Canadian Dollar]":1.3415,
    "AUD [Australian Dollar]":1.5290,"NZD [New Zealand Dollar]":1.6380,"MXN [Mexican Peso]":17.15,
    "BRL [Brazilian Real]":4.975,"ARS [Argentine Peso]":820.0,"CLP [Chilean Peso]":870.0,
    "CNY [Chinese Yuan]":7.240,"HKD [Hong Kong Dollar]":7.824,"SGD [Singapore Dollar]":1.340,
    "MYR [Malaysian Ringgit]":4.720,"THB [Thai Baht]":35.10,"IDR [Indonesian Rupiah]":15650,
    "PHP [Philippine Peso]":56.50,"VND [Vietnamese Dong]":24350,"KRW [South Korean Won]":1325,
    "TRY [Turkish Lira]":30.50,"ZAR [South African Rand]":18.85,"NGN [Nigerian Naira]":780.0,
    "KES [Kenyan Shilling]":155.0,"GHS [Ghanaian Cedi]":12.50,"MAD [Moroccan Dirham]":10.05,
    "TND [Tunisian Dinar]":3.115,"DZD [Algerian Dinar]":134.5,"RUB [Russian Ruble]":89.50,
    "UAH [Ukrainian Hryvnia]":36.90,"PLN [Polish Zloty]":4.025,"CZK [Czech Koruna]":22.80,
    "HUF [Hungarian Forint]":353.0,"RON [Romanian Leu]":4.570
  }
};

function ccGetRates() {
  const saved = localStorage.getItem("xprep-cc-rates");
  if (saved) { try { return JSON.parse(saved); } catch(e) {} }
  return CC_DEFAULT_RATES;
}
function ccPopulate() {
  const data = ccGetRates();
  const from = document.getElementById("cc-from");
  const to = document.getElementById("cc-to");
  if (!from || !to) return;
  const currencies = Object.keys(data.rates);
  from.innerHTML = ""; to.innerHTML = "";
  currencies.forEach(c => {
    const o1 = document.createElement("option"); o1.value = c; o1.textContent = c; from.appendChild(o1);
    const o2 = document.createElement("option"); o2.value = c; o2.textContent = c; to.appendChild(o2);
  });
  from.value = "USD [United States Dollar]";
  to.value = "AED [UAE Dirham]";
  const dateEl = document.getElementById("cc-rate-date");
  if (dateEl) dateEl.textContent = "Rates as of: " + (data.date || "built-in");
  calcCurrency();
}
function calcCurrency() {
  const data = ccGetRates();
  const amount = parseFloat(document.getElementById("cc-amount")?.value) || 0;
  const from = document.getElementById("cc-from")?.value;
  const to = document.getElementById("cc-to")?.value;
  if (!from || !to) return;
  const fromRate = data.rates[from];
  const toRate = data.rates[to];
  if (!fromRate || !toRate) return;
  const result = (amount / fromRate) * toRate;
  const el = document.getElementById("cc-result");
  const lab = document.getElementById("cc-label");
  if (el) el.textContent = fmtNum(result);
  if (lab) lab.textContent = from.split(" [")[0] + " to " + to.split(" [")[0];
}
async function updateRates() {
  const btn = document.querySelector(".calc-btn[onclick='updateRates()']");
  if (btn) btn.textContent = "Updating...";
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await res.json();
    if (data.result !== "success") throw new Error("API error");
    const today = new Date().toISOString().split("T")[0];
    const saved = { date: today, rates: {} };
    const existing = CC_DEFAULT_RATES.rates;
    Object.keys(existing).forEach(key => {
      const code = key.split(" [")[0];
      if (data.rates[code]) saved.rates[key] = data.rates[code];
      else saved.rates[key] = existing[key];
    });
    localStorage.setItem("xprep-cc-rates", JSON.stringify(saved));
    const dateEl = document.getElementById("cc-rate-date");
    if (dateEl) dateEl.textContent = "Rates as of: " + today + " updated";
    if (btn) btn.textContent = "Update Rates";
    ccPopulate();
  } catch(e) {
    const dateEl = document.getElementById("cc-rate-date");
    if (dateEl) dateEl.textContent = "Update failed - using saved rates";
    if (btn) btn.textContent = "Update Rates";
  }
}
setTimeout(ccPopulate, 100);

// NUMBER BASE
function calcBase() {
  const fromBase = parseInt(document.getElementById("nb-from").value);
  const val = document.getElementById("nb-value").value.trim();
  if (!val) return;
  try {
    const dec = parseInt(val, fromBase);
    if (isNaN(dec)) { ["nb-dec","nb-bin","nb-hex","nb-oct"].forEach(id => document.getElementById(id).textContent="Invalid"); return; }
    document.getElementById("nb-dec").textContent = dec.toLocaleString();
    document.getElementById("nb-bin").textContent = dec.toString(2);
    document.getElementById("nb-hex").textContent = dec.toString(16).toUpperCase();
    document.getElementById("nb-oct").textContent = dec.toString(8);
  } catch(e) { document.getElementById("nb-dec").textContent = "Error"; }
}

// DATE DIFFERENCE
function calcDateDiff() {
  const s = document.getElementById("dd-start").value;
  const e = document.getElementById("dd-end").value;
  if (!s||!e) return;
  const diff = Math.round((new Date(e)-new Date(s))/(1000*60*60*24));
  const abs = Math.abs(diff);
  document.getElementById("dd-days").textContent = abs.toLocaleString()+(diff<0?" (past)":" (future)");
  document.getElementById("dd-weeks").textContent = Math.floor(abs/7).toLocaleString()+"w "+(abs%7)+"d";
  document.getElementById("dd-months").textContent = (abs/30.4375).toFixed(1)+" months";
  document.getElementById("dd-result").style.display = "block";
}
function calcDateAdd() {
  const s = document.getElementById("da-start").value;
  const days = parseInt(document.getElementById("da-days").value);
  const op = document.getElementById("da-op").value;
  if (!s||isNaN(days)) return;
  const date = new Date(s);
  date.setDate(date.getDate()+(op==="add"?days:-days));
  document.getElementById("da-out").textContent = date.toISOString().split("T")[0];
  document.getElementById("da-label").textContent = date.toLocaleDateString("en-US",{weekday:"long"});
  document.getElementById("da-result").style.display = "block";
}
setTimeout(() => {
  const today = new Date().toISOString().split("T")[0];
  ["dd-start","dd-end","da-start"].forEach(id => { const el=document.getElementById(id); if(el) el.value=today; });
}, 100);

// TIME / SUN
const TS_CITIES = [
  ["Abu Dhabi, UAE",24.4539,54.3773,4],["Dubai, UAE",25.2048,55.2708,4],
  ["Sharjah, UAE",25.3460,55.4209,4],["Muscat, Oman",23.6100,58.5930,4],
  ["Doha, Qatar",25.2854,51.5310,3],["Riyadh, Saudi Arabia",24.6877,46.7219,3],
  ["Jeddah, Saudi Arabia",21.5433,39.1728,3],["Kuwait City, Kuwait",29.3759,47.9774,3],
  ["Manama, Bahrain",26.2154,50.5832,3],["Amman, Jordan",31.9454,35.9284,3],
  ["Beirut, Lebanon",33.8938,35.5018,3],["Cairo, Egypt",30.0444,31.2357,2],
  ["Nairobi, Kenya",-1.2921,36.8219,3],["Lagos, Nigeria",6.5244,3.3792,1],
  ["Johannesburg, South Africa",-26.2041,28.0473,2],["Casablanca, Morocco",33.5731,-7.5898,1],
  ["Karachi, Pakistan",24.8607,67.0011,5],["Mumbai, India",19.0760,72.8777,5.5],
  ["New Delhi, India",28.6139,77.2090,5.5],["Colombo, Sri Lanka",6.9271,79.8612,5.5],
  ["Dhaka, Bangladesh",23.8103,90.4125,6],["Kuala Lumpur, Malaysia",3.1390,101.6869,8],
  ["Singapore",1.3521,103.8198,8],["Bangkok, Thailand",13.7563,100.5018,7],
  ["Jakarta, Indonesia",-6.2088,106.8456,7],["Manila, Philippines",14.5995,120.9842,8],
  ["Beijing, China",39.9042,116.4074,8],["Shanghai, China",31.2304,121.4737,8],
  ["Hong Kong",22.3193,114.1694,8],["Tokyo, Japan",35.6762,139.6503,9],
  ["Seoul, South Korea",37.5665,126.9780,9],["Sydney, Australia",-33.8688,151.2093,10],
  ["Auckland, New Zealand",-36.8485,174.7633,12],["London, UK",51.5074,-0.1278,0],
  ["Paris, France",48.8566,2.3522,1],["Berlin, Germany",52.5200,13.4050,1],
  ["Madrid, Spain",40.4168,-3.7038,1],["Rome, Italy",41.9028,12.4964,1],
  ["Istanbul, Turkey",41.0082,28.9784,3],["Moscow, Russia",55.7558,37.6173,3],
  ["New York, USA",40.7128,-74.0060,-5],["Los Angeles, USA",34.0522,-118.2437,-8],
  ["Chicago, USA",41.8781,-87.6298,-6],["Toronto, Canada",43.6510,-79.3470,-5],
  ["Mexico City, Mexico",19.4326,-99.1332,-6],["Sao Paulo, Brazil",-23.5505,-46.6333,-3],
  ["Buenos Aires, Argentina",-34.6037,-58.3816,-3],["Lima, Peru",-12.0464,-77.0428,-5]
];

function tsPopulateCities() {
  const sel = document.getElementById("ts-city");
  if (!sel) return;
  TS_CITIES.forEach((c, i) => {
    const o = document.createElement("option");
    o.value = i; o.textContent = c[0]; sel.appendChild(o);
  });
}
setTimeout(tsPopulateCities, 100);

function tsSelectCity() {
  const sel = document.getElementById("ts-city");
  const idx = parseInt(sel.value);
  if (isNaN(idx)) return;
  const city = TS_CITIES[idx];
  document.getElementById("ts-lat").value = city[1];
  document.getElementById("ts-lon").value = city[2];
  calcSun();
}

function calcSun() {
  const lat = parseFloat(document.getElementById("ts-lat").value);
  const lon = parseFloat(document.getElementById("ts-lon").value);
  if (isNaN(lat)||isNaN(lon)) return;
  const sel = document.getElementById("ts-city");
  const idx = parseInt(sel?.value);
  let tzOffset = Math.round(lon/15);
  if (!isNaN(idx) && TS_CITIES[idx]) tzOffset = TS_CITIES[idx][3];
  const now = new Date();
  const day = Math.floor((now-new Date(now.getFullYear(),0,0))/(1000*60*60*24));
  const B = (360/365)*(day-81)*Math.PI/180;
  const EoT = 9.87*Math.sin(2*B)-7.53*Math.cos(B)-1.5*Math.sin(B);
  const TC = 4*lon+EoT;
  const latR = lat*Math.PI/180;
  const decl = 23.45*Math.sin((360/365)*(day-81)*Math.PI/180)*Math.PI/180;
  const cosHA = -Math.tan(latR)*Math.tan(decl);
  if (cosHA<-1||cosHA>1) {
    document.getElementById("ts-rise").textContent = cosHA<-1?"Midnight sun":"Polar night";
    document.getElementById("ts-set").textContent = "-";
    document.getElementById("ts-result").style.display="block"; return;
  }
  const HA = Math.acos(cosHA)*180/Math.PI;
  const riseLocal = (720-4*HA-TC)/60+tzOffset;
  const setLocal = (720+4*HA-TC)/60+tzOffset;
  const fmt = h => {
    let hh = Math.floor(((h%24)+24)%24);
    const mm = Math.round(((h%1)+1)%1*60);
    const ampm = hh>=12?"PM":"AM";
    hh = hh%12||12;
    return hh+":"+String(mm).padStart(2,"0")+" "+ampm;
  };
  document.getElementById("ts-rise").textContent = fmt(riseLocal);
  document.getElementById("ts-set").textContent = fmt(setLocal);
  document.getElementById("ts-rise-label").textContent = "Sunrise (UTC"+(tzOffset>=0?"+":"")+tzOffset+")";
  document.getElementById("ts-set-label").textContent = "Sunset (UTC"+(tzOffset>=0?"+":"")+tzOffset+")";
  document.getElementById("ts-tz-info").textContent = "Location: "+lat.toFixed(4)+"°, "+lon.toFixed(4)+"° | UTC offset: "+(tzOffset>=0?"+":"")+tzOffset;
  document.getElementById("ts-result").style.display="block";
}

function updateClock() {
  const now = new Date();
  const el1 = document.getElementById("ts-local");
  const el2 = document.getElementById("ts-utc");
  if(el1) el1.textContent = now.toLocaleTimeString();
  if(el2) el2.textContent = now.toUTCString().split(" ")[4]+" UTC";
}
setInterval(updateClock, 1000);

// POWER / SOLAR / GENERATOR
function calcPower() {
  const ah=parseFloat(document.getElementById("pr-ah").value);
  const v=parseFloat(document.getElementById("pr-v").value);
  const w=parseFloat(document.getElementById("pr-w").value);
  const eff=parseFloat(document.getElementById("pr-eff").value)/100;
  const wh=ah*v*eff;
  document.getElementById("pr-out").textContent=fmtNum(wh/w)+" hours";
  document.getElementById("pr-label").textContent=fmtNum(wh)+" Wh usable at "+fmtNum(w)+"W load";
  document.getElementById("pr-result").style.display="block";
}
function calcSolar() {
  const wh=parseFloat(document.getElementById("ss-wh").value);
  const sun=parseFloat(document.getElementById("ss-sun").value);
  const days=parseFloat(document.getElementById("ss-days").value);
  const v=parseFloat(document.getElementById("ss-v").value);
  document.getElementById("ss-panel").textContent=fmtNum(Math.ceil((wh/sun)*1.25))+" W";
  document.getElementById("ss-bat").textContent=fmtNum(Math.ceil((wh*days)/(v*0.5)))+" Ah";
  document.getElementById("ss-result").style.display="block";
}
let gsLoads = [];
function addLoad() {
  const name=document.getElementById("gs-name").value||"Appliance";
  const w=parseFloat(document.getElementById("gs-w").value)||0;
  const h=parseFloat(document.getElementById("gs-h").value)||0;
  gsLoads.push({name,w,h});
  document.getElementById("gs-name").value="";
  renderLoads();
}
function removeLoad(i) { gsLoads.splice(i,1); renderLoads(); }
function renderLoads() {
  const list=document.getElementById("gs-list");
  if (!gsLoads.length) { list.innerHTML=""; document.getElementById("gs-result").style.display="none"; return; }
  const totalW=gsLoads.reduce((s,l)=>s+l.w,0);
  const totalWh=gsLoads.reduce((s,l)=>s+(l.w*l.h),0);
  list.innerHTML=gsLoads.map((l,i)=>'<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #eee;font-size:0.82rem;"><span>'+l.name+' - '+fmtNum(l.w)+'W x '+l.h+'h</span><span style="cursor:pointer;color:#aaa;" onclick="removeLoad('+i+')">x</span></div>').join("");
  document.getElementById("gs-total-w").textContent=fmtNum(totalW)+" W";
  document.getElementById("gs-total-wh").textContent=fmtNum(totalWh)+" Wh/day";
  document.getElementById("gs-rec").textContent=fmtNum(Math.ceil(totalW*1.25))+" W";
  document.getElementById("gs-result").style.display="block";
}

// LOAN
function calcLoan() {
  const p=parseFloat(document.getElementById("li-p").value);
  const r=parseFloat(document.getElementById("li-r").value)/100;
  const t=parseFloat(document.getElementById("li-t").value);
  document.getElementById("li-interest").textContent=fmtNum(p*r*t);
  document.getElementById("li-total").textContent=fmtNum(p+p*r*t);
  document.getElementById("li-result").style.display="block";
}
function calcMonthly() {
  const p=parseFloat(document.getElementById("lm-p").value);
  const r=parseFloat(document.getElementById("lm-r").value)/100/12;
  const n=parseInt(document.getElementById("lm-n").value);
  const m=r?p*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):p/n;
  document.getElementById("lm-monthly").textContent=fmtNum(m);
  document.getElementById("lm-total").textContent=fmtNum(m*n);
  document.getElementById("lm-result").style.display="block";
}

// PRECIOUS METALS
function loadPM() {
  const pm=JSON.parse(localStorage.getItem("xprep-pm")||"{}");
  const g=document.getElementById("pm-gold"); if(g&&pm.gold) g.value=pm.gold;
  const s=document.getElementById("pm-silver"); if(s&&pm.silver) s.value=pm.silver;
}
function savePM() {
  localStorage.setItem("xprep-pm",JSON.stringify({gold:document.getElementById("pm-gold")?.value,silver:document.getElementById("pm-silver")?.value}));
}
function calcPM() {
  const pm=JSON.parse(localStorage.getItem("xprep-pm")||"{}");
  const goldPrice=parseFloat(pm.gold)||0;
  const silverPrice=parseFloat(pm.silver)||0;
  const metal=document.getElementById("pm-metal").value;
  const weight=parseFloat(document.getElementById("pm-weight").value)||0;
  const unit=document.getElementById("pm-unit").value;
  const purity=parseFloat(document.getElementById("pm-purity").value);
  const spotPrice=metal==="gold"?goldPrice:silverPrice;
  let ozWeight=unit==="oz"?weight:unit==="g"?weight/31.1035:weight*32.1507;
  document.getElementById("pm-out").textContent="$"+fmtNum(ozWeight*purity*spotPrice);
  document.getElementById("pm-label").textContent=fmtNum(ozWeight*purity)+" troy oz of "+metal;
  if(goldPrice&&silverPrice) document.getElementById("pm-ratio").textContent=fmtNum(goldPrice/silverPrice)+":1";
  document.getElementById("pm-result").style.display="block";
}
setTimeout(loadPM, 100);

// COMPASS
function calcBearing() {
  const lat1=parseFloat(document.getElementById("cb-lat1").value)*Math.PI/180;
  const lon1=parseFloat(document.getElementById("cb-lon1").value)*Math.PI/180;
  const lat2=parseFloat(document.getElementById("cb-lat2").value)*Math.PI/180;
  const lon2=parseFloat(document.getElementById("cb-lon2").value)*Math.PI/180;
  const dLon=lon2-lon1;
  const y=Math.sin(dLon)*Math.cos(lat2);
  const x=Math.cos(lat1)*Math.sin(lat2)-Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
  const bearing=((Math.atan2(y,x)*180/Math.PI)+360)%360;
  const dirs=["N","NE","E","SE","S","SW","W","NW","N"];
  const dLat=lat2-lat1;
  const a=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLon/2)*Math.sin(dLon/2);
  const dist=6371*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
  document.getElementById("cb-bearing").textContent=fmtNum(bearing)+" degrees";
  document.getElementById("cb-direction").textContent=dirs[Math.round(bearing/45)];
  document.getElementById("cb-distance").textContent=fmtNum(dist)+" km";
  document.getElementById("cb-result").style.display="block";
}

// GPS CONVERTER
function ddToDMS(dd, isLat) {
  const dir = dd >= 0 ? (isLat ? "N" : "E") : (isLat ? "S" : "W");
  const abs = Math.abs(dd);
  const deg = Math.floor(abs);
  const minFull = (abs - deg) * 60;
  const min = Math.floor(minFull);
  const sec = ((minFull - min) * 60).toFixed(2);
  return deg + "deg " + min + "' " + sec + '" ' + dir;
}
function ddToDDM(dd, isLat) {
  const dir = dd >= 0 ? (isLat ? "N" : "E") : (isLat ? "S" : "W");
  const abs = Math.abs(dd);
  const deg = Math.floor(abs);
  const min = ((abs - deg) * 60).toFixed(4);
  return deg + "deg " + min + "' " + dir;
}
function ddToUTM(lat, lon) {
  const a = 6378137.0, f = 1/298.257223563;
  const b = a*(1-f), e2 = (a*a-b*b)/(a*a), e2p = e2/(1-e2), k0 = 0.9996;
  const latR = lat*Math.PI/180;
  const zone = Math.floor((lon+180)/6)+1;
  const lonOriginR = ((zone-1)*6-180+3)*Math.PI/180;
  const N = a/Math.sqrt(1-e2*Math.sin(latR)*Math.sin(latR));
  const T = Math.tan(latR)*Math.tan(latR);
  const C = e2p*Math.cos(latR)*Math.cos(latR);
  const A = Math.cos(latR)*(lon*Math.PI/180-lonOriginR);
  const M = a*((1-e2/4-3*e2*e2/64-5*e2*e2*e2/256)*latR
    -(3*e2/8+3*e2*e2/32+45*e2*e2*e2/1024)*Math.sin(2*latR)
    +(15*e2*e2/256+45*e2*e2*e2/1024)*Math.sin(4*latR)
    -(35*e2*e2*e2/3072)*Math.sin(6*latR));
  const easting = k0*N*(A+(1-T+C)*A*A*A/6+(5-18*T+T*T+72*C-58*e2p)*A*A*A*A*A/120)+500000;
  const northing = k0*(M+N*Math.tan(latR)*(A*A/2+(5-T+9*C+4*C*C)*A*A*A*A/24+(61-58*T+T*T+600*C-330*e2p)*A*A*A*A*A*A/720));
  return zone+(lat<0?"S":"N")+" "+Math.round(easting)+" "+Math.round(lat<0?northing+10000000:northing);
}
function displayGPSResults(lat, lon) {
  document.getElementById("gps-out-dd").textContent = lat.toFixed(6)+", "+lon.toFixed(6);
  document.getElementById("gps-out-dms").textContent = ddToDMS(lat,true)+"  "+ddToDMS(lon,false);
  document.getElementById("gps-out-ddm").textContent = ddToDDM(lat,true)+"  "+ddToDDM(lon,false);
  document.getElementById("gps-out-utm").textContent = ddToUTM(lat,lon);
  document.getElementById("gps-result").style.display="block";
  document.getElementById("gps-dd-lat").value = lat.toFixed(6);
  document.getElementById("gps-dd-lon").value = lon.toFixed(6);
}
function convertFromDD() {
  const lat = parseFloat(document.getElementById("gps-dd-lat").value);
  const lon = parseFloat(document.getElementById("gps-dd-lon").value);
  if (isNaN(lat)||isNaN(lon)||lat<-90||lat>90||lon<-180||lon>180) {
    document.getElementById("gps-out-dd").textContent="Invalid coordinates";
    document.getElementById("gps-result").style.display="block"; return;
  }
  displayGPSResults(lat,lon);
}
function convertFromDMS() {
  function parseDMS(str) {
    str = str.trim().toUpperCase();
    const neg = str.includes("S")||str.includes("W");
    const nums = str.replace(/[NSEW]/g," ").replace(/[^0-9. ]/g," ").trim().split(" ").filter(Boolean).map(Number);
    if (!nums.length) return NaN;
    const dd = (nums[0]||0)+(nums[1]||0)/60+(nums[2]||0)/3600;
    return neg ? -dd : dd;
  }
  const lat = parseDMS(document.getElementById("gps-dms-lat").value);
  const lon = parseDMS(document.getElementById("gps-dms-lon").value);
  if (isNaN(lat)||isNaN(lon)) {
    document.getElementById("gps-out-dd").textContent="Could not parse - check format";
    document.getElementById("gps-result").style.display="block"; return;
  }
  displayGPSResults(lat,lon);
}
