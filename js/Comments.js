

let btnPost=document.getElementById('btn-post');
let commentTextField=document.getElementById('commentTextField');
let PagesList=document.querySelectorAll('.Comment-Page-num');
let BlockPages=document.querySelector('.CommentsPagesList');
let RadioBtnsPagination=document.querySelectorAll('.p-radio');
let LabelsPagination=document.querySelectorAll('.page_numb');
let PageNumbers=document.getElementById('num-pagination');
let hrefLeft=document.getElementById('href-left');
let hrefRight=document.getElementById('href-right');

let currentPage=localStorage.getItem('Current-Page-Comment') ?? 1;
currentPage=Number(currentPage);

const overflowPages=6;
let countPages=1;
const maxCountComments=4;
const PagesId='Page-';
const LabelsId='page_';
const LabelWidth=37;
const commentLocSaveKey='Comment-';
const dateLocSaveKey='Date-';
let minPage=localStorage.getItem('minPage') ?? 1;
let maxPage=localStorage.getItem('maxPage') ?? overflowPages;
minPage=Number(minPage);
maxPage=Number(maxPage);
let commentCount=Number(localStorage.getItem('Comment-save'));
initComments();

let offset=(countPages>overflowPages)? -(minPage-1)*LabelWidth:0;
initVariables();

function initVariables()
{
    
hrefLeft.onclick=moveLeft;
hrefRight.onclick=moveRight;
commentTextField.oninput=checkEnabled;
PagesList.forEach((element)=>element.classList.add('hiddenClass'));
PagesList[currentPage-1].classList.remove('hiddenClass');
LabelsPagination.forEach((element)=>element.addEventListener('click',clickLabelBtn));
RadioBtnsPagination[currentPage-1].checked=true;
PageNumbers.style.left=offset+'px';
}

function initComments()
{   
    for (let j=1; j<=commentCount;j++)
    {
    let newComment=createComment(localStorage.getItem(commentLocSaveKey+j),j,localStorage.getItem(dateLocSaveKey+j));
        PagesList[0].prepend(newComment);
      
       
    }
  
    if (commentCount!==0)
    distributeComment();
    
}

function distributeComment()
{ 
    for (let i=0; i<countPages;i++)
    {      
        
        
    
        let countOfComments=PagesList[i].children.length;
        if (countOfComments>maxCountComments)
        {      
            if (PagesList[i].nextElementSibling===null)
            {  let newPage=createNewPage();
                createLabelAndRadioButton();
                BlockPages.appendChild(newPage);
                PagesList=document.querySelectorAll('.Comment-Page-num');
            
                
            }
            for (let j=0;j<countOfComments-maxCountComments;j++)
            PagesList[i].nextElementSibling.prepend(PagesList[i].lastElementChild);       
    
            
            
        }
}
}

function moveLeft()
{   
  
    if  (currentPage===minPage && minPage!=1  && countPages>overflowPages)
    {  
        --maxPage;
        --minPage;
        localStorage.setItem('minPage',minPage);
        localStorage.setItem('maxPage',maxPage);
        offset+=LabelWidth;
        PageNumbers.style.left=offset+'px';
        
    }
    PagesList[currentPage-1].classList.add('hiddenClass');
    if (currentPage!=1)
    {
    --currentPage;
    }
    PagesList[currentPage-1].classList.remove('hiddenClass');
    RadioBtnsPagination[currentPage-1].checked=true;
    localStorage.setItem('Current-Page-Comment',currentPage);
}
function moveRight()
{        
    if (currentPage===maxPage && maxPage!=countPages && countPages>overflowPages)
    {   
        ++maxPage;
        ++minPage;
        localStorage.setItem('minPage',minPage);
        localStorage.setItem('maxPage',maxPage);
        offset-=LabelWidth;
        PageNumbers.style.left=offset+'px';
    }
    console.log(currentPage,minPage,maxPage);
    PagesList[currentPage-1].classList.add('hiddenClass');
    if (currentPage!=countPages)
    ++currentPage;
    PagesList[currentPage-1].classList.remove('hiddenClass');
    RadioBtnsPagination[currentPage-1].checked=true;
    localStorage.setItem('Current-Page-Comment',currentPage);
}
function checkEnabled()
{   
    btnPost.disabled=!(Boolean(this.value.length));
}



btnPost.onclick=function()
{     ++commentCount;
    let newComment=createComment(commentTextField.value,commentCount,null);
    localStorage.setItem('Comment-save',commentCount);
    minPage=1;
    maxPage=overflowPages;
    PagesList[currentPage-1].classList.add('hiddenClass');
    currentPage=1;
    localStorage.setItem('Current-Page-Comment',currentPage);
    RadioBtnsPagination[0].checked=true;
    
    PagesList[0].prepend(newComment);
    PageNumbers.style.left=0;
    offset=0;
    distributeComment();
    PagesList.forEach((element)=>element.classList.add('hiddenClass'));
    PagesList[0].classList.remove('hiddenClass');
        

}

