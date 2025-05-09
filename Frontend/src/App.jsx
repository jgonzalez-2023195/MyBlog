import MyRoute from "./routers/routes"
import { GlobalStyles } from "./styles/GlobalStyles"
import { useThemeStore } from "./store/ThemeStore"
import { ThemeProvider } from "styled-components"

function App() {
  const { themeStyle } = useThemeStore()

  return (
    <>
      <ThemeProvider theme={themeStyle}>
        <GlobalStyles/>
        <MyRoute/>
      </ThemeProvider>
    </>
  )
}

export default App
