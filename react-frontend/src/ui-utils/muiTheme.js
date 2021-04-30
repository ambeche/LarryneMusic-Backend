import { createMuiTheme } from '@material-ui/core/styles';
import { ACCENT, SUCCESS } from '../assets/colors';

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
    }
  }
});

export default theme;
