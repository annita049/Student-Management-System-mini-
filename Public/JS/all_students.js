
function DeleteStudentInfo(obj_id){ //obejct unique id
    if(confirm('Are you sure to delete student ID: ' + obj_id + ' ?')){
        $.post("/delete", {obj_id}, function (res){ 
            console.log(res);
            if(res.success){
                location.reload();
            }
        });
    }
}

// document.querySelector('#name').value = "shob sb";

const modalForm = document.querySelector('#modalForm');
const modalTitle = document.querySelector('.modal-title');
let editMode = false;

let _id ;

function EditStudentInfo(obj_id){
    editMode = true;
    _id = obj_id;
    modalTitle.textContent = "Edit Student Info";
    // $('.modal-title').text = "Edit Student Info";
    $.get('/edit/' + obj_id, (res)=> {
        $('#id').val(res.id);
        $('#name').val(res.name);
        $('#cgpa').val(res.cgpa);
        $('#department').val(res.department);
        // console.log(res);
    });
}

function AddStudent(_id){
    editMode = false;
    modalTitle.textContent = "Add new Student";
    // $('.modal-title').text = "Add new Student";
    modalForm.reset();
    // modalForm.action = '/add';
}

modalForm.addEventListener('submit', event=> {
    event.preventDefault();

    if (editMode){
        $('#_id').val(_id);
        modalForm.action = '/edit';
        modalForm.submit();
    }
    else {
        modalForm.action = '/add';
        modalForm.submit();
    }
});


//---------- implementation of search function -----------

const dropdownToggle = document.querySelector('.dropdown-toggler');
const searchForm = document.querySelector('#search-form');
// initilly (before search)
document.querySelector('.no-data').style.display = "none";

searchForm.addEventListener('submit', event =>{
    event.preventDefault();  // stops the form submission
    const formData = new FormData(searchForm);
    // form = $(this).serialize();
    let arr = [];
    for (let [key, value] of formData.entries()){
        // console.log(value);
        arr.push(value);
    };
    const [key, value] = arr;
    const url = `/search?${key}=${value}`;

    // let params = new URLSearchParams('key1=value1&key2=value2');

    $.ajax({
        url: url,
        type: 'GET',
        success: (data)=> {
            console.log(data);
            $('.no-data').hide();
            // console.log(data.length);

            if(!data.length){
                $('.table').hide();
                $('.no-data').css('display','flex');
            }

            else {
                $('.table').show();
                $('#table-body').empty(); 

                data.forEach(student => {
                $('#table-body').append(
                    `<tr>
                        <td>${student.id}</td>
                        <td>${student.name}</td>
                        <td>${student.cgpa}</td>
                        <td>${student.department}</td>
                        <td class="action-buttons">  
                            <div class="view-button">
                                <a href="/view/${student._id}" class="btn btn-sm view-btn btn-primary me-2" >View</a>
                            </div>

                            <div class="modify-buttons">
                                <a type="button" class="btn" onclick="EditStudentInfo('${student._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <i class="fa-solid fa-pencil fs-5 text-success"></i>
                                </a>
                                
                                <a type="button" onclick="DeleteStudentInfo('${student._id}')" class="btn">
                                    <i class="fa-solid fa-trash-can fs-5 text-danger"></i>
                                </a>
                            </div>
                        </td>
                    </tr>`);
                });
            }
        },
        error: (xhr, status, error)=> {
            console.error('Error:', error);
        }
    });
});
