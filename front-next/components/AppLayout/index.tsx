import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Container, Cardwrapper } from './style';

const AppLayout = ({children}:any) => {
    return (
        <>
            <Header />
            <Container>
                <div style={{maxWidth: '614px', width: '100%', margin: '0 auto'}}>
                    <Cardwrapper>
                        {children}
                    </Cardwrapper>
                </div>
            </Container>
            {/* <Footer /> */}
        </>
        
    )
}

export default AppLayout;