import Form from "../components/form/Form";

interface AuthContainerProps {
  isLogin: boolean;
}

export default function AuthContainer({ isLogin }: AuthContainerProps) {
  {
    /* non mi piace lo switch con il boolean, per il momento però lasciamolo */
  }

  return (
    <div className="flex min-h-screen flex-1   bg-dark text-white">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img className="h-10 w-auto" src="/logo.png" alt="Lost in AI" />
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-white">
              {isLogin ? "Accedi alla tua area riservata" : "Registrati"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              {isLogin ? "Non hai un account ? " : "Hai già un account ?"}
              <a
                href={isLogin ? "/register" : "/login"}
                className="font-semibold text-indigo-500 hover:text-indigo-500"
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
        {/*  TODO: Cambiamo foto, magari mettiamo qualcosa tema banca?  */}
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
        />
      </div>
    </div>
  );
}
