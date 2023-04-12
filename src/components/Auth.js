import { auth, provider } from '../firebase-config.js';
import { signInWithPopup } from 'firebase/auth';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const Auth = (props) => {

    const setIsAuth = props.setIsAuth;

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result);
            cookies.set("auth-token", result.user.refreshToken);
            setIsAuth(true);
        } catch (err) {
            console.error(err)
        }
    }

    const removeToken = () => {
        cookies.remove("auth-token");
    }

    return <div className="auth">
        <p> Sign in With Google To Continue </p>
        <button onClick={signInWithGoogle}> Sign In With Google </button>
    </div>;
}