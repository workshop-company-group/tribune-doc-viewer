const pdfjs = require('pdfjs-dist');
const pdfjsWorker = require('pdfjs-dist/build/pdf.worker.entry');
const { ipcRenderer } = require('electron');

var pdf = null;
var pageNumber = 1;

function resetPdf() {
    pdf = null;
    pageNumber = 1;
}

async function loadPdf(path) {
    pdf = await pdfjs.getDocument(path).promise;
    await renderPage(pageNumber);
}

async function renderPage(pageN) {
    if (pageN > 0) {
        pageNumber = pageN;
        var pdfPage = await pdf.getPage(pageNumber);

        var scale = 1;
        var viewport = pdfPage.getViewport({scale: scale});

        var canvas = document.getElementById('pdf-canvas');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        var renderContext = {
            canvasContext: context,
            viewport: viewport
        };

        await pdfPage.render(renderContext).promise;
    }
}

async function renderNextPage() {
    pageNumber++;
    renderPage(pageNumber);
}

async function renderPreviousPage() {
    if (pageNumber > 1)
        pageNumber--;
    renderPage(pageNumber);
}

ipcRenderer.on('set-pdf', async (event, arg) => {
    try {
        await loadPdf(arg);
    } catch (error) { }
});

ipcRenderer.on('next-page', async () => {
    try {
        await renderNextPage();
    } catch (error) { }
});

ipcRenderer.on('previous-page', async () => {
    try {
        await renderPreviousPage();
    } catch (error) { }
});

ipcRenderer.on('set-page', async (event, arg) => {
    try {
        await renderPage(arg);
    } catch (error) { }
});

ipcRenderer.on('reset-pdf', () => {
    resetPdf();
})