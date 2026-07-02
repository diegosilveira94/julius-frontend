import logo from "../../assets/img/logo-julius.png";

function AuthShell({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-xl">
        <img src={logo} alt="Julius" className="mx-auto max-h-24" />
        {title && (
          <h1 className="mt-4 text-center text-xl font-semibold text-gray-100">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="mt-1 text-center text-sm text-gray-400">{subtitle}</p>
        )}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

export default AuthShell;
