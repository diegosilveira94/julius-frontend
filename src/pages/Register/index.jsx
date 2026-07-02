import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../../components/AuthShell";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useToast } from "../../hooks/useToast";
import { authService } from "../../services/authService";
import { validateRegister } from "../../utils/validators";

function Register() {
  const toast = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validation = validateRegister(form);
    setErrors(validation);
    if (Object.keys(validation).length) return;

    setLoading(true);
    try {
      await authService.register(form);
      toast.success("Conta criada! Faça login para continuar.");
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Não foi possível criar a conta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell title="Criar conta" subtitle="Comece a controlar suas despesas">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Nome"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Seu nome"
        />
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
          placeholder="mínimo 6 caracteres"
        />
        <Button type="submit" loading={loading} className="mt-2">
          Cadastrar
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-400">
        Já tem conta?{" "}
        <Link to="/login" className="text-primary hover:underline">
          Entrar
        </Link>
      </p>
    </AuthShell>
  );
}

export default Register;
