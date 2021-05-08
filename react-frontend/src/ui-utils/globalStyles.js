import {
  ACCENT,
  ACCENT_TWO,
  PRIMARY,
  PRIMARY_DARK,
  PRIMARY_LIGHT,
  WHITE
} from '../assets/colors';

const styles = {
  root: {
    flexGrow: 1,
    marginTop: '15%'

  },
  photosRoot: {
    flexGrow: 1,
    marginTop: '6%',
    
    
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
    color: WHITE,
    textDecoration: 'none',
    
  },
  footer: {
    bottom: '2%',
    position: 'relative',
    maxHeight: '10%',
    zIndex: -1,
    textJustify: 'center',
  },
  // admin panel
  media: {
    maxHeight: 200,
    marginLeft: '4%',
    marginTop: '4%',
  },
  photoPageMedia: {
    maxHeight: '80%',
  },
  mediaRoot: {zIndex: 3,
  },
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

  photoBadge: {
    color: PRIMARY,
    padding: 4,
    alignContent: 'center'
  },
  photoBagdeIcons: {
    color: ACCENT_TWO
  },
  photoActionBtn: {
    color:PRIMARY_DARK
  },
  like: {
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
  photoDialogAppBar: {
    position: 'relative',
    backgroundColor: PRIMARY,
    maxHeight: '4%',
  },
  commentDialog: {
    marginLeft: '95%',
    marginBottom: '3.2%'

  },
  commentDialogRoot: {
    overflowX: 'hidden',
  },
  photoDetailsPic: {
    overflowX: 'hidden',
  },
  photoDescription: {
   position:  'fixed',
   maxWidth: '50%',
   top: '6%',
   right: '4%'
  },
  // login form
  login: {
    marginTop: '10%',
    marginLeft: '40%',
    
  },
  loginBtn: {
    marginTop: '1%',
    backgroundColor: PRIMARY_DARK
    
  }

};

export default styles;