$(()=>{
    let newtask = $('#newtask')
    let addtask = $('#addtask')
    let todolist = $('#todolist')
    let removetask = $('#removetask')
    addtask.fadeIn('fast')
    addtask.click(() => {
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
                $(this).parent().toggleClass('done')
                if($(this).css('text-decoration') == 'line-through')
                $(this).css('text-decoration','')
                else
                    $(this).css('text-decoration','line-through')
            })
        )
        .append(
            $('<button>')
            .addClass('btn btn-outline-danger m-1')
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
            .addClass('btn btn-outline-primary m-1')
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
            .addClass('btn btn-outline-primary m-1')
            .append(
                $('<i>')
                .addClass('fa fa-arrow-down')
            )
            .click((e) => $(e.currentTarget).parent().insertAfter(
                $(e.currentTarget).parent().next()
            ))
        )
        .hide(10,function () {
            $(this).show('slow')
        })
        todolist.append(item)
    })
    newtask.keypress(function (e) {
        if(e.which == 13)
            addtask.click()
    })
    removetask.click(function () {
        $('.done').each(function () {
            $(this).children()[1].click()
        })
    })
})