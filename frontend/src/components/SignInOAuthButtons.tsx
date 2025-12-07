import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignInOAuthButtons = () => {
	const { signIn, isLoaded } = useSignIn();

	if (!isLoaded) {
		return null;
	}

	const signInWithGoogle = () => {
		signIn.authenticateWithRedirect({
			strategy: "oauth_google",
			redirectUrl: "/sso-callback",
			redirectUrlComplete: "/authCallback",
		});
	};

	return (
		<Button onClick={signInWithGoogle} variant={"secondary"} className='w-full text-white border-zinc-200 h-9 sm:h-11 text-xs sm:text-sm'>
			<img src='/google.png' alt='Google' className='size-4 sm:size-5' />
			<span className='hidden sm:inline'>Continue with Google</span>
			<span className='sm:hidden'>Sign In</span>
		</Button>
	);
};
export default SignInOAuthButtons;
