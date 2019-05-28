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