function AddTask(e){
    e.preventDefault();
    const input=document.getElementById('new-input');
    const list_ele=document.getElementById('tasks');

        const task=input.value;
        if (task==="")
            alert("You Must Write Something!!");
        else {
        const task_ele=document.createElement('div');
        task_ele.classList.add('task');
    
        const task_content=document.createElement('div');
        task_content.classList.add('content');
    
        task_ele.appendChild(task_content);
    
        const task_input= document.createElement('input');
        task_input.classList.add('text');
        task_input.type='text';

        task_input.value=task;
        
        task_input.setAttribute('readonly','readonly');
    
        task_content.appendChild(task_input);

        const task_actions=document.createElement('div');
        task_actions.classList.add('actions');
    
        const task_edit= document.createElement('button');
        task_edit.classList.add('edit');
        task_edit.innerText='Edit';
        task_actions.appendChild(task_edit);
    
        const task_delete= document.createElement('button');
        task_delete.classList.add('delete');
        task_delete.innerText='Delete';
        task_actions.appendChild(task_delete);
    
        task_ele.appendChild(task_actions);
        list_ele.appendChild(task_ele);
    
        input.value='';
        task_edit.addEventListener('click',(e) =>{
            if(task_edit.innerText.toLowerCase()=="edit")
            {
                task_edit.innerText="Save";
                task_input.removeAttribute("readonly");
                task_input.focus();
            }
            else{
                if(task_input.value==="")
                {
                    list_ele.removeChild(task_ele);
                    alert("The edited text is empty");
                }
                task_edit.innerText="Edit";
                task_input.setAttribute("readonly","readonly");
                
            }
    
        });
        
        task_delete.addEventListener('click',(e)=>{
            list_ele.removeChild(task_ele);
        });
    
        clear.addEventListener('click',()=>{
            
            list_ele.innerHTML="";
            input.value="";
            // let child=list_ele.lastElementChild;
            // while(child)
            // {
            //     list_ele.removeChild(child);
            //     child=list_ele.lastElementChild;
            // }
        })
    
    }
}
window.addEventListener('load',()=> {
const form=document.getElementById('new-task');
form.addEventListener('submit',AddTask);
});