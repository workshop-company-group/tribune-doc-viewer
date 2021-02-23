const pdfjs = require('pdfjs-dist');
const pdfjsWorker = require('pdfjs-dist/build/pdf.worker.entry');

var pdf = null;
var pageNumber = 1;

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

// // Tests
// loadPdf('test.pdf');
// setTimeout(() => {
//     renderNextPage();
// }, 1000)
// setTimeout(() => {
//     renderNextPage();
// }, 2000)