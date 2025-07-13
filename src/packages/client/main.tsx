import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app.tsx'
import "@radix-ui/themes/styles.css";
import "./globals.css"
import {Theme} from "@radix-ui/themes";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Theme accentColor="mint" appearance="dark">
            <App/>
        </Theme>
    </StrictMode>,
)
