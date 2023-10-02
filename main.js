//cajas disponibles
boxes = [{boxName: "Mañana", value: []},{boxName: "Tarde", value: []},{boxName: "Noche", value: []}  ]

//LocalStorage

if(localStorage.getItem("boxesLS")){
        let storedData = JSON.parse(localStorage.getItem('boxesLS'));
        boxes = storedData;
    }else{
        console.log("no existe");
    }

//crearBoxes
let boxContainer = document.querySelector(".boxContainer")

boxes.forEach((box) =>{
    let classNameBox = box.boxName.replace(/\s+/g, '-');
    let boxDiv = `
        <div class="box ${classNameBox}">
          <div class="boxText">
            <p>${box.boxName}</p>
          </div>
          <div class="boxIcon">
            <img src="./assets/img/box.svg" alt="">
          </div>
        </div>
      `;
      boxContainer.insertAdjacentHTML('beforeend', boxDiv);
})

//VARS

////global

////boxCreator
let box = document.querySelectorAll(".box")
let createBoxButton = document.querySelector(".createBox")
let formCreateBox = document.querySelector(".formCreateBox")
let inputTextCreateBox = document.querySelector(".inputTextCreateBox")
let buttonSubmitCreateBox = document.querySelector(".buttonSubmitCreateBox")
let inputCreateBox = document.querySelector(".inputCreateBox")
////taskCreator
let sectionTask = document.querySelector(".sectionTask")
let backArrow = document.querySelector(".backArrow")
let taskSectionTitle = document.querySelector(".taskSectionTitle")
let createTaskButton = document.querySelector(".createTask")
let mainSectionTask = document.querySelector(".mainSectionTask")
let inputCreateTask = document.querySelector(".inputCreateTask")
let inputTextCreateTask = document.querySelector(".inputTextCreateTask")
let formCreateTask = document.querySelector(".formCreateTask")
let tasksContainer = document.querySelector(".tasksContainer")




//creteNewBox
formCreateBox.addEventListener("submit", function(event){
    event.preventDefault() 
   
    let createNameNewBox = inputTextCreateBox.value.trim().replace(/[^\w\s]/gi, '')
   
    if (createNameNewBox != ""){
    
        let nameNewBox = createNameNewBox
        let boxNameFiltered = nameNewBox.replace(/[^a-zA-Z0-9\s]/g, "");

        if (nameNewBox.trim() != ""){

        newBoxCreated = {boxName: primeraMayus(boxNameFiltered), value: []} 

        boxes.push(newBoxCreated)


    
            let classNameBox = (newBoxCreated.boxName).replace(/\s+/g, '-');
    
            let boxDiv = `           
            <div class="box">
                <div class="boxText ${classNameBox}">
                    <p>${newBoxCreated.boxName}</p>
                </div>
                <div class="boxIcon">
                    <img src="./assets/img/box.svg" alt="">
                </div>
            </div>`
    
            boxContainer.insertAdjacentHTML("beforeend", boxDiv)
            
            let newBox = document.querySelector("."+classNameBox)
            newBox.addEventListener("click",()=>{
                //alert(newBoxCreated.boxName)
            })

            inputCreateBox.style.height = "0vh"
            createBoxButton.classList.remove("newRadius")

            console.log(boxes);

            // Guardar la cadena JSON en el almacenamiento local con una clave específica, por ejemplo, 'cajas'
            localStorage.setItem('boxesLS', JSON.stringify(boxes));
        }
        else{
            alert("xd")
        }
    }else{
        alert("ERROR")
    }
    inputTextCreateBox.value = ""
})

