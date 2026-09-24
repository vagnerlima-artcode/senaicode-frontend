const botao = document.getElementById("botao");
const campo = document.getElementById("campo");
const area = document.getElementById("area");
const evento = document.getElementById("evento");
const ultimoEvento = document.getElementById("ultimoEvento");
const tecla = document.getElementById("tecla");
const mouseX = document.getElementById("mouseX");
const mouseY = document.getElementById("mouseY");
const logs = document.getElementById("logs");

//essa função abaixo é complexa, copy+paste
function registrarEvento(nome, detalhes = ""){
    ultimoEvento.textContent = nome;
    evento.textContent =
        detalhes
        ? `${nome} → ${detalhes}`
        : nome;

    const linha = document.createElement("div");

    linha.classList.add("log-item");

    linha.textContent =
        detalhes
        ? `[${nome}] ${detalhes}`
        : `[${nome}]`;

    logs.prepend(linha);
}

//daqui pra baixo é só registro de cada evento
botao.addEventListener("click", function(event){
    registrarEvento(
        "click",
        `botão clicado`
    );
});

botao.addEventListener("dblclick", function(event){
    registrarEvento(
        "dblclick",
        "double click"
    );
});

area.addEventListener("mouseenter", function(event){
    registrarEvento(
        "mouseenter",
        "mouse entrou na área"
    );
});

area.addEventListener("mouseleave", function(event){
    registrarEvento(
        "mouseleave",
        "mouse saiu da área"
    );
});

area.addEventListener("mousedown", function(event){
    registrarEvento(
        "mousedown",
        `botão ${event.button}`
    );
});

area.addEventListener("mouseup", function(event){
    registrarEvento(
        "mouseup",
        `botão ${event.button}`
    );
});

area.addEventListener("mousemove", function(event){
    mouseX.textContent = event.offsetX;
    mouseY.textContent = event.offsetY;
});

document.addEventListener("keydown", function(event){
    tecla.textContent = event.key;
    registrarEvento(
        "keydown",
        `tecla: ${event.key}`
    );
});

document.addEventListener("keyup", function(event){
    registrarEvento(
        "keyup",
        `tecla: ${event.key}`
    );
});

document.addEventListener("keypress", function(event){
    registrarEvento(
        "keypress",
        `tecla: ${event.key}`
    );
});

campo.addEventListener("focus", function(){
    registrarEvento(
        "focus",
        "campo recebeu foco"
    );
});

campo.addEventListener("blur", function(){
    registrarEvento(
        "blur",
        "campo perdeu foco"
    );
});

campo.addEventListener("input", function(event){
    registrarEvento(
        "input",
        `valor: ${event.target.value}`
    );
});

campo.addEventListener("change", function(event){
    registrarEvento(
        "change",
        `valor final: ${event.target.value}`
    );
});

campo.addEventListener("keydown", function(event) {
    if(event.key === "Enter"){
        registrarEvento(
            "submit",
            `valor enviado: ${campo.value}`
        );
    }
});

//dedos(importante)
area.addEventListener("touchstart", function(event){
    registrarEvento(
        "touchstart",
        "toque iniciado"
    );
});

area.addEventListener("touchmove", function(event){
    registrarEvento(
        "touchmove",
        "dedo se movimentando"
    );
});

area.addEventListener("touchend", function(event){
    registrarEvento(
        "touchend",
        "toque terminado"
    );
});

window.addEventListener("resize", function(){
    registrarEvento(
        "resize",
        `${window.innerWidth} × ${window.innerHeight}`
    );
});

window.addEventListener("load", function(){
    registrarEvento(
        "load",
        "página carregada"
    );
});

window.addEventListener("focus", function(){
    registrarEvento(
        "window focus",
        "janela ganhou foco"
    );
});

window.addEventListener("blur", function(){
    registrarEvento(
        "window blur",
        "janela perdeu foco"
    );
});

area.addEventListener("contextmenu", function(event){
    event.preventDefault();
    registrarEvento(
        "contextmenu",
        "botão direito"
    );
});

window.addEventListener("scroll", function(){
  registrarEvento(
        "scroll",
        `posição Y: ${window.scrollY}`
    );
});