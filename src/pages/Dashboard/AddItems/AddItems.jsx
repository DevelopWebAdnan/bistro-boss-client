import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit } = useForm()
    const onSubmit = async (data) => {
        console.log(data)
        // upload image to imgbb and then get image url
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": "multipart/form-data",
            }
        })
        if (res.data.success) {
            // Send the menu data to the server side along with the image url
            const menuItem = {
                recipe: data.recipe,
                name: data.name,
                price: parseFloat(data.price),
                category: data.category,
                image: res.data.data.display_url
            }
            const menuRes = await axiosSecure.post('/menu', menuItem)
            console.log(menuRes.data);
            if (menuRes.data.insertedId) {
                // show a success popup
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} has been saved successfully`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image url', res.data);
    }
    return (
        <div>
            <SectionTitle heading="add an item" subHeading="What's new?"></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* <label>Recipe Name</label>
                    <input {...register("name")} /> */}
                    <fieldset className="fieldset my-6">
                        <label className="label" htmlFor="name">Recipe Name*</label>
                        <input
                            type="text"
                            id="name"
                            {...register("name", { required: true })}
                            className="input w-full"
                            placeholder="Recipe Name"
                            required />
                    </fieldset>

                    <div className="flex my-6 gap-6">
                        {/* category */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend">Category Selection*</legend>
                            {/* <label className="label">Category Selection*</label> */}
                            <select {...register("category", { required: true })}
                                defaultValue="Pick a category"
                                className="select w-full">
                                <option disabled={true}>Pick a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </fieldset>
                        {/* Price */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend">Price*</legend>
                            {/* <label className="label" htmlFor="price">Price*</label> */}
                            <input
                                type="number"
                                // id="price"
                                {...register("price", { required: true })}
                                className="input w-full"
                                placeholder="Price" />
                        </fieldset>
                    </div>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Recipe Details</legend>
                        <textarea
                            {...register("recipe")}
                            className="textarea h-24 w-full"
                            placeholder="Recipe Details"
                        ></textarea>
                    </fieldset>

                    <div className="w-full my-6">
                        <input
                            type="file"
                            {...register("image", { required: true })}
                            className="file-input file-input-ghost" />
                    </div>

                    <button className="btn">
                        Add Item <FaUtensils></FaUtensils>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;