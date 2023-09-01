import { useState, useEffect } from 'react';
import industryData from '../../data/industryData';
import {AIChatbotLeftSectionStyles} from './leftSection.css'

function LeftSection({ isLeftSectionToggle, setIsLeftSectionToggle }) {
    const [isExpanded, setIsExpanded] = useState({});     

    //Handle industry-data if it has nested items
    const handleExpandButton = (index) => {
        if (industryData[index])
            setIsExpanded((prevState) => ({
                ...prevState,
                [index]: !prevState[index]
            }));
    };

    //handle-left-section-toggle-button
    const handleLeftSectionToggleButton = () => {
        if (window.innerWidth <= 768)
            setIsLeftSectionToggle(true);
        else
            setIsLeftSectionToggle(!isLeftSectionToggle);
    }
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");

        // Initial call to handle left section toggle based on screen width
        handleLeftSectionToggleButton(mediaQuery.matches);

        // Add listener for screen width changes
        const handleMediaQueryChange = (e) => {
            handleLeftSectionToggleButton(e.matches);
        };

        mediaQuery.addListener(handleMediaQueryChange);

        // Clean up the listener when component unmounts
        return () => {
            mediaQuery.removeListener(handleMediaQueryChange);
        };
    }, []); // Empty dependency array to run this effect only once



    return (
        <>
            {!isLeftSectionToggle &&
                <section className="chat-component-left-section">
                    <div className="left-section-title-container">
                        <p className="left-section-title">Industries</p>
                        <img className="left-section-toggle-button toggle-button" src="./toggle-button-left-arrow.svg" alt="left-section-toogle-button" onClick={handleLeftSectionToggleButton} />
                    </div>
                    <div className="industry-data-container">
                        {industryData.map((industry, index) => (
                            <div className="industry-data">
                                <div className='industry-title-container' key={index}>
                                    <img id="industry-icon" src={industry.icon} alt="page-icon" />
                                    <p className='industry-name'>{industry.name}</p>

                                    <img id="expand-button" className="clickable-icon" src={isExpanded[index] ? "./up-arrow-icon.svg" : "./down-arrow-icon.svg"}
                                        alt="expand-button"
                                        onClick={() => handleExpandButton(index)} />
                                </div>

                                {isExpanded[index] && (
                                    <div className="industry-nested-data-container">
                                        {industry.nestedData.length > 0 ?

                                            industry.nestedData.map((item, index) => (
                                                <div className="industry-nested-data">
                                                    <img src="./bullet-point.svg" alt="bullet-point" id="bullet-point" />
                                                    <p key={index} className="industry-nested-items">{item}</p>
                                                </div>
                                            ))

                                            :
                                            <p style={{ color: "#969696", marginLeft: "1rem" }}>No details</p>
                                        }
                                    </div>

                                )
                                }
                            </div>
                        ))}
                    </div>
                </section>
            }

            {isLeftSectionToggle &&
                <section className="shrunked-chat-component-left-section">
                    <div className="shrunked-left-section-container">
                        <div>
                            <img className="toggle-button" src="./left-section-toggle-button.svg" alt="left-section-toggle-button" onClick={handleLeftSectionToggleButton} />
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
export default LeftSection;