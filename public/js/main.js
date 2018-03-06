/*
** retorna a quantidade de palavras de um conteúdo
*/
function contaPalavras(cont){
	return cont.split(/\S+/).length -1;
}

var frase = $(".frase").text();

//var numPalavras = frase.split(/\S+/).length -1;
var numPalavras = contaPalavras(frase);
$("#qtdPalavras").text(numPalavras);

var campo = $(".campo-digitacao");

$(".campo-digitacao").on("input",function(){
	var conteudo = $(".campo-digitacao").val();
	
	var qtdPalavrasArea = contaPalavras(conteudo);
	$("#qtdPalavrasTxtArea").text(qtdPalavrasArea);

	var qtdCaracteresArea = conteudo.length;
	$("#qtdCaracteresTxtArea").text(qtdCaracteresArea);;
});