function createLabelAndRadioButton()
{
    let rBtn=document.createElement('input');
    rBtn.classList.add('p-radio');
    rBtn.id=LabelsId+countPages;
    rBtn.type='radio';
    rBtn.name='page';
    rBtn.value=countPages;

    let labelInput=document.createElement('label');
    labelInput.classList.add('page_numb');
    labelInput.setAttribute('for',rBtn.id);
    labelInput.textContent=rBtn.value;
    PageNumbers.appendChild(rBtn);
    PageNumbers.appendChild(labelInput);
    RadioBtnsPagination=document.querySelectorAll('.p-radio');
    LabelsPagination=document.querySelectorAll('.page_numb');
    LabelsPagination.forEach((element)=>element.addEventListener('click',clickLabelBtn));
}
function clickLabelBtn()
{

    let numRadioBtn=this.getAttribute('for');
    let radioBtnPage=document.getElementById(numRadioBtn);
    PagesList[currentPage-1].classList.add('hiddenClass');
    currentPage=Number(radioBtnPage.value);
    PagesList[currentPage-1].classList.remove('hiddenClass');
    localStorage.setItem('Current-Page-Comment',currentPage);
}

function createNewPage()
{
    let newPage=document.createElement('div');
    newPage.classList.add('Comment-Page-num');
    newPage.classList.add('hiddenClass');
    ++countPages;
    newPage.id=PagesId+countPages;
    return newPage;
}
function generateDate(comCount,saveDate)
{
    let dateText=document.createElement('span');
    dateText.classList.add('Date_Text');
    if (saveDate===null)
    {
        let nowDate=new Date();
        let day=String(nowDate.getDate()).padStart(2, '0');
        let month=String(nowDate.getMonth() + 1).padStart(2, '0'); 
        let year=nowDate.getFullYear();
        dateText.textContent=`${day}/${month}/${year}`; 
    }
    else
    dateText.textContent=saveDate;
    localStorage.setItem(dateLocSaveKey+comCount,dateText.textContent);
    return dateText;
}
function createCommentHeaderText(comCount,saveDate)
{
    let CommentHeaderText=document.createElement('div');
    CommentHeaderText.classList.add('Comment_Header_Text');
    let blogertextlite=document.createElement('span');
    blogertextlite.classList.add('bloger-text-lite');
    blogertextlite.textContent='post by';

    CommentHeaderText.appendChild(blogertextlite);
    
    let InlineReply=document.createElement('div');
    InlineReply.classList.add('inline_reply');
    let nameBlogger=document.createElement('span');
    nameBlogger.classList.add('recipe-bloger-text-bold');
    nameBlogger.textContent='Anonymous';
 
    InlineReply.appendChild(nameBlogger);

    let hrefA=document.createElement('a');
    hrefA.classList.add('reply_href');
    hrefA.href='#';
    hrefA.textContent='reply';

    InlineReply.appendChild(hrefA);

    CommentHeaderText.appendChild(InlineReply);

    

    CommentHeaderText.appendChild(generateDate(comCount,saveDate));

    return CommentHeaderText;
}



function createTextLikesShares()
{
    let TextLikes=document.createElement('span');
    TextLikes.classList.add('Text_Likes');
    TextLikes.textContent=0;
    return TextLikes;
}



function createHrefLikesShares(class1,class2)
{
    let IconHref=document.createElement('a');
    IconHref.href='#';
    IconHref.classList.add('Icon_Like');
    
    let icon=document.createElement('i');
    icon.classList.add(class1,class2);
    IconHref.appendChild(icon);
    return IconHref;
}


function createInlineIcons()
{
    let InlineIcons=document.createElement('div');
    InlineIcons.classList.add('Inline_Icons');
   
    InlineIcons.appendChild(createTextLikesShares());
   
    InlineIcons.appendChild(createHrefLikesShares('fa-solid','fa-share-nodes'));
   
    InlineIcons.appendChild(createTextLikesShares());
    InlineIcons.appendChild(createHrefLikesShares('fa-regular','fa-thumbs-up'));
    return InlineIcons;
}


function createComment(commentContent,comCount,saveDate)
{
    let comment=document.createElement('div');
    comment.classList.add('Comment');
    let CommentHeader=document.createElement('div');
    CommentHeader.classList.add('Comment_Header');
    let CommentInfo=document.createElement('div');
    CommentInfo.classList.add('Comment-info');
    let PhotoComm=document.createElement('div');
    PhotoComm.classList.add('recipe-bloger-photo-comm');
    let imgCont=document.createElement('img');
    imgCont.src='img/w-22.jpg';

    PhotoComm.appendChild(imgCont);

    CommentInfo.appendChild(PhotoComm);

    CommentInfo.appendChild(createCommentHeaderText(comCount,saveDate));
    
    CommentHeader.appendChild(CommentInfo);
    
    CommentHeader.appendChild(createInlineIcons());
 
    comment.appendChild(CommentHeader);

    let commentBody=document.createElement('p');
    commentBody.classList.add('Comment_Body' ,'Comment_Text_Light');
    commentBody.textContent=commentContent; 
    localStorage.setItem(commentLocSaveKey+comCount,commentContent)
    comment.appendChild(commentBody);
    return comment;

}