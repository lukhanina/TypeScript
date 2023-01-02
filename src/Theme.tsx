import { createTheme } from '@mui/material'

export const theme:ITheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#444a57',
      light: '#5e697f',
      dark: '#282c34',
      contrastText: '#eceff1'
    },
  }
})
  
interface ITheme {
  palette?: {
    mode?: string,
    primary?: {
      main?: string,
      light?: string,
      dark?: string,
      contrastText?: string
    },
  }
}
