import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './splashpage.css';
import DemoButton from '../auth/SplashDemomBtn';

function SplashPage() {
    const currentUser = useSelector(state => state.session.user);
    const history = useHistory()

    const handleSubmit = () => {
        history.push('/products')
    }

    return (
        <>
            {/* FIRST DIV CONTAINER */}
            <div id='splash-body'>
                <div className='panel-one'>
                    <video className="panel-one-video" autoPlay playsInline muted loop>
                    <source
                        type="video/mp4"
                        src="https://player.vimeo.com/external/392040265.sd.mp4?s=aae3ff7617122605db97d81e78ace17b436fd57a&profile_id=164&oauth2_token_id=57447761"
                    />
                    </video>
                    <div className='panel-one-description'>
                        <div className='beautsy-splash-name'>Beautsy</div>
                        <br></br>
                        <h1>CLEAN BEAUTY IS</h1>
                        <h1>THE NEW STANDARD</h1>
                        <p>Because what you put on your skin matters</p>
                        <div className='both-splash-btns'>
                            {currentUser
                            ?
                            <button id="all-products-btn" onClick={handleSubmit}>Shop All Products</button>
                            :
                            <>
                                <button id="all-products-btn" onClick={handleSubmit}>Shop All Products</button>
                                <DemoButton />
                            </>
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* SECOND DIV CONTAINER */}
                {/* GRID OF 3 LINK IMAGES = skincare, bodycare, read the blog */}

            {/* <div className='panel-two'>
                <div className='container-wide'>
                    <div className='grid-column'>
                        <a href='/skin' className='grid-one'>
                            <h2>SKINCARE PRODUCTS</h2>
                            <img src="https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fHNraW4lMjBjYXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt='skincare link'></img>
                        </a>
                    </div>
                    <div className='grid-column'>
                        <a href='/body' className='grid-two'>
                            <h2>BODYCARE PRODUCTS</h2>
                            <img src="https://images.unsplash.com/photo-1563804447971-6e113ab80713?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt='bodycare link'></img>
                        </a>
                    </div>
                    <div className='grid-column'>
                        <a href='/about' className='grid-three'>
                            <h2>ABOUT US</h2>
                            <img src="https://images.unsplash.com/photo-1552046122-03184de85e08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHNraW4lMjBjYXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt='about us link'></img>
                        </a>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default SplashPage;
