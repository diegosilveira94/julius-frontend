import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../../components/AuthShell";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { validateLogin } from "../../utils/validators";

function Login() {
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validation = validateLogin(form);
    setErrors(validation);
    if (Object.keys(validation).length) return;

    setLoading(true);
    try {
      await login(form);
      toast.success("Bem-vindo de volta!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Não foi possível entrar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell title="Entrar" subtitle="Acesse sua conta">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="E-mail"
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="voce@email.com"
        />
        <Input
          label="Senha"
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="••••••"
        />
        <Button type="submit" loading={loading} className="mt-2">
          Entrar
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-400">
        Não tem conta?{" "}
        <Link to="/register" className="text-primary hover:underline">
          Cadastre-se
        </Link>
      </p>
    </AuthShell>
  );
}

export default Login;
