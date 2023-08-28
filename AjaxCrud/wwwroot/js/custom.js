$(document).ready(function () {
    //call function
    showEmployeeData();
});

//Show Employee data from database throw ajax call
function showEmployeeData() {
    debugger //for debugging code

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
                object += '<td> <a class="btn btn-primary m-1">Edit</a> <a class="btn btn-danger m-1"> Delete</a>  </td>';
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
    $('#EmployeeMadal').modal('show');
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
}

// save button code to add employee record into database
function SaveEmployee() {
    debugger
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
    })
}