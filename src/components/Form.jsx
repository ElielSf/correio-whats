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
        let response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        let data = await response.json();

        if (data.erro && data.erro === true) {
            console.log('erro verdadeiro');
            setEndereco(null);
            setError(true); 
        } else {
            console.log('erro falso');
            setEndereco(data);
            setError(false); 
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
                <form className='Card__form' onSubmit={enviarDados}>
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
                        placeholder='Ex: 12345678'
                        max='99999999'
                        required />
                
                    <button className='Button--send' type='submit' onClick={enviarDados}>Enviar dados</button>
                </form>
            </div>
            {(error) && (
                <div className='Card'>
                    <h2 className='Card__error'>O CEP digitado não foi encontrado</h2>
                </div>
                )
            }
            {(endereco !== null) && (
                <div className='Card'>
                    <h3 className='Card__field'>Estado</h3>
                    <p>
                        <input className='Card__input'
                            value={endereco.uf}
                            type='text'
                            readOnly />
                    </p>

                    <h3 className='Card__field'>Cidade</h3>
                    <p>
                        <input className='Card__input'
                            value={endereco.localidade}
                            readOnly />
                    </p>

                    <h3 className='Card__field'>Bairro</h3>
                    <p>
                        <input className='Card__input'
                            value={endereco.bairro}
                            readOnly />
                    </p>

                    <h3 className='Card__field'>Localidade</h3>
                    <p>
                        <input className='Card__input'
                            value={endereco.logradouro}
                            readOnly />
                    </p>

                    <button className='Button--whatsapp' onClick={chamarWhatsapp}>Enviar para o Whatsapp</button>
                </div>
                )
            }

        </div>
    )
}
