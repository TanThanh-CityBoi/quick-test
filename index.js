const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;
const nodeHtmlToImage = require('node-html-to-image');

async function printFromHtml(htmlTemplate) {
    const PRINTER_ADDRESS = "192.168.1.100:9100"
    let printer = new ThermalPrinter({
        type: PrinterTypes.EPSON,
        interface: `tcp://${PRINTER_ADDRESS}`
    });
    let isConnected = await printer.isPrinterConnected();
    console.log("🚀 Printer is Connected: ", isConnected)

    const image = await nodeHtmlToImage({
        html: htmlTemplate
    });
    printer.alignCenter();
    await printer.printImageBuffer(image)
    printer.cut();

    try {
        let execute = await printer.execute()
        console.log("🚀 Printer execute: ", execute)
        console.error("Print done!");
    } catch (error) {
        console.log("Print failed:", error);
    }
}

//=====

const htmlTemplate = `<html><body><div>Helloooooo</div></body></html>`
printFromHtml(htmlTemplate)

