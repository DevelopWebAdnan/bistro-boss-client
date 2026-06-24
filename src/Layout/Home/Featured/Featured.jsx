import SectionTitle from "../../../components/SectionTitle/SectionTitle";

import featuredImg from "../../../assets/home/featured.jpg";
import "./Featured.css";

const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white py-8 my-20">
            <SectionTitle
            heading="Featured Items"
            subHeading="Check it out"
            ></SectionTitle>
            <div className="md:flex items-center justify-center bg-slate-500 opacity-60 pt-12 pb-20 px-36">
                <div>
                    <img src={featuredImg} alt="featured image" />
                </div>
                <div className="md:ml-10">
                    <p>Aug, 20, 2030</p>
                    <p className="uppercase">What can i do to have it?</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi deleniti ratione aliquam, sapiente sed voluptas quia dolorem consectetur delectus est enim laudantium possimus harum id velit eveniet tempora, a cupiditate? Eligendi perspiciatis dignissimos, eveniet cum ut doloribus veritatis explicabo beatae alias blanditiis natus molestias ex, sapiente id! Possimus, repudiandae fugit.</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;