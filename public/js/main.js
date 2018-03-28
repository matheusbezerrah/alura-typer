var frase = $(".frase").text();
var contTempo = $("#tempoDigitacao").text();
var campo = $(".campo-digitacao");

$(document).ready(function(){
	atualizaTamanhoFrase();
	inicializaContadores();
	inicializaCronometro();
	$("#btn-reiniciar").click(reiniciaJogo);
});

/*
** retorna a quantidade de palavras de um conteúdo
*/
function contaPalavras(cont){
	return cont.split(/\S+/).length -1;
}

function atualizaTamanhoFrase(){
	var numPalavras = contaPalavras(frase);
	$("#qtdPalavras").text(numPalavras);
}

function inicializaContadores(){
	campo.on("input",function(){
		var conteudo = $(".campo-digitacao").val();
		
		var qtdPalavrasArea = contaPalavras(conteudo);
		$("#qtdPalavrasTxtArea").text(qtdPalavrasArea);

		var qtdCaracteresArea = conteudo.length;
		$("#qtdCaracteresTxtArea").text(qtdCaracteresArea);
	});
}

function inicializaCronometro(){
	var tempoRestante = $("#tempoDigitacao").text();

	campo.one("focus",function(){
		var idInterval = setInterval(function(){
			if(tempoRestante == 1){
				campo.attr("disabled",true);
				clearInterval(idInterval);
			}
			$("#tempoDigitacao").text(--tempoRestante);
			console.log(tempoRestante);
		},1000);
	});
}

function reiniciaJogo(){
	campo.attr("disabled",false);
	campo.val("");
	$("#tempoDigitacao").text(contTempo);
	$("#qtdPalavrasTxtArea").text("0");
	$("#qtdCaracteresTxtArea").text("0");
	inicializaCronometro();
}
