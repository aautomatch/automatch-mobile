import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { searchCep } from '../../services/viacep-service';
import { AuthService } from '../../services/auth-service';
import { User } from '../types/user';
import { UserRole } from '../types/user-role';
import { Address } from '../types/address';

const logoUrl = new URL('../assets/images/logos/logo.png', import.meta.url).href;

interface RegisterPageProps {
    onNavigate: (page: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState("INITIAL")
    const { login } = useAuth();

    const [temp, setTemp] = useState({
        zipError: '',
        repeatPass: ''
    })

    const [instructor, setInstructor] = useState({
        hourlyRate: "",
        bio: "",
        yearsExperience: ""
    })

    const [address, setAddress] = useState<Address>({
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        state: '',
        country: 'Brazil',
        zipCode: ''
    })

    const [user, setUser] = useState<User>({
        role: UserRole.STUDENT,
        profileImageUrl: "https://example.com/profiles/carlos.jpg",
        isActive: true,
        email: '',
        password: '',
        fullName: '',
        phone: '',
        address: address
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await AuthService.register(user);
            await login(user.email, user.password);
            onNavigate(user.role === UserRole.INSTRUCTOR ? 'instructor-dashboard' : 'student-dashboard');
        } catch (error) {
            console.error('Erro ao fazer registro:', error);
        } finally {
            setLoading(false);
        }
    };


    async function handleSearchCep(zipCode: string) {
        try {
            const temp = await searchCep(zipCode);
            console.log(temp)

            setAddress(prev => ({
                ...prev,
                street: temp.logradouro,
                neighborhood: temp.bairro,
                city: temp.localidade,
                state: temp.uf,

            }));
        } catch (err) {
            setTemp(prev => ({
                ...prev,
                zipError: "CEP inválido ou não encontrado."
            }));
        }
    }

    function handleOnChangeInstructor(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        setInstructor(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function handleOnChangeAddress(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        setAddress(prev => ({
            ...prev,
            [name]: value
        }));
    }


    function handleOnChangeData(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function stepVerification() {
        const regex = {
            email: /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            fullName: /^[A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+)+$/,
            address: /^[A-Za-zÀ-ÿ0-9]+(?:[\s.-][A-Za-zÀ-ÿ0-9]+)*$/,
            number: /^(\d+|s\/n)$/i
        }

        if (step === "INITIAL") {
            if (!regex.fullName.test(user.fullName.trim())) {
                throw new Error("Por favor, insira o nome e sobrenome")
            }

            if (user.phone.length < 14) {
                throw new Error("Por favor, insira um número de telefone válido")
            }

            if (!regex.email.test(user.email.trim())) {
                throw new Error("E-mail inválido")
            }

            if (user.password.length < 8 || temp.repeatPass.length < 8) {
                throw new Error("A senha deve ser maior que 8 caracteres")
            }

            if (user.password != temp.repeatPass) {
                throw new Error("As senha não coincidem...")
            }
        }

        if (step === "FINAL") {
            if (address.zipCode.length < 9) {
                throw new Error("CEP inválido")
            }

            if (!regex.address.test(address.street.trim())) {
                throw new Error("Por favor, insira um logradouro válido")
            }

            if (!regex.address.test(address.neighborhood.trim())) {
                throw new Error("Por favor, insira um bairro válido")
            }

            if (!regex.number.test(address.number.trim())) {
                throw new Error("Por favor, insira um número de endereço válido")
            }
        }

        // if (step === "EXTRA") {
        //     if (instructor.bio.length < 10) {
        //         throw new Error("Por favor, insira uma pequena apresentação sobre você")
        //     }

        //     if (!(instructor.hourlyRate.length > 4)) {
        //         throw new Error("Valor minimo: 1,00")
        //     }

        //     if (instructor.yearsExperience.length === 0) {
        //         throw new Error("Valor minimo: 0")
        //     }
        // }
    }

    useEffect(() => {
        if (address.zipCode.length >= 8) {
            handleSearchCep(address.zipCode)
        }
    }, [address.zipCode]);

    return (
        <div className="min-h-screen bg-[#F7F9FC] flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <img
                            src={logoUrl}
                            alt="AutoMatch Logo"
                            className="h-16 w-auto"
                        />
                    </div>

                    <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200 mb-3">
                        <span className="text-xs font-medium text-gray-700">
                            Conectando alunos e instrutores
                        </span>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Novo na automatch?
                    </h1>
                    <p className="text-gray-600 text-sm">
                        Crie sua conta gratuitamente
                    </p>
                </div>

                {/* <div className="mb-6">
                    <p className="text-xs text-gray-500 font-medium mb-2">ACESSO RÁPIDO (DEMO)</p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                if (step === "EXTRA") {
                                    setStep("FINAL")
                                }

                                setUser(() => ({ ...user, role: UserRole.STUDENT }))
                            }}
                            className="flex-1 px-3 py-2.5 bg-gradient-to-r from-[#2E5A88] to-[#2E5A88]/90 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1.5 hover:shadow-md transition-all"
                        >
                            <span>👨‍🎓</span>
                            Aluno Demo
                        </button>
                        <button
                            onClick={() => {
                                if (step === "FINAL") {
                                    setStep("EXTRA")
                                }

                                setUser(() => ({ ...user, role: UserRole.INSTRUCTOR }))
                            }}
                            className="flex-1 px-3 py-2.5 bg-gradient-to-r from-[#4CAF50] to-[#4CAF50]/90 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1.5 hover:shadow-md transition-all"
                        >
                            <span>👨‍🏫</span>
                            Instrutor Demo
                        </button>
                    </div>
                </div> */}

                {/* Form principal */}
                <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {step === "INITIAL" && <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                    Nome
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        name='fullName'
                                        type="text"
                                        value={user.fullName}
                                        onChange={handleOnChangeData}
                                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none"
                                        placeholder="Nome Completo"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                    Telefone
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        name='phone'
                                        type="tel"
                                        value={user.phone}
                                        onChange={(e) => {
                                            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 11).replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3')

                                            handleOnChangeData(e)
                                        }}
                                        onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => {
                                            e.preventDefault();

                                            const input = e.target as HTMLInputElement;

                                            input.value = e.clipboardData
                                                .getData('text')
                                                .replace(/\D/g, '')
                                                .slice(0, 11)
                                                .replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3');
                                        }}
                                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none"
                                        placeholder="11 91000-1000"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                    E-mail
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        name='email'
                                        type="email"
                                        value={user.email}
                                        onChange={handleOnChangeData}
                                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none"
                                        placeholder="seu@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                    Tipo de Usuário:
                                </label>

                                <div className="flex flex-wrap items-center justify-center gap-x-[7.5rem] gap-y-3">
                                    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="role"
                                            value={UserRole.INSTRUCTOR}
                                            checked={user.role === UserRole.INSTRUCTOR}
                                            onChange={handleOnChangeData}
                                            className="w-4 h-4 border-gray-300 text-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]"
                                        />
                                        Instrutor
                                    </label>

                                    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="role"
                                            value={UserRole.STUDENT}
                                            checked={user.role === UserRole.STUDENT}
                                            onChange={handleOnChangeData}
                                            className="w-4 h-4 border-gray-300 text-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]"
                                        />
                                        Aluno
                                    </label>
                                </div>

                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                    Senha
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={user.password}
                                        onChange={handleOnChangeData}
                                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none"
                                        placeholder="••••••••"
                                        maxLength={24}
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

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                    Repetir Senha
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        name="repeatpass"
                                        type={showPassword ? 'text' : 'password'}
                                        value={temp.repeatPass}
                                        onChange={(e) => {
                                            setTemp(prev => ({
                                                ...prev,
                                                repeatPass: e.target.value
                                            }))
                                        }}
                                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none"
                                        placeholder="••••••••"
                                        maxLength={24}
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

                        {/* {step === "EXTRA" && <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                    Bio
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        name="bio"
                                        type='text'
                                        value={instructor.bio}
                                        onChange={handleOnChangeInstructor}
                                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none"
                                        placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim iusto esse quis error, id suscipit quod ut, cumque architecto atque minima. Exercitationem quae porro distinctio enim inventore? Fugiat, debitis quia."
                                        maxLength={500}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                    Valor Cobrado (Por Hora)
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        name="hourlyRate"
                                        type='text'
                                        value={instructor.hourlyRate}
                                        onChange={(e) => {
                                            e.target.value = e.target.value
                                                .replace(/\D/g, '')
                                                .replace(/(\d)(\d{2})$/, '$1.$2')

                                            handleOnChangeInstructor(e)
                                        }}
                                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none"
                                        placeholder="000.00"
                                        maxLength={8}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                    Experiência Profissional
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        name="yearsExperience"
                                        type='text'
                                        value={instructor.yearsExperience}
                                        onChange={(e) => {
                                            e.target.value = e.target.value.replace(/\D/g, '')

                                            handleOnChangeInstructor(e)
                                        }}
                                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none"
                                        placeholder="12"
                                        maxLength={2}
                                        required
                                    />
                                </div>
                            </div>
                        </div>} */}

                        {step === "FINAL" && <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                    CEP
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        name="zipCode"
                                        type='text'
                                        value={address.zipCode}
                                        onChange={(e) => {
                                            e.target.value = e.target.value.replace(/\D/g, '').replace(/(\d{5})(\d{3})$/, '$1-$2')
                                            handleOnChangeAddress(e)
                                        }}
                                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none"
                                        placeholder="00000-000"
                                        maxLength={8}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                    Estado
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        disabled={true}
                                        name="state"
                                        type='text'
                                        value={address.state}
                                        onChange={handleOnChangeAddress}
                                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none"
                                        placeholder="SP"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                    Cidade
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        disabled={true}
                                        name="city"
                                        type='text'
                                        value={address.city}
                                        onChange={handleOnChangeAddress}
                                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none"
                                        placeholder="Embu Guaçu"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                    Logradouro
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        name="street"
                                        type='text'
                                        value={address.street}
                                        onChange={handleOnChangeAddress}
                                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none"
                                        placeholder="Rua amendoim"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                    Bairro
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        name="neighborhood"
                                        type='text'
                                        value={address.neighborhood}
                                        onChange={handleOnChangeAddress}
                                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none"
                                        placeholder="Avenida Jaquatirica"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                    Número
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        name="number"
                                        type='text'
                                        value={address.number}
                                        onChange={(e) => {
                                            e.target.value = e.target.value.replace(/\D/g, '')
                                            handleOnChangeAddress(e)
                                        }}
                                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent outline-none"
                                        placeholder="1001"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        required
                                    />
                                </div>
                            </div>
                        </div>}

                        <button
                            type={step === "FINAL" ? "submit" : "button"}
                            onClick={() => {
                                try {
                                    stepVerification()
                                    setStep("FINAL")
                                } catch (err) {
                                    if (err instanceof Error) {
                                        alert(err.message);
                                    }
                                }
                            }}
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-[#FF9800] to-[#F57C00] text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                        >
                            {loading ? (
                                'Carregando...'
                            ) : (
                                <>
                                    <span>{step === "FINAL" ? "Criar Conta Grátis" : "Proseguir para próxima etapa"}</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                </>
                            )}
                        </button>

                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <p className="text-gray-600">
                            Já tem uma conta?{' '}
                            <button
                                onClick={() => onNavigate('login')}
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
        </div >
    );
};