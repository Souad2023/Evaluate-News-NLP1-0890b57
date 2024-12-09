import './styles/base.sass';
import './styles/footer.sass';
import './styles/header.sass'; 
import './styles/form.sass';
import './styles/resets.sass';



import { checkForName } from './js/nameChecker';
import { handleSubmit } from './js/formHandler';


console.log(checkForName);


document.getElementById('name').addEventListener('blur', function() {
    const name = document.getElementById('name').value;
    checkForName(name); 
});

export { handleSubmit }; 

