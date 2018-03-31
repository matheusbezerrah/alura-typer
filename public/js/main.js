var frase = $(".frase").text();
var contTempo = $("#tempoDigitacao").text();
var campo = $(".campo-digitacao");

$(document).ready(function(){
	atualizaTamanhoFrase();
	inicializaContadores();
	inicializaCronometro();
	inicializaCores();
	$("#btn-reiniciar").click(reiniciaJogo);
	$("#btn-reiniciar").hide();
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
				campo.toggleClass("cor-fundo-area");
				$("#btn-reiniciar").show();
			}
			$("#tempoDigitacao").text(--tempoRestante);
			//console.log(tempoRestante);
		},1000);
	});
}

function inicializaCores(){
	campo.on("input",function(){
		
		var digitado = campo.val();
		var comparavel = frase.substr(0,digitado.length);

		console.log(digitado);
		console.log(comparavel);

		if(digitado == comparavel){
			console.log("Certo");
			campo.addClass("borda-azul");
			campo.removeClass("borda-vermelha");
		}else{
			campo.addClass("borda-vermelha");
			campo.removeClass("borda-azul");
		}
	});
}

function reiniciaJogo(){
	campo.attr("disabled",false);
	campo.val("");
	$("#tempoDigitacao").text(contTempo);
	$("#qtdPalavrasTxtArea").text("0");
	$("#qtdCaracteresTxtArea").text("0");
	inicializaCronometro();
	campo.toggleClass("cor-fundo-area");
	campo.removeClass("borda-azul");
	campo.removeClass("borda-vermelha");
	$("#btn-reiniciar").hide();
}
