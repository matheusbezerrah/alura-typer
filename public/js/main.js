var frase = $(".frase").text();
var contTempo = $("#tempoDigitacao").text();
var campo = $(".campo-digitacao");

$(document).ready(function(){
	atualizaTamanhoFrase();
	inicializaContadores();
	inicializaCronometro();
	inicializaCores();
	excluirNomeCompetidor();
	$("#btn-reiniciar").click(reiniciaJogo);
	$("#cronometro").show();
	$("#btn-reiniciar").hide();
});	

function excluirNomeCompetidor(){
	var campoCompetidor = $("#nome-competidor");

	$("#excluir-nome-competidor").click(function(){
		campoCompetidor.val("");
		campoCompetidor.focus();
	});
}

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
				clearInterval(idInterval);
				finalizaJogo();
				insereLinha();
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

		if(digitado == comparavel){
			campo.addClass("borda-azul");
			campo.removeClass("borda-vermelha");
		}else{
			campo.addClass("borda-vermelha");
			campo.removeClass("borda-azul");
		}
	});
}

function insereLinha(){

	var competidor = $("#nome-competidor").val();
	competidor = competidor != '' ? competidor : "Competidor Padrão";

	var qtdCaracteres = $("#qtdCaracteresTxtArea").text();
	var qtdPalavras = $("#qtdPalavrasTxtArea").text();
	var placar = $(".placar");
	var corpoTabela  = placar.find("tbody");
	var colunaRemove = "<a href='#' class='botao-remover'>"+
							"<i class='material-icons'>delete</i>"+
						"</a>";
	var linha = "<tr>"+
					"<td>" + competidor + "</td>" +
					"<td>" + qtdPalavras + "</td>" +
					"<td>" + qtdCaracteres + "</td>" +
					"<td>" + colunaRemove + "</td>" +
				"</tr>";

	corpoTabela.append(linha);

	$(".botao-remover").click(function(event){
		event.preventDefault();
        $(this).parent().parent().remove();
    });
}

function finalizaJogo(){
	campo.attr("disabled",true);
	campo.toggleClass("cor-fundo-area");
	$("#cronometro").hide();
	$("#btn-reiniciar").show();
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
	$("#cronometro").show();
}
