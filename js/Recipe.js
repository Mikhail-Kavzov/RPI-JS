
    checkRecipe();
     function createSaveRecipe()
    {
        let recSave=document.createElement('div');
        recSave.id='recipe-saved';
        let icon=document.createElement('i');
        icon.classList.add('fa-solid','fa-check');
        recSave.appendChild(icon);
        let spanSave=document.createElement('span');
        spanSave.textContent='Recipe saved';
        recSave.appendChild(spanSave);
        return recSave;


    }
    function createSaveBtn()
    {
        let btn=document.createElement('button');
        btn.classList.add('get-recipe-btn');
        btn.id='btn-recipe-save-recipe';
        btn.textContent='SAVE RECIPE';
        return btn;
    }
    function generateModalWindow()
    {
        let modalWindow=document.createElement('div');
        modalWindow.classList.add('modal');
        let modalContent=document.createElement('div');
        modalContent.classList.add('modal_content');
        let modalExecute=document.createElement('div');
        modalExecute.classList.add('modal_execute');
        let spanEl=document.createElement('span');
        spanEl.classList.add('new_title_Directions_v');
        spanEl.textContent='Saving a recipe';
        let modClose=document.createElement('div');
        modClose.classList.add('modal_close');
       
        modClose.onclick = function () {
            
                modalWindow.remove();
             }
        const cross=0xD7;
        modClose.textContent=String.fromCharCode(cross);
        modalExecute.appendChild(spanEl);
        modalExecute.appendChild(modClose);
        
        let spanInform=document.createElement('span');
        spanInform.classList.add('info_block_text_modal');
        spanInform.textContent='The selected recipe has been successfully saved!';
        modalContent.appendChild(modalExecute);
        modalContent.appendChild(spanInform);
        
        modalWindow.appendChild(modalContent);
        return modalWindow;

    }
   function checkRecipe() {
        const timeWindow=5000;
        let flag=localStorage.getItem('btnRecipe');
      
        let infoBlock=document.querySelector('.info_block_iconWithButton');
        if (flag === null) {
            let getRecipeBtn=createSaveBtn();
            infoBlock.appendChild(getRecipeBtn);
                getRecipeBtn.onclick = function () {
        
                    getRecipeBtn.remove();
                    localStorage.setItem('btnRecipe', 'true');
                    infoBlock.appendChild(createSaveRecipe());
                    let modal= generateModalWindow();
                    document.body.appendChild(modal);                   
                    setTimeout(() => {
                     modal.remove();                 
                    }, timeWindow);
                    
                    
                }
            }
            else
            {
                infoBlock.appendChild(createSaveRecipe());
            }

        }


