import React from 'react'
import Carousel from 'react-multi-carousel'; //installed using "npm i react-responsive-carousel"
import 'react-multi-carousel/lib/styles.css';



//function frame2 accepts variale as prop named as reviews
function Frame2({ reviews }) {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    //this variable holds the properties of the carousal
    return (
        <div style={{ float: "center" }}>
            <Carousel responsive={responsive}> 
               
                {reviews?.map((item) => {
                    return (

                        <div>

                            <tr>
                                <td ><label className="tdr">{item.review_title}:</label></td>
                                <td> {item.review_rating}</td></tr>
                            <tr>By {item.review_author}</tr>
                            <tr>{item.review_content}</tr>

                        </div>

                    )
                })

                }
            </Carousel> {/*closing of carousal*/}

          
        </div>
    )
}

export default Frame2
