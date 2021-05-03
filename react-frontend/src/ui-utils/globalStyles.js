import { makeStyles } from '@material-ui/core/styles';
import {
  ACCENT,
  ACCENT_TWO,
  PRIMARY,
  PRIMARY_DARK,
  PRIMARY_LIGHT
} from '../assets/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '15%'
  },
  appBar: {
    top: '0%',
    position: 'fixed',
    maxHeight: '15%',
    marginRight: '6%',
    
    width: '96%',
    zIndex: 20,
    backgroundColor: PRIMARY,
    
  },
  appBarLink: {
    padding: 10,
    color:'#ffffff',
    textDecoration: 'none',
    
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
    marginTop: '4%',
  },
  mediaRoot: {zIndex: -1},
  upload: {
    position: 'fixed',
    right: '2%',
    top: '12%',
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
    left: '0%',
    top: '11%',
    color: PRIMARY_LIGHT
  },
  subnavlinks: {
    textDecoration: 'none',
    padding: 10,
    zIndex: 20,
  },
  subnavBtn: {
   
    color: ACCENT_TWO,
    zIndex: 20,
    
  },
  // edit product dialog
  appBarEditDialog: {
    position: 'relative',
    backgroundColor: PRIMARY
  },
  title: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  textField: {
    marginRight: '12%'
  },
  multilineText: {
    marginRight: '15%'
  },
  formControl: {
    margin: theme.spacing(4),
    minWidth: 120,
    marginLeft: '4.5%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default useStyles;