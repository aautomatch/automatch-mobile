import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { searchCep } from '../services/viacep-service';

const logoUrl = new URL('../assets/images/logos/logo.png', import.meta.url).href;

interface RegisterPageProps {
    onNavigate: (page: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(0)

    const [data, setData] = useState({
        email: '',
        password: '',
        name: '',
        phone: '',
        address: {
            street: '',
            number: '',
            neighborhood: '',
            city: '',
            state: '',
            country: 'Brazil',
            zip_code: '',
            error: ''
        }
    })

    async function handleSearchCep(zipCode: string) {
        try {
            const temp = await searchCep(zipCode);
            setData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    street: temp.logradouro,
                    neighborhood: temp.bairro,
                    city: temp.localidade,
                    state: temp.estado,
                }
            }));
        } catch (err) {
            setData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    error: "CEP inválido ou não encontrado"
                }
            }));
        }
    }

    useEffect(() => {
        console.log("a")
        if (data.address.zip_code.length >= 8) {
            handleSearchCep(data.address.zip_code)
        }
    }, [data.address.zip_code]);


    function handleOnChangeData(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value, dataset } = e.target;

        if (dataset.scope === "address") {
            setData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [name]: value.replace(/\D/g, "")
                }
            }));
            return;
        }

        setData(prev => ({
            ...prev,
            [name]: value
        }));
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center mb-4">
                        <img
                            src={logoUrl}
                            alt="AutoMatch Logo"
                            className="h-32 w-auto"
                        />
                    </div>
                    <p className="text-gray-600">
                        Crie sua conta gratuitamente
                    </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                    <div className="flex gap-2">
                        <button
                            className="flex-1 px-3 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                        >
                            Aluno
                        </button>
                        <button
                            className="flex-1 px-3 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                        >
                            Instrutor
                        </button>
                    </div>
                </div>







                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <form className="space-y-6">

                        {step == 0 && <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nome
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        name='name'
                                        type="text"
                                        value={data.name}
                                        onChange={handleOnChangeData}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E5A88] focus:border-transparent outline-none transition-all duration-300"
                                        placeholder="Nome Completo"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Telefone
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        name='phone'
                                        type="tel"
                                        value={data.phone}
                                        onChange={handleOnChangeData}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E5A88] focus:border-transparent outline-none transition-all duration-300"
                                        placeholder="11 91000-1000"
                                        required
                                    />
                                </div>
                            </div>
                        </div>}





                        {step == 1 && <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    E-mail
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        name='email'
                                        type="email"
                                        value={data.email}
                                        onChange={handleOnChangeData}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E5A88] focus:border-transparent outline-none transition-all duration-300"
                                        placeholder="seu@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Senha
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={handleOnChangeData}
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E5A88] focus:border-transparent outline-none transition-all duration-300"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>}




                        {step == 2 && <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    CEP
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        name="zip_code"
                                        data-scope="address"
                                        type='text'
                                        value={data.address.zip_code}
                                        onChange={handleOnChangeData}
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E5A88] focus:border-transparent outline-none transition-all duration-300"
                                        placeholder="00000-000"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Estado
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        name="state"
                                        data-scope="address"
                                        type='text'
                                        value={data.address.state}
                                        onChange={handleOnChangeData}
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E5A88] focus:border-transparent outline-none transition-all duration-300"
                                        placeholder="São Paulo"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Cidade
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        name="city"
                                        data-scope="address"
                                        type='text'
                                        value={data.address.city}
                                        onChange={handleOnChangeData}
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E5A88] focus:border-transparent outline-none transition-all duration-300"
                                        placeholder="Embu das Artes"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Bairro
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        name="neighborhood"
                                        data-scope="address"
                                        type='text'
                                        value={data.address.neighborhood}
                                        onChange={handleOnChangeData}
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E5A88] focus:border-transparent outline-none transition-all duration-300"
                                        placeholder="Paque das Chacaras"
                                        required
                                    />
                                </div>
                            </div>


                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Logradouro
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        name="street"
                                        data-scope="address"
                                        type='text'
                                        value={data.address.street}
                                        onChange={handleOnChangeData}
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E5A88] focus:border-transparent outline-none transition-all duration-300"
                                        placeholder="Rua amendoim"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Número
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        name="number"
                                        data-scope="address"
                                        type='text'
                                        value={data.address.number}
                                        onChange={handleOnChangeData}
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E5A88] focus:border-transparent outline-none transition-all duration-300"
                                        placeholder="1001"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        required
                                    />
                                </div>
                            </div>
                        </div>}

                        <button
                            type={step >= 2 ? "submit" : "button"}
                            onClick={() => { step < 2 ? setStep(step + 1) : null }}
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-[#FF9800] to-[#F57C00] text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                        >
                            {loading ? (
                                'Carregando...'
                            ) : (
                                <>
                                    <span>{step >= 2 ? "Criar Conta Grátis" : "Proseguir para próxima etapa"}</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                </>
                            )}
                        </button>

                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <p className="text-gray-600">
                            Já tem uma conta?{' '}
                            <button
                                // onClick={() => setIsLogin(!isLogin)}
                                onClick={() => onNavigate('register')}
                                className="text-[#2E5A88] hover:text-[#1E3A5F] font-medium transition-colors duration-300"
                            >
                                Fazer login
                            </button>
                        </p>
                    </div>
                </div>











                <div className="text-center mt-8">
                    <button
                        onClick={() => onNavigate('home')}
                        className="text-gray-600 hover:text-gray-900 transition-colors duration-300 inline-flex items-center gap-2"
                    >
                        <ArrowRight className="w-4 h-4 rotate-180" />
                        Voltar para a página inicial
                    </button>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        🔒 Seus dados estão seguros conosco • Criptografia de ponta a ponta
                    </p>
                </div>


            </div>
        </div>
    );
};