import PropTypes from "prop-types";
import 'antd/dist/antd.css';
import Head from 'next/head';   //next에서 head를 바꿀수있도록 제공
//page들 공통부분처리
const App = ({Component}) => {
    return (
        <>
            <Head>  
                <meta charSet="utf-8"/>
                <title>NodeBird</title>
            </Head>
            <Component />
        </>
    )
}

App.prototype = {
    Component: PropTypes.elementType.isRequired,
}
export default App;