function changeView(view) {
    var newClass = 'col-12';
    switch(view) {
        case 1: newClass = 'col-12'; break;
        case 2: newClass = 'col-6'; break;
        case 3: newClass = 'col-4'; break;
    }
    $('.ibox').removeClass().addClass('ibox').addClass(newClass);
}
