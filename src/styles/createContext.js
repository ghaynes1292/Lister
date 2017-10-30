/* eslint-disable flowtype/require-valid-file-annotation */

import { create } from 'jss';
import preset from 'jss-preset-default';
import { SheetsRegistry } from 'react-jss/lib/jss';
import { createMuiTheme } from 'material-ui/styles';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';

import { getUser } from '../util/storageUtil';

const createTheme = (themeOptions = getUser().theme) => createMuiTheme({
  ...themeOptions,
  overrides: {
    MuiIconButton: {
      root: {
        height: 30,
        width: 30
      }
    }
  }
});

// Configure JSS
const jss = create(preset());
jss.options.createGenerateClassName = createGenerateClassName;

export const sheetsManager = new Map();

export default function createContext(themeOptions) {
  const theme = createTheme(themeOptions)

  return {
    jss,
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager,
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
  };
}
