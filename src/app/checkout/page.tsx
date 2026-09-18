"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useCart } from "@/context/CartContext";

interface CheckoutValues {
  fullName: string;
  email: string;
  paymentMethod: string;
  acceptedTerms: boolean;
}

type CheckoutField = keyof CheckoutValues;

const initialValues: CheckoutValues = {
  fullName: "",
  email: "",
  paymentMethod: "",
  acceptedTerms: false,
};

function getErrors(values: CheckoutValues) {
  return {
    fullName:
      values.fullName.trim().length < 5
        ? "Debes ingresar un nombre de al menos 5 caracteres, si tu nombre no tiene más de 5 caracteres, invéntese uno."
        : "",
    email:
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) === false
        ? "Ingresa un correo válido, puede ser inventado xd, pero tiene que tener @ y dominio"
        : "",
    paymentMethod: values.paymentMethod ? "" : "Debes seleccionar un método de pago válido dentro de las opciones disponibles.",
    acceptedTerms: values.acceptedTerms ? "" : "Si no acepta los términos y condiciones no puede continuar con la compra.",
  };
}

export default function CheckoutPage() {
  const { cart, totalPrice } = useCart();
  const [values, setValues] = useState<CheckoutValues>(initialValues);
  const [touched, setTouched] = useState<Record<CheckoutField, boolean>>({
    fullName: false,
    email: false,
    paymentMethod: false,
    acceptedTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const errors = getErrors(values);
  const hasErrors = Object.values(errors).some(Boolean);

  const updateField = <Field extends CheckoutField>(
    field: Field,
    value: CheckoutValues[Field]
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
    setIsCompleted(false);
  };

  const markAsTouched = (field: CheckoutField) => {
    setTouched((current) => ({ ...current, [field]: true }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      paymentMethod: true,
      acceptedTerms: true,
    });

    if (hasErrors || cart.length === 0) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setValues(initialValues);
    setTouched({
      fullName: false,
      email: false,
      paymentMethod: false,
      acceptedTerms: false,
    });
    setIsCompleted(true);
    setIsSubmitting(false);
  };

  if (isCompleted) {
    return (
      <section className="max-w-2xl mx-auto text-center space-y-5 py-12 text-slate-800">
        <div className="text-6xl" aria-hidden="true">✓</div>
        <h1 className="text-3xl font-extrabold text-slate-900">Pedido confirmado</h1>
        <p className="text-slate-600">
          Tu compra fue procesada correctamente. Gracias por elegir ShopHub.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition"
        >
          Volver al catálogo
        </Link>
      </section>
    );
  }


  return (
    <section className="max-w-5xl mx-auto space-y-8 text-slate-800">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-extrabold text-slate-900">Finalizar compra</h1>
        <p className="text-slate-600 mt-1">Verifica tu orden y completa tus datos de facturación.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-5">
          <h2 className="text-xl font-bold text-slate-900">Datos de facturación</h2>

          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-sm font-semibold">Nombre completo</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={values.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
              onBlur={() => markAsTouched("fullName")}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              aria-invalid={Boolean(touched.fullName && errors.fullName)}
              aria-describedby="fullName-error"
            />
            {touched.fullName && errors.fullName && <p id="fullName-error" className="text-sm text-red-600">{errors.fullName}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold">Correo de facturación</label>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={(event) => updateField("email", event.target.value)}
              onBlur={() => markAsTouched("email")}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              aria-invalid={Boolean(touched.email && errors.email)}
              aria-describedby="email-error"
            />
            {touched.email && errors.email && <p id="email-error" className="text-sm text-red-600">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="paymentMethod" className="block text-sm font-semibold">Método de pago</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={values.paymentMethod}
              onChange={(event) => updateField("paymentMethod", event.target.value)}
              onBlur={() => markAsTouched("paymentMethod")}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Selecciona una opción</option>
              <option value="card">Tarjeta</option>
              <option value="pse">Efectivo</option>
              <option value="cash">Pago con culilto</option>
            </select>
            {touched.paymentMethod && errors.paymentMethod && <p className="text-sm text-red-600">{errors.paymentMethod}</p>}
          </div>

          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              name="acceptedTerms"
              checked={values.acceptedTerms}
              onChange={(event) => updateField("acceptedTerms", event.target.checked)}
              onBlur={() => markAsTouched("acceptedTerms")}
              className="mt-1 h-4 w-4 accent-blue-600"
            />
            <span>Acepto los términos y condiciones de la compra (Igual nadie los lee).</span>
          </label>
          {touched.acceptedTerms && errors.acceptedTerms && <p className="text-sm text-red-600">{errors.acceptedTerms}</p>}

          <button
            type="submit"
            disabled={isSubmitting || hasErrors}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition"
          >
            {isSubmitting ? "Procesando pedido..." : "Confirmar pedido"}
          </button>
          {isSubmitting && <p className="text-center text-sm text-slate-500" role="status">Su pago se está procesando!.</p>}
        </form>

        <aside className="bg-slate-900 text-white p-6 rounded-xl space-y-5 lg:sticky lg:top-24">
          <h2 className="text-xl font-bold">Resumen de compra</h2>
          <div className="divide-y divide-slate-700">
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className="py-3 flex justify-between gap-4 text-sm">
                <span>{product.title} <span className="text-slate-400">x{quantity}</span></span>
                <span className="font-semibold">${(product.price * quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-700 pt-4 flex justify-between items-center">
            <span className="text-slate-300">Total a pagar</span>
            <span className="text-2xl font-black">${totalPrice.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </section>
  );
}