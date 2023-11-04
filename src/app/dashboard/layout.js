"use client"
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Sidebar from '@/components/common/Sidebar';
import ThemeRegistry from '../ThemeRegistry';

const drawerWidth = 80;

export default function RootLayout({ children }) {
    // const { window } = Window;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <ThemeRegistry options={{ key: 'mui' }}>
            <Box sx={{
                display: 'flex', height: '100vh',
                width: '100vw'
            }}>
                <Box
                    component="nav"
                    sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                            '& .MuiDrawer-paper': { backgroundColor: 'black' },
                        }}
                    >
                        <Sidebar handleDrawerToggle={handleDrawerToggle} />
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'transparent', p: { xs: 2, sm: '15px 24px 24px' }, height: '100vh', height: '100%', overflow: 'auto' }}
                >
                    <Box
                        component="main"
                        sx={{ flexGrow: 1, width: { xs: `calc(100%)` } }}
                    >
                        {children}
                    </Box>
                </Box>
            </Box>
        </ThemeRegistry>
    )
}
