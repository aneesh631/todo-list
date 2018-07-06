$(()=>{
    let newtask = $('#newtask')
    let addtask = $('#addtask')
    let todolist = $('#todolist')
    let removetask = $('#removetask')
    let duedate = $('#duedate')
    let sorttask = $('#sorttask')
    let input = $('#input')
    let editmodal = $('#editmodal')
    let newname = $('#newname')
    let newduedate = $('#newduedate')
    let current;
    duedate.val('')
    input.fadeOut(10, function () {
        $(this).fadeIn('slow')
    })
    upadateLocalStorage = function () {
        let items = []
        todolist.children().each(function () {
            let span = $(this).children()[0]
            let item = {
                name: $(span).text(),
                date: $(span).attr('data-original-title'),
                done: ($(span).css('text-decoration-line') == 'line-through')?true:false,
            }
            items.push(item)
        })
        window.localStorage.setItem('todos',JSON.stringify(items))
    }
    addItem = function(name,date,done) {
        let item = $('<li>')
        .addClass('list-group-item')
        .append(
            $('<span>')
            .attr('data-toggle','tooltip')
            .attr('data-placement','left')
            .attr('data-original-title',date)
            .tooltip()
            .addClass('m-1')
            .text(name)
            .click(function () {
                $(this).parent().toggleClass('done').toggleClass('list-group-item-success')
                if($(this).css('text-decoration-line') == 'line-through')
                    $(this).css('text-decoration-line','')
                else
                    $(this).css('text-decoration-line','line-through')
                if(done){
                    $(this).click()
                }
                upadateLocalStorage()
            })
        )
        .append(
            $('<button>')
            .addClass('btn btn-danger m-1')
            .append(
                $('<i>')
                .addClass('fa fa-times')
            )
            .click(function () {
                $(this).parent().hide('slow',function (){
                    $(this).remove()
                    upadateLocalStorage()
                })
            })
        )
        .append(
            $('<button>')
            .addClass('btn btn-info m-1')
            .append(
                $('<i>')
                .addClass('fa fa-arrow-up')
            )
            .click(function () {
                $(this).parent().insertBefore($(this).parent().prev())
                upadateLocalStorage()
            })
        )
        .append(
            $('<button>')
            .addClass('btn btn-info m-1')
            .append(
                $('<i>')
                .addClass('fa fa-arrow-down')
            )
            .click(function () {
                $(this).parent.insertAfter($(this).parent().next())
                upadateLocalStorage()
            })
        )
        .append(
            $('<button>')
            .addClass('btn btn-primary m-1')
            .append(
                $('<i>')
                .addClass('fa fa-edit')
            )
            .attr({
                'data-toggle': 'modal',
                'data-target': '#editmodal'
            })
            .click(function () {
                current = $(this).parent()
                newname.val($($(this).parent().children()[0]).text())
                newduedate.val($($(this).parent().children()[0]).attr('data-original-title'))
            })
        )
        .hide(10,function () {
            $(this).show('slow')
        })
        todolist.append(item)
        upadateLocalStorage()
    }
    fetchTodos = function () {
        if(window.localStorage.getItem('todos')){
            let todos = window.localStorage.getItem('todos')
            todos = JSON.parse(todos)
            for(let i =0;i<todos.length;i++){
                addItem(todos[i].name,todos[i].date,todos[i].done)
            }
        }
    }
    fetchTodos()
    addtask.click(() => {
        let dd = duedate.val()
        duedate.val('')
        if(dd == '')
            dd == new Date()
        let task = newtask.val()
        task.trim()
        if(task == '')
            return
        newtask.val('')
        addItem(task,dd,false)
    })
    $('#savebtn').click(function () {
        if(newname.val() == '' ||  newduedate.val() =='')
            return
        $(current.children()[0]).text(newname.val()).attr('data-original-title',newduedate.val())
        editmodal.modal('toggle')
        upadateLocalStorage()
    })
    newtask.keypress(function (e) {
        if(e.which == 13)
            addtask.click()
    })
    duedate.keypress(function (e) {
        if(e.which == 13)
            addtask.click()
    })
    sorttask.click(function () {
        let items = []
        let listItems = $('#todolist > li')
        listItems.each(function () {
            items.push($(this))
        })
        items.sort(function (a,b) {
            return $(a.children()[0]).attr('data-original-title')>$(b.children()[0]).attr('data-original-title')
        })
        todolist.hide('fast',function () {
            for(let i=0;i<items.length;i++){
                console.log($(items[i]).children()[0],i)
                todolist.append($(items[i]))
            }
        })
        todolist.show('fast')
        upadateLocalStorage()
    })
    removetask.click(function () {
        $('.done').each(function () {
            $(this).children()[1].click()
        })
    })
})