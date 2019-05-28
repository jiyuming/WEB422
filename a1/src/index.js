/**********************************************************************************
 *  WEB422 – Assignment 1
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including web sites) or distributed to other students.
 *
 *  Name: _____Tian Zheng______ Student ID: ____155 394 174_____ Date: ____May 10, 2019_______
 *
 *
 ********************************************************************************/
const URL = 'https://mighty-wildwood-35586.herokuapp.com/';

$(document).ready(function() {
    console.log('jQuery working');

    $('#teams-menu').on('click', function(event) {
        event.preventDefault();
        $.ajax({
            url: URL + 'teams',
            type: 'GET',
            contentType: 'application/json'
        })
            .done(function(data) {
                $('#data').empty();
                $('#data').append('<h3>Teams</h3>');
                $('#data').append('<pre></pre>');
                $('pre').html(prettyPrintJson.toHtml(data));
            })
            .fail(function(error) {
                console.log('error: ' + error.statusText);
            });
    });

    $('#employees-menu').on('click', function(event) {
        event.preventDefault();
        $.ajax({
            url: URL + 'employees',
            type: 'GET',
            contentType: 'application/json'
        })
            .done(function(data) {
                $('#data').empty();
                $('#data').append('<h3>Employees</h3>');
                $('#data').append('<pre></pre>');
                $('pre').html(prettyPrintJson.toHtml(data));
            })
            .fail(function(error) {
                console.log('error: ' + error.statusText);
            });
    });

    $('#projects-menu').on('click', function(event) {
        event.preventDefault();
        $.ajax({
            url: URL + 'projects',
            type: 'GET',
            contentType: 'application/json'
        })
            .done(function(data) {
                $('#data').empty();
                $('#data').append('<h3>Projects</h3>');
                $('#data').append('<pre></pre>');
                $('pre').html(prettyPrintJson.toHtml(data));
            })
            .fail(function(error) {
                console.log('error: ' + error.statusText);
            });
    });

    $('#positions-menu').on('click', function(event) {
        event.preventDefault();
        $.ajax({
            url: URL + 'positions',
            type: 'GET',
            contentType: 'application/json'
        })
            .done(function(data) {
                $('#data').empty();
                $('#data').append('<h3>Positions</h3>');
                $('#data').append('<pre></pre>');
                $('pre').html(prettyPrintJson.toHtml(data));
            })
            .fail(function(error) {
                console.log('error: ' + error.statusText);
            });
    });
});
