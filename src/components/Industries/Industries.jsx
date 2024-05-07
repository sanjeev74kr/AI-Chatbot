import { useState, useEffect } from 'react';
import industryData from '../../sampleData/industryData';
import './industries.css';
import { bulletPointIcon } from '../../assets/icons';
 
function Industries({ isIndustriesToggle,setIsIndustriesToggle  }) {
    const [isExpanded, setIsExpanded] = useState({});
    const [isClickedLeftToggle, setIsClickedLeftToggle] = useState(false);
    const [industriesData, setIndustriesData] = useState([])
    const [industriesCategoryWiseData, setIndustriesCategoryWiseData] = useState({})
    const [currentIndustryName, setCurrentIndustryName] = useState(null)

    console.log(industriesData)
    //Handle industry-data if it has nested items
    const handleExpandButton = (industry, index) => {
        if (industriesData[index]){
            setIsExpanded((prevState) => ({
                ...prevState,
                [index]: !prevState[index]
            }))};

            setCurrentIndustryName(industry)
    };

    //handle-left-section-toggle-button
    const handleIndustriesToggleButton = () => {

        if (window.innerWidth <= 768)
            setIsIndustriesToggle(true);
        else{
            setIsIndustriesToggle(false);
        }

        setIsClickedLeftToggle(true);

        if (isClickedLeftToggle)
            setIsIndustriesToggle(!isIndustriesToggle);
    }
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");

        // Initial call to handle left section toggle based on screen width
        handleIndustriesToggleButton(mediaQuery.matches);

        // Add listener for screen width changes
        const handleMediaQueryChange = (e) => {
            handleIndustriesToggleButton(e.matches);
        };

        mediaQuery.addListener(handleMediaQueryChange);

        // Clean up the listener when component unmounts
        return () => {
            mediaQuery.removeListener(handleMediaQueryChange);
        };
    }, []); // Empty dependency array to run this effect only once

    async function getIndustryData(){
        try{
            console.log("currentIndustryName",currentIndustryName)
            await fetch(process.env.REACT_APP_ALL_INDUSTRIES_URL).then((res)=> res.json()).then((data)=>setIndustriesData(data))
        }catch(err){
            console.log("Error while fetching-->", err.message)
        }
    }

    async function getCategoryWiseIndustries(){
        try{
                await fetch(process.env.REACT_APP_CATEGORY_WISE_INDUSTRIES_URL + currentIndustryName).then((result)=> result.json()).then((rdata)=>setIndustriesCategoryWiseData({...industriesCategoryWiseData,[currentIndustryName]:rdata}))
            }catch(err){
                console.log("Error while fetching-->", err.message)
            }
        }
        useEffect(()=>{
            getIndustryData()
            getCategoryWiseIndustries()
        },[currentIndustryName])
        // console.log("currentIndustryName------>",process.env.REACT_APP_CATEGORY_WISE_INDUSTRIES_URL + currentIndustryName)
    // console.log("industriesData-->", industriesData)
    console.log("industriesCategoryWiseData-->", industriesCategoryWiseData)
    
    return (
        <>
            {!isIndustriesToggle &&
                <section className="chat-component-left-section">
                    <div className="left-section-title-container">
                        <p className="left-section-title">Industries</p>
                        <img className="left-section-toggle-button toggle-button" src="./toggle-button-left-arrow.svg" alt="left-section-toogle-button" onClick={handleIndustriesToggleButton} />
                    </div>
                    <div className="industry-data-container">
                        {industriesData.map((industry, index) => (
                            <div className="industry-data" key={index}>
                                <div className='industry-title-container' >
                                    <img id="industry-icon" src={bulletPointIcon} alt="page-icon" />
                                    <p className='industry-name'>{industry}</p>

                                    <img id="expand-button" className="clickable-icon" src={isExpanded[index] ? "./up-arrow-icon.svg" : "./down-arrow-icon.svg"}
                                        alt="expand-button"
                                        onClick={() => handleExpandButton(industry, index)} />
                                </div>

                                {isExpanded[index] && (
                                    <div className="industry-nested-data-container">
                                        {/* {industry.nestedData.length > 0 ? */}
                                        {industriesCategoryWiseData[industry] && industriesCategoryWiseData[industry].length ?

                                            industriesCategoryWiseData[industry].map((item, index) => (
                                                <div className="industry-nested-data" key={index}>
                                                    <img src={bulletPointIcon} alt="bullet-point" id="bullet-point" />
                                                    <p key={index} className="industry-nested-items">{item.name.substring(1, 20)}...</p>
                                                </div>
                                            ))

                                            :
                                            <p className='industry-nested-items'>No details</p>
                                            // <p style={{ color: "#969696", marginLeft: "1rem" }}>No details</p>
                                        }
                                    </div>

                                )
                                }
                            </div>
                        ))}
                    </div>
                </section>
            }

            {isIndustriesToggle &&
                <section className="shrunked-chat-component-left-section">
                    <div className="shrunked-left-section-container">
                        <div>
                            <img className="toggle-button" src="./left-section-toggle-button.svg" alt="left-section-toggle-button" onClick={handleIndustriesToggleButton} />
                            <div className="shrunked-horizontal-line"></div>
                        </div>
                        {
                            industryData.map((industry, index) => (
                                <div className="industry-icon-container" key={index}>
                                    <img src={industry.icon} alt="industry-icons" />
                                    <div className="shrunked-horizontal-line"></div>
                                </div>
                            )
                            )
                        }
                    </div>
                </section>
            }

        </>
    )
}
export default Industries;