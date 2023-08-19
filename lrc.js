const rateCalc = {
  debug: true,

  init: () => {
    rateCalc.createElements();
    rateCalc.updateResult();
  },

  createElements: () => {
    // add stylesheet
    document.head.appendChild(document.createElement("style")).innerHTML= rateCalc.css();

    // add html
    const container = document.querySelector( 'div#rate-calculator-tool' );
    if ( ! container ) {
      console.error( 'rateCalc: div#rate-calculator-tool not found!' );
      return;
    }
    container.innerHTML = rateCalc.html();
    rateCalc.addCategoryData();

    // add event listeners
    const updaters = document.querySelectorAll(".update");
    updaters.forEach( element => {
      element.addEventListener("change", (event) => {
        rateCalc.updateResult();
      });
    });
  },

  html: () => {return `
    <div class="calcbox update"><form>
      <div class="banner">
        <h1>Licensing Rate Calculator</h1>
      </div>

      <div class="item">
        <p>Licensing Category</p>
        <select name='category' id="category">
          <!-- see rateCalc.addCategoryData() -->
        </select>
      </div>

      <div class="question">
        <p>Exclusivity</p>
        <div class="question-answer">
          <input type="radio" value="exclusive" id="exclusive" name="exclusivity" checked/>
          <label for="exclusive" class="radio"><span>Exclusive</span></label>
          <input type="radio" value="nonexclusive" id="nonexclusive" name="exclusivity" />
          <label for="nonexclusive" class="radio"><span>Non exclusive</span></label>
        </div>
      </div>

      <div class="question">
        <p>Payment Schedule</p>
        <div class="question-answer">
          <input type="radio" value="royalty" id="royalty" name="schedule" checked/>
          <label for="royalty" class="radio"><span>Royalty</span></label>
          <input type="radio" value="flatfee" id="flatfee" name="schedule" />
          <label for="flatfee" class="radio"><span>Flat fee</span></label>
        </div>
      </div>

      <div class="question">
        <p>Difficulty of the work</p>
        <div class="question-answer">
          <input type="radio" value="1" id="simple" name="difficulty" checked/>
          <label for="simple" class="radio"><span>Simple</span></label>
          <input type="radio" value="2" id="moderate" name="difficulty" />
          <label for="moderate" class="radio"><span>Moderate</span></label>
          <input type="radio" value="3" id="complex" name="difficulty" />
          <label for="complex" class="radio"><span>Complex</span></label>
        </div>
      </div>

      <div class="item">
        <p class='disabled-for-royalty'>Duration of Contract</p>
        <select name="duration" id="duration">
          <option value="1" id="oneyear" selected>1 Year</option>
          <option value="2">2 Years</option>
          <option value="3">3 Years</option>
          <option value="4">4 Years</option>
          <option value="5">5 Years</option>
        </select>
        <p class="oneTimeNote">Licenses are typically perpetual for contracts in this category.</p>
      </div>

      <div class="question">
        <p>Territory</p>
        <div class="question-answer">
          <input type="checkbox" value="usa" id="usa" name="territory" checked/>
          <label for="usa" class="checkbox"><span>USA</span></label>
          <input type="checkbox" value="canada" id="canada" name="territory" />
          <label for="canada" class="checkbox"><span>Canada</span></label>
          <input type="checkbox" value="europe" id="europe" name="territory" />
          <label for="europe" class="checkbox"><span>Europe</span></label>
          <input type="checkbox" value="world" id="world" name="territory"/>
          <label for="world" class="checkbox"><span>Rest of the World</span></label>
        </div>
      </div>

      <div class="item">
        <p>Brand Visibility and Reputation</p>
        <select name="brand">
          <option value="1" selected>1 - No brand recognition</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5 - Household name</option>
        </select>
      </div>

      <div class="item">
        <p>Experience of Artist</p>
        <select name="skill">
          <option value="1" selected>Beginner</option>
          <option value="2">Novice</option>
          <option value="3">Intermediate</option>
          <option value="4">Advanced</option>
          <option value="5">Expert</option>
        </select>
      </div>

      <div class="btn-block">
        <!-- <button id="calculate" type="button">Update</button> -->
        <h2>Estimate:</h2>
        <p id="result">$$$</p>
      </div>

      <div class='notes'>
        <p>Note that these numbers do not represent specific job fees. The artist is free to
        independently price their work, and both artist and licensee are free to negotiate.
        This calculator is designed to help you find a reasonable starting point.</p>

        <p> Some payment schedules are rare for a given product category; in these cases we only
        provide estimates where data is available.</p>

        <p>To estimate the difficulty of a work, use this rule of thumb:
        <ul>
          <li>A simple design uses 2-6 flat colors, simple motifs like dots, and open ground.</li>
          <li>A complex design uses 7-12+ flat and tonal colors, detailed motifs like watercolor,
          fine line work, textures, or special treatments such as foil or embossing.</li>
        </ul></p>
      </div>
    </form></div>
  `},

  css: () => {return `
    div, form, input, select, textarea, p { 
      padding: 0;
      margin: 0;
      outline: none;
      font-family: Roboto, Arial, sans-serif;
      font-size: 14px;
      color: #000;
      line-height: 22px;
    }

    #result {

    }

    .oneTimeNote {
      font-style: italic;
      text-align: right;
      width: 100%;
      text-decoration: none !important;
    }

    .notes {
      font-style: italic;
      margin-top: 20px;
    }
    .notes > p {
      margin-bottom: 20px;
    }

    h1 {
      position: absolute;
      margin: 0;
      font-size: 32px;
      color: #000;
      z-index: 2;
    }

    .calcbox {
      display: flex;
      justify-content: center;
      align-items: center;
      height: inherit;
      padding: 20px;
    }

    form {
      width: 60%;
      padding: 20px;
      border-radius: 6px;
      background: #fff;
      box-shadow: 0 0 30px 0 #ccc; 
    }

    .question-answer {
      display:flex;
      flex-wrap: wrap;
      border-right: 1px solid #ccc;
      border-radius: 3px;
      padding-left: 10px;
    }

    .banner {
      position: relative;
      height: 130px;
      background-size: cover;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      line-height: 32pt;
    }

    .banner::after {
      content: "";
      background-color: rgba(0, 0, 127, 0.25);
      position: absolute;
      width: 100%;
      height: 100%;
    }

    p.top-info {
      margin: 10px 0;
    }

    p:has( + select:disabled ) {
      color: #ddd;
    }

    select:disabled {
      color: #ddd;
    }

    *:disabled + label {
      color: #ddd;
    }

    *:disabled + label.radio:before,
    *:disabled + label.checkbox:before {
      border-color: #ddd;
    }

    .disabled {
      color: #ddd;
    }

    input, select, textarea {
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 3px;
    }

    input {
      width: calc(100% - 10px);
      padding: 5px;
    }

    select {
      width: 100%;
      padding: 7px 0;
      background: transparent;
    }

    textarea {
      width: calc(100% - 12px);
      padding: 5px;
    }

    .item:hover p, .item:hover i, .question:hover p,
    .question label:hover, input:hover::placeholder {
      /* color: #8ebf42; */
      text-decoration: underline;
    }

    .item input:hover, .item select:hover, .item textarea:hover {
      border: 1px solid transparent;
      box-shadow: 0 0 8px 0 #ccc;
    }

    .item {
      position: relative;
      margin: 10px 0;
    }

    .item i {
      right: 2%;
      top: 30px;
      z-index: 1;
    }

    input[type=radio], input[type=checkbox] {
      width: 0;
      visibility: hidden;
      display: none;
    }

    label.radio, label.checkbox {
      position: relative;
      display: inline-block;
      margin: 5px 20px 25px 0;
      cursor: pointer;
    }

    .question span {
      margin-left: 30px;
    }

    label.radio:before, label.checkbox:before {
      content: "";
      position: absolute;
      left: 0;
      width: 19px;
      height: 19px;
      border: 1px solid #666;
    }

    label.radio:before {
      border-radius: 50%;
    }

    label.checkbox:before {
      border-radius: 0%;
    }

    label.radio:after, label.checkbox:after {
      content: "";
      position: absolute;
      width: 8px;
      height: 4px;
      top: 6px;
      left: 5px;
      background: transparent;
      border: 3px solid #8ebf42;
      border-top: none;
      border-right: none;
      transform: rotate(-45deg);
      opacity: 0;
    }

    input[type=radio]:checked + label:after,
    input[type=checkbox]:checked + label:after {
      opacity: 1;
    }

    .btn-block {
      margin-top: 10px;
      text-align: center;
    }

    button {
      width: 150px;
      padding: 10px;
      border: none;
      border-radius: 5px; 
      background: #8ebf42;
      font-size: 16px;
      color: #fff;
      cursor: pointer;
    }

    button:hover {
      background: #82b534;
    }

    .invisible {
      visibility: hidden;
    }

.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}
.loader {
  color: #000000;
  font-size: 5px;
  margin: 26px auto;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 0;
}
.loader:before {
  left: -3.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 3.5em;
}
@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}

    @media (min-width: 568px) {
      .name-item, .city-item {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
    }
  `},

  getInputs: () => {
    const formElement = document.querySelector("#rate-calculator-tool form");
    const formData = new FormData(formElement);

    return {
      category:    formData.get('category'),
      exclusivity: formData.get('exclusivity'),
      schedule:    formData.get('schedule'),
      difficulty:  formData.get('difficulty'),
      duration:    formData.get('duration'),
      territory:   formData.getAll('territory'),
      brand:       formData.get('brand'),
      skill:       formData.get('skill'),
    };
  },

  // get product data for category
  getCategoryData: (input) => {
    const allData = rateCalc.categoryData;
    let data = null;
    findData: {
      for ( supercategory in allData ) {
        for ( category in allData[ supercategory ][ 'data' ] ) {
          if ( category === input ) {
            data = allData[supercategory]['data'][category];
            break findData;
          }
        }
      }
    }
    if ( ! data ) {
      console.log( 'Cannot find category data for ' + param.category );
    }
    return data;
  },

  /**
   * Disable form elements depending on product category and schedule
   */
  tweakForm: (param) => {
    const data = rateCalc.getCategoryData(param.category);

    // get input elements for tweaking
    const royaltyInput = document.querySelector( 'input#royalty' );
    if ( ! royaltyInput ) {
      console.error( 'rateCalc: input#royalty not found!' );
      return;
    }
    const flatfeeInput = document.querySelector( 'input#flatfee' );
    if ( ! flatfeeInput ) {
      console.error( 'rateCalc: input#flatfee not found!' );
      return;
    }
    const durationInput = document.querySelector( 'select#duration' );
    if ( ! durationInput ) {
      console.error( 'rateCalc: select#duration not found!' );
      return;
    }
    const oneyearItem = document.querySelector( 'option#oneyear' );
    if ( ! oneyearItem ) {
      console.error( 'rateCalc: option#oneyear not found!' );
      return;
    }

    const productData = rateCalc.getCategoryData(param.category);
    const isOneTimeFee = productData.oneTimeFee === true;
    const oneTimeNote = document.querySelector( '.oneTimeNote' );

    // additional elements to be disabled when schedule is royalty
    const disabledForRoyalty = document.querySelectorAll( '.disabled-for-royalty' );

    // grey out and disable a payment schedule if no data is available
    if ( !data.royaltyMin || !data.royaltyMax ) {
      console.log( 'NO ROYALTY DATA' );
      param.schedule = 'flatfee';
      flatfeeInput.removeAttribute('disabled');
      flatfeeInput.click();
      flatfeeInput.setAttribute('checked', '');
      royaltyInput.removeAttribute('disabled');
      royaltyInput.removeAttribute('checked');
      royaltyInput.setAttribute('disabled', '');
    } else {
      royaltyInput.removeAttribute('disabled');
    }
    if ( !data.flatfeeMin || !data.flatfeeMax ) {
      console.log( 'NO FLATFEE DATA' );
      param.schedule = 'royalty';
      royaltyInput.removeAttribute('disabled');
      royaltyInput.click();
      royaltyInput.setAttribute('checked', '');
      flatfeeInput.removeAttribute('disabled');
      flatfeeInput.removeAttribute('checked');
      flatfeeInput.setAttribute('disabled', '');
    } else {
      flatfeeInput.removeAttribute('disabled');
    }

    // grey out and disable the duration input if it's not used
    if ( param.schedule === 'royalty' || isOneTimeFee ) {
      durationInput.setAttribute('disabled','');
      disabledForRoyalty.forEach( (element) => {
        element.classList.add('disabled');
      });
    } else {
      durationInput.removeAttribute('disabled');
      disabledForRoyalty.forEach( (element) => {
        element.classList.remove('disabled');
      });
      oneyearItem.setAttribute('selected','');
      param.duration = rateCalc.getInputs().duration;
      durationInput.click();
    }

    if ( isOneTimeFee ) {
      oneTimeNote.classList.remove( 'invisible' );
    } else {
      oneTimeNote.classList.add( 'invisible' );
    }

    // make sure at least one territory is selected
    if ( param.territory.length === 0 ) {
      const usaCheckbox = document.querySelector( 'input#usa' );
      if ( ! usaCheckbox ) {
        console.error( 'rateCalc: input#usa not found!' );
        return;
      }
      usaCheckbox.click();
    }

    return param;
  },

  /**
   * Rate calculation
   */
  calculateRate: (param) => {
    let rate = 0;

    const data = rateCalc.getCategoryData(param.category);

    if ( ! data ) {
      return;
    }

    // get range bounds
    if ( param.schedule === 'flatfee' ) {
      min = data.flatfeeMin;
      max = data.flatfeeMax;
    } else if ( param.schedule === 'royalty' ) {
      min = data.royaltyMin;
      max = data.royaltyMax;
    }

    // fiddle params
    const territoryAdj = rateCalc.tweak( 4, 0.32, param.territory.length );
    const skillAdj = rateCalc.tweak( 5, 0.24, param.skill );
    const brandAdj = rateCalc.tweak( 5, 0.24, param.brand );
    const exclusivityAdj = ( param.exclusivity === 'exclusive' )
      ? 1 : ( param.schedule === 'royalty' ) ? 0.5 : 0.333;
    const difficultyAdj = rateCalc.tweak( 3, 0.5, param.difficulty );
    const p = exclusivityAdj * ( territoryAdj + Math.sqrt( skillAdj * brandAdj ) + difficultyAdj ) / 3;

    const fiddleParams = {
      territoryAdj: territoryAdj,
      skillAdj: skillAdj,
      brandAdj: brandAdj,
      exclusivityAdj: exclusivityAdj,
      difficultyAdj: difficultyAdj,
      p: p
    };

    // interpolate range
    rate = min + p * (max - min);

    if ( rateCalc.debug ) {
      console.log({
        min: min, max: max, p: p, rate: rate,
        param: param, fiddleParams: fiddleParams
      });
    }

    if ( data.oneTimeFee !== 'true' ) {
      param.duration = 1;
    }

    // duration adjustment and add the units
    if ( param.schedule === 'flatfee' ) {
      rate = Math.floor( rate / 50 ) * 50;     // round down to the nearest $50
      rate *= param.duration;                  // multiply by # of years
      rate = '$' + rate.toString() + ' total'; // format as dollar amount
    } else if ( param.schedule == 'royalty' ) {
      rate = Math.floor( rate / 50 ) * 50;     // round down to the nearest 50bp
      rate /= 100;                             // convert bp to percentage
      rate = rate.toString() + '%';            // format as percentage
    }

    return rate;
  },

  tweak: (n, w, k) => {
    return 1 - (n - k)*w;
  },

  updateResult: () => {
    const output = document.querySelector("#result");
    output.setAttribute('class', 'loader');    

    const rawInputs = rateCalc.getInputs();
    if ( rateCalc.debug ) { console.log({ rawInputs: rawInputs }); }

    const inputs = rateCalc.tweakForm( rawInputs );
    if ( rateCalc.debug ) { console.log({ inputs: inputs }); }

    const result = rateCalc.calculateRate( inputs );

    if ( rateCalc.debug ) { console.log( {result: result} ); }

    setTimeout( () => {
      output.removeAttribute('class');
      output.innerHTML = '<span style="font-size: 30px;">' + result + '</span>';
    }, 250);
  },

  // populate the product category drop-down
  addCategoryData: () => {
    const container = document.querySelector('select#category');
    const superdata = rateCalc.categoryData;
    for ( supercategory in superdata ) {
      let group = createElementWithAttrs(
        'optgroup', { label: superdata[supercategory].title }
      );
      container.appendChild( group );
      const subdata = superdata[supercategory].data;
      for ( subcategory in subdata ) {
        let item = createElementWithAttrs(
          'option', { value: subcategory }, subdata[subcategory].name
        );
        group.appendChild( item );
      }
    }
  },

  // notes:
  //   - royalties are stated in terms of basis points; e.g. 5% is 500 basis points
  //     (we convert back to percentages later; this makes the arithmetic more accurate)
  categoryData: {
    homeDecor: {
      title: 'Home Decor',
      data: {
        wallArt:    { royaltyMin: 500,  royaltyMax: 1200, flatfeeMin: 400,  flatfeeMax: 1500,  name: 'Wall art' },
        posters:    { royaltyMin: 500,  royaltyMax: 1200, flatfeeMin: 400,  flatfeeMax: 1500,  name: 'Posters' },
        canvas:     { royaltyMin: 500,  royaltyMax: 1200, flatfeeMin: null, flatfeeMax: null,  name: 'Canvas Prints' },
        framed:     { royaltyMin: 500,  royaltyMax: 1200, flatfeeMin: null, flatfeeMax: null,  name: 'Framed Art' },
        pillows:    { royaltyMin: 400,  royaltyMax: 1000, flatfeeMin: null, flatfeeMax: null,  name: 'Decorative Pillows' },
        tapestry:   { royaltyMin: 400,  royaltyMax: 1000, flatfeeMin: null, flatfeeMax: null,  name: 'Tapestries' },
        decals:     { royaltyMin: 400,  royaltyMax: 1000, flatfeeMin: null, flatfeeMax: null,  name: 'Wall Decals' }
      }
    },
    paperGoods: {
      title: 'Stationery & Paper Goods',
      data: {
        greetings:  { royaltyMin: 300,  royaltyMax: 800,  flatfeeMin: 75,   flatfeeMax: 2000,  name: 'Greeting Cards (per design)' },
        notecards:  { royaltyMin: 300,  royaltyMax: 800,  flatfeeMin: 75,   flatfeeMax: 2000,  name: 'Notecards (per design)' },
        calendars:  { royaltyMin: 400,  royaltyMax: 700,  flatfeeMin: null, flatfeeMax: null,  name: 'Calendars' },
        journals:   { royaltyMin: 400,  royaltyMax: 700,  flatfeeMin: null, flatfeeMax: null,  name: 'Journals' },
        notebooks:  { royaltyMin: 400,  royaltyMax: 700,  flatfeeMin: null, flatfeeMax: null,  name: 'Notebooks' },
        planners:   { royaltyMin: 400,  royaltyMax: 700,  flatfeeMin: null, flatfeeMax: null,  name: 'Planners' },
        giftWrap:   { royaltyMin: 300,  royaltyMax: 800,  flatfeeMin: 300,  flatfeeMax: 600,   name: 'Gift Wrap' },
        stickers:   { royaltyMin: 300,  royaltyMax: 800,  flatfeeMin: 75,   flatfeeMax: 2000,  name: 'Stickers (per design)' }
      }
    },
    textiles: {
      title: 'Fabric & Textiles',
      data: {
        yardage:    { royaltyMin: 1000, royaltyMax: 1000, flatfeeMin: null, flatfeeMax: null,  name: 'Fabric by the Yard' },
        collection: { royaltyMin: 200,  royaltyMax: 800,  flatfeeMin: null, flatfeeMax: null,  name: 'Fabric Collection' },
        bedding:    { royaltyMin: 300,  royaltyMax: 500,  flatfeeMin: 500,  flatfeeMax: 1500,  name: 'Bedding' },
        curtains:   { royaltyMin: null, royaltyMax: null, flatfeeMin: 500,  flatfeeMax: 1000,  name: 'Curtains' },
        tableLinen: { royaltyMin: null, royaltyMax: null, flatfeeMin: 300,  flatfeeMax: 700,   name: 'Table Linens' },
        towels:     { royaltyMin: null, royaltyMax: null, flatfeeMin: 350,  flatfeeMax: 400,   name: 'Towels' },
        blankets:   { royaltyMin: null, royaltyMax: null, flatfeeMin: 400,  flatfeeMax: 800,   name: 'Throw Blankets' },
        upholstery: { royaltyMin: null, royaltyMax: null, flatfeeMin: 350,  flatfeeMax: 700,   name: 'Upholstery' },
        scarves:    { royaltyMin: 500,  royaltyMax: 1200, flatfeeMin: 250,  flatfeeMax: 600,   name: 'Scarves' },
        ties:       { royaltyMin: null, royaltyMax: null, flatfeeMin: 250,  flatfeeMax: 600,   name: 'Ties' }
      }
    },
    giftware: {
      title: 'Gifts & Accessories',
      data: {
        mugs:       { royaltyMin: 500,  royaltyMax: 1000, flatfeeMin: null, flatfeeMax: null,  name: 'Mugs' },
        coasters:   { royaltyMin: 500,  royaltyMax: 1000, flatfeeMin: null, flatfeeMax: null,  name: 'Coasters' },
        keychains:  { royaltyMin: 500,  royaltyMax: 1000, flatfeeMin: null, flatfeeMax: null,  name: 'Keychains' },
        magnets:    { royaltyMin: 500,  royaltyMax: 1000, flatfeeMin: null, flatfeeMax: null,  name: 'Magnets' },
        puzzles:    { royaltyMin: 400,  royaltyMax: 800,  flatfeeMin: null, flatfeeMax: null,  name: 'Puzzles' },
        figurines:  { royaltyMin: 500,  royaltyMax: 1000, flatfeeMin: null, flatfeeMax: null,  name: 'Figurines' },
        ornaments:  { royaltyMin: 500,  royaltyMax: 1000, flatfeeMin: null, flatfeeMax: null,  name: 'Ornaments' },
        jewelry:    { royaltyMin: 500,  royaltyMax: 1000, flatfeeMin: null, flatfeeMax: null,  name: 'Jewelry' },
        toteBags:   { royaltyMin: 500,  royaltyMax: 1000, flatfeeMin: null, flatfeeMax: null,  name: 'Tote Bags' }
      }
    },
    apparel: {
      title: 'Apparel & Fashion',
      data: {
        tshirts:    { royaltyMin: 500,  royaltyMax: 1200, flatfeeMin: 400,  flatfeeMax: 800,   name: 'T-Shirts' },
        dresses:    { royaltyMin: 500,  royaltyMax: 1200, flatfeeMin: null, flatfeeMax: null,  name: 'Dresses' },
        leggings:   { royaltyMin: 500,  royaltyMax: 1200, flatfeeMin: null, flatfeeMax: null,  name: 'Leggings' },
        socks:      { royaltyMin: 500,  royaltyMax: 1200, flatfeeMin: null, flatfeeMax: null,  name: 'Socks' },
        scarves:    { royaltyMin: 500,  royaltyMax: 1200, flatfeeMin: 250,  flatfeeMax: 600,   name: 'Scarves' },
        hats:       { royaltyMin: 500,  royaltyMax: 1200, flatfeeMin: null, flatfeeMax: null,  name: 'Hats' },
        bags:       { royaltyMin: 500,  royaltyMax: 1200, flatfeeMin: null, flatfeeMax: null,  name: 'Bags' },
        shoes:      { royaltyMin: 500,  royaltyMax: 1200, flatfeeMin: null, flatfeeMax: null,  name: 'Shoes' }
      }
    },
    children: {
      title: 'Children\'s Products',
      data: {
        toys:       { royaltyMin: 400,  royaltyMax: 800,  flatfeeMin: null, flatfeeMax: null,  name: 'Toys' },
        games:      { royaltyMin: 400,  royaltyMax: 800,  flatfeeMin: null, flatfeeMax: null,  name: 'Games' },
        puzzles:    { royaltyMin: 400,  royaltyMax: 800,  flatfeeMin: null, flatfeeMax: null,  name: 'Puzzles' },
        coloring:   { royaltyMin: 600,  royaltyMax: 1200, flatfeeMin: null, flatfeeMax: null,  name: 'Coloring Books' },
        illoBook:   { royaltyMin: 350,  royaltyMax: 600,  flatfeeMin: null, flatfeeMax: null,  name: 'Children\'s Book (Illustrator Only)' },
        authIllo:   { royaltyMin: 700,  royaltyMax: 1200, flatfeeMin: null, flatfeeMax: null,  name: 'Children\'s Book (Author & Illustrator)' }
      }
    },
    kitchen: {
      title: 'Kitchen & Tableware',
      data: {
        plates:     { royaltyMin: 400,  royaltyMax: 500,  flatfeeMin: 650,  flatfeeMax: 800,   name: 'Plates' },
        bowls:      { royaltyMin: 400,  royaltyMax: 500,  flatfeeMin: 300,  flatfeeMax: 800,   name: 'Bowls' },
        mugs:       { royaltyMin: 400,  royaltyMax: 500,  flatfeeMin: 300,  flatfeeMax: 800,   name: 'Mugs' },
        glasses:    { royaltyMin: 400,  royaltyMax: 500,  flatfeeMin: 300,  flatfeeMax: 800,   name: 'Glasses' },
        aprons:     { royaltyMin: 300,  royaltyMax: 500,  flatfeeMin: 500,  flatfeeMax: 1200,  name: 'Aprons' },
        ovenMitts:  { royaltyMin: 300,  royaltyMax: 500,  flatfeeMin: 500,  flatfeeMax: 1200,  name: 'Oven Mitts' },
        placemats:  { royaltyMin: 300,  royaltyMax: 500,  flatfeeMin: 300,  flatfeeMax: 600,   name: 'Placemats' },
        teaTowels:  { royaltyMin: 300,  royaltyMax: 500,  flatfeeMin: 500,  flatfeeMax: 1200,  name: 'Tea Towels' }
      }
    },
    tech: {
      title: 'Technology & Electronics',
      data: {
        phoneCase:  { royaltyMin: 500,  royaltyMax: 1000, flatfeeMin: null, flatfeeMax: null,  name: 'Phone Cases' },
        laptopSkin: { royaltyMin: 500,  royaltyMax: 1000, flatfeeMin: null, flatfeeMax: null,  name: 'Laptop Skins' },
        tabletSkin: { royaltyMin: 500,  royaltyMax: 1000, flatfeeMin: null, flatfeeMax: null,  name: 'Tablet Covers' }
      }
    },
    publishing: {
      title: 'Licensing for Publishing',
      data: {
        bookCover:  { royaltyMin: null, royaltyMax: null, flatfeeMin: 250,  flatfeeMax: 3500,  name: 'Book Covers', oneTimeFee: true },
        illos:      { royaltyMin: 500,  royaltyMax: 1500, flatfeeMin: 150,  flatfeeMax: 12000, name: 'Book Illustrations', oneTimeFee: true },
        artwork:    { royaltyMin: null, royaltyMax: null, flatfeeMin: 250,  flatfeeMax: 2000,  name: 'Art in Books, Magazines, Comics', oneTimeFee: true }
      }
    }
  }
}

function createElementWithAttrs( tag, ts, txt ) {
  const e = document.createElement( tag );
  for ( let t in ts ) {
    let a = document.createAttribute( t );
    if ( ts[t] !== null ) { a.value = ts[t]; }
    e.setAttributeNode(a);
  }
  if ( txt ) { e.innerHTML = txt; }
  return e;
}

rateCalc.init();
