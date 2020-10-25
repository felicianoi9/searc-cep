const configs = {
    method: 'GET'
}

const results = document.getElementById('results');

const searchcep = (event) => {
    startPreloader();  

    results.style.display = 'none';  

    search()

    event = event || window.event;
    if (event.preventDefault) event.preventDefault();
    if (event.preventValue) event.preventValue();
    return false;
}

const search = async () => {   

    const cep = document.getElementById('cep').value;

    console.log(cep);

    if (cep != '' && cep !='undefined' && cep !=null) {

        const result = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`, configs);

        const data = await result.json();

        console.log({
            'data': data,
            'result': result,
            'status': result.status
        })

        if (result.status==200) {
            showResults(data);
        } else {
            results.style.display = 'none';  
            showErrors(data)
        }
    } else {
        swal("Ops!", "Digite um CEP válido!" , "info");
    }

    endPreloader();
   
}


const showResults = (address) => {
        
    results.style.display = 'block';
    const html = `
        <ul class="">
            <li class="list-group-item"><strong>CEP:</strong> ${address.cep} </li>
            <li class="list-group-item"><strong>Cidade:</strong> ${address.city}</li>
            <li class="list-group-item"><strong>Estado:</strong> ${address.state} </li>
            <li class="list-group-item"><strong>Rua:</strong> ${address.street} </li>
            <li class="list-group-item"><strong>Bairro:</strong> ${address.neighborhood}</li>
            
        </ul>
    `;

    results.innerHTML = html;
 
}

const showErrors = (error) => {  
   
    swal("Ops!", `${error.errors[0].message}` , "info");

}
