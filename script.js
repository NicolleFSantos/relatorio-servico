// script.js

// Função para limpar a assinatura no canvas
function limparAssinatura(tipo) {
    const canvas = document.getElementById(`assinatura${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`);
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// Função para desenhar a assinatura no canvas
const canvasTecnico = document.getElementById('assinaturaTecnico');
const contextTecnico = canvasTecnico.getContext('2d');
let drawingTecnico = false;

canvasTecnico.addEventListener('mousedown', (e) => {
    drawingTecnico = true;
    contextTecnico.beginPath();
    contextTecnico.moveTo(e.offsetX, e.offsetY);
});

canvasTecnico.addEventListener('mousemove', (e) => {
    if (drawingTecnico) {
        contextTecnico.lineTo(e.offsetX, e.offsetY);
        contextTecnico.stroke();
    }
});

canvasTecnico.addEventListener('mouseup', () => {
    drawingTecnico = false;
});

canvasTecnico.addEventListener('mouseout', () => {
    drawingTecnico = false;
});

// Função para desenhar a assinatura do cliente no canvas
const canvasCliente = document.getElementById('assinaturaCliente');
const contextCliente = canvasCliente.getContext('2d');
let drawingCliente = false;

canvasCliente.addEventListener('mousedown', (e) => {
    drawingCliente = true;
    contextCliente.beginPath();
    contextCliente.moveTo(e.offsetX, e.offsetY);
});

canvasCliente.addEventListener('mousemove', (e) => {
    if (drawingCliente) {
        contextCliente.lineTo(e.offsetX, e.offsetY);
        contextCliente.stroke();
    }
});

canvasCliente.addEventListener('mouseup', () => {
    drawingCliente = false;
});

canvasCliente.addEventListener('mouseout', () => {
    drawingCliente = false;
});

function startDrawing(event) {
            isDrawing = true;
            ctx.beginPath();
            ctx.moveTo(getX(event), getY(event));
        }

        function draw(event) {
            if (!isDrawing) return;
            ctx.lineTo(getX(event), getY(event));
            ctx.stroke();
        }

        function stopDrawing() {
            isDrawing = false;
        }

        // Função para capturar a posição correta (mouse ou toque)
        function getX(event) {
            return event.clientX || event.touches[0].clientX - canvas.offsetLeft;
        }

        function getY(event) {
            return event.clientY || event.touches[0].clientY - canvas.offsetTop;
        }

        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        // Eventos de mouse
        canvas.addEventListener("mousedown", startDrawing);
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseup", stopDrawing);
        canvas.addEventListener("mouseleave", stopDrawing);

        // Eventos de toque para celular
        canvas.addEventListener("touchstart", startDrawing);
        canvas.addEventListener("touchmove", draw);
        canvas.addEventListener("touchend", stopDrawing);


function formatarData(data) {
    // Dividir a data em partes (ano, mês, dia)
    const partes = data.split('-');
    
    // Reorganizar para o formato dd/mm/aaaa
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}


// Função para gerar o PDF
function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Adicionar o logo no PDF
    // Adicionando uma imagem (em base64 ou caminho da imagem)
    const logo = 'assets/icons/Logo.jpg'; // Substitua pela sua imagem base64 ou caminho do arquivo
    doc.addImage(logo, 'PNG', 150, 10, 50, 30); // Parâmetros: imagem, tipo, x, y, largura, altura
    
    const dataServico = document.getElementById('dataServico').value;
    const tecnico = document.getElementById('tecnico').value;
    const cnpj = document.getElementById('cnpj').value;
    const razaoSocial = document.getElementById('razaoSocial').value;
    const descricaoServico = document.getElementById('descricaoServico').value;
    const valor = document.getElementById('valor').value;

    // Formatando a data para dd/mm/aaaa
    const dataFormatada = formatarData(dataServico);    

    // Adiciona os dados da ordem de serviço
    doc.setFont('helvetica', 'normal');  // Definindo a fonte
    doc.setFontSize(15); // Definindo o tamanho da fonte
    doc.setTextColor(0, 0, 0);  // Definindo a cor do texto (preto)
    doc.text(`Ordem de Serviço`, 70, 20);
    doc.text(`Data do Serviço: ${dataFormatada}`, 20, 40);
    doc.text(`Nome do Técnico: ${tecnico}`, 20, 50);
    doc.text(`CNPJ: ${cnpj}`, 20, 60);
    doc.text(`Razão Social: ${razaoSocial}`, 20, 70);
    doc.text(`Descrição do Serviço:`, 20, 80);
    doc.text(descricaoServico, 20, 80);
    doc.text(`Valor: R$ ${valor}`, 20, 110);
    
    // Adiciona a assinatura do técnico
    const canvasTecnicoData = canvasTecnico.toDataURL('image/png');
    doc.addImage(canvasTecnicoData, 'PNG', 20, 120, 100, 50);
    doc.text(`Assinatura do Técnico`, 20, 170);

    // Adiciona a assinatura do cliente
    const canvasClienteData = canvasCliente.toDataURL('image/png');
    doc.addImage(canvasClienteData, 'PNG', 20, 180, 100, 50);
    doc.text(`Assinatura do Cliente`, 20, 230);

    // Gera o PDF
    doc.save('ordem_de_servico.pdf');
}

// Impede o envio do formulário para gerar PDF
document.getElementById('osForm').addEventListener('submit', (e) => {
    e.preventDefault();
    gerarPDF();
});
