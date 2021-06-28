
// styles
import './styles/App.css';
import { createMuiTheme, CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';

// components
// import SideMenu from './components/SideMenu';
import Header from './components/Header';
import Employees from './views/Employees/Employees';

const theme = createMuiTheme({
  palette:{
    primary:{
      main:'#333996',
      light:'#3c44b1'
    },
    secondary:{
      main:'#f83245',
      light:'#f88324'
    },
    background:{
      default:'#f4f5fd'
    },
    shape:{
      borderRadius:'12px',
    }
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)',
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  }
})

const useStyles = makeStyles({
  appMain:{
    paddingLeft:'0px',
    width:'100%'
  }
})

const App = () => {

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
        {/* <SideMenu /> */}
        <main className={classes.appMain}>
          <Header />
          <Employees />
        </main>
        <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
