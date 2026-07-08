import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const SignUp = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate();

    const { createUser, updateUserProfile } = useContext(AuthContext);

    const axiosPublic = useAxiosPublic();

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }

                        // create user entry in the database
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user has been created successfully')
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "User creation is successful.",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    reset();
                                    navigate("/");
                                }
                            })

                    })
                    .catch(error => console.log(error));
            })
    }

    return (
        <>
            <Helmet>
                <title>Bistro Boss | Sign Up</title>
            </Helmet>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign up now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
                                <label className="label">Name</label>
                                <input type="text" {...register("name", { required: true })} name="name" className="input" placeholder="Name" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                                <label className="label">Photo URL</label>
                                <input type="text" {...register("photoURL", { required: true })} className="input" placeholder="PhotoURL" />
                                {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                                <label className="label">Email</label>
                                <input type="email" {...register("email", { required: true })} name="email" className="input" placeholder="Email" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                                <label className="label">Password</label>
                                <input type="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/
                                })} name="password" className="input" placeholder="Password" />
                                {errors.password?.type === "required" && (
                                    <p className="text-red-600">Password is required</p>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <p className="text-red-600">Password must be 6 characters or longer</p>
                                )}
                                {errors.password?.type === "maxLength" && (
                                    <p className="text-red-600">Password must be less than 20 characters</p>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <p className="text-red-600">Password must contain at least one uppercase English letter, at least one lowercase English letter, at least one digit and at least one special character</p>
                                )}

                                <div><a className="link link-hover">Forgot password?</a></div>
                                <input className="btn btn-neutral mt-4" type="submit" value="Sign Up" />
                            </form>
                            <p><small>Already have an account? <Link to="/login">Login</Link></small></p>
                            <SocialLogin></SocialLogin>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;