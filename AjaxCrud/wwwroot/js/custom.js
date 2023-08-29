$(document).ready(function () {
    //call function
    showEmployeeData();
});

//Show Employee data from database throw ajax call
function showEmployeeData() {
    /*debugger //for debugging code*/

    ////second way to store url
    //var url = '/Home/EmployeeList';

    ////thid way to store url
    //var url = $('#urlEmployeeData').val();
    $.ajax({
        ////second and third way to store url
        //url:url,

        //first way to get url 
        url: '/Home/EmployeeList',
        type: 'Get',
        dataType: 'json',                                //which datatype we accept
        contentType:'application/json;charset=utf-8;',   //which type of data we send and get from our application

        //in below function results means when we get data then result store all data
        //2nd is status means success 
        //3rd is xhr means Xmm, Http, Response
        success: function (result,stauts,xhr) {
            var object = '';
            //index means 0,1,2,3,4..
            //item means store data or details
            $.each(result, function (index, item) {
                //concetination 
                object += '<tr>';
                object += '<td>' + item.id + '</td>';
                object += '<td>' + item.name + '</td>';
                object += '<td>' + item.city + '</td>';
                object += '<td>' + item.state + '</td>';
                object += '<td>' + item.salary + '</td>';
                object += '<td> <a class="btn btn-primary m-1" onClick="Edit(' + item.id + ')">Edit</a> <a class="btn btn-danger m-1" onClick="Delete(' + item.id + ')"> Delete</a>  </td>';
                object += '</tr>';
            });
            //load that detail to table body so we use id 
            $('#table').html(object);
        },

        error: function () {
            alert('Data cannot be get');
        }
    });
};  

//Add Employee Button Code to show form or madal of add new employee
$('#btnAddEmployee').click(function () {
    ClearTextBox();
    $('#EmployeeMadal').modal('show');
    $('#empHeading').text('Add New Employee');
    $('#empid').hide();
    $('#SaveEmployee').css('display', 'block');
    $('#UpdateEmployee').css('display', 'none');

});

//function of hide add new employee form or madal
function HideModalPopup() {
    $('#EmployeeMadal').modal('hide');
}

//function of clear text box of add new employee form or madal
function ClearTextBox() {
    $('#Name').val('');
    $('#City').val('');
    $('#State').val('');
    $('#Salary').val('');
    $('#Id').val('');
}

// save button code to add employee record into database
function SaveEmployee() {
    
    /*create a object and store employee information*/
    var objData = {
        Name : $('#Name').val(),
        City : $('#City').val(),
        State : $('#State').val(),
        Salary : $('#Salary').val()
    }
    //ajax call to add
    $.ajax({
        url: '/Home/AddEmployee',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',   //our controller receive data through http(server) //with this url we data is go to controller otherwise store null value
        dataType: 'json',
        success: function () {
            alert('Data Saved');
            ClearTextBox();
            showEmployeeData();
            HideModalPopup();
        },
        error: function () {
            alert('Data cannot save');
        }
    });
}

//delete function 
function Delete(id) {
    debugger
    if (confirm('Are you sure, you want to delete this record?')) {
        $.ajax({
            url: '/Home/Delete?id=' + id,
            success: function () {
                alert('Record Deleted');
                showEmployeeData();
            },
            error: function () {
                alert('Data can not be deleted');
            }
        });
    }
}


//edit employee function use for popup the record from database and display on form
function Edit(id) { 
    $.ajax({
        url: '/Home/Edit?id=' + id,
        type: 'Get',
        contentType: 'application/x-www-form-urlencoded;charset-utf-8',
        dataType: 'json',

        /*in response we get data of employee that is equal to id*/
        success: function (response) {
            /*first popup the modal/page/form*/
            $('#EmployeeMadal').modal('show');
            /*display response data that is fetch from database and show on form*/
            $('#Id').val(response.id);
            $('#Name').val(response.name);
            $('#City').val(response.city);
            $('#State').val(response.state);
            $('#Salary').val(response.salary);

            /*two way to hide save button and display update button*/
            /*First way through CSS*/
            $('#SaveEmployee').css('display', 'none');
            $('#UpdateEmployee').css('display', 'block');
            $('#empid').show();
            $('#empHeading').text('Update Record');
            /*second way to hide and display button*/
            //$('#SaveEmployee').hide();
            //$('#UpdateEmployee').show();
        },
        error: function () {
            alert('Data not Found');
        }
    });
}

//update employee update data that show
function UpdateEmployee() {
    /*create a object and store employee information*/
    var objData = {
        Id: $('#Id').val(),
        Name: $('#Name').val(),
        City: $('#City').val(),
        State: $('#State').val(),
        Salary: $('#Salary').val()
    }
    $.ajax({
        url: '/Home/Update',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset-utf-8',   //our controller receive data through http(server) //with this url we data is go to controller otherwise store null value
        dataType: 'json',
        success: function () {
            alert('Data Saved');
            ClearTextBox();
            showEmployeeData();
            HideModalPopup();
        },
        error: function () {
            alert('Data cannot save');
        }
        
    });
}