import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
    const { name, category, recipe, price, _id } = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm()
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
            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
            console.log(menuRes.data);
            if (menuRes.data.modifiedCount > 0) {
                // show a success popup
                // reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} has been updated to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image url', res.data);
    }

    return (
        <div>
            <SectionTitle heading="Update an Item" subHeading="Refresh Info Prompt"></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <fieldset className="fieldset my-6">
                        <label className="label" htmlFor="name">Recipe Name*</label>
                        <input
                            type="text"
                            id="name"
                            defaultValue={name}
                            {...register("name", { required: true })}
                            className="input w-full"
                            placeholder="Recipe Name"
                            required />
                    </fieldset>

                    <div className="flex my-6 gap-6">
                        {/* category */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend">Category Selection*</legend>
                            <select {...register("category", { required: true })}
                                defaultValue={category}
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
                            <input
                                type="number"
                                defaultValue={price}
                                {...register("price", { required: true })}
                                className="input w-full"
                                placeholder="Price" />
                        </fieldset>
                    </div>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Recipe Details</legend>
                        <textarea
                            {...register("recipe")}
                            defaultValue={recipe}
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
                        Update Menu Item
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;