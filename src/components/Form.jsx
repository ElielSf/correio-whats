import { useState } from 'react';
import '../css/Form.css'

export default function Form() {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [cep, setCep] = useState(null);

    const [error, setError] = useState(false);
    const [endereco, setEndereco] = useState(null);

    const enviarDados = async () => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro && data.erro === true) {
                setError(true);
                return;
            }

            setEndereco(data);
        } catch (error) {
            setEndereco(null);
        }
    }

    const chamarWhatsapp =  async () => {
        const mensagem = encodeURIComponent(`Olá ${nome},\nEstou mandando está mensagem com a localização do local:\nEstado: ${endereco.uf}\nCidade: ${endereco.localidade}\nBairro: ${endereco.bairro}\nLocalidade: ${endereco.logradouro} `);
        const link = (`https://api.whatsapp.com/send?phone=${telefone}&text=${mensagem}`);
        
        window.open(link);
    }

    return (
        <div className='Form'>
            <div className='Card'>
                <div className='Card__form'>
                    <h3 className='Card__field'>Nome</h3>
                    <input className='Card__input'
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        type='text'
                        placeholder='Ex: João Souza'
                        required />

                    <h3 className='Card__field'>Telefone</h3>
                    <input className='Card__input'
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        type='text'
                        placeholder='Ex: 5575912345678'
                        required />

                    <h3 className='Card__field'>Email</h3>
                    <input className='Card__input'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type='text'
                        placeholder='Ex: alguem@algo.algo'
                        required />

                    <h3 className='Card__field'>CEP</h3>
                    <input className='Card__input'
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        type='number'
                        min='0'
                        placeholder='Ex: 12345678'
                        required />
                
                    <button className='Button--send' onClick={enviarDados}>Enviar dados</button>
                </div>
            </div>
            {error && (
                <div className='Card'>
                    <div className='Card__error'>
                        <h1 className='Card__cep-error'>Cep inválido</h1>
                    </div>
                </div>
            )
            }
            {endereco ? (
                <div className='Card'>
                    <div className='Card__address'>
                        <h3 className='Card__field'>Estado</h3>
                        <input className='Card__input'
                            value={endereco.uf}
                            type='text'
                            readOnly
                            />

                        <h3 className='Card__field'>Cidade</h3>
                        <input className='Card__input'
                            value={endereco.localidade}
                            type='text'
                            readOnly
                            />

                        <h3 className='Card__field'>Bairro</h3>
                        <input className='Card__input'
                            value={endereco.bairro}
                            type='text'
                            readOnly
                            />
                    
                        <h3 className='Card__field'>Localidade</h3>
                        <input className='Card__input'
                            value={endereco.logradouro}
                            type='text'
                            readOnly
                            />
                    
                        <button className='Button--whatsapp' onClick={chamarWhatsapp}>Enviar para Whatsapp</button>
                    </div>
                </div>
                ) : (
                    ''
                )
            }

        </div>
    )
}
