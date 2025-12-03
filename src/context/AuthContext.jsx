import {createContext, useContext, useEffect, useState} from "react";
import {supabaseClient} from "../supabaseClient";


const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [session, setSession] = useState(null);

    const signUpNewUser = async ({name, phone, email, password}) => {
        const {data, error} = await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: name,
                    phone: phone,
                }
            },
        });
        if (error) {
            console.error("problem in signup failed: ", error.message);
            return {success: false, error: error};
        }
        return {success: true, data: data};
    };

    const addProduct = async ({title, description, price, user_id,category}) => {
        const {data, error} = await supabaseClient.from('Products').insert({
            title: title, description: description, price: price, user_id: user_id,categorie : category,
        }).select().single();
        if (error) {
            console.log(error);
            return {success: false, error: error};
        }
        return {success: true, data: data};
    }

    const uploadImage = async (files, product_id) => {
        if (!files || files.length === 0) return [];

        const uploadedUrls = [];

        for (const file of files) {
            const fileName = `${Date.now()}_${file.name}`;

            const {data, error} = await supabaseClient.storage
                .from('products-images')
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: false
                });
            if (error) {
                console.log("Error uploading image:", error.message);
                uploadedUrls.push(null);
                continue;
            }
            const {data: urlData} = supabaseClient.storage
                .from('products-images')
                .getPublicUrl(fileName);

            uploadedUrls.push(urlData.publicUrl);

            const {_data, _error} = await supabaseClient.from('images').insert({
                url: urlData.publicUrl,
                product_id: product_id
            }).select().single();

            console.log(_error);

        }
    };


    const getAllProducts = async () => {
        const {data, error} = await supabaseClient
            .from("Products")
            .select(`*,images(url),user:user_id (id,full_name,phone,email)`);
        if (error) {
            console.log(error);
            return {success: false, error: error};
        }
        console.log(data)
        return {success: true, data: data};
    };

    const signInNewUser = async ({email, password}) => {
        try {
            const {data, error} = await supabaseClient.auth.signInWithPassword({email: email, password: password})
            if (error) {
                console.error("problem in signup failed: ", error);
                return {success: false, error: error};
            }
            return {success: true, data: data};
        } catch (error) {
            console.error("problem in sign in failed: ", error);
        }
    }

    useEffect(() => {
        supabaseClient.auth.getSession().then(({data: {session}}) => {
            setSession(session);
        })
        supabaseClient.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        })
    }, [])

    const signOut = () => {
        const {error} = supabaseClient.auth.signOut();
        if (error) {
            console.error("problem out signup failed: ", error);
        }
    }

    return (
        <AuthContext.Provider
            value={{session, signUpNewUser, signInNewUser, signOut, addProduct, getAllProducts, uploadImage}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}