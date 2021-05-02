import { makeStyles } from '@material-ui/core/styles';
import {
  ACCENT,
  ACCENT_TWO,
  PRIMARY,
  PRIMARY_LIGHT
} from '../assets/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '15%'
  },
  footer: {
    bottom: '2%',
    position: 'relative',
    maxHeight: '10%',
    zIndex: -1,
    textJustify: 'center',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  media: {
    maxHeight: 200,
    marginLeft: '4%',
    marginTop: '4%'
  },
  mediaRoot: {},
  upload: {
    position: 'fixed',
    right: '2%',
    top: '7%',
    color: ACCENT
  },
  actions: {
    textAlign: 'center',
    justifyContent: 'center'
  },
  comments: {
    marginRight: '5%',
    marginTop: '35%'
  },
  cardImg: {
    marginLeft: '5%',
    marginTop: '3%'
  },
  mediaGrid: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    justifyContent: 'center',

    height: 160
  },
  badge: {
    color: ACCENT,
    padding: 8,
    alignContent: 'center'
  },
  bagdeIcons: {
    color: PRIMARY
  },
  actionBtn: {
    color: ACCENT_TWO
  },
  btnEdit: {
    color: ACCENT_TWO
  },
  subnav: {
    padding: 10,
    position: 'fixed',
    left: '1%',
    top: '7%',
    color: PRIMARY_LIGHT
  },
  subnavlinks: {
    padding: 10,
    color: PRIMARY_LIGHT,
    zIndex: 9,
  }
}));

export default useStyles;