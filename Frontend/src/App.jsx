import MyRoute from "./routers/routes"
import { GlobalStyles } from "./styles/GlobalStyles"
import { useThemeStore } from "./store/ThemeStore"
import { ThemeProvider } from "styled-components"
import { Toaster } from "react-hot-toast"

function App() {
  const { themeStyle } = useThemeStore()

  return (
    <>
      <ThemeProvider theme={themeStyle}>
        <GlobalStyles/>
        <MyRoute/>
        <Toaster position="bottom-right" reverseOrder={false}/>
      </ThemeProvider>
    </>
  )
}

export default App
