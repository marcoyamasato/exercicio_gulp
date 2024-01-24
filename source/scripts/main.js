$('#botao_calcular').click(function(){
    const num1 = parseInt($('#num1').val(),10);
    const num2 = parseInt($('#num2').val(),10);

    var resultado = num1 + num2;

    console.log(resultado)
    $('#resultado').text(resultado)
})