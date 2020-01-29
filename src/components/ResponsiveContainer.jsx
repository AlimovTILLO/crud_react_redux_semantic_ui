import React from 'react'
import { Footer } from './Footer'
import { MobileContainer } from './MobileContainer'
import { DesktopContainer } from './DesktopContainer'


export const ResponsiveContainer = ({ children }) => (
    <div>
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
        <Footer>{children}</Footer>
    </div>
)


