import React from "react";
import ImageSlider from "../../components/slider/ImageSlider";

import Field1 from ".././../assets/images/field1.jpg"
import Field2 from ".././../assets/images/field2.jpg"
import Field3 from ".././../assets/images/field3.jpg"
import Field4 from ".././../assets/images/field4.jpg"

const img = [Field1, Field2, Field3, Field4]
const ImageField = () => {
    return (
        <div class="pt-4">
            <ImageSlider slides={img} />
        </div>
    );
};

export default ImageField;
