import {createContext, useContext, useEffect, useState} from "react";
import {supabaseClient} from "../supabaseClient";


const AuthContext = createContext(undefined);

export const AuthContextProvider = ({children}) => {

    const [session, setSession] = useState(null);

    const signUpNewUser = async ({name, phone, email, password}) => {
        const {data, error} = await supabaseClient.auth.signUp({
            email: email, password: password, options: {
                data: {
                    full_name: name, phone: phone,
                }
            },
        });

        if (error) return {success: false, error: error}; else return {success: true, data: data};
    };

    const addProduct = async ({
                                  title: title,
                                  description: description,
                                  price: price,
                                  user_id: user_id,
                                  category: category,
                              }) => {

        const {data, error} = await supabaseClient.from('Products').insert({
            title: title, description: description, price: price, user_id: user_id, categorie: category
        }).select().single();

        if (error) return {success: false, error: error};
        else return {success: true, data: data};
    }


    const uploadImage = async (files, product_id) => {

        if (!files || files.length === 0) return [];

        for (const file of files) {
            const fileName = `${Date.now()}_${file.name}`;

            const {error} = await supabaseClient.storage
                .from('products-images')
                .upload(fileName, file, {
                    cacheControl: '3600', upsert: false
                });

            if (error) continue;

            const {data: urlData} = supabaseClient.storage
                .from('products-images')
                .getPublicUrl(fileName);

            await supabaseClient.from('images').insert({
                url: urlData.publicUrl, product_id: product_id
            }).select().single();
        }
    };


    const Delete = async (id) => {
        if (!id) return {success: false, error: "ID manquant"};

        try {
            const {data, error} = await supabaseClient
                .from("Products")
                .delete()
                .eq('id', id);

            if (error) return {success: false, error};
            else return {success: true, data};
        } catch (error) {
            console.error(error.message);
            return {success: false, error};
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

            const {data, error} = await supabaseClient.auth.signInWithPassword({
                email: email, password: password
            })

            if (error) return {success: false, error: error}; else return {success: true, data: data};

        } catch (error) {
            console.error("problem in sign in failed: ", error);
        }
    }


    const signOut = () => {
        const {error} = supabaseClient.auth.signOut();

        if (error) return {success: false, error: error}; else return {success: false, error: null};
    }


    useEffect(() => {
        supabaseClient.auth.getSession().then(({data: {session}}) => {
            setSession(session);
        })
        supabaseClient.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        })
    }, [])


    return (<AuthContext.Provider
        value={{
            session, signUpNewUser, signInNewUser, signOut, addProduct, getAllProducts, uploadImage, Delete
        }}>
        {children}
    </AuthContext.Provider>)
}

export const UserAuth = () => {
    return useContext(AuthContext);
}