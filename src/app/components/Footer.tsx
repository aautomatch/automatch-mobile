import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";

const logoUrl = new URL("../assets/images/logos/logo.png", import.meta.url).href;

export const Footer: React.FC = () => {
  return (
<footer className="bg-gradient-to-r from-[#2E5A88]/30 via-white/85 to-[#4CAF50]/30 backdrop-blur border-t border-gray-100">
  <div className="h-[2px] bg-gradient-to-r from-[#2E5A88] to-[#4CAF50]" />

  <div className="w-full px-4 sm:px-6 py-10">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">

      <div className="space-y-4">
        <img src={logoUrl} alt="AutoMatch Logo" className="h-10 w-auto" />
        <p className="text-sm text-gray-600 leading-relaxed">
          Conectamos alunos a instrutores de direção qualificados, com
          segurança, flexibilidade e transparência.
        </p>
        <div className="flex gap-3">
          {[Facebook, Instagram, Twitter].map((Icon, index) => (
            <a
              key={index}
              href="#"
              aria-label="Rede social AutoMatch"
              className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#2E5A88] hover:border-[#2E5A88]/40 transition"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
          Produto
        </h3>
        <ul className="space-y-3 text-sm">
          {["Sobre nós", "Como funciona", "Seja um instrutor", "Blog"].map(
            (item) => (
              <li key={item}>
                <a
                  href="#"
                  className="group relative text-gray-600 hover:text-[#2E5A88] transition"
                >
                  {item}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-[#2E5A88] to-[#4CAF50] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            )
          )}
        </ul>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
          Suporte
        </h3>
        <ul className="space-y-3 text-sm">
          {["Central de ajuda", "FAQ", "Termos de uso", "Política de privacidade"].map(
            (item) => (
              <li key={item}>
                <a
                  href="#"
                  className="group relative text-gray-600 hover:text-[#2E5A88] transition"
                >
                  {item}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-[#2E5A88] to-[#4CAF50] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            )
          )}
        </ul>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
          Contato
        </h3>
        <ul className="space-y-4 text-sm text-gray-600">
          <li className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400" />
            contato@automatch.com
          </li>
          <li className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-400" />
            (11) 3000-0000
          </li>
        </ul>
      </div>
    </div>

    <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-gray-500">
      <p>© {new Date().getFullYear()} AutoMatch. Todos os direitos reservados.</p>
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#4CAF50]" />
        Plataforma segura com instrutores verificados
      </div>
    </div>
  </div>
</footer>
  );
};
