import {
  blue,
  blueGrey,
  brown,
  cyan,
  deepOrange,
  deepPurple,
  green,
  grey,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow
} from 'material-ui/colors';

export const allColors = [
  'blue',
  'blueGrey',
  'brown',
  'cyan',
  'deepOrange',
  'deepPurple',
  'green',
  'grey',
  'lightBlue',
  'lightGreen',
  'lime',
  'orange',
  'pink',
  'purple',
  'red',
  'teal',
  'yellow'
];

export const convertColorToPalette = (color) => {
  switch (color) {
    case 'blue':
      return { palette: blue, hex: blue[500] };
    case 'blueGrey':
      return { palette: blueGrey, hex: blueGrey[500] };
    case 'brown':
      return { palette: brown, hex: brown[500] };
    case 'cyan':
      return { palette: cyan, hex: cyan[500] };
    case 'deepOrange':
      return { palette: deepOrange, hex: deepOrange[500] };
    case 'deepPurple':
      return { palette: deepPurple, hex: deepPurple[500] };
    case 'green':
      return { palette: green, hex: green[500] };
    case 'grey':
      return { palette: grey, hex: grey[500] };
    case 'lightBlue':
      return { palette: lightBlue, hex: lightBlue[500] };
    case 'lightGreen':
      return { palette: lightGreen, hex: lightGreen[500] };
    case 'lime':
      return { palette: lime, hex: lime[500] };
    case 'orange':
      return { palette: orange, hex: orange[500] };
    case 'teal':
      return { palette: teal, hex: teal[500] };
    case 'pink':
      return { palette: pink, hex: pink[500] };
    case 'purple':
      return { palette: purple, hex: purple[500] };
    case 'red':
      return { palette: red, hex: red[500] };
    case 'yellow':
      return { palette: yellow, hex: yellow[500] };
    default:
      return { palette: blue, hex: blue[500] };
  }
}

export const findCompliment = (color) => {
  const hexColor = hexToRgb(color)
  const hsl = rgbToHsl(...hexColor)
  const newH = hsl.h * 360 > 180 ? ((hsl.h * 360) - 180) / 360 : ((hsl.h * 360) + 180) / 360
  const finalRgb = hslToRgb(newH, hsl.s, hsl.l)
  const finalHex = rgbToHex(...finalRgb)
  return finalHex;
}

const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

const componentToHex = (c) => {
    const hex = Math.round(c).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

const rgbToHex = (r, g, b) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;

  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return { h, s, l };
}


const hslToRgb = (h, s, l) => {
  var r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return { r: r * 255, g: g * 255, b: b * 255};
}
