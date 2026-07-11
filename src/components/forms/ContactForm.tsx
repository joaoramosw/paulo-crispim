"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/contact";
import { ContactField } from "./ContactField";

const interestOptions = [
  "Palestra corporativa",
  "Evento ou convenção",
  "Encontro de liderança",
  "Semana acadêmica ou profissional",
  "Outro",
];

type FormState = {
  name: string;
  email: string;
  whatsapp: string;
  company: string;
  interest: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  whatsapp: "",
  company: "",
  interest: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isRedirecting, setIsRedirecting] = useState(false);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validate() {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) nextErrors.name = "Informe seu nome.";
    if (!form.email.trim()) nextErrors.email = "Informe seu e-mail.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Informe um e-mail válido.";
    if (!form.whatsapp.trim()) nextErrors.whatsapp = "Informe seu WhatsApp.";
    if (!form.company.trim()) nextErrors.company = "Informe a empresa ou organização.";
    if (!form.interest) nextErrors.interest = "Selecione o interesse principal.";
    if (!form.message.trim()) nextErrors.message = "Escreva uma mensagem breve.";
    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsRedirecting(true);
    const structuredMessage = `Olá, Paulo Crispim.\n\nGostaria de solicitar informações sobre uma palestra.\n\nNome: ${form.name}\nEmpresa: ${form.company}\nE-mail: ${form.email}\nWhatsApp: ${form.whatsapp}\nInteresse: ${form.interest}\nMensagem: ${form.message}`;
    window.open(getWhatsAppUrl(structuredMessage), "_blank", "noopener,noreferrer");
    window.setTimeout(() => setIsRedirecting(false), 900);
  }

  return (
    <form onSubmit={handleSubmit} className="border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <ContactField label="Nome" name="name" value={form.name} onChange={(event) => updateField("name", event.target.value)} error={errors.name} autoComplete="name" />
        <ContactField label="E-mail" name="email" type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} error={errors.email} autoComplete="email" />
        <ContactField label="WhatsApp" name="whatsapp" value={form.whatsapp} onChange={(event) => updateField("whatsapp", event.target.value)} error={errors.whatsapp} autoComplete="tel" />
        <ContactField label="Empresa ou organização" name="company" value={form.company} onChange={(event) => updateField("company", event.target.value)} error={errors.company} autoComplete="organization" />
        <div className="sm:col-span-2">
          <ContactField kind="select" label="Interesse principal" name="interest" options={interestOptions} value={form.interest} onChange={(event) => updateField("interest", event.target.value)} error={errors.interest} />
        </div>
        <div className="sm:col-span-2">
          <ContactField kind="textarea" label="Mensagem" name="message" value={form.message} onChange={(event) => updateField("message", event.target.value)} error={errors.message} helper="Ao enviar, você será direcionado ao WhatsApp oficial com a mensagem preenchida." />
        </div>
      </div>
      <button type="submit" disabled={isRedirecting} className="group mt-7 inline-flex min-h-12 w-full items-center justify-center gap-3 overflow-hidden border border-[#35F06A] bg-[#35F06A] px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-[#050708] transition hover:bg-[#C8F8D2] disabled:cursor-wait disabled:opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050708] sm:w-auto">
        {isRedirecting ? "Abrindo WhatsApp" : "Solicitar uma palestra"}
        <Send aria-hidden="true" className="h-4 w-4 transition group-hover:translate-x-1" />
      </button>
    </form>
  );
}
