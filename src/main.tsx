import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import App from './App'
import { store, persistor } from './store'
import ThemeProvider from './components/ThemeProvider'
dayjs.locale('zh-cn')
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </PersistGate>
  </Provider>,
)
