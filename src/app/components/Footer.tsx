import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  Shield,
} from "lucide-react";

const logoUrl = new URL("../assets/images/logos/logo.png", import.meta.url).href;

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="container mx-auto px-4 pt-6 pb-4">

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">

          <div className="space-y-3">
            <img
              src={logoUrl}
              alt="AutoMatch Logo"
              className="h-10 w-auto"
            />

            <div className="flex gap-2 pt-1">
              {[Facebook, Instagram, Twitter].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center
                             text-gray-500 hover:bg-[#2E5A88]/10 hover:text-[#2E5A88]
                             transition-colors duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
              Produto
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                "Sobre Nós",
                "Como Funciona",
                "Seja um Instrutor",
                "Blog",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-[#2E5A88] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
              Suporte
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                "Central de Ajuda",
                "FAQ",
                "Termos de Uso",
                "Política de Privacidade",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-[#2E5A88] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
              Contato
            </h3>
            <ul className="space-y-3 text-sm text-gray-500">
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

        <div className="border-t border-gray-100 pt-4 flex flex-col md:flex-row
                        items-center justify-between gap-3 text-xs text-gray-500">

          <p>
            © {new Date().getFullYear()} AutoMatch. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Plataforma segura com instrutores verificados
          </div>
        </div>
      </div>
    </footer>
  );
};
