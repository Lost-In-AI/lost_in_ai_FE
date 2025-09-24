import Form from "../components/form/Form";


interface AuthContainerProps {
  isLogin: boolean;
}

export default function AuthContainer({ isLogin }: AuthContainerProps) {


  return (
    <div className="flex min-h-screen flex-1 bg-white text-gray-900">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            {/* <img className="h-10 w-auto" src="/logo.png" alt="Lost in AI" /> */}
            <div className="bg-primary-500 p-4 rounded-md text-center">
              <h1 className="text-3xl font-serif text-white ">Lost in AI</h1>
            </div>
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-600">
              {isLogin ? "Accedi alla tua area riservata" : "Registrati"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {isLogin ? "Non hai un account ? " : "Hai già un account ?"}
              <a
                href={isLogin ? "/register" : "/login"}
                className="font-semibold text-primary-500 hover:text-primary-500"
              >
                {" "}
                {isLogin ? "Registrati" : "Accedi"}
              </a>
            </p>
          </div>

          <Form isLogin={isLogin} />
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">

        <img
          className="absolute inset-0 h-full w-full object-cover object-right "
          src="https://images.unsplash.com/photo-1758518729711-1cbacd55efdb?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="sfondo dell'autenticazione"
        />
      </div>
    </div>
  );
}
