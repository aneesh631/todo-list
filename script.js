$(()=>{
    let newtask = $('#newtask')
    let addtask = $('#addtask')
    let todolist = $('#todolist')
    let removetask = $('#removetask')
    let duedate = $('#duedate')
    duedate.val('')
    addtask.fadeIn('fast')
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
        let item = $('<li>')
        .addClass('list-group-item')
        .append(
            $('<span>')
            .addClass('m-1')
            .text(task)
            .click(function () {
                $(this).parent().toggleClass('done').toggleClass('list-group-item-success')

                if($(this).css('text-decoration') == 'line-through')
                    $(this).css('text-decoration','')
                else
                    $(this).css('text-decoration','line-through')
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
            })
        )
        .append(
            $('<button>')
            .addClass('btn btn-info m-1')
            .append(
                $('<i>')
                .addClass('fa fa-arrow-down')
            )
            .click((e) => $(e.currentTarget).parent().insertAfter(
                $(e.currentTarget).parent().next()
            ))
        )
        // .append(
        //     $('<button>')
        //     .addClass('btn btn-primary m-1')
        //     .append(
        //         $('<i>')
        //         .addClass('fa fa-edit')
        //     )
        // )
        .hide(10,function () {
            $(this).show('slow')
        })
        .attr('data-toggle','tooltip')
        .attr('data-placement','left')
        .attr('data-original-title',dd)
        .tooltip()
        todolist.append(item)
    })
    newtask.keypress(function (e) {
        if(e.which == 13)
            addtask.click()
    })
    duedate.keypress(function (e) {
        if(e.which == 13)
            addtask.click()
    })
    removetask.click(function () {
        $('.done').each(function () {
            $(this).children()[1].click()
        })
    })
})