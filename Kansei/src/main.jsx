import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import { CssBaseline } from "@mui/material";
import { store } from './app/store'
import { Provider } from 'react-redux'
import 'swiper/css'
import ToggleColorMode from "./context/ToggleColorMode.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(<>
  <Provider store={store}>
	<ToggleColorMode>
	<CssBaseline />
    <App />
		</ToggleColorMode>
	</Provider>
</>);
