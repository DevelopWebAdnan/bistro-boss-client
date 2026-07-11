import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";

const AddItems = () => {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => {
        console.log(data)
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
                            {...register("name", {required: true})}
                            className="input w-full"
                            placeholder="Recipe Name"
                            required />
                    </fieldset>

                    <div className="flex my-6 gap-6">
                        {/* category */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend">Category Selection*</legend>
                            {/* <label className="label">Category Selection*</label> */}
                            <select {...register("category", {required: true})}
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
                                {...register("price", {required: true})}
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
                            {...register("image", {required: true})}
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