boxContainer.addEventListener('click', function(event){

    if (event.target.closest(".createBox")){
        inputCreateBox.style.height = "8.5vh"
        

        createBoxButton.classList.add("newRadius")
        


    }   
    else if (event.target.closest(".box")){

        if (event.target.closest(".box")) {

            let textoElemento = event.target.closest(".box").textContent.trim().replace(/\s+/g, " ");

            taskSectionTitle.textContent = textoElemento


            sectionTask.classList.add("showSectionTask")

            if(localStorage.getItem("boxesLS")){
                let boxFiltred = boxes.find(caja => caja.boxName === textoElemento)

                //mainSectionTask.innerHTML = ''

                tasksContainer.innerHTML = ''
                
                boxFiltred.value.forEach(task => {

                    if(task.check){
                        let taskDiv = `
                        <div class="task">
                            <div class="taskText">
                                <p>${task.taskName}</p>
                            </div>
                            <div class="checked checkOn" >
                                <img src="./assets/img/check.svg" alt="">
                            </div> 
                        </div>
                        `

                        tasksContainer.insertAdjacentHTML("beforeend", taskDiv)
                    }else{
                        let taskDiv = `
                        <div class="task">
                            <div class="taskText">
                                <p>${task.taskName}</p>
                            </div>
                            <div class="checked">
                                <img src="./assets/img/check.svg" alt="">
                            </div> 
                        </div>
                        `

                        tasksContainer.insertAdjacentHTML("beforeend", taskDiv)
                    }







                        console.log(task);

                        // if(task.check){
                        //     let taskChecked = document.querySelector(".task")
                        //     let checked = taskChecked.querySelector(".checked");
                        //     checked.classList.add("checkOn")
                        // }
                });
            }

            //let taskCreated = prompt("Nueva tarea para " + textoElemento);

            backArrow.addEventListener('click', ()=>{
                sectionTask.classList.remove("showSectionTask")

            })

            createTaskButton.addEventListener('click',()=>{

                createTaskButton.classList.add("newRadius")
                inputCreateTask.style.height = "8.5vh"

                formCreateTask.addEventListener("submit", function(event){
                    event.preventDefault() 

                    let newTask = primeraMayus(inputTextCreateTask.value.trim().replace(/[^\w\s]/gi, ''))

                    if (newTask != ""){
                        let taskDiv = `
                        <div class="task">
                            <div class="taskText">
                                <p>${newTask}</p>
                            </div>
                            <div class="checked">
                                <img src="./assets/img/check.svg" alt="">
                            </div> 
                        </div>
                        `

                        tasksContainer.insertAdjacentHTML("beforeend", taskDiv)

                        inputTextCreateTask.value = ""
                        createTaskButton.classList.remove("newRadius")
                        inputCreateTask.style.height = "0vh"

                        if (localStorage.getItem('boxesLS')){

                        }

                        let boxSearched = []

                        boxSearched = boxes.find(caja => caja.boxName == primeraMayus(taskSectionTitle.textContent));

                    
                        boxSearched.value.push({taskName : newTask, check : false})

                        if(boxes.boxName == textoElemento){

                        }


                        localStorage.setItem('boxesLS', JSON.stringify(boxes))


                        }
                        else{
                            // alert("eroraaa")
                        }
                })
                


            })

            let cajaCorrespondiente = boxes.find(caja => caja.boxName == primeraMayus(textoElemento));

            // if (taskCreated.trim() != ""){
            //     cajaCorrespondiente.valor.push(taskCreated.trim())
            //     console.log(boxes);    
            // }
            // else{
            //     alert("Invalido")

            // }
  }
    }

})
tasksContainer.addEventListener('click', function(event){

    let elementSelected = event.target.closest(".task")

    if (elementSelected){
        let checkedElement = elementSelected.querySelector(".checked")
        if (checkedElement){
            checkedElement.classList.toggle("checkOn")
        }
        let taskNameSelected = elementSelected.textContent.trim();
        let boxNameSelected = taskSectionTitle.textContent.trim()

        let boxSearched = boxes.find(box => box.boxName === boxNameSelected)

        if(boxSearched){
            let taskSearched = boxSearched.value.find(task => task.taskName === taskNameSelected)

            if (taskSearched){
                taskSearched.check = !taskSearched.check;
                localStorage.setItem('boxesLS', JSON.stringify(boxes));

            }
        }
    }

})

let tasks = document.querySelectorAll(".task")

tasks.forEach(task => {
    task.addEventListener("click", ()=>{
        task.classList.toggle("checkOn")
    })
});
sectionTask.addEventListener("click", function(event){
    if (event.target.closest(".task")) {
        
    }

})

// createBoxButton.addEventListener('click',()=>{

    
    
// })  

//         escucharBoxes()

// //funciones
// function escucharBoxes(){
//     box.forEach(el => {
//         el.addEventListener('click', ()=>{
//             let taskPrueba = prompt("nueva tarea para "  + el.toString())
//         })
//     });
// }

function primeraMayus(cadena) {
    let palabras = cadena.split(' ');
  
    let palabrasCapitalizadas = palabras.map(function (palabra) {
      return palabra.charAt(0).toUpperCase() + palabra.slice(1);
    });
  
    let resultado = palabrasCapitalizadas.join(' ');
  
    return resultado;
  }