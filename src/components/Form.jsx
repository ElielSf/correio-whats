import { useState } from 'react';
import '../css/Form.css'

export default function Form() {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [cep, setCep] = useState(null);
    const [error, setError] = useState(null);
    const [address, setAddress] = useState(null);

    const [whatsapp, setWhatsapp] = useState(false);
    const [endereco, setEndereco] = useState(null);

    /*const chamarWhatsapp = () => {
        setWhatsapp(ende)
    }*/


    const enviarDados = async () => {
        let response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        let data = await response.json();

        if (data.erro && data.erro === true) {
            console.log('erro verdadeiro');
            setAddress(false);
            setError(true); 
        } else {
            console.log('erro falso');
            setAddress(true);
            setError(false); 
        }

        setWhatsapp(true);
    }

    const chamarWhatsapp =  async () => {
        const mensagem = (`h`);
        const link = (`https://api.whatsapp.com/send?phone=seunumerodetelefone&text=sua%20mensagem`);
        
        window.open(link);
    }

    return (
        <div className='Form'>
            <div className='Card'>
                <h3 className='Card__field'>Nome Completo</h3>
                <input className='Card__input'
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    type='text'
                    required />

                <h3 className='Card__field'>Telefone</h3>
                <input className='Card__input'
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    type='text'
                    required />

                <h3 className='Card__field'>Email</h3>
                <input className='Card__input'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type='text'
                    required />

                <h3 className='Card__field'>CEP</h3>
                <input className='Card__input'
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    type='number'
                    max='8'
                    required />

                {whatsapp ? (
                    <button className='Button--whatsapp' onClick={chamarWhatsapp}>Enviar para o Whatsapp</button>
                ) : (
                    <button className='Button--send' onClick={enviarDados}>Enviar dados</button>
                )
                }
            </div>
            {error && (<h1>erro</h1>)}
            {address && (<h1>a</h1>)}

        </div>
    )
}
