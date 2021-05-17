console.log('Javascript funcionado');

function validaCPF(cpf) {
    if (cpf.length != 11){
        return false;
    } 
    else {
        var numeros = cpf.substring(0, 9);
        var digitos = cpf.substring(9);
        
        var soma = 0;
        for (var i = 10; i > 1; i--) { 
            soma += numeros.charAt(10 - i) * i;
        }
        
        var resultado = (soma % 11) < 2 ? 0 : 11 - (soma % 11);

        //Validação do primeiro dígito verificador
        if (resultado != digitos.charAt(0)) {
            return false;
        }

        soma = 0;
        numeros = cpf.substring(0, 10);

        for (var k = 11; k > 1; k--) {
            soma += numeros.charAt(11 - k) * k;
        }

        resultado = (soma % 11) < 2 ? 0 : 11 - (soma % 11);

        //Validação do segundo dígito verificador
        if (resultado != digitos.charAt(1)) {
            return false;
        }

        return true; 
    }
}

function validacao() {
    console.log('Iniciando validação do CPF');

    var cpf = document.getElementById('cpf_digitado').value;
    console.log(cpf);

    var resultadoValidacao = validaCPF(cpf);

    if (resultadoValidacao) {
        alert('Cadastro feito com sucesso!');
    } 
    else {
        alert('Seu CPF não é válido!')
    }
}

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep
    document.getElementById('endreco').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('uf').value=("");
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores
    document.getElementById('endereco').value=(conteudo.logradouro);
    document.getElementById('bairro').value=(conteudo.bairro);
    document.getElementById('cidade').value=(conteudo.localidade);
    document.getElementById('uf').value=(conteudo.uf);
} 
else {
    //CEP não Encontrado
    limpa_formulário_cep();
    alert("CEP não encontrado.");
}
}

function pesquisacep(valor) {

//Nova variável "cep" somente com dígitos
var cep = valor.replace(/\D/g, '');

//Verifica se campo cep possui valor informado
if (cep != "") {

    //Expressão regular para validar o CEP
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if(validacep.test(cep)) {

        document.getElementById('cep').value = cep.substring(0,5) +"-" + cep.substring(5);

        //Preenche os campos com "..." enquanto consulta webservice
        document.getElementById('endereco').value="...";
        document.getElementById('bairro').value="...";
        document.getElementById('cidade').value="...";
        document.getElementById('uf').value="...";

        //Cria um elemento javascript
        var script = document.createElement('script');

        //Sincroniza com o callback
        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

        //Insere script no documento e carrega o conteúdo
        document.body.appendChild(script);

    } 
    else {
        //cep é inválido
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
    }
} 
else {
    //cep sem valor, limpa formulário
    limpa_formulário_cep();
}
};
