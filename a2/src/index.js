// Import jQuery, which will also expose $ on the global `window` Object.
import $ from './jquery-es';
// After jQuery is loaded, we can load the Bootstrap JS, which depends on jQuery.
import 'bootstrap';

// Place your imports for Moment.js and Lodash here...
import moment from 'moment';
import _ from 'lodash';

//import mymodule from './empModelArray.js';

/*{initializeEmployeesModel, getFilteredEmployeesModel, 
    getEmployeeModelById, refreshEmployeeRows, showGenericModal, 
    sortEmpByFName, sortEmpByLName, sortEmpByPosition}*/
    
// The rest of your code can go here.  You're also welcome to split
// your code up into multiple files using ES modules and import/export.
$(function(){
    const URL = 'https://mighty-wildwood-35586.herokuapp.com/';
    let employeesModel = [];

    initializeEmployeesModel();

    $('#employee-search').on("keyup",function(){
        event.preventDefault();
        let filtered = getFilteredEmployeesModel($(this).val());
        refreshEmployeeRows(filtered);
    });

    $(document).on("click", '.body-row', function(){
        event.preventDefault();
        let employeeCopy = getEmployeeModelById($(this).attr("data-id"));
        let mDate = moment(employeeCopy.HireDate);
        employeeCopy.HireDate = mDate.format('LL');
        let templateEmp = _.template('<span class="glyphicon glyphicon-home" aria-hidden="true"></span>'+'<strong> Address: <%- emp.AddressStreet %> <%- emp.AddressCity %>, <%- emp.AddressState %> <%- emp.AddressZip %> </strong><br>' + 
                                        '<span class="glyphicon glyphicon-phone-alt" aria-hidden="true"></span>'+'<strong> Phone Number: <%- emp.PhoneNum %> ext: <%- emp.Extension %></strong><br>' +
                                        '<span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>'+'<strong> Hire Date: <%- emp.HireDate %></strong>');
        let templateEmpResult = templateEmp({'emp':employeeCopy});
        showGenericModal(employeeCopy.FirstName+' '+employeeCopy.LastName, templateEmpResult);
    });

    $(document).on("click", '#firstName', function(){
        event.preventDefault();
        employeesModel.sort(sortEmpByFName);
        refreshEmployeeRows(employeesModel);
    })

    $(document).on("click", '#lastName', function(){
        event.preventDefault();
        employeesModel.sort(sortEmpByLName);
        refreshEmployeeRows(employeesModel);
    })

    $(document).on("click", '#position', function(){
        event.preventDefault();
        employeesModel.sort(sortEmpByPosition);
        refreshEmployeeRows(employeesModel);
    })

    ////////////////////////////////////////////////////////////////
    function initializeEmployeesModel(){
        $.ajax({
            url: URL + 'employees',
            type: 'GET',
            contentType: 'application/json'
        })
            .done(function(data) {
                employeesModel = data;
                refreshEmployeeRows(employeesModel);
            })
            .fail(function(error) {
                showGenericModal(error, 'Unable to get Employees');
            });
    }
    
    function showGenericModal(title, message){
        $('.modal-title').text(title);
        $('.modal-body').html(message);
        $('#genericModal').modal('show');
    }
    
    function refreshEmployeeRows(employees){
        $('.body-row').remove();
        let template = _.template('<%_.forEach(employees, function(employee) {%>'+
                                    '<div class="body-row row" data-id=' +'<%- employee._id %>'+'>' +
                                        '<div class="col-xs-4 body-column"><%- employee.FirstName %></div>' +
                                        '<div class="col-xs-4 body-column"><%- employee.LastName %></div>' +
                                        '<div class="col-xs-4 body-column"><%- employee.Position.PositionName %></div>' + 
                                    '</div>' +
                                 '<% }); %>');
                                            
        let templateResult = template({'employees':employees});
        $('#employees-table').append(templateResult);
    }
    
    function getFilteredEmployeesModel(filterString){
        let filteredEmployees = _.filter(employeesModel, function(employee){
            return employee.FirstName.toUpperCase().includes(filterString.toUpperCase()) ||
            employee.LastName.toUpperCase().includes(filterString.toUpperCase()) ||
            employee.Position.PositionName.toUpperCase().includes(filterString.toUpperCase())
        });
        return filteredEmployees;
    }
    
    function getEmployeeModelById(id){
        let result = null;
        _.forEach(employeesModel, function(employee){
            if(employee._id == id){
                result = _.cloneDeep(employee);
            }
        });
        return result;
    }
    
    function sortEmpByFName(objA, objB){
        if(objA.FirstName < objB.FirstName){
            return -1;
        }
        if(objA.FirstName > objB.FirstName){
            return 1;
        }
        return 0;
    }
    
    function sortEmpByLName(objA, objB){
        if(objA.LastName < objB.LastName){
            return -1;
        }
        if(objA.LastName > objB.LastName){
            return 1;
        }
        return 0;
    }
    
    function sortEmpByPosition(objA, objB){
        if(objA.Position.PositionName < objB.Position.PositionName){
            return -1;
        }
        if(objA.Position.PositionName > objB.Position.PositionName){
            return 1;
        }
        return 0;
    }
});