# Introduction
This is a very simple Node.js module to parse tire listings on [Tire Rack](https://www.tirerack.com). Contrary to a standard website design, Tire Rack uses a combination of Java (backend) built HTML listings and JavaScript (frontend) in order to build and filter the tire listings. This poses a problem for a traditional wrapper, which might simply parse the HTML elements from the page; this interesting design requires the wrapper (i.e. **us**) to actually parse the JavaScript variables on the listing page in order to pull the full set of tires. This is accomplished through a combination of a standard GET request (to grab the HTML with JavaScript), and the Node.js document parser, JSDOM.


# Usage
## Tire listings
This is currently the only function.

```JavaScript
/**
 * Fetch all tire listings by tire size
 *
 * @param {float} width
 * @param {float} ratio
 * @param {int} diameter
 * @param {number} search zip code
 * @return {array} array of tires
 * @throws None
 * @author Alec M. <https://amattu.com>
 * @date 2021-08-15
 */
async function listings(width, ratio, diameter, zip = 20001)
```

Usage
```JavaScript
const wrapper = require("TireRack-Wrapper");

wrapper.listings(245, 55, 18).then(tires => {
	console.log(tires);
});
```

Arguments:
- `width` Tire width (int|float)
- `ratio` Tire ratio (int|float)
- `diameter` Rim diameter (int)
- `zip` Search zip code (int)

Return:
See `index.js` for most up-to-date attributes.

# Notes
Use with caution. As of now, __all__ of the JavaScript on the tire listing page is executed--If a malicious script were to be inserted, this script would run in the Node.js environment.

# Requirements & Dependencies
See `package.json`.
