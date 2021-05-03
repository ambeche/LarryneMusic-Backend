import { createMuiTheme } from '@material-ui/core/styles';
import { ACCENT, ACCENT_TWO, SUCCESS } from '../assets/colors';

const theme = createMuiTheme({
  overrides: {
    MuiCircularProgress: {
      // Name of the rule
      colorPrimary: {
        // Some CSS
        color: SUCCESS
      },
      colorSecondary: {
        color: ACCENT
      }
    },
    MuiButton: {
      textSecondary:{color: ACCENT,},
      containedPrimary: {color: ACCENT_TWO,}
    }
  }
});

export default theme;